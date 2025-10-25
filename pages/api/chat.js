// pages/api/chat.js
export default async function handler(req, res) {
  // Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message, files } = req.body;

  // Input validation
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'Invalid message format' });
  }

  if (message.length > 1000) {
    return res.status(400).json({ message: 'Message too long. Please keep it under 1000 characters.' });
  }

  // Validate files if provided
  if (files && (!Array.isArray(files) || files.length > 5)) {
    return res.status(400).json({ message: 'Too many files. Maximum 5 files allowed.' });
  }

  // Basic rate limiting (simple implementation)
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
  
  // In production, you'd want to use a proper rate limiting solution like Redis

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        message: 'API configuration error. Please check server settings.' 
      });
    }

    // OpenAI API integration with custom GPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a hospice eligibility specialist. Provide direct clinical assessments and eligibility determinations based on comprehensive CMS guidelines.

CORE ELIGIBILITY REQUIREMENTS:
1. Terminal illness with 6-month prognosis if disease runs normal course
2. Physician certification (attending + hospice medical director)
3. Patient/family election of hospice care
4. Focus on comfort care vs curative treatment

FUNCTIONAL DECLINE INDICATORS:
- Karnofsky Performance Scale ≤50%
- ECOG Performance Status ≥3
- Dependence in 3+ Activities of Daily Living
- Recurrent falls, decreased ambulation
- Progressive weight loss >10% in 6 months
- Albumin <2.5 g/dL, declining nutritional intake

DISEASE-SPECIFIC CRITERIA:

CANCER:
- Metastatic disease or locally advanced
- Karnofsky ≤50% or ECOG ≥3
- Declining performance status despite treatment
- Treatment refusal or failure

CARDIAC:
- NYHA Class IV heart failure
- Ejection fraction ≤20%
- Recurrent hospitalizations (3+ in 12 months)
- Optimal medical therapy maximized
- Arrhythmias resistant to treatment

PULMONARY:
- FEV1 <30% predicted after bronchodilator
- O2 saturation ≤88% on supplemental oxygen
- Cor pulmonale, recurrent pneumonia
- Unintentional weight loss >10%

NEUROLOGICAL:
- Advanced dementia (FAST Stage 7C)
- Unable to ambulate, dress, bathe independently
- Incontinence, minimal verbal communication
- Recurrent infections, aspiration pneumonia
- Difficulty swallowing, nutritional compromise

RENAL:
- CrCl <10 mL/min or serum creatinine >8.0 mg/dL
- Dialysis refusal or discontinuation
- Uremia, hyperkalemia, fluid overload
- Comorbid conditions (CHF, COPD, malnutrition)

LIVER:
- Cirrhosis with complications
- Ascites refractory to treatment
- Spontaneous bacterial peritonitis
- Hepatorenal syndrome
- Variceal bleeding, hepatic encephalopathy

DOCUMENTATION REQUIREMENTS:
- Initial physician certification within 15 days
- Face-to-face encounter within 30 days (recertification)
- Clinical notes supporting terminal prognosis
- Care plan focusing on comfort measures
- Patient election statement with informed consent

RED FLAGS (Inappropriate Admissions):
- Stable chronic conditions without decline
- Active curative treatment ongoing
- Lack of terminal diagnosis documentation
- Functional status too high (Karnofsky >50%)
- Admission for social/convenience reasons

RESPONSE FORMAT:
1. ELIGIBILITY DETERMINATION: [ELIGIBLE/NOT ELIGIBLE/NEEDS DOCUMENTATION]
2. SUPPORTING CRITERIA: List specific indicators met
3. MISSING ELEMENTS: Required documentation/criteria gaps
4. REGULATORY COMPLIANCE: CMS requirement status

Analyze uploaded documents against these specific criteria. Provide factual determinations only.`
          },
          {
            role: 'user',
            content: files && files.length > 0 
              ? `${message}\n\nI have uploaded ${files.length} file(s) for analysis:\n${files.map(f => `- ${f.name} (${f.type}): ${f.content}`).join('\n')}`
              : message
          }
        ],
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 500,
        temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    res.status(200).json({ message: botMessage });
   
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Sorry, I encountered an error. Please try again.' 
    });
  }
}