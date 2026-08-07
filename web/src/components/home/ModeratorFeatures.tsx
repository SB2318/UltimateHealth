import { PageWrapper, Section } from "@/components/layout";

const primary = [
  { icon: "fa-sync-alt", title: "Interactive Review", desc: "Manage the full lifecycle of content with a streamlined approval, rejection, and feedback loop for contributors." },
  { icon: "fa-microchip", title: "Content Integrity", desc: "Leverage automated plagiarism and grammar engines to maintain professional clarity and originality scores." },
  { icon: "fa-shield-alt", title: "Visual Asset Audit", desc: "Validation for image quality and automated compliance checks for brand logos and visual safety. (Coming Soon)" },
];

const secondary = [
  { icon: "fa-gavel", title: "Community Safety", desc: "Investigate flagged content and manage user reports through a robust system designed to keep the platform safe." },
  { icon: "fa-fingerprint", title: "Advanced Security", desc: "Role-based access control (RBAC) ensuring only verified Reviewers and Admins can access protected operations." },
];

/** Static "Be a Member" section — server rendered, ships no JavaScript. */
export default function ModeratorFeatures() {
  return (
    <Section className="member-section scroll-reveal">
      <PageWrapper>
        <h2>Be a Member: Guardian of Content Integrity</h2>
        <p className="center">Help maintain quality and safety across the platform</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 w-full">
          {primary.map((f, i) => (
            <div className="feature-card mod-card w-full fade-in" key={i}>
              <div className="mod-icon"><i className={`fas ${f.icon}`}></i></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 mx-auto" style={{ maxWidth: "66.666%", marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}>
          {secondary.map((f, i) => (
            <div className="feature-card mod-card w-full fade-in" key={i}>
              <div className="mod-icon"><i className={`fas ${f.icon}`}></i></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </PageWrapper>
    </Section>
  );
}
