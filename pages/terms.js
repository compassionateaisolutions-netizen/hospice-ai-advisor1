import Head from 'next/head'
import Link from 'next/link'

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
  <title>Terms of Use | Hospice Audit Agent</title>
  <meta name="description" content="Terms of Use for Hospice Audit Agent" />
      </Head>

      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-semibold">Hospice Audit Agent</div>
          <Link href="/" className="text-sm text-gray-700 hover:text-indigo-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-3">Terms of Use</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: February 12, 2026</p>

        <div className="prose prose-gray max-w-none">
          <h2>1. Purpose and Intended Use</h2>
          <p>
            Compassionate AI Care Solutions – Hospice Advisor (&quot;Platform&quot;) is a decision-support and informational
            technology platform designed to assist hospice organizations, administrators, policymakers, and healthcare
            stakeholders in evaluating operational workflows, documentation completeness, and regulatory alignment
            considerations within Medicare and Medicaid frameworks.
          </p>
          <p>
            The Platform is not a clinical decision-making system and is not intended to replace professional medical
            judgment, legal counsel, compliance officers, or governmental regulatory determinations.
          </p>

          <h2>2. Regulatory Status and Government Affiliation</h2>
          <p>The Platform:</p>
          <ul>
            <li>
              Is not affiliated with, endorsed by, or operated by the Centers for Medicare &amp; Medicaid Services (CMS),
              the U.S. Department of Health and Human Services (HHS), the Office of Inspector General (OIG), or any
              governmental entity.
            </li>
            <li>Does not issue official regulatory interpretations.</li>
            <li>Does not certify compliance with CMS Conditions of Participation or federal law.</li>
          </ul>
          <p>
            All regulatory interpretations remain the responsibility of the user and their qualified legal and compliance
            professionals.
          </p>

          <h2>3. No Medical or Legal Advice</h2>
          <p>Nothing within the Platform constitutes:</p>
          <ul>
            <li>Medical advice</li>
            <li>Legal advice</li>
            <li>Compliance certification</li>
            <li>Eligibility determination authority</li>
          </ul>
          <p>
            Hospice eligibility determinations must be made by licensed physicians in accordance with applicable law.
            Users remain solely responsible for clinical, operational, and reimbursement decisions.
          </p>

          <h2>4. AI Transparency and Human Oversight</h2>
          <p>
            The Platform utilizes structured analytical logic and automated decision-support processes. Outputs are
            generated based on programmed rules and user-provided inputs.
          </p>
          <p>Users acknowledge:</p>
          <ul>
            <li>Outputs are advisory in nature.</li>
            <li>Human oversight is required for all operational use.</li>
            <li>Automated outputs may contain limitations or errors.</li>
            <li>Final decisions must be independently validated.</li>
          </ul>

          <h2>5. Data Handling and HIPAA Position</h2>
          <p>The Platform does not intentionally store Protected Health Information (PHI).</p>
          <p>
            Any healthcare-related information entered is processed on a temporary session basis and is not retained in
            persistent databases.
          </p>
          <p>
            Compassionate AI Care Solutions does not currently function as a HIPAA Business Associate and does not
            execute Business Associate Agreements at this stage of development.
          </p>
          <p>Users are solely responsible for ensuring compliance with:</p>
          <ul>
            <li>HIPAA</li>
            <li>HITECH</li>
            <li>CMS regulations</li>
            <li>State privacy laws</li>
            <li>Applicable federal healthcare statutes</li>
          </ul>

          <h2>6. Intellectual Property Rights</h2>
          <p>
            All proprietary methodologies, system architecture, analytical frameworks, written content, branding
            elements, and platform logic are the exclusive intellectual property of Compassionate AI Care Solutions.
            Unauthorized reproduction, reverse engineering, distribution, or derivative use is prohibited.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>The Platform is provided “as is” and “as available.”</p>
          <p>
            Compassionate AI Care Solutions disclaims all warranties, including but not limited to accuracy or
            completeness, regulatory sufficiency, clinical applicability, continuous availability, and fitness for a
            particular purpose.
          </p>
          <p>
            No guarantee is made that use of the Platform will result in compliance approval, reimbursement success, or
            cost reduction.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Compassionate AI Care Solutions shall not be liable for clinical
            decisions, regulatory enforcement actions, reimbursement denials, operational disruptions, financial losses,
            or indirect or consequential damages. Use of the Platform is undertaken at the sole risk of the user.
          </p>

          <h2>9. Modifications</h2>
          <p>
            These Terms may be updated periodically. Continued use constitutes acceptance of revised Terms.
          </p>

          <h2>10. Governing Law and Venue</h2>
          <p>
            These Terms shall be governed by the laws of the State of Texas. Any disputes shall be resolved in courts
            located within Texas unless otherwise required by federal law.
          </p>
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-4xl mx-auto px-6 py-6 text-xs text-gray-500">
          © {new Date().getFullYear()} Hospice Audit Agent
        </div>
      </footer>
    </div>
  )
}
