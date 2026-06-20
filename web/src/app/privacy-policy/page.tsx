import type { Metadata } from "next";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Privacy Policy | UltimateHealth",
  description:
    "Learn how UltimateHealth collects, stores, and uses your personal and health-related data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ecfdf5_55%,#f8fafc_100%)] text-slate-950">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href={withBasePath("/")}
          className="font-extrabold text-lg"
          style={{
            background: "linear-gradient(135deg,#667eea,#764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          UltimateHealth
        </Link>
        <Link
          href={withBasePath("/")}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#667eea] to-[#764ba2] py-14 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto">
            Last updated: June 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="prose prose-slate max-w-none space-y-10">

          <section aria-labelledby="intro">
            <p className="text-lg leading-8 text-slate-600">
              UltimateHealth (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your
              privacy. This Privacy Policy explains what information we collect, how we use it,
              and the choices you have regarding your data when you use our platform.
            </p>
          </section>

          {/* Section 1 */}
          <section aria-labelledby="information-collected">
            <h2
              id="information-collected"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              1. Information We Collect
            </h2>
            <p className="text-slate-600 leading-7 mb-4">
              We collect information you provide directly to us and information generated
              as you use our services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-7">
              <li>
                <strong>Name and contact details</strong> — including your name and email
                address when you create an account or contact us.
              </li>
              <li>
                <strong>Account information</strong> — username, password (stored in
                hashed form), profile preferences, and account settings.
              </li>
              <li>
                <strong>Health-related data</strong> — health goals, conditions, or
                interests you voluntarily share to personalise your experience. We do
                not collect clinical or diagnostic health records unless you explicitly
                submit them.
              </li>
              <li>
                <strong>Usage data</strong> — pages visited, articles read, search
                queries, interaction timestamps, and device/browser information collected
                automatically through standard web analytics.
              </li>
              <li>
                <strong>Communications</strong> — messages or feedback you send us
                directly via email or in-platform forms.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="how-we-use">
            <h2
              id="how-we-use"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              2. How We Store and Use Your Data
            </h2>
            <p className="text-slate-600 leading-7 mb-4">
              We use the information we collect to operate, maintain, and improve
              UltimateHealth:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-7">
              <li>Provide, personalise, and improve our health content and features.</li>
              <li>Create and manage your account and authenticate your identity.</li>
              <li>Send transactional emails (account confirmations, password resets).</li>
              <li>
                Analyse aggregated, anonymised usage patterns to improve platform
                performance and content quality.
              </li>
              <li>
                Respond to your enquiries, bug reports, or feedback submissions.
              </li>
              <li>Comply with legal obligations where applicable.</li>
            </ul>
            <p className="text-slate-600 leading-7 mt-4">
              Your data is stored on secure servers. We apply industry-standard security
              measures including encryption in transit (TLS) and at rest. Access to
              personal data is restricted to authorised personnel only.
            </p>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="third-party">
            <h2
              id="third-party"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              3. Third-Party Sharing
            </h2>
            <p className="text-slate-600 leading-7 mb-4">
              We do <strong>not</strong> sell, rent, or trade your personal information.
              We may share data only in the following limited circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-7">
              <li>
                <strong>Service providers</strong> — trusted third-party vendors (such
                as hosting, analytics, and email providers) who process data on our
                behalf under strict data-processing agreements.
              </li>
              <li>
                <strong>Legal compliance</strong> — when required by law, court order,
                or governmental authority.
              </li>
              <li>
                <strong>Protection of rights</strong> — to protect the safety, rights,
                or property of UltimateHealth, its users, or the public.
              </li>
              <li>
                <strong>Business transfers</strong> — in connection with a merger,
                acquisition, or sale of assets, subject to standard confidentiality
                protections.
              </li>
            </ul>
            <p className="text-slate-600 leading-7 mt-4">
              Any third party receiving your data is contractually required to handle
              it in accordance with this policy and applicable privacy laws.
            </p>
          </section>

          {/* Section 4 */}
          <section aria-labelledby="data-deletion">
            <h2
              id="data-deletion"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              4. User Data Deletion Requests
            </h2>
            <p className="text-slate-600 leading-7 mb-4">
              You have the right to request the deletion of your personal data at any
              time. To submit a deletion request:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-7">
              <li>
                <strong>Via the app</strong> — navigate to your account settings and
                use the &ldquo;Delete Account&rdquo; option to remove your data immediately.
              </li>
              <li>
                <strong>Via email</strong> — send a request to{" "}
                <a
                  href="mailto:ultimate.health25@gmail.com"
                  className="text-emerald-700 underline hover:text-emerald-900 transition-colors"
                >
                  ultimate.health25@gmail.com
                </a>{" "}
                with the subject line &ldquo;Data Deletion Request&rdquo; and your registered
                email address.
              </li>
            </ul>
            <p className="text-slate-600 leading-7 mt-4">
              We will process your request within 30 days and confirm once your data
              has been removed. Some data may be retained for a limited period where
              required by law or for legitimate business purposes (e.g., fraud
              prevention).
            </p>
          </section>

          {/* Section 5 */}
          <section aria-labelledby="cookies">
            <h2
              id="cookies"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              5. Cookies
            </h2>
            <p className="text-slate-600 leading-7">
              We use cookies and similar technologies to maintain session state, remember
              your preferences, and collect anonymous analytics. You can control cookie
              behaviour through your browser settings. Disabling cookies may affect some
              platform functionality.
            </p>
          </section>

          {/* Section 6 */}
          <section aria-labelledby="changes">
            <h2
              id="changes"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              6. Changes to This Policy
            </h2>
            <p className="text-slate-600 leading-7">
              We may update this Privacy Policy from time to time. We will notify you of
              material changes by updating the &ldquo;Last updated&rdquo; date at the top of this
              page. Continued use of UltimateHealth after any changes constitutes your
              acceptance of the revised policy.
            </p>
          </section>

          {/* Contact */}
          <section aria-labelledby="contact" className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
            <h2
              id="contact"
              className="text-xl font-bold text-slate-900 mb-2"
            >
              Questions?
            </h2>
            <p className="text-slate-600 leading-7">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a
                href="mailto:ultimate.health25@gmail.com"
                className="text-emerald-700 underline hover:text-emerald-900 transition-colors"
              >
                ultimate.health25@gmail.com
              </a>
              .
            </p>
          </section>

        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        <p>
          &copy; 2026 UltimateHealth.{" "}
          <Link
            href={withBasePath("/terms-of-use")}
            className="underline hover:text-slate-700 transition-colors"
          >
            Terms of Use
          </Link>
        </p>
      </footer>
    </main>
  );
}
