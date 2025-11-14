import Head from 'next/head'
import Image from 'next/image'
import ChatWidget from '../components/ChatWidget'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Compassionate Care Advisor</title>
        <meta name="description" content="Compassionate Care Advisor — ethical AI to reduce hospice fraud and predict eligibility" />
      </Head>

      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image src="/logo.svg" alt="Compassionate Care Advisor logo" width={40} height={40} className="object-contain" />
            </div>
            <h1 className="text-xl font-semibold">Compassionate Care Advisor</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <a href="#home" className="text-gray-700 hover:text-indigo-600 transition-colors">Home</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#benefits" className="text-gray-700 hover:text-indigo-600 transition-colors">Benefits</a>
            <a href="#eligibility-criteria" className="text-gray-700 hover:text-indigo-600 transition-colors">Eligibility Criteria</a>
            <a href="#clinical-tools" className="text-gray-700 hover:text-indigo-600 transition-colors">Clinical Tools</a>
            <a href="#regulatory-framework" className="text-gray-700 hover:text-indigo-600 transition-colors">Regulatory Framework</a>
            <a href="#resources" className="text-gray-700 hover:text-indigo-600 transition-colors">Resources</a>
          </nav>
          <button className="md:hidden text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <section id="home" className="py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI That Protects Patients and Strengthens Hospice Integrity
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Empowering hospices with intelligent auditing and predictive analytics — ensuring every dollar supports the right patient, at the right time, for the right reasons.
            </p>
          </div>
        </section>

        {/* Interactive Chat Section */}
        <section className="py-20 bg-indigo-50 -mx-6 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Try the Compassionate Care Advisor</h2>
              <p className="text-lg text-gray-600">Ask questions about hospice eligibility, fraud detection, compliance, or any aspect of our AI solution</p>
            </div>
            
            {/* Embedded Chat Interface */}
            <div className="bg-white rounded-lg shadow-lg border max-w-2xl mx-auto">
              <div className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded overflow-hidden flex items-center justify-center">
                    <Image src="/logo.svg" alt="Compassionate Care Advisor logo" width={40} height={40} className="object-contain" />
                  </div>
                  <div>
                    <div className="font-semibold">Compassionate Care Advisor</div>
                    <div className="text-sm opacity-90">Ask about fraud reduction & eligibility</div>
                  </div>
                </div>
              </div>
              <ChatWidget embedded={true} />
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-16 bg-red-50 -mx-6 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Problem</h2>
            <p className="text-lg text-gray-700 mb-8">
              Hospice care was founded on compassion, but across the U.S. it faces a crisis of integrity:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Exponential Growth Issues</h3>
                    <p className="text-gray-600">Exponential growth in hospice providers with flat patient numbers</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Rising Medicare Spending</h3>
                    <p className="text-gray-600">Medicare spending rose from $20.5B in 2019 to $25B in 2023</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Inappropriate Admissions</h3>
                    <p className="text-gray-600">Live discharge rates increased to 18.2% in 2023, signaling inappropriate admissions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fraud & Billing Abuse</h3>
                    <p className="text-gray-600">Over $1.2B in non-hospice spending among hospice-enrolled patients, rising rates of fraud</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <p className="text-lg font-semibold text-gray-900">
                Traditional auditing methods cannot keep pace with these issues — the system demands continuous, intelligent oversight.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Solution: AI-Driven Oversight</h2>
            <p className="text-xl text-gray-600">The Hospice AI Advisor leverages machine learning to detect fraud, improve compliance, and ensure ethical hospice admissions.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Continuous Monitoring</h3>
              <p className="text-gray-600">Tracks claims in real-time to identify anomalies</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Automated Compliance</h3>
              <p className="text-gray-600">Cross-checks hospice claims with CMS criteria instantly</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Predictive Eligibility</h3>
              <p className="text-gray-600">Uses patient data to forecast when hospice care will be appropriate</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fraud Detection</h3>
              <p className="text-gray-600">Flags unusual billing or discharge patterns</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Insightful Reporting</h3>
              <p className="text-gray-600">Generates reports that improve CMS oversight and provider trust</p>
            </div>
          </div>
        </section>

        {/* How It Works Detailed Section */}
        <section id="how-it-works" className="py-20 bg-gray-50 -mx-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-lg text-gray-600">Four seamless steps to transform hospice oversight</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center bg-white p-6 rounded-lg shadow">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-3">Integrate</h3>
                <p className="text-gray-600">Connect seamlessly with hospice EHR and billing systems</p>
              </div>
              
              <div className="text-center bg-white p-6 rounded-lg shadow">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-3">Analyze</h3>
                <p className="text-gray-600">AI reviews documentation, diagnoses, and utilization trends</p>
              </div>
              
              <div className="text-center bg-white p-6 rounded-lg shadow">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-3">Alert</h3>
                <p className="text-gray-600">Identifies fraud signals or early eligibility indicators</p>
              </div>
              
              <div className="text-center bg-white p-6 rounded-lg shadow">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="text-xl font-semibold mb-3">Report</h3>
                <p className="text-gray-600">Produces actionable data dashboards for decision-makers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Measurable Benefits</h2>
            <p className="text-lg text-gray-600">Proven improvements for hospices, CMS, and patients</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-blue-50 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">85%</h3>
              <h4 className="text-lg font-semibold mb-3">Reduction in Inappropriate Admissions</h4>
              <p className="text-gray-600">AI-powered eligibility screening ensures only appropriate patients are admitted to hospice care</p>
            </div>
            
            <div className="text-center p-8 bg-green-50 rounded-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-2">$2.3M</h3>
              <h4 className="text-lg font-semibold mb-3">Average Annual Savings</h4>
              <p className="text-gray-600">Per healthcare system through improved compliance and reduced audit penalties</p>
            </div>
            
            <div className="text-center p-8 bg-purple-50 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">92%</h3>
              <h4 className="text-lg font-semibold mb-3">Fraud Detection Accuracy</h4>
              <p className="text-gray-600">Industry-leading precision in identifying billing irregularities and documentation fraud</p>
            </div>
          </div>
        </section>

        {/* AI in Action Section */}
        <section id="ai-in-action" className="py-20 bg-indigo-50 -mx-6 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AI in Action</h2>
              <p className="text-lg text-gray-600">Real examples of fraud detection and compliance prediction</p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-red-600">🚨 Fraud Detection Alert</h3>
                <div className="bg-red-50 p-4 rounded border-l-4 border-red-400">
                  <p className="font-semibold">Pattern Detected: Unusual Discharge Timing</p>
                  <p className="text-sm text-gray-600 mt-2">Provider XYZ shows 47% live discharge rate vs. industry average of 18.2%. AI flagged 23 cases with similar patterns suggesting potential inappropriate admissions.</p>
                  <div className="mt-3 text-sm">
                    <strong>Recommended Action:</strong> Immediate review of admission criteria and clinical documentation for flagged cases.
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-green-600">✅ Compliance Prediction</h3>
                <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
                  <p className="font-semibold">Early Eligibility Indicator</p>
                  <p className="text-sm text-gray-600 mt-2">Patient Jane D. (DOB: XX/XX/XXXX) shows prognostic indicators suggesting 6-month life expectancy. Current treatment trajectory aligns with hospice appropriateness criteria.</p>
                  <div className="mt-3 text-sm">
                    <strong>Recommended Action:</strong> Clinical team consultation for potential hospice referral discussion.
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">📊 Documentation Analysis</h3>
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                  <p className="font-semibold">Missing Documentation Alert</p>
                  <p className="text-sm text-gray-600 mt-2">Claims submitted for Patient ID #12345 missing required physician certification. CMS audit risk increased by 34% without proper documentation.</p>
                  <div className="mt-3 text-sm">
                    <strong>Recommended Action:</strong> Obtain missing physician signatures before next billing cycle.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Compassionate Solutions</h2>
            <p className="text-xl text-gray-700 mb-8">
              Founded on the principle that technology should enhance, not replace, the human element in healthcare. 
              Our mission is to use AI to create ethical and efficient hospice care — reducing fraud while ensuring 
              patients who need hospice get the right support at the right time.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Ethical AI</h3>
                <p className="text-gray-600">Built with fairness, transparency, and clinical oversight as core principles</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Patient-Centered</h3>
                <p className="text-gray-600">Every feature designed to improve patient care and family support</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Compliance First</h3>
                <p className="text-gray-600">Helping providers meet CMS requirements while reducing administrative burden</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners & Compliance Section */}
        <section id="partners" className="py-20 bg-gray-50 -mx-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Partners & Compliance</h2>
              <p className="text-lg text-gray-600">Aligned with industry standards and regulatory requirements</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">CMS Alignment</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold">Medicare Guidelines Compliance</h4>
                      <p className="text-gray-600">Built on current CMS hospice eligibility criteria and billing requirements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold">Quality Reporting Integration</h4>
                      <p className="text-gray-600">Supports CAHPS and HIS quality measure reporting</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold">Audit Preparation Support</h4>
                      <p className="text-gray-600">Automated documentation review for CMS compliance audits</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6">Security & Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold">HIPAA Compliant</h4>
                      <p className="text-gray-600">End-to-end encryption and secure data handling protocols</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold">SOC 2 Type II Certified</h4>
                      <p className="text-gray-600">Rigorous security controls and annual compliance audits</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold">Zero Data Retention</h4>
                      <p className="text-gray-600">Patient data processed and purged according to retention policies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="p-10 bg-white rounded-2xl shadow-xl border border-indigo-100">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">Patient Privacy Commitment</h3>
                <p className="text-lg text-gray-700 mb-4 text-center">At Compassionate Care Advisor, protecting patient privacy is our highest priority. The system does not store, retain, or share any patient information. All data provided during an assessment is used solely for determining hospice eligibility based on established clinical criteria and decision trees.</p>
                <p className="text-lg text-gray-700 mb-4 text-center">To maintain confidentiality and comply with HIPAA standards, please ensure that any information entered is de-identified — meaning it should not include names, dates of birth, addresses, or any other personally identifiable information.</p>
                <p className="text-lg text-gray-700 text-center">The Compassionate Care Advisor processes only the minimum information necessary to evaluate hospice criteria and immediately discards all data after the assessment is complete.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hospice Eligibility Criteria Section */}
        <section id="eligibility-criteria" className="py-20 bg-blue-50 -mx-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Hospice Eligibility Criteria</h2>
              <p className="text-lg text-gray-600">CMS-compliant assessment guidelines built into our AI system</p>
            </div>

            {/* Core Requirements */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Core Eligibility Requirements</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">6-Month Prognosis</h4>
                  <p className="text-sm text-gray-600">Terminal illness with 6-month life expectancy if disease runs normal course</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Physician Certification</h4>
                  <p className="text-sm text-gray-600">Attending physician + hospice medical director certification required</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Patient Election</h4>
                  <p className="text-sm text-gray-600">Informed consent and election of hospice care by patient/family</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Comfort Care Focus</h4>
                  <p className="text-sm text-gray-600">Emphasis on comfort care versus curative treatment approaches</p>
                </div>
              </div>
            </div>

            {/* Functional Decline Indicators */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Functional Decline Indicators</h3>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance Scales</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Karnofsky ≤50%</li>
                      <li>• ECOG ≥3</li>
                      <li>• Dependence in 3+ ADLs</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Physical Decline</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Recurrent falls</li>
                      <li>• Decreased ambulation</li>
                      <li>• Progressive weakness</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Nutritional Status</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Weight loss &gt;10% in 6 months</li>
                      <li>• Albumin &lt;2.5 g/dL</li>
                      <li>• Declining oral intake</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Disease-Specific Criteria */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Disease-Specific Eligibility Criteria</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Cancer */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🎗️</span>
                    </div>
                    <h4 className="text-lg font-semibold">Cancer</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Metastatic or locally advanced disease</li>
                    <li>• Karnofsky ≤50% or ECOG ≥3</li>
                    <li>• Treatment failure or refusal</li>
                    <li>• Declining performance status</li>
                  </ul>
                </div>

                {/* Cardiac */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">❤️</span>
                    </div>
                    <h4 className="text-lg font-semibold">Cardiac</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• NYHA Class IV heart failure</li>
                    <li>• Ejection fraction ≤20%</li>
                    <li>• 3+ hospitalizations in 12 months</li>
                    <li>• Optimal therapy maximized</li>
                  </ul>
                </div>

                {/* Pulmonary */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🫁</span>
                    </div>
                    <h4 className="text-lg font-semibold">Pulmonary</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• FEV1 &lt;30% predicted</li>
                    <li>• O2 saturation ≤88% on O2</li>
                    <li>• Cor pulmonale</li>
                    <li>• Recurrent pneumonia</li>
                  </ul>
                </div>

                {/* Neurological */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🧠</span>
                    </div>
                    <h4 className="text-lg font-semibold">Neurological</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Advanced dementia (FAST 7C)</li>
                    <li>• Unable to ambulate/dress/bathe</li>
                    <li>• Minimal verbal communication</li>
                    <li>• Recurrent infections</li>
                  </ul>
                </div>

                {/* Renal */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🫘</span>
                    </div>
                    <h4 className="text-lg font-semibold">Renal</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• CrCl &lt;10 mL/min</li>
                    <li>• Serum creatinine &gt;8.0 mg/dL</li>
                    <li>• Dialysis refusal/discontinuation</li>
                    <li>• Uremia, hyperkalemia</li>
                  </ul>
                </div>

                {/* Liver */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🫀</span>
                    </div>
                    <h4 className="text-lg font-semibold">Liver</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Cirrhosis with complications</li>
                    <li>• Refractory ascites</li>
                    <li>• Spontaneous bacterial peritonitis</li>
                    <li>• Hepatorenal syndrome</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Documentation Requirements */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Documentation Requirements</h3>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Required Documentation</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">Initial physician certification within 15 days</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">Face-to-face encounter within 30 days (recertification)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">Clinical notes supporting terminal prognosis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">Care plan focusing on comfort measures</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">Patient election statement with informed consent</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Red Flags (Inappropriate Admissions)</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">Stable chronic conditions without decline</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">Active curative treatment ongoing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">Functional status too high (Karnofsky &gt;50%)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">Admission for social/convenience reasons</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">Lack of terminal diagnosis documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assessment Format */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">AI Assessment Response Format</h3>
              <p className="text-indigo-100 mb-6">Our AI provides structured, clinical assessments using this format:</p>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">1. Eligibility Determination</h4>
                  <p className="text-sm text-indigo-100">ELIGIBLE / NOT ELIGIBLE / NEEDS DOCUMENTATION</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">2. Supporting Criteria</h4>
                  <p className="text-sm text-indigo-100">Specific indicators met or missing</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">3. Missing Elements</h4>
                  <p className="text-sm text-indigo-100">Required documentation gaps</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">4. Regulatory Compliance</h4>
                  <p className="text-sm text-indigo-100">CMS requirement status</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Clinical Assessment Tools */}
        <section id="clinical-tools" className="py-20 bg-green-50 -mx-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Clinical Assessment Tools</h2>
              <p className="text-lg text-gray-600">Specialized scoring systems and frameworks integrated into our AI analysis</p>
            </div>

            {/* Performance Assessment Tools */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Performance & Functional Assessment</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📊</span>
                    </div>
                    <h4 className="text-lg font-semibold">Karnofsky Performance Scale</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong>100-80:</strong> Normal activity, minor symptoms</li>
                    <li><strong>70-50:</strong> Cannot work, considerable assistance</li>
                    <li><strong>40-20:</strong> Disabled, requires special care</li>
                    <li><strong>≤50%:</strong> <span className="text-red-600 font-semibold">Hospice Eligible</span></li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">⚕️</span>
                    </div>
                    <h4 className="text-lg font-semibold">ECOG Performance Status</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong>0:</strong> Fully active, no restrictions</li>
                    <li><strong>1:</strong> Restricted in strenuous activity</li>
                    <li><strong>2:</strong> Ambulatory, up &gt;50% of time</li>
                    <li><strong>≥3:</strong> <span className="text-red-600 font-semibold">Hospice Eligible</span></li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🧠</span>
                    </div>
                    <h4 className="text-lg font-semibold">FAST Scale (Dementia)</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong>Stage 6:</strong> Basic ADL assistance needed</li>
                    <li><strong>Stage 7A:</strong> Limited vocabulary (&lt;6 words)</li>
                    <li><strong>Stage 7C:</strong> <span className="text-red-600 font-semibold">Hospice Eligible</span></li>
                    <li>Cannot walk, sit up, smile, or hold head up</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disease-Specific Assessment Tools */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Disease-Specific Assessment Frameworks</h3>
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Cardiac Assessment (NYHA Classification)</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="font-semibold text-sm">Class I-II</p>
                      <p className="text-xs text-gray-600">Minimal limitations, comfortable at rest</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <p className="font-semibold text-sm">Class III</p>
                      <p className="text-xs text-gray-600">Marked limitation, less than ordinary activity</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <p className="font-semibold text-sm">Class IV</p>
                      <p className="text-xs text-gray-600"><span className="text-red-600 font-semibold">Hospice Eligible:</span> Symptoms at rest</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Pulmonary Assessment (GOLD Staging)</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="font-semibold text-sm">GOLD 1-2</p>
                      <p className="text-xs text-gray-600">FEV1 &gt;50%, mild-moderate limitation</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <p className="font-semibold text-sm">GOLD 3</p>
                      <p className="text-xs text-gray-600">FEV1 30-50%, severe limitation</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <p className="font-semibold text-sm">GOLD 4</p>
                      <p className="text-xs text-gray-600"><span className="text-red-600 font-semibold">Hospice Eligible:</span> FEV1 &lt;30%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Laboratory & Biomarker Indicators */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Laboratory & Biomarker Indicators</h3>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Nutritional Markers</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Albumin:</span>
                        <span className="text-red-600 font-semibold">&lt;2.5 g/dL</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Prealbumin:</span>
                        <span className="text-red-600 font-semibold">&lt;10 mg/dL</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Weight Loss:</span>
                        <span className="text-red-600 font-semibold">&gt;10% in 6 months</span>
                      </li>
                      <li className="flex justify-between">
                        <span>BMI:</span>
                        <span className="text-red-600 font-semibold">&lt;18.5</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Renal Function</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Creatinine:</span>
                        <span className="text-red-600 font-semibold">&gt;8.0 mg/dL</span>
                      </li>
                      <li className="flex justify-between">
                        <span>CrCl:</span>
                        <span className="text-red-600 font-semibold">&lt;10 mL/min</span>
                      </li>
                      <li className="flex justify-between">
                        <span>BUN:</span>
                        <span className="text-red-600 font-semibold">&gt;80 mg/dL</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Urine Output:</span>
                        <span className="text-red-600 font-semibold">&lt;400 mL/day</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Cardiac Markers</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Ejection Fraction:</span>
                        <span className="text-red-600 font-semibold">≤20%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>BNP:</span>
                        <span className="text-red-600 font-semibold">&gt;400 pg/mL</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Troponin:</span>
                        <span className="text-orange-600">Persistently elevated</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sodium:</span>
                        <span className="text-red-600 font-semibold">&lt;130 mEq/L</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Prognostic Indicators */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-6">Advanced Prognostic Indicators</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Surprise Question</h4>
                  <p className="text-sm text-purple-100">"Would I be surprised if this patient died within 6-12 months?"</p>
                  <p className="text-xs text-purple-200 mt-2">Answer "No" = Consider hospice</p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Decline Trajectory</h4>
                  <p className="text-sm text-purple-100">Progressive functional decline over 3-6 months</p>
                  <p className="text-xs text-purple-200 mt-2">Multiple hospitalizations</p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Treatment Response</h4>
                  <p className="text-sm text-purple-100">Diminishing response to optimal therapy</p>
                  <p className="text-xs text-purple-200 mt-2">Side effects outweigh benefits</p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Quality of Life</h4>
                  <p className="text-sm text-purple-100">Significant symptom burden impacting daily life</p>
                  <p className="text-xs text-purple-200 mt-2">Family/patient goals shift to comfort</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Compliance Framework */}
        <section id="regulatory-framework" className="py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Regulatory Compliance Framework</h2>
              <p className="text-lg text-gray-600">CMS guidelines and Medicare requirements integrated into our AI system</p>
            </div>

            {/* Medicare Coverage Criteria */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Medicare Coverage Criteria (42 CFR 418)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Certification Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-semibold text-blue-600">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Initial Certification</p>
                        <p className="text-xs text-gray-600">Attending physician + hospice medical director within 15 days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-semibold text-blue-600">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Recertification</p>
                        <p className="text-xs text-gray-600">Face-to-face encounter within 30 days prior to 3rd benefit period</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-semibold text-blue-600">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Narrative Statement</p>
                        <p className="text-xs text-gray-600">Clinical findings supporting 6-month prognosis</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Benefit Periods</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="font-semibold text-sm">Initial Period</p>
                      <p className="text-xs text-gray-600">90 days - Physician certification required</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="font-semibold text-sm">Subsequent Period</p>
                      <p className="text-xs text-gray-600">90 days - Physician certification required</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p className="font-semibold text-sm">Extended Periods</p>
                      <p className="text-xs text-gray-600">60 days each - Face-to-face + certification required</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Reporting & Compliance */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Quality Reporting & Audit Compliance</h3>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">CAHPS Hospice Survey</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Communication with family</li>
                      <li>• Emotional support provided</li>
                      <li>• Help with pain and symptoms</li>
                      <li>• Training family to care for patient</li>
                      <li>• Rating of hospice care</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">HIS Quality Measures</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Patients treated with opioids who are given bowel regimen</li>
                      <li>• Patients who believe they got right amount of medicine for pain</li>
                      <li>• Patients whose shortness of breath was addressed</li>
                      <li>• Patients treated with appropriate level of care</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Documentation Standards</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Plan of care updates every 15 days</li>
                      <li>• Interdisciplinary team meetings</li>
                      <li>• Medication management records</li>
                      <li>• Family conference documentation</li>
                      <li>• Volunteer contact logs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Fraud Prevention Indicators */}
            <div className="bg-red-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">AI-Powered Fraud Prevention Indicators</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🚩</span>
                    <h4 className="font-semibold text-sm">Length of Stay Anomalies</h4>
                  </div>
                  <p className="text-xs text-gray-600">Unusually long stays without clinical justification</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">⚠️</span>
                    <h4 className="font-semibold text-sm">Live Discharge Patterns</h4>
                  </div>
                  <p className="text-xs text-gray-600">High rates of patients discharged alive after short stays</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📊</span>
                    <h4 className="font-semibold text-sm">Diagnosis Clustering</h4>
                  </div>
                  <p className="text-xs text-gray-600">Overconcentration in specific, profitable diagnoses</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🔍</span>
                    <h4 className="font-semibold text-sm">Documentation Gaps</h4>
                  </div>
                  <p className="text-xs text-gray-600">Missing face-to-face encounters or certifications</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Resources & Insights</h2>
            <p className="text-lg text-gray-600">Latest research and data supporting AI in hospice care</p>
          </div>
          
          {/* Featured Report */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-lg text-white text-center">
              <h3 className="text-2xl font-bold mb-4">📊 Featured Report: Hospice Monitoring Report 2024</h3>
              <p className="text-lg mb-6 opacity-90">
                Comprehensive analysis of hospice care trends, compliance challenges, and opportunities for AI-driven improvements in the healthcare system.
              </p>
              <a 
                href="/resources/Hospice_Monitoring_Report_2024.pdf" 
                target="_blank"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-4 4V4" />
                </svg>
                Download Full Report (PDF)
              </a>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-indigo-500">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">CMS Data Analysis</h3>
                  <p className="text-gray-600 mb-4">
                    Our analysis of 2019-2023 Medicare hospice spending data reveals critical trends in inappropriate utilization and billing patterns.
                  </p>
                  <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1">
                    Read Full Report 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">AI in Healthcare White Paper</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive guide to implementing machine learning for healthcare fraud detection and compliance monitoring.
                  </p>
                  <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1">
                    Download PDF 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Industry Best Practices</h3>
                  <p className="text-gray-600 mb-4">
                    Evidence-based recommendations for hospice providers to improve compliance and patient outcomes through technology.
                  </p>
                  <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1">
                    View Guidelines 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-center mb-6">Additional Resources</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">📈 Market Research</h4>
                <p className="text-sm text-gray-600">Quarterly reports on hospice industry trends and regulatory changes</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">🔬 Technical Documentation</h4>
                <p className="text-sm text-gray-600">API documentation and integration guides for healthcare systems</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
