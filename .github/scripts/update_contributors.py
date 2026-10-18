import os
import sys
import re
import json
import urllib.request
import html
from urllib.error import URLError

def get_user_info(username):
    """Fetch user name and avatar from GitHub API."""
    url = f"https://api.github.com/users/{username}"
    headers = {'User-Agent': 'UltimateHealth-Contributor-Bot'}
    if 'GITHUB_TOKEN' in os.environ:
        headers['Authorization'] = f"Bearer {os.environ['GITHUB_TOKEN']}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                name = data.get('name') or username
                avatar_url = data.get('avatar_url')
                return name, avatar_url
    except Exception as e:
        print(f"Warning: Failed to fetch user info from GitHub API: {e}")
    
    return username, f"https://github.com/{username}.png"

def update_readme(username, name, avatar_url):
    readme_path = 'README.md'
    if not os.path.exists(readme_path):
        print(f"Notice: {readme_path} not found. Skipping README update.")
        return

    with open(readme_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if re.search(rf'github\.com/{re.escape(username)}["/]', content, re.IGNORECASE):
        print(f"User {username} is already in README contributors list.")
        return

    safe_name = html.escape(str(name))
    safe_avatar = html.escape(str(avatar_url))
    new_td = f'    <td align="center"><a href="https://github.com/{username}"><img src="{safe_avatar}" width="120px;" alt=""/><br/><sub><b>{safe_name}</b></sub></a></td>'

    start_marker = '<!-- CONTRIBUTORS-TABLE-START -->'
    end_marker = '<!-- CONTRIBUTORS-TABLE-END -->'
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    if start_idx == -1 or end_idx == -1:
        print("Warning: Could not find table markers in README. Skipping.")
        return

    table_start = start_idx + len(start_marker)
    table_end = end_idx
    table_content = content[table_start:table_end]

    trs = re.findall(r'(<tr>.*?</tr>)', table_content, flags=re.DOTALL | re.IGNORECASE)
    if not trs:
        new_tr = f"  <tr>\n{new_td}\n  </tr>\n"
        updated_table = table_content + new_tr
    else:
        last_tr = trs[-1]
        tds = re.findall(r'(<td.*?</td>)', last_tr, flags=re.DOTALL | re.IGNORECASE)
        if len(tds) < 6:
            insertion_point = last_tr.lower().rfind('</tr>')
            if insertion_point == -1:
                insertion_point = len(last_tr) - 5
            updated_last_tr = last_tr[:insertion_point] + new_td + '\n ' + last_tr[insertion_point:]
            head, sep, tail = table_content.rpartition(last_tr)
            updated_table = head + updated_last_tr + tail
        else:
            new_tr = f"   <tr>\n{new_td}\n   </tr>"
            head, sep, tail = table_content.rpartition(last_tr)
            updated_table = head + (last_tr + '\n\n' + new_tr) + tail

    new_readme_content = content[:table_start] + updated_table + content[table_end:]
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(new_readme_content)
    print(f"Successfully added {username} to README.md.")

def update_web_contributors(username, name, avatar_url):
    data_path = 'web/src/app/[locale]/our-contributors/contributors-data.ts'
    if not os.path.exists(data_path):
        return

    with open(data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    handle = f"@{username}"
    if handle.lower() in content.lower():
        print(f"User {username} is already present in contributors-data.ts.")
        return

    safe_name = name.replace("'", "\\'")
    new_entry = f"  {{ handle: '{handle}', name: '{safe_name}', img: '{avatar_url}', url: 'https://github.com/{username}', years: [2026], commits: 1, additions: 50, deletions: 10, area: 'Community Contributor', summary: 'Contributions via GitHub pull request' }},\n"

    # Insert right after `export const ALL_CONTRIBUTORS: Contributor[] = [\n`
    marker = 'export const ALL_CONTRIBUTORS: Contributor[] = ['
    idx = content.find(marker)
    if idx != -1:
        insert_pos = content.find('\n', idx) + 1
        updated = content[:insert_pos] + new_entry + content[insert_pos:]
        with open(data_path, 'w', encoding='utf-8') as f:
            f.write(updated)
        print(f"Successfully added {username} to {data_path}.")

def main():
    if len(sys.argv) < 2:
        print("Usage: python update_contributors.py <username>")
        sys.exit(1)

    username = sys.argv[1].lstrip('@')
    name, avatar_url = get_user_info(username)

    update_readme(username, name, avatar_url)
    update_web_contributors(username, name, avatar_url)

if __name__ == '__main__':
    main()
