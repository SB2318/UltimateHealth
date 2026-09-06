import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";

interface GitHubContributor {
  login?: string;
  avatar_url?: string;
  html_url?: string;
  contributions: number;
  type?: string;
}

interface ContributorCardProps {
  contributor: GitHubContributor;
}

function getRoleBadge(contributions: number): string {
  if (contributions >= 100) return "Maintainer";
  if (contributions >= 50) return "Core Contributor";
  if (contributions >= 10) return "Contributor";
  return "Community Member";
}

function getRoleBadgeClass(contributions: number): string {
  if (contributions >= 100) return "program-badge maintainer-badge";
  if (contributions >= 50) return "program-badge core-badge";
  if (contributions >= 10) return "program-badge contributor-badge";
  return "program-badge community-badge";
}

function ContributorCard({ contributor }: ContributorCardProps) {
  const isAnonymous = !contributor.login || !contributor.avatar_url;
  const displayName = isAnonymous ? "Anonymous Contributor" : contributor.login!;
  const avatarSrc = isAnonymous
    ? "https://avatars.githubusercontent.com/u/0?v=4"
    : contributor.avatar_url!;
  const role = getRoleBadge(contributor.contributions);
  const badgeClass = getRoleBadgeClass(contributor.contributions);

  return (
    <article className="feature-card contributor-card" aria-label={`Contributor: ${displayName}`}>
      <div className="contributor-avatar-wrapper">
        <Image
        src={avatarSrc}
        alt={isAnonymous ? "Anonymous contributor avatar" : `${displayName}'s avatar`}
        width={80}
        height={80}
        className="contributor-avatar"
/>
      </div>
      <div className="contributor-info">
        <h3 className="contributor-name">
          {contributor.html_url && !isAnonymous ? (
            <a
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="contributor-link"
              aria-label={`View ${displayName}'s GitHub profile`}
            >
              {displayName}
            </a>
          ) : (
            displayName
          )}
        </h3>
        <p className="contributor-commits">
          <span aria-label={`${contributor.contributions} commits`}>
            {contributor.contributions.toLocaleString()} commit{contributor.contributions !== 1 ? "s" : ""}
          </span>
        </p>
        <span className={badgeClass} role="status">
          {role}
        </span>
      </div>
    </article>
  );
}

async function fetchContributors(): Promise<GitHubContributor[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/SB2318/UltimateHealth/contributors?per_page=100&anon=1",
      {
        next: { revalidate: 86400 },
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    if (!res.ok) {
      console.error(`GitHub API responded with status ${res.status}`);
      return [];
    }
    const data: GitHubContributor[] = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch contributors:", error);
    return [];
  }
}

const PROGRAMS = [
  {
    name: "GSSoC 2026",
    description:
      "GirlScript Summer of Code 2026 — Empowering open-source contributors with mentorship and real-world project experience.",
    badge: "Active",
  },
  {
    name: "GSSoC 2024",
    description:
      "GirlScript Summer of Code 2024 — Our successful participation season that welcomed dozens of new contributors.",
    badge: "Completed",
  },
  {
    name: "IEEE IGDTUW Open Source Week",
    description:
      "IEEE IGDTUW Open Source Week — Collaborating with IEEE to promote open-source culture among engineering students.",
    badge: "Completed",
  },
  {
    name: "Vultr Hackathon",
    description:
      "Vultr Cloud Hackathon — Leveraging cloud infrastructure to build scalable health-tech solutions.",
    badge: "Completed",
  },
];

export default async function ContributorsPage() {
  const contributors = await fetchContributors();

  const visibleContributors = contributors.filter(
    (c) =>
      c.login !== "github-actions[bot]" &&
      c.login !== "dependabot[bot]"
  );

  const totalContributors = visibleContributors.length;
  const totalCommits = visibleContributors.reduce(
    (sum, c) => sum + c.contributions,
    0
  );
  const totalPrograms = 4;
  return (
    <>
      <style>{`
        .contributor-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          padding: 1.5rem 1rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .contributor-card:hover {
          transform: translateY(-4px);
        }
        .contributor-avatar-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--primary, #3b82f6);
          flex-shrink: 0;
        }
        .contributor-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        .contributor-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          width: 100%;
        }
        .contributor-name {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0;
          word-break: break-word;
        }
        .contributor-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .contributor-link:hover {
          color: var(--primary, #3b82f6);
          text-decoration: underline;
        }
        .contributor-commits {
          font-size: 0.82rem;
          margin: 0;
          opacity: 0.7;
        }
        .maintainer-badge { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; }
        .core-badge { background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; }
        .contributor-badge { background: linear-gradient(135deg, #10b981, #059669); color: #fff; }
        .community-badge { background: linear-gradient(135deg, #64748b, #475569); color: #fff; }

        .stats-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.85rem;
          opacity: 0.75;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .programs-section {
          padding: 4rem 0;
        }
        .programs-section h2 {
          text-align: center;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .programs-section p {
          text-align: center;
          opacity: 0.7;
          margin-bottom: 2.5rem;
        }
        .program-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .program-card h3 {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0;
        }
        .program-card p {
          font-size: 0.88rem;
          opacity: 0.75;
          margin: 0;
          line-height: 1.5;
          text-align: left;
        }

        .cta-section {
          padding: 3.5rem 0;
        }
        .cta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .cta-card {
          border-radius: 12px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
        }
        .cta-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
        }
        .cta-card p {
          font-size: 0.875rem;
          opacity: 0.7;
          line-height: 1.55;
          margin: 0;
        }
        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary, #3b82f6);
          text-decoration: none;
          transition: gap 0.15s ease;
        }
        .cta-link:hover {
          gap: 0.6rem;
          text-decoration: underline;
        }
        .section-title {
          text-align: center;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .section-subtitle {
          text-align: center;
          opacity: 0.7;
          margin-bottom: 2.5rem;
        }
        .empty-state {
          text-align: center;
          padding: 4rem 1rem;
          opacity: 0.6;
        }
        @media (max-width: 640px) {
          .stat-number { font-size: 1.8rem; }
          .stats-row { gap: 1.25rem; }
        }
      `}</style>

      <main>
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href={withBasePath("/")}
            className="text-sm font-semibold text-slate-600 transition hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-500"
          >
            UltimateHealth
          </Link>
          <Link
            href={withBasePath("/contribute")}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:text-emerald-500"
          >
            Contribute
          </Link>
        </header>

        {/* Hero Section */}
        <section className="hero" aria-labelledby="contributors-heading">
          <div className="container">
            <h1 id="contributors-heading">Our Contributors</h1>
            <p>
              UltimateHealth is built by a passionate community of open-source contributors.
              Every commit, every issue, every pull request makes health knowledge more accessible to the world.
            </p>
            <div className="stats-row" role="region" aria-label="Contribution statistics">
              <div className="stat-item">
                <span className="stat-number" aria-label={`${totalContributors} total contributors`}>
                  {totalContributors.toLocaleString()}
                </span>
                <span className="stat-label">Contributors</span>
              </div>
              <div className="stat-item">
                <span className="stat-number" aria-label={`${totalCommits} total commits`}>
                  {totalCommits.toLocaleString()}
                </span>
                <span className="stat-label">Commits</span>
              </div>
              <div className="stat-item">
                <span className="stat-number" aria-label={`${totalPrograms} programs`}>
                  {totalPrograms}
                </span>
                <span className="stat-label">Programs</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contributors Grid */}
        <section
  className="container"
  aria-labelledby="contributors-grid-heading"
  style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
>
  <h2 id="contributors-grid-heading" className="section-title">
    Meet the Team
  </h2>

  <p className="section-subtitle">
    Sorted by contributions — thank you to every single one of you!
  </p>


  {contributors.length > 0 ? (
    <div
      role="list"
      aria-label="Contributors list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
      }}
    >
              {visibleContributors.map((contributor, index) => (
                <div key={contributor.login ?? `anon-${index}`} role="listitem">
                    <ContributorCard contributor={contributor} />
                </div>
                ))}
            </div>
          ) : (
            <div className="empty-state" role="status" aria-live="polite">
              <p>Unable to load contributors at this time. Please check back later.</p>
            </div>
          )}
        </section>

        {/* Programs Section */}
        <section className="programs-section container" aria-labelledby="programs-heading">
          <h2 id="programs-heading">Open Source Programs</h2>
          <p>We proudly participate in these open-source initiatives</p>
          <div className="feature-grid" role="list" aria-label="Open source programs">
            {PROGRAMS.map((program) => (
              <article key={program.name} className="program-card" role="listitem">
                <div className="program-card-header">
                  <h3>{program.name}</h3>
                  <span
                    className={`program-badge ${program.badge === "Active" ? "core-badge" : "community-badge"}`}
                    aria-label={`Status: ${program.badge}`}
                  >
                    {program.badge}
                  </span>
                </div>
                <p>{program.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Contribution Guidelines & Community Sections */}
        <section className="cta-section container" aria-labelledby="get-involved-heading">
          <h2 id="get-involved-heading" className="section-title">Get Involved</h2>
          <p className="section-subtitle">
            Whether you&apos;re a seasoned developer or just starting out, there&apos;s a place for you here.
          </p>
          <div className="cta-grid">
            {/* Contribution Guidelines */}
            <div className="cta-card" role="region" aria-labelledby="guidelines-heading">
              <h3 id="guidelines-heading">How to Contribute Further?</h3>
              <p>
                New to open source or looking to contribute? Our guidelines walk you through everything
                from setting up your environment to submitting your first pull request.
                We have plenty of beginner-friendly issues labeled{" "}
                <strong>good first issue</strong> waiting for you!
              </p>
              <a
                href="https://github.com/SB2318/UltimateHealth/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-link"
                aria-label="Read the contribution guidelines on GitHub (opens in new tab)"
              >
                See Guidelines Page →
              </a>
              <a
                href="https://github.com/SB2318/UltimateHealth/issues?q=is%3Aopen+label%3A%22good+first+issue%22"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-link"
                aria-label="Browse beginner-friendly issues on GitHub (opens in new tab)"
              >
                Browse Beginner-Friendly Issues →
              </a>
            </div>

            {/* Community Engagement */}
            <div className="cta-card" role="region" aria-labelledby="community-heading">
              <h3 id="community-heading">Want to Start a Discussion? ❤️</h3>
              <p>
                Have a question, feature idea, or want to report a bug? Open an issue on GitHub.
                We appreciate every contribution — big or small — and our maintainers actively
                review and respond to community input.
              </p>
              <a
                href="https://github.com/SB2318/UltimateHealth/issues/new/choose"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-link"
                aria-label="Create a new issue on GitHub (opens in new tab)"
              >
                Create Issue on GitHub →
              </a>
              <p style={{ marginTop: "0.25rem", fontSize: "0.82rem" }}>
                Appreciate your contribution ❤️
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}