import os
import sys
import re
import json
import urllib.request
import urllib.error
import urllib.parse
import traceback
import time

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

def _write_step_summary(lines):
    summary_file = os.environ.get("GITHUB_STEP_SUMMARY")
    if not summary_file: return
    try:
        with open(summary_file, "a", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
    except Exception as e:
        print(f"[WARN] Could not write step summary: {e}")

def make_request(url, method="GET", data=None, headers=None, token=None, max_retries=2):
    if headers is None:
        headers = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "AI-Issue-Triage-Bot"
        }
    if token:
        headers["Authorization"] = f"Bearer {token}"
        
    req = urllib.request.Request(url, method=method, headers=headers)
    if data:
        req.data = json.dumps(data).encode("utf-8")
        req.add_header("Content-Type", "application/json")
        
    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                resp_body = response.read().decode("utf-8")
                return json.loads(resp_body) if resp_body else {}
        except urllib.error.HTTPError as e:
            if e.code in [403, 429]:
                retry_after = e.headers.get("Retry-After")
                sleep_time = int(retry_after) + 1 if retry_after else 10
                print(f"[WARN] GitHub Rate Limit ({e.code}) on attempt {attempt+1}. Retrying in {sleep_time}s...", flush=True)
                time.sleep(sleep_time)
            else:
                print(f"HTTP Error {e.code} for {url}: {e.read().decode('utf-8')}", flush=True)
                return None
        except Exception as e:
            print(f"Request failed for {url}: {e}", flush=True)
            if attempt < max_retries - 1:
                time.sleep(5)
            else:
                return None
    return None

def fetch_issue(repo, issue_number, token):
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}"
    return make_request(url, token=token)

def fetch_repo_milestones(repo, token):
    url = f"https://api.github.com/repos/{repo}/milestones?state=open"
    return make_request(url, token=token) or []

def assign_milestone(repo, issue_number, milestone_number, token):
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}"
    return make_request(url, method="PATCH", data={"milestone": milestone_number}, token=token)

def fetch_recent_commits(repo, token, limit=15):
    url = f"https://api.github.com/repos/{repo}/commits?per_page={limit}"
    commits = make_request(url, token=token)
    if not commits: return []
    context = []
    for commit in commits:
        info = commit.get("commit", {})
        context.append({
            "sha": commit.get("sha")[:7],
            "message": info.get("message", "").split("\n")[0],
            "date": info.get("author", {}).get("date")
        })
    return context

# ---------------------------------------------------------------------------
# Duplicate detection: keyword extraction + GitHub Search across ALL issues
# ---------------------------------------------------------------------------

STOP_WORDS = {
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'not', 'no', 'this', 'that', 'these', 'those',
    'it', 'its', 'when', 'where', 'how', 'what', 'which', 'who', 'i', 'my',
    'we', 'our', 'you', 'your', 'as', 'if', 'then', 'so', 'can', 'also',
    'after', 'before', 'while', 'during', 'into', 'through', 'about', 'over',
    'under', 'up', 'down', 'out', 'off', 'any', 'all', 'both', 'each',
    'more', 'most', 'other', 'some', 'such', 'than', 'too', 'very', 'just',
    'there', 'their', 'they', 'use', 'using', 'used', 'get', 'got', 'make',
    'made', 'need', 'needs', 'want', 'like', 'see', 'new', 'add', 'one', 'two'
}

def extract_keywords(title, body):
    title_words = re.findall(r'\b[a-zA-Z][a-zA-Z0-9_-]{2,}\b', title or "")
    title_kw = [w.lower() for w in title_words if w.lower() not in STOP_WORDS]

    body_sample = (body or "")[:600]
    body_words = re.findall(r'\b[a-zA-Z][a-zA-Z0-9_-]{2,}\b', body_sample)
    body_kw = [w.lower() for w in body_words if w.lower() not in STOP_WORDS]

    seen, combined = set(), []
    for kw in title_kw + body_kw:
        if kw not in seen:
            seen.add(kw)
            combined.append(kw)

    return combined[:8]

def search_candidate_duplicates(repo, keywords, current_issue_number, token):
    if not keywords:
        print("[INFO] No keywords extracted; skipping duplicate search.", flush=True)
        return []

    keyword_query = " ".join(keywords[:6])
    raw_query = f"repo:{repo} is:issue {keyword_query}"
    encoded_query = urllib.parse.quote(raw_query)
    url = f"https://api.github.com/search/issues?q={encoded_query}&per_page=10&sort=relevance"

    print(f"[INFO] Duplicate search query: {raw_query}", flush=True)
    result = make_request(url, token=token)
    if not result or "items" not in result:
        print("[WARN] GitHub Search returned no results for duplicate check.", flush=True)
        return []

    candidates = []
    for issue in result["items"]:
        if str(issue.get("number")) == str(current_issue_number):
            continue
        body = issue.get("body") or ""
        candidates.append({
            "number": issue["number"],
            "title": issue["title"],
            "state": issue["state"],
            "html_url": issue["html_url"],
            "body_snippet": body[:500].strip()
        })

    print(f"[INFO] Found {len(candidates)} candidate duplicate(s) to compare.", flush=True)
    return candidates

def call_gemini(prompt, api_keys, temperature=0.1, response_mime_type="application/json"):
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": temperature, "responseMimeType": response_mime_type}
    }
    
    max_retries = max(3, len(api_keys) + 1)
    base_wait = 5 if len(api_keys) > 1 else 30
    
    for attempt in range(max_retries):
        current_key = api_keys[attempt % len(api_keys)]
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={current_key}"
        req = urllib.request.Request(url, method="POST", headers=headers, data=json.dumps(data).encode("utf-8"))
        try:
            with urllib.request.urlopen(req, timeout=60) as response:
                result = json.loads(response.read().decode("utf-8"))
                text_response = result["candidates"][0]["content"]["parts"][0]["text"].strip()
                if response_mime_type == "application/json":
                    try:
                        if text_response.startswith("```json"): text_response = text_response[7:]
                        if text_response.endswith("```"): text_response = text_response[:-3]
                        return json.loads(text_response.strip())
                    except json.JSONDecodeError:
                        match = re.search(r'\{.*\}', text_response, re.DOTALL)
                        if match:
                            return json.loads(match.group(0))
                        return {"internal_api_error": f"Failed to extract JSON from model response"}
                return {"text": text_response}
        except urllib.error.HTTPError as e:
            err_msg = e.read().decode('utf-8')
            print(f"[WARN] Gemini API HTTP Error {e.code}: {err_msg[:120]}", flush=True)
            if e.code in [403, 429, 500, 502, 503, 504]:
                if attempt < max_retries - 1:
                    wait_time = base_wait * (2 ** attempt)
                    time.sleep(wait_time)
                else:
                    return {"internal_api_error": f"Gemini quota exhausted after {max_retries} attempts."}
            else:
                return {"internal_api_error": f"HTTP {e.code}: {err_msg[:100]}"}
        except Exception as e:
            print(f"[WARN] Gemini call exception: {e}", flush=True)
            return {"internal_api_error": str(e)}
            
    return {"internal_api_error": "Gemini request failed after all retries"}

def generate_triage_decision(title, body, candidate_duplicates, recent_commits_context, api_keys):
    prompt = f"""
You are an intelligent Issue Triage, Scope Advisor, and Roadmap Assistant for the open-source repository 'UltimateHealth'.

## Repository Context & Product Mission
UltimateHealth is a production health platform focusing on:
- Health Articles & Content Discovery
- Wellness Tracking & Daily Logging (sleep, mood, water, steps)
- Podcasts & Audio Health Content
- AI Health Chatbot Assistant
- Analytics & Engagement Features
- Responsive Frontend (React Native for mobile & Tamagui for web)
- Node.js / Express backend APIs

The repository is NOT intended for:
- Doctor consultation systems
- Hospital management systems
- Clinical workflows / EHR
- Medical practitioner administration
(Such features belong to a deferred Future Research Backlog).

## Roadmap & Milestone Alignment (2026-2027)
You must predict which milestone this issue or proposal belongs to:
1. "v1.0 Release Hardening" (Current Phase: Nov 2026 - Production bug fixes, cross-platform UI polish, mobile/web responsiveness, auth stability, audio/podcast playback, core wellness metrics, performance & security).
2. "Content & Admin Operations" (Phase: Dec 2026 - Article CMS workflows, admin dashboards, article moderation, content discovery & tagging, search).
3. "ML & Recommendation Pipeline" (Phase: Early 2027 - Machine learning models, content scoring, personalized health insights, telemetry processing).
4. "Future Ecosystem / Clinical Workflows" (Research Backlog - Doctor consulting, patient appointments, clinical charts, hospital administration. Note: currently deferred).

## Proposal & Scope Analysis
If this issue is a feature request, enhancement, or new proposal:
- Mark `proposal_analysis.is_proposal = true`
- Provide `suggested_scope_breakdown`: Break down large ideas into a pragmatic, bite-sized Phase 1 MVP (so community contributors can build iteratively) vs Phase 2.
- Provide `tech_stack_pointers`: Give concrete engineering advice (e.g., use Tamagui tokens, avoid pure black/white hex, use React Query hooks in frontend/src/hooks/, ensure TypeScript typing, add unit tests).

## Validation Rules
Check if the issue contains: Clear problem statement, Expected behavior, Sufficient implementation details.
If the issue lacks enough information, mark `is_valid = false`.

If the issue involves Doctors, Practitioners, Clinical workflows, or Hospitals:
- Mark `is_in_scope = false`, `is_doctor_related = true`, and set predicted_milestone to "Future Ecosystem / Clinical Workflows".

## Technical Classification
- "backend": APIs, Database, Auth, Server validation, Content services.
- "frontend-web": React, Tamagui web UI, Browser responsiveness, Web DOM.
- "frontend-mobile": React Native, Mobile gestures, Android/iOS specific features.
- "docs": Documentation, Readme, Setup guides.
- "broad": Architectural refactors, product strategy.

## Difficulty Levels
- "level:beginner": Minor UI adjustments, typos, styling fixes, simple validation.
- "level:intermediate": New screen components, state management, API integration, hook additions.
- "level:advanced": Complex state machines, audio streaming architecture, security/perf optimization.
- "level:critical": Critical production crash or security patch.

## Maintainer Escalation
Set `escalate_to_maintainer = true` when: backend issue, architecture change, security issue, level:advanced, level:critical, or broad scope.

## Duplicate Detection
Compare against Candidate Duplicates:
{json.dumps(candidate_duplicates, indent=2)}

Recent Commits Context:
{json.dumps(recent_commits_context, indent=2)}

# New Issue
Title: {title}
Body:
{body}

Output a single JSON object (no markdown formatting):
{{
  "is_valid": boolean,
  "is_duplicate": boolean,
  "duplicate_number": integer or null,
  "is_in_scope": boolean,
  "is_doctor_related": boolean,
  "classification": "backend" | "frontend-web" | "frontend-mobile" | "docs" | "broad" | null,
  "difficulty": "level:beginner" | "level:intermediate" | "level:advanced" | "level:critical" | null,
  "predicted_milestone": "v1.0 Release Hardening" | "Content & Admin Operations" | "ML & Recommendation Pipeline" | "Future Ecosystem / Clinical Workflows",
  "milestone_reasoning": "Brief explanation of why this issue fits into this milestone.",
  "proposal_analysis": {{
    "is_proposal": boolean,
    "suggested_scope_breakdown": "Phase 1 MVP scope vs Phase 2 polish (or null if not a proposal)",
    "tech_stack_pointers": "Key architecture advice for contributors (or null if not a proposal)"
  }},
  "escalate_to_maintainer": boolean,
  "reasoning": "A polite, constructive explanation for your decision."
}}
"""
    return call_gemini(prompt, api_keys)

def add_labels(repo, issue_number, labels, token):
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/labels"
    make_request(url, method="POST", data={"labels": labels}, token=token)

def post_comment(repo, issue_number, body, token):
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments"
    make_request(url, method="POST", data={"body": body}, token=token)

def close_issue(repo, issue_number, token):
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}"
    make_request(url, method="PATCH", data={"state": "closed"}, token=token)

def check_active_assignments(repo, username, token):
    url = f"https://api.github.com/repos/{repo}/issues?assignee={username}&state=open"
    issues = make_request(url, token=token)
    if issues:
        issues = [i for i in issues if "pull_request" not in i]
    return issues is not None and len(issues) > 0

def check_pr_references_assigned_issue(repo, username, assigned_issue_numbers, token):
    for issue_num in assigned_issue_numbers[:5]:
        timeline_url = f"https://api.github.com/repos/{repo}/issues/{issue_num}/timeline"
        timeline = make_request(timeline_url, token=token)
        if timeline and isinstance(timeline, list):
            for event in timeline:
                if event.get("event") == "cross-referenced" and "source" in event:
                    source_issue = event["source"].get("issue", {})
                    if "pull_request" in source_issue:
                        pr_author = source_issue.get("user", {}).get("login")
                        if pr_author == username:
                            return True

        query = urllib.parse.quote(f"repo:{repo} is:pr author:{username} {issue_num}")
        url = f"https://api.github.com/search/issues?q={query}"
        result = make_request(url, token=token)
        if result and result.get("total_count", 0) > 0:
            return True
            
    return False

def assign_user(repo, issue_number, username, token):
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/assignees"
    make_request(url, method="POST", data={"assignees": [username]}, token=token)

def remove_assignee(repo, issue_number, username, token):
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/assignees"
    make_request(url, method="DELETE", data={"assignees": [username]}, token=token)

def try_link_milestone(repo, issue_number, predicted_milestone, token):
    if not predicted_milestone: return None
    milestones = fetch_repo_milestones(repo, token)
    matched_id = None
    pred_clean = predicted_milestone.lower()
    
    for m in milestones:
        m_title = m.get("title", "").lower()
        if m_title in pred_clean or pred_clean in m_title:
            matched_id = m.get("number")
            break
        # Match common abbreviations
        if "v1.0" in pred_clean and ("v1" in m_title or "release" in m_title):
            matched_id = m.get("number")
            break
        if "content" in pred_clean and "content" in m_title:
            matched_id = m.get("number")
            break
        if "ml" in pred_clean and "ml" in m_title:
            matched_id = m.get("number")
            break
            
    if matched_id:
        print(f"[INFO] Auto-assigning milestone #{matched_id} for issue #{issue_number}", flush=True)
        assign_milestone(repo, issue_number, matched_id, token)
        return matched_id
    return None

def handle_issue_opened(repo, issue_number, token, gemini_api_keys):
    print(f"Triaging new issue #{issue_number}...")
    issue = fetch_issue(repo, issue_number, token)
    if not issue: return "error", "Failed to fetch issue data"
    
    title = issue.get("title", "")
    body = issue.get("body", "")
    author = issue.get("user", {}).get("login", "contributor")
    
    keywords = extract_keywords(title, body)
    candidate_duplicates = search_candidate_duplicates(repo, keywords, issue_number, token)
    recent_commits = fetch_recent_commits(repo, token, limit=15)
    
    decision = generate_triage_decision(title, body, candidate_duplicates, recent_commits, gemini_api_keys)
    if not decision or "internal_api_error" in decision:
        err = decision.get("internal_api_error") if decision else "Empty decision"
        return "error", err
        
    print(f"Triage Decision: {json.dumps(decision, indent=2)}", flush=True)
    labels_to_add = []
    
    # 1. Duplicates
    if decision.get("is_duplicate"):
        labels_to_add.append("duplicate")
        dup_num = decision.get("duplicate_number")
        msg = f"This issue appears to already be tracked in an existing issue or pull request (#{dup_num}).\n\nTo keep discussions centralized, this issue will be closed as a duplicate.\n\n> **Reasoning:** {decision.get('reasoning')}"
        post_comment(repo, issue_number, msg, token)
        add_labels(repo, issue_number, labels_to_add, token)
        close_issue(repo, issue_number, token)
        return "duplicate", f"Closed as duplicate of #{dup_num}"

    # 2. Out of Scope / Doctor Module
    if not decision.get("is_in_scope"):
        labels_to_add.append("out-of-scope")
        if decision.get("is_doctor_related"):
            labels_to_add.append("doctor-module")
            msg = (
                f"Thank you @{author} for your contribution!\n\n"
                f"This repository currently focuses on health content, wellness tracking, podcasts, analytics, and consumer AI features.\n\n"
                f"Doctor and clinical workflow features belong to our deferred **Future Ecosystem Roadmap**.\n\n"
                f"Maintainer review may be required for future consideration. cc @SB2318\n\n"
                f"> **Reasoning:** {decision.get('reasoning')}"
            )
            post_comment(repo, issue_number, msg, token)
            add_labels(repo, issue_number, labels_to_add, token)
            close_issue(repo, issue_number, token)
            return "out-of-scope", "Closed as doctor-related"
        else:
            msg = f"This issue has been marked as out of scope for the current contribution roadmap.\n\n> **Reasoning:** {decision.get('reasoning')}"
            post_comment(repo, issue_number, msg, token)
            add_labels(repo, issue_number, labels_to_add, token)
            close_issue(repo, issue_number, token)
            return "out-of-scope", "Closed as out of scope"

    # 3. Needs Information
    if not decision.get("is_valid"):
        labels_to_add.append("needs-information")
        msg = f"Thank you for opening this issue @{author}! However, it currently lacks sufficient details for triage.\n\nPlease provide a clear problem statement, reproduction steps (if applicable), and expected behavior.\n\n> **Note:** {decision.get('reasoning')}"
        post_comment(repo, issue_number, msg, token)
        add_labels(repo, issue_number, labels_to_add, token)
        return "needs-info", "Marked as needs-information"

    # 4. Valid and In Scope
    classification = decision.get("classification")
    difficulty = decision.get("difficulty")
    escalate = decision.get("escalate_to_maintainer")
    predicted_milestone = decision.get("predicted_milestone", "v1.0 Release Hardening")
    milestone_reasoning = decision.get("milestone_reasoning", "Fits current roadmap priorities.")
    proposal_info = decision.get("proposal_analysis") or {}
    
    # Milestone assignment attempt
    matched_milestone_id = try_link_milestone(repo, issue_number, predicted_milestone, token)

    if escalate:
        labels_to_add.append("maintainer-review-required")
    
    # Proposal sections
    proposal_section = ""
    if proposal_info.get("is_proposal") and proposal_info.get("suggested_scope_breakdown"):
        proposal_section = (
            f"\n### 💡 Proposal Scope & Architecture Guidance\n"
            f"- **Suggested Phased Scope:** {proposal_info.get('suggested_scope_breakdown')}\n"
            f"- **Architecture & Tech Guidelines:** {proposal_info.get('tech_stack_pointers')}\n"
        )

    milestone_badge = f"🎯 **Roadmap Milestone:** `{predicted_milestone}`\n> *{milestone_reasoning}*"

    if classification == "backend":
        labels_to_add.extend(["backend", "level:backend"])
        if difficulty: labels_to_add.append(difficulty)
        add_labels(repo, issue_number, labels_to_add, token)
        msg = (
            f"## 🤖 AI Issue Triage & Scope Analysis\n\n"
            f"**Track:** `Backend` | **Difficulty:** `{difficulty or 'Unclassified'}`\n\n"
            f"{milestone_badge}\n\n"
            f"> **Expected Scope:** {decision.get('reasoning')}\n"
            f"{proposal_section}\n"
            f"This requires backend investigation and has been routed to @SB2318 for review and prioritization."
        )
        post_comment(repo, issue_number, msg, token)
        assign_user(repo, issue_number, "SB2318", token)
        return "backend", "Assigned to @SB2318"
        
    elif classification in ["frontend-web", "frontend-mobile", "docs"]:
        if classification == "frontend-web":
            labels_to_add.extend(["frontend", "web"])
        elif classification == "frontend-mobile":
            labels_to_add.extend(["frontend", "mobile"])
        elif classification == "docs":
            labels_to_add.append("documentation")
            
        if difficulty: labels_to_add.append(difficulty)
        labels_to_add.append("community")
        add_labels(repo, issue_number, labels_to_add, token)
        
        if escalate:
            msg = (
                f"## 🤖 AI Issue Triage & Scope Analysis\n\n"
                f"**Track:** `{classification}` | **Difficulty:** `{difficulty or 'Unclassified'}`\n\n"
                f"{milestone_badge}\n\n"
                f"> **Expected Scope:** {decision.get('reasoning')}\n"
                f"{proposal_section}\n"
                f"Escalating to maintainer @SB2318 for architecture review."
            )
            post_comment(repo, issue_number, msg, token)
            return classification, "Escalated to maintainer"
            
        else:
            # Check eligibility for auto-assignment
            has_active = check_active_assignments(repo, author, token)
            if has_active and author.lower() != "sb2318":
                msg = (
                    f"## 🤖 AI Issue Triage & Scope Analysis\n\n"
                    f"**Track:** `{classification}` | **Difficulty:** `{difficulty or 'Unclassified'}`\n\n"
                    f"{milestone_badge}\n\n"
                    f"> **Expected Scope:** {decision.get('reasoning')}\n"
                    f"{proposal_section}\n"
                    f"It is now open for community contribution!\n\n"
                    f"Hi @{author}, I couldn't assign this to you automatically because you "
                    f"currently have another active assignment. Please complete your current "
                    f"task first!\n\n---\n### 🤖 Assignment Guidelines\n"
                    f"To get assigned to this issue, simply leave a comment with `/assign` or `/claim`.\n"
                    f"*Tip: You can also comment `/scope` for a detailed phased breakdown or `/milestone` to review roadmap priorities.*"
                )
                post_comment(repo, issue_number, msg, token)
                return classification, "Open (author has active assignment)"

            # Check previously closed assignments without PR
            query = urllib.parse.quote(f"repo:{repo} is:issue assignee:{author} is:closed")
            past_issues_url = f"https://api.github.com/search/issues?q={query}&sort=updated&order=desc"
            past_issues = make_request(past_issues_url, token=token)

            if past_issues and past_issues.get("total_count", 0) > 0 and author.lower() != "sb2318":
                assigned_issue_numbers = [str(i["number"]) for i in past_issues.get("items", [])]
                has_pr_for_issue = check_pr_references_assigned_issue(repo, author, assigned_issue_numbers, token)
                if not has_pr_for_issue:
                    issue_list = ", ".join(f"#{n}" for n in assigned_issue_numbers[:5])
                    msg = (
                        f"## 🤖 AI Issue Triage & Scope Analysis\n\n"
                        f"**Track:** `{classification}` | **Difficulty:** `{difficulty or 'Unclassified'}`\n\n"
                        f"{milestone_badge}\n\n"
                        f"> **Expected Scope:** {decision.get('reasoning')}\n"
                        f"{proposal_section}\n"
                        f"Hi @{author}, I couldn't assign this automatically because "
                        f"you previously had assigned issue(s) ({issue_list}) that are now closed, but no referencing Pull Request was found.\n\n"
                        f"To claim, please ensure you submit a PR mentioning your assigned issue (e.g. `Fixes #{assigned_issue_numbers[0]}`)."
                    )
                    post_comment(repo, issue_number, msg, token)
                    return classification, "Open (needs PR for prior assignment)"

            # All checks passed — auto-assign author
            assign_user(repo, issue_number, author, token)
            msg = (
                f"## 🤖 AI Issue Triage & Scope Analysis\n\n"
                f"**Track:** `{classification}` | **Difficulty:** `{difficulty or 'Unclassified'}`\n\n"
                f"{milestone_badge}\n\n"
                f"> **Expected Scope:** {decision.get('reasoning')}\n"
                f"{proposal_section}\n"
                f"Hi @{author}! Since you opened this issue and have no active assignments, I have automatically assigned it to you. Happy coding! 🎉\n\n"
                f"💡 *Remember to create a feature branch, run `yarn lint` and `yarn typecheck`, and submit a PR referencing this issue.*"
            )
            post_comment(repo, issue_number, msg, token)
            return classification, f"Auto-assigned to @{author}"
        
    else:
        # Broad or uncategorized
        labels_to_add.extend(["broad", "maintainer-review-required"])
        add_labels(repo, issue_number, labels_to_add, token)
        msg = (
            f"## 🤖 AI Issue Triage\n\n"
            f"{milestone_badge}\n\n"
            f"This issue covers a broad scope or requires architectural consensus.\n\n"
            f"> **Analysis:** {decision.get('reasoning')}\n"
            f"{proposal_section}\n"
            f"Escalating to @SB2318 for maintainer review."
        )
        post_comment(repo, issue_number, msg, token)
        return "broad", "Broad/Uncategorized (escalated)"

def handle_scope_command(repo, issue_number, commenter, comment_body, token, gemini_api_keys):
    """Provides conversational scope refinement for contributors upon /scope request."""
    issue = fetch_issue(repo, issue_number, token)
    if not issue: return "error", "Failed to fetch issue"
    
    title = issue.get("title", "")
    body = issue.get("body", "")
    
    prompt = f"""
You are an expert open-source engineering mentor for 'UltimateHealth'.
A contributor (@{commenter}) has requested scope breakdown and guidance using the `/scope` command.

Issue Title: {title}
Issue Description:
{body}

Contributor Comment:
{comment_body}

Provide a constructive, highly actionable response in Markdown:
1. **Scope Breakdown:** Suggest Phase 1 (Minimal Working MVP) and Phase 2 (Enhancements).
2. **Key Files & Directories:** Mention relevant areas (e.g., `frontend/src/screens/`, `frontend/src/hooks/`, `frontend/tamagui.config.ts`, `controllers/`).
3. **Engineering Guardrails:** Tamagui design system rules, type safety, test expectations.
Keep the tone encouraging, concise, and structured.
"""
    res = call_gemini(prompt, gemini_api_keys, response_mime_type="text/plain")
    reply_text = res.get("text", "")
    if not reply_text:
        reply_text = "Could not generate scope analysis at this moment. Please check back later!"
        
    comment = f"### 🛠️ Scope Breakdown & Implementation Advice for @{commenter}\n\n{reply_text}\n\n*Feel free to ask questions or discuss your approach here!*"
    post_comment(repo, issue_number, comment, token)
    return "responded", "Scope breakdown posted"

def handle_milestone_command(repo, issue_number, commenter, token, gemini_api_keys):
    """Explains and predicts milestone placement on /milestone request."""
    issue = fetch_issue(repo, issue_number, token)
    if not issue: return "error", "Failed to fetch issue"
    
    title = issue.get("title", "")
    body = issue.get("body", "")
    
    prompt = f"""
You are the Roadmap coordinator for 'UltimateHealth'.
A contributor has requested roadmap and milestone status using `/milestone`.

Roadmap Phases:
1. "v1.0 Release Hardening" (Nov 2026: UI polish, bug fixes, mobile responsiveness, auth reliability, core health metrics, performance).
2. "Content & Admin Operations" (Dec 2026: Article CMS, admin dashboards, content moderation, content tagging).
3. "ML & Recommendation Pipeline" (Early 2027: Machine learning recommendation algorithms, personalization, health scoring).
4. "Future Ecosystem / Clinical Workflows" (Deferred Research: Doctor consultations, hospital management).

Issue Title: {title}
Issue Body: {body}

Return a single JSON:
{{
  "milestone": "v1.0 Release Hardening" | "Content & Admin Operations" | "ML & Recommendation Pipeline" | "Future Ecosystem / Clinical Workflows",
  "reasoning": "Short justification"
}}
"""
    decision = call_gemini(prompt, gemini_api_keys)
    milestone_name = decision.get("milestone", "v1.0 Release Hardening")
    reasoning = decision.get("reasoning", "")
    
    matched_id = try_link_milestone(repo, issue_number, milestone_name, token)
    comment = (
        f"### 🎯 Roadmap & Milestone Assessment\n\n"
        f"**Target Milestone:** `{milestone_name}`\n\n"
        f"> **Roadmap Fit:** {reasoning}\n\n"
        f"{'✅ *Assigned to GitHub Milestone #' + str(matched_id) + '*' if matched_id else '*Milestone will be formally attached by maintainers.*'}"
    )
    post_comment(repo, issue_number, comment, token)
    return "responded", f"Milestone: {milestone_name}"

def handle_issue_comment(repo, issue_number, commenter, comment_body, token, gemini_api_keys=None):
    print(f"Evaluating comment from @{commenter} on Issue #{issue_number}...")
    
    # Check for commands
    if re.search(r'/(scope|refine-scope)', comment_body):
        if gemini_api_keys:
            return handle_scope_command(repo, issue_number, commenter, comment_body, token, gemini_api_keys)
        else:
            post_comment(repo, issue_number, "AI Scope Advisor is currently unavailable (missing API keys).", token)
            return "ignored", "No Gemini API keys"
            
    if re.search(r'/milestone', comment_body):
        if gemini_api_keys:
            return handle_milestone_command(repo, issue_number, commenter, token, gemini_api_keys)
        else:
            post_comment(repo, issue_number, "AI Milestone Advisor is currently unavailable (missing API keys).", token)
            return "ignored", "No Gemini API keys"

    assign_match = re.search(r'/(assign|claim)', comment_body)
    unassign_match = re.search(r'/unassign', comment_body)
    
    issue = fetch_issue(repo, issue_number, token)
    if not issue: return "error", "Failed to fetch issue"
    
    if unassign_match:
        current_assignees = [a["login"] for a in issue.get("assignees", [])]
        if commenter in current_assignees:
            remove_assignee(repo, issue_number, commenter, token)
            msg = f"@{commenter} has been unassigned. Anyone else can reply with `/assign` or `/claim` to claim it."
            post_comment(repo, issue_number, msg, token)
            return "unassigned", f"Unassigned @{commenter}"
        return "ignored", "Not currently assigned"
        
    if not assign_match:
        return "ignored", "Comment does not contain recognized bot commands"
    
    if issue.get("state") == "closed":
        return "ignored", "Issue is closed"
        
    if issue.get("assignees"):
        return "ignored", "Already assigned"
        
    labels = [l.get("name", "").lower() for l in issue.get("labels", [])]
    if "backend" in labels or "maintainer-review-required" in labels or "needs-information" in labels or "out-of-scope" in labels:
        return "ignored", "Not an open community task"
        
    if "frontend" not in labels and "documentation" not in labels:
        return "ignored", "Missing frontend or documentation label"

    # Active assignments check
    has_active = check_active_assignments(repo, commenter, token)
    if has_active and commenter.lower() != "sb2318":
        msg = f"Sorry @{commenter}, you already have an active assignment in this repository. Please complete or unassign it before claiming a new one."
        post_comment(repo, issue_number, msg, token)
        return "rejected", "Active assignments limit"

    # Previous assignments without PR check
    query = urllib.parse.quote(f"repo:{repo} is:issue assignee:{commenter} is:closed")
    url = f"https://api.github.com/search/issues?q={query}&sort=updated&order=desc"
    past_issues = make_request(url, token=token)

    if past_issues and past_issues.get("total_count", 0) > 0 and commenter.lower() != "sb2318":
        assigned_issue_numbers = [str(issue["number"]) for issue in past_issues.get("items", [])]
        has_pr_for_issue = check_pr_references_assigned_issue(repo, commenter, assigned_issue_numbers, token)
        if not has_pr_for_issue:
            issue_list = ", ".join(f"#{n}" for n in assigned_issue_numbers[:5])
            msg = (
                f"@{commenter} You have previously been assigned issue(s) ({issue_list}) "
                f"that are now closed, but no referencing Pull Request was found.\n\n"
                f"To be eligible for a new assignment, please submit a Pull Request that "
                f"explicitly mentions your assigned issue (e.g. `Fixes #{assigned_issue_numbers[0]}`)."
            )
            post_comment(repo, issue_number, msg, token)
            return "rejected", "No PR referencing previously assigned issue"

    # Assign
    assign_user(repo, issue_number, commenter, token)
    msg = (
        f"Assigned to @{commenter}! 🎉\n\n"
        f"You have 7 days to complete this issue. Please submit a PR referencing this issue.\n"
        f"💡 *Tip: Reply with `/scope` anytime if you'd like guidance or a suggested MVP breakdown!*"
    )
    post_comment(repo, issue_number, msg, token)
    return "assigned", f"Assigned to {commenter}"

def handle_issue_labeled(repo, issue_number, label_name, token):
    trigger_labels = ["not planned", "duplicate", "invalid", "won't fix", "wontfix"]
    if label_name.lower() not in trigger_labels:
        return "ignored", f"Label '{label_name}' does not trigger unassignment"

    issue = fetch_issue(repo, issue_number, token)
    if not issue or not issue.get("assignees"):
        return "ignored", "No assignees to remove"

    labels = [l.get("name", "").lower() for l in issue.get("labels", [])]
    if "preserve-assignment" in labels:
        return "ignored", "Assignment preserved by maintainer"

    assignees = [user["login"] for user in issue["assignees"]]
    for assignee in assignees:
        remove_assignee(repo, issue_number, assignee, token)
        msg = f"@{assignee} has been unassigned because the issue was labeled as `{label_name}`."
        post_comment(repo, issue_number, msg, token)
    return "unassigned", f"Unassigned {', '.join(assignees)} due to label {label_name}"

def handle_issue_closed(repo, issue_number, token):
    issue = fetch_issue(repo, issue_number, token)
    if not issue or not issue.get("assignees"):
        return "ignored", "No assignees to remove"

    labels = [l.get("name", "").lower() for l in issue.get("labels", [])]
    if "preserve-assignment" in labels:
        return "ignored", "Assignment preserved by maintainer"

    assignees = [user["login"] for user in issue["assignees"]]
    for assignee in assignees:
        has_pr = check_pr_references_assigned_issue(repo, assignee, [str(issue_number)], token)
        if not has_pr:
            remove_assignee(repo, issue_number, assignee, token)
            msg = f"@{assignee} has been unassigned because the issue was closed before a PR was linked."
            post_comment(repo, issue_number, msg, token)

    return "processed", "Handled issue close event for assignees"

def main():
    gemini_keys_str = os.environ.get("GEMINI_API_KEYS", "")
    gemini_api_keys = [k.strip() for k in gemini_keys_str.split(",") if k.strip()]
    if not gemini_api_keys:
        single_key = os.environ.get("GEMINI_API_KEY", "").strip()
        if single_key:
            gemini_api_keys = [single_key]
            
    github_token = os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPOSITORY")
    event_name = os.environ.get("GITHUB_EVENT_NAME")
    if not github_token or not repo:
        print("Missing required environment variables (GITHUB_TOKEN or GITHUB_REPOSITORY).")
        return
        
    event_path = os.environ.get("GITHUB_EVENT_PATH")
    
    if event_name == "workflow_dispatch" or not event_path or not os.path.exists(event_path):
        issue_number = os.environ.get("ISSUE_NUMBER", "").strip()
        if not issue_number:
            print("workflow_dispatch: No issue_number provided.", flush=True)
            return
        status, detail = handle_issue_opened(repo, issue_number, github_token, gemini_api_keys)
        _write_step_summary([
            "## 🤖 AI Issue Triage Report (Manual)",
            f"**Issue:** #{issue_number}",
            f"**Status:** {status}",
            f"**Detail:** {detail}"
        ])
        return

    with open(event_path, "r", encoding="utf-8") as f:
        event_data = json.load(f)
        
    action = event_data.get("action")
    
    if event_name == "issues" and action == "opened":
        if not gemini_api_keys:
            print("Missing GEMINI_API_KEYS required for issue triage.")
            return
        issue_number = event_data["issue"]["number"]
        status, detail = handle_issue_opened(repo, issue_number, github_token, gemini_api_keys)
        _write_step_summary([
            "## 🤖 AI Issue Triage Report",
            f"**Issue:** #{issue_number}",
            f"**Status:** {status}",
            f"**Detail:** {detail}"
        ])
        
    elif event_name == "issue_comment" and action == "created":
        if "pull_request" not in event_data["issue"]:
            issue_number = event_data["issue"]["number"]
            commenter = event_data["comment"]["user"]["login"]
            comment_body = event_data["comment"].get("body", "").lower().strip()
            if commenter == "github-actions[bot]" or "bot" in commenter.lower():
                return
            status, detail = handle_issue_comment(repo, issue_number, commenter, comment_body, github_token, gemini_api_keys)
            _write_step_summary([
                "## 🤖 AI Issue Comment Interaction Report",
                f"**Issue:** #{issue_number}",
                f"**Commenter:** @{commenter}",
                f"**Status:** {status}",
                f"**Detail:** {detail}"
            ])
            
    elif event_name == "issues" and action == "labeled":
        issue_number = event_data["issue"]["number"]
        label_name = event_data.get("label", {}).get("name", "")
        status, detail = handle_issue_labeled(repo, issue_number, label_name, github_token)
        _write_step_summary([
            "## 🤖 AI Issue Unassignment Report",
            f"**Issue:** #{issue_number}",
            f"**Action:** labeled '{label_name}'",
            f"**Status:** {status}",
            f"**Detail:** {detail}"
        ])

    elif event_name == "issues" and action == "closed":
        issue_number = event_data["issue"]["number"]
        status, detail = handle_issue_closed(repo, issue_number, github_token)
        _write_step_summary([
            "## 🤖 AI Issue Unassignment Report",
            f"**Issue:** #{issue_number}",
            f"**Action:** closed",
            f"**Status:** {status}",
            f"**Detail:** {detail}"
        ])

if __name__ == "__main__":
    main()
