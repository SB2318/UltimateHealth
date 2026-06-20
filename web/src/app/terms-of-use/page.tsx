import type { Metadata } from "next";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Terms of Use | UltimateHealth",
  description:
    "Read the Terms of Use for UltimateHealth — the rules, content ownership, and medical disclaimer for our platform.",
};

export default function TermsOfUsePage() {
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
            Terms of Use
          </h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto">
            Last updated: June 2026
          </p>
        </div>
      </section>

      {/* Medical Disclaimer Banner */}
      <div className="bg-amber-50 border-y border-amber-200 px-4 py-4">
        <div className="mx-auto max-w-4xl flex items-start gap-3">
          <span className="text-amber-600 text-xl mt-0.5" aria-hidden="true">⚕</span>
          <p className="text-sm leading-6 text-amber-800">
            <strong>Medical Disclaimer:</strong> The content on UltimateHealth is provided
            for informational purposes only and is <strong>not a substitute for professional
            medical advice, diagnosis, or treatment.</strong> Always seek the advice of a
            qualified healthcare provider with any questions you may have regarding a medical
            condition.
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="prose prose-slate max-w-none space-y-10">

          <section aria-labelledby="intro">
            <p className="text-lg leading-8 text-slate-600">
              By accessing or using UltimateHealth (&ldquo;the Platform&rdquo;), you agree to be
              bound by these Terms of Use. If you do not agree, please do not use the Platform.
            </p>
          </section>

          {/* Section 1 */}
          <section aria-labelledby="platform-rules">
            <h2
              id="platform-rules"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              1. Rules for Using the Platform
            </h2>
            <p className="text-slate-600 leading-7 mb-4">
              By using UltimateHealth, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-7">
              <li>Use the Platform only for lawful purposes and in compliance with all applicable laws.</li>
              <li>
                Provide accurate information when creating an account or submitting content,
                and keep your account credentials secure.
              </li>
              <li>
                Not upload, share, or distribute content that is false, misleading,
                harmful, abusive, harassing, defamatory, or otherwise objectionable.
              </li>
              <li>
                Not attempt to gain unauthorised access to any part of the Platform,
                its servers, or related systems.
              </li>
              <li>
                Not use automated tools (bots, scrapers, crawlers) to extract content
                from the Platform without prior written permission.
              </li>
              <li>
                Not impersonate any person, organisation, or healthcare professional.
              </li>
              <li>
                Respect the intellectual property rights of UltimateHealth and other users.
              </li>
            </ul>
            <p className="text-slate-600 leading-7 mt-4">
              We reserve the right to refuse service, suspend, or terminate accounts that
              violate these rules at our sole discretion.
            </p>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="content-ownership">
            <h2
              id="content-ownership"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              2. Content Ownership
            </h2>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Platform Content</h3>
            <p className="text-slate-600 leading-7">
              All content created by UltimateHealth — including articles, graphics, logos,
              user interface elements, and software — is the exclusive property of
              UltimateHealth or its licensors and is protected by copyright and other
              intellectual property laws. You may not reproduce, distribute, or create
              derivative works without our express written consent.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">User-Submitted Content</h3>
            <p className="text-slate-600 leading-7">
              When you contribute content (articles, comments, or other materials) to the
              Platform, you retain ownership of that content. However, by submitting it you
              grant UltimateHealth a worldwide, non-exclusive, royalty-free licence to use,
              display, reproduce, and distribute that content on the Platform and in related
              promotional materials.
            </p>
            <p className="text-slate-600 leading-7 mt-3">
              You represent and warrant that you have the right to grant this licence and
              that your submitted content does not infringe the intellectual property or
              other rights of any third party.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mb-2 mt-4">Open-Source Components</h3>
            <p className="text-slate-600 leading-7">
              Portions of UltimateHealth are open-source and made available under the
              applicable open-source licences. Please refer to the repository for specific
              licence details.
            </p>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="violations">
            <h2
              id="violations"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              3. Consequences of Violating These Terms
            </h2>
            <p className="text-slate-600 leading-7 mb-4">
              Violations of these Terms may result in:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-7">
              <li>
                <strong>Content removal</strong> — any content that breaches these Terms
                may be removed without prior notice.
              </li>
              <li>
                <strong>Account suspension</strong> — temporary or permanent suspension
                of your account, depending on the severity of the violation.
              </li>
              <li>
                <strong>Account termination</strong> — permanent deletion of your account
                and associated data for serious or repeated violations.
              </li>
              <li>
                <strong>Legal action</strong> — we reserve the right to pursue legal
                remedies for violations that cause harm to UltimateHealth, its users,
                or third parties.
              </li>
            </ul>
            <p className="text-slate-600 leading-7 mt-4">
              We will endeavour to notify users of enforcement actions where appropriate,
              but are not obligated to do so in all circumstances.
            </p>
          </section>

          {/* Section 4 — Medical Disclaimer (detailed) */}
          <section aria-labelledby="medical-disclaimer">
            <h2
              id="medical-disclaimer"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              4. Medical Disclaimer
            </h2>
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 space-y-3">
              <p className="text-slate-700 leading-7">
                UltimateHealth provides health and wellness information for general
                educational purposes only. <strong>Nothing on this Platform constitutes
                medical advice, diagnosis, or treatment.</strong>
              </p>
              <p className="text-slate-700 leading-7">
                You should always consult a qualified and licensed healthcare professional
                before making any decisions related to your health, starting or stopping
                any medication, or changing any treatment plan. Reliance on any information
                provided by UltimateHealth is solely at your own risk.
              </p>
              <p className="text-slate-700 leading-7">
                UltimateHealth does not recommend or endorse any specific tests, products,
                procedures, or other information that may appear on the Platform.
              </p>
              <p className="text-slate-700 leading-7">
                <strong>In the event of a medical emergency, call your local emergency
                services immediately.</strong>
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section aria-labelledby="liability">
            <h2
              id="liability"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              5. Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-7">
              To the fullest extent permitted by applicable law, UltimateHealth and its
              contributors shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of your use of, or inability
              to use, the Platform or its content. The Platform is provided &ldquo;as is&rdquo; without
              warranties of any kind, express or implied.
            </p>
          </section>

          {/* Section 6 */}
          <section aria-labelledby="changes">
            <h2
              id="changes"
              className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2"
            >
              6. Changes to These Terms
            </h2>
            <p className="text-slate-600 leading-7">
              We may update these Terms of Use from time to time. We will notify you of
              material changes by updating the &ldquo;Last updated&rdquo; date at the top of this page.
              Continued use of UltimateHealth after any changes constitutes your acceptance
              of the revised Terms.
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
              If you have questions about these Terms, please contact us at{" "}
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
            href={withBasePath("/privacy-policy")}
            className="underline hover:text-slate-700 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </footer>
    </main>
  );
}
