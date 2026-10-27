import React from "react";
import { agreementStyles as css } from "../styles";

export default function AgreementTermsContent() {
  return (
    <div className="agreement-scroll-content" style={css.content}>
      <h2 style={css.h2}>Welcome to the UltimateHealth Review Team</h2>
      <p style={css.p}>
        Thank you for joining our mission to provide high-quality, verified health content to our community.
        As an admin or moderator, you play a critical role in maintaining the integrity and quality of content on our platform.
      </p>

      <h2 style={css.h2}>Role &amp; Responsibilities</h2>
      <p style={css.p}>You will be assigned one of the following roles:</p>
      <ul style={css.ul}>
        <li style={css.li}><span style={css.roleBadge}>Moderator</span> — Content review and moderation capabilities</li>
      </ul>
      <p style={css.p}><strong>Your responsibilities include:</strong></p>
      <ul style={css.ul}>
        {[
          "Reviewing submitted articles for accuracy, quality, and compliance with platform guidelines",
          "Providing constructive feedback to authors when revisions are needed",
          "Publishing articles that meet quality standards",
          "Discarding content that violates guidelines with clear explanations",
          "Investigating and resolving user reports promptly and fairly",
          "Taking appropriate moderation actions on policy violations",
          "Responding to review requests and reports in a timely manner",
          "Maintaining professionalism in all communications with authors and users",
          "Ensuring fair and unbiased decision-making in all moderation activities",
        ].map((item, i) => <li key={i} style={css.li}>{item}</li>)}
      </ul>

      <h2 style={css.h2}>Privileges &amp; Access</h2>
      <ul style={css.ul}>
        {[
          "Access to the admin dashboard and review system",
          "Ability to self-assign articles for review",
          "Authority to publish or discard submitted content",
          "Manage and resolve user reports and community violations",
          "Take moderation actions (warn, block, ban users; remove/restore content)",
          "View analytics and contribution metrics",
          "Receive notifications for review requests and updates",
          "Single-device authentication for enhanced security",
        ].map((item, i) => <li key={i} style={css.li}>{item}</li>)}
      </ul>

      <h2 style={css.h2}>Code of Conduct</h2>
      <p style={css.p}><strong>As a member of the review team, you agree to:</strong></p>
      <ul style={css.ul}>
        {[
          ["Maintain Confidentiality", "Protect user information and unpublished content"],
          ["Act with Integrity", "Make unbiased decisions based on content quality and guidelines"],
          ["Fair Moderation", "Apply moderation actions consistently without bias or favoritism"],
          ["Respect Users", "Provide respectful, constructive feedback to all community members"],
          ["Follow Guidelines", "Adhere to UltimateHealth's content and community standards"],
          ["Thorough Investigation", "Fully investigate reports before taking action"],
          ["Report Issues", "Notify Super Admins of technical issues or policy violations"],
          ["Continuous Learning", "Stay updated on health information best practices"],
          ["Accountability", "Take responsibility for your moderation decisions"],
        ].map(([title, desc], i) => (
          <li key={i} style={css.li}><strong>{title}:</strong> {desc}</li>
        ))}
      </ul>

      <h2 style={css.h2}>Security &amp; Account Management</h2>
      <ul style={css.ul}>
        {[
          "Your account uses JWT-based authentication with automatic session management",
          "You can only be logged in on one device at a time for security",
          "Email verification is required before accessing admin features",
          "Regularly update your password and keep credentials secure",
          "Report any suspicious activity immediately",
        ].map((item, i) => <li key={i} style={css.li}>{item}</li>)}
      </ul>

      <h2 style={css.h2}>Content Review Standards</h2>
      <p style={css.p}><strong>Articles must meet the following criteria to be published:</strong></p>
      <ul style={css.ul}>
        {[
          "Medically accurate and evidence-based information",
          "Clear, well-structured, and grammatically correct writing",
          "Proper citations and credible sources",
          "Compliance with copyright and intellectual property laws",
          "Appropriate images with proper attribution",
          "No promotional or misleading content",
        ].map((item, i) => <li key={i} style={css.li}>{item}</li>)}
      </ul>

      <div style={css.highlight}>
        ⚠️ <strong>Important:</strong> Misuse of admin privileges, bias in content review, or breach of confidentiality
        may result in immediate revocation of access and termination from the review team.
      </div>

      <h2 style={css.h2}>Review Workflow</h2>
      <p style={css.p}><strong>Standard article review process:</strong></p>
      <ul style={css.ul}>
        {[
          ["Assignment", "Self-assign from available articles or receive direct assignments"],
          ["Review", "Thoroughly evaluate content against quality standards"],
          ["Feedback", "Provide detailed feedback if changes are needed (status: AWAITING_USER)"],
          ["Re-review", "Check author revisions when submitted (status: REVIEW_PENDING)"],
          ["Decision", "Publish approved articles or discard with explanation"],
          ["Notification", "Authors receive automated updates at each stage"],
        ].map(([title, desc], i) => (
          <li key={i} style={css.li}><strong>{title}:</strong> {desc}</li>
        ))}
      </ul>

      <h2 style={css.h2}>Report Resolution &amp; Moderation</h2>
      <p style={css.p}><strong>Available Moderation Actions:</strong></p>
      <ul style={css.ul}>
        {[
          ["RESOLVED", "Mark valid report as resolved. Decreases convict's active report count and sends resolution notification"],
          ["DISMISSED", "Dismiss false or invalid reports. Increases reporter's misuse count (automatic block after 3 dismissals)"],
          ["IGNORE", "Silently ignore report when convict/reporter is already banned or blocked"],
          ["WARN_CONVICT", "Issue warning and remove offending content. Three warnings result in automatic ban"],
          ["REMOVE_CONTENT", "Remove reported content (article, podcast, or comment) without issuing a warning"],
          ["BLOCK_CONVICT", "Temporarily block user for a set period (typically 1 month) for policy violations"],
          ["BAN_CONVICT", "Permanently ban user for severe or repeated violations"],
          ["RESTORE_CONTENT", "Restore previously removed content if removal was incorrect or upon valid appeal"],
          ["CONVICT_REQUEST_DISAPPROVED", "Reject user's request to restore their removed content"],
        ].map(([title, desc], i) => (
          <li key={i} style={css.li}><strong>{title}:</strong> {desc}</li>
        ))}
      </ul>

      <div style={css.highlight}>
        ⚠️ <strong>Important:</strong> Moderation actions directly impact user experience and platform integrity.
        Abuse of moderation powers, biased decisions, or failure to follow guidelines may result in removal from the moderation team.
      </div>

      <h2 style={css.h2}>Data Privacy &amp; Compliance</h2>
      <ul style={css.ul}>
        {[
          "User data must be handled in accordance with privacy regulations",
          "Personal information should not be shared outside the platform",
          "Review decisions must be documented and justified",
          "Maintain transparency in all moderation actions",
        ].map((item, i) => <li key={i} style={css.li}>{item}</li>)}
      </ul>

      <h2 style={css.h2}>Term &amp; Termination</h2>
      <p style={css.p}>
        This agreement remains in effect as long as you maintain an active admin or moderator account.
        Either party may terminate this agreement at any time. Upon termination, your access will be
        immediately revoked, and you must cease all use of admin privileges.
      </p>

      <h2 style={css.h2}>Updates to Agreement</h2>
      <p style={css.p}>
        UltimateHealth reserves the right to update this agreement. You will be notified of significant
        changes, and continued use of admin privileges constitutes acceptance of the updated terms.
      </p>

      <p style={{ marginTop: 25, paddingTop: 20, borderTop: "2px solid #e2e8f0", fontSize: 13, color: "#718096" }}>
        <strong>Last Updated:</strong> April 2026<br />
        For questions or concerns, please contact:{" "}
        <a href="mailto:ultimate.health25@gmail.com" style={{ color: "#667eea" }}>ultimate.health25@gmail.com</a>
      </p>
    </div>
  );
}
