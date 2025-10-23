import Head from 'next/head'
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
            <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">CA</div>
            <h1 className="text-xl font-semibold">Compassionate Care Advisor</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm">
            <a href="#home" className="text-gray-700 hover:text-indigo-600 transition-colors">Home</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#benefits" className="text-gray-700 hover:text-indigo-600 transition-colors">Benefits</a>
            <a href="#ai-in-action" className="text-gray-700 hover:text-indigo-600 transition-colors">AI in Action</a>
            <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors">About Us</a>
            <a href="#partners" className="text-gray-700 hover:text-indigo-600 transition-colors">Partners & Compliance</a>
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
                  <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center font-semibold">CA</div>
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
