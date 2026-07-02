import Head from 'next/head'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
  <title>Privacy Policy | Hospice Audit Agent</title>
  <meta name="description" content="Privacy Policy for Hospice Audit Agent" />
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
        <h1 className="text-3xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: February 12, 2026</p>

        <div className="prose prose-gray max-w-none">
          <p className="text-sm text-gray-600">
            <strong>Compassionate AI Care Solutions – Hospice Advisor</strong>
          </p>

          <h2>1. Commitment to Privacy and Data Stewardship</h2>
          <p>
            Compassionate AI Care Solutions is committed to responsible data governance consistent with healthcare
            industry expectations and federal privacy standards. We design our systems to minimize data collection and
            reduce privacy risk exposure.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>A. Personal Information</h3>
          <p>The Platform does not require account registration and does not intentionally collect:</p>
          <ul>
            <li>Names</li>
            <li>Email addresses</li>
            <li>Contact information</li>
            <li>Marketing data</li>
            <li>Subscription data</li>
          </ul>

          <h3>B. Healthcare Information</h3>
          <p>
            Users may input healthcare-related information into the Platform for analytical purposes. However:
          </p>
          <ul>
            <li>No PHI is stored.</li>
            <li>No patient data is retained in databases.</li>
            <li>No persistent health records are created.</li>
            <li>No long-term storage of identifiable information occurs.</li>
          </ul>
          <p>
            All inputs are processed on a session-based basis only. Users are responsible for ensuring that their use
            complies with HIPAA, HITECH, and applicable state privacy laws.
          </p>

          <h3>C. Technical and Log Data</h3>
          <p>Standard hosting infrastructure may collect limited technical data such as:</p>
          <ul>
            <li>IP addresses</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Access timestamps</li>
          </ul>
          <p>This information is used solely for security monitoring and operational integrity.</p>

          <h2>3. Data Sharing and Disclosure</h2>
          <p>
            Because personal and patient information is not collected or stored, Compassionate AI Care Solutions does
            not sell, rent, trade, or disclose personal health data. We may disclose information if required by lawful
            governmental request or legal obligation.
          </p>

          <h2>4. Security Safeguards</h2>
          <p>
            Reasonable administrative, technical, and organizational safeguards are implemented to protect system
            integrity. However, no electronic system can be guaranteed to be completely secure.
          </p>

          <h2>5. Regulatory Evolution</h2>
          <p>
            If the Platform evolves to include persistent data storage, account-based access, subscription services,
            integration with electronic health record systems, or Business Associate Agreements, this Privacy Policy will
            be updated to reflect applicable legal requirements and regulatory standards.
          </p>

          <h2>6. Children’s Privacy</h2>
          <p>The Platform is not intended for individuals under the age of 18.</p>
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
