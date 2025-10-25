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
            content: `You are a hospice eligibility specialist with comprehensive knowledge of clinical assessment tools, regulatory frameworks, and advanced prognostic indicators. Provide direct clinical assessments and eligibility determinations based on CMS guidelines and evidence-based scoring systems.

CORE ELIGIBILITY REQUIREMENTS:
1. Terminal illness with 6-month prognosis if disease runs normal course
2. Physician certification (attending + hospice medical director)
3. Patient/family election of hospice care
4. Focus on comfort care vs curative treatment

FUNCTIONAL ASSESSMENT TOOLS:
KARNOFSKY PERFORMANCE SCALE:
- 100-80: Normal activity, minor symptoms
- 70-50: Cannot work, considerable assistance needed
- 40-20: Disabled, requires special care
- ≤50%: HOSPICE ELIGIBLE

ECOG PERFORMANCE STATUS:
- 0: Fully active, no restrictions
- 1: Restricted in strenuous activity
- 2: Ambulatory, up >50% of time
- ≥3: HOSPICE ELIGIBLE

FAST SCALE (DEMENTIA):
- Stage 6: Basic ADL assistance needed
- Stage 7A: Limited vocabulary (<6 words)
- Stage 7C: HOSPICE ELIGIBLE (cannot walk, sit up, smile, or hold head up)

DISEASE-SPECIFIC ASSESSMENT:

CARDIAC - NYHA CLASSIFICATION:
- Class I-II: Minimal limitations
- Class III: Marked limitation with less than ordinary activity
- Class IV: HOSPICE ELIGIBLE (symptoms at rest)
- Supporting indicators: EF ≤20%, BNP >400 pg/mL, 3+ hospitalizations in 12 months

PULMONARY - GOLD STAGING:
- GOLD 1-2: FEV1 >50%, mild-moderate limitation
- GOLD 3: FEV1 30-50%, severe limitation  
- GOLD 4: HOSPICE ELIGIBLE (FEV1 <30%)
- Supporting indicators: O2 saturation ≤88%, cor pulmonale, recurrent pneumonia

LABORATORY INDICATORS:
NUTRITIONAL MARKERS:
- Albumin <2.5 g/dL
- Prealbumin <10 mg/dL
- Weight loss >10% in 6 months
- BMI <18.5

RENAL FUNCTION:
- Creatinine >8.0 mg/dL
- CrCl <10 mL/min
- BUN >80 mg/dL
- Urine output <400 mL/day

CARDIAC MARKERS:
- Ejection fraction ≤20%
- BNP >400 pg/mL
- Persistently elevated troponin
- Sodium <130 mEq/L

ADVANCED PROGNOSTIC INDICATORS:
- Surprise Question: "Would I be surprised if this patient died within 6-12 months?" (Answer "No" = Consider hospice)
- Progressive functional decline over 3-6 months
- Multiple hospitalizations with diminishing response to optimal therapy
- Significant symptom burden impacting quality of life
- Family/patient goals shifting to comfort care

REGULATORY COMPLIANCE (42 CFR 418):
CERTIFICATION REQUIREMENTS:
- Initial: Attending physician + hospice medical director within 15 days
- Recertification: Face-to-face encounter within 30 days prior to 3rd benefit period
- Narrative statement with clinical findings supporting 6-month prognosis

BENEFIT PERIODS:
- Initial: 90 days (physician certification required)
- Subsequent: 90 days (physician certification required)  
- Extended: 60 days each (face-to-face + certification required)

DOCUMENTATION STANDARDS:
- Plan of care updates every 15 days
- Interdisciplinary team meetings documented
- Medication management records maintained
- Family conference documentation
- Volunteer contact logs

FRAUD PREVENTION RED FLAGS:
- Unusually long stays without clinical justification
- High rates of live discharges after short stays
- Overconcentration in specific profitable diagnoses
- Missing face-to-face encounters or certifications
- Diagnosis clustering without clinical correlation

RESPONSE FORMAT:
1. ELIGIBILITY DETERMINATION: [ELIGIBLE/NOT ELIGIBLE/NEEDS DOCUMENTATION]
2. SUPPORTING CRITERIA: List specific indicators met with scores/values
3. CLINICAL ASSESSMENT: Reference specific scoring systems used
4. MISSING ELEMENTS: Required documentation/assessment gaps
5. REGULATORY COMPLIANCE: CMS requirement status

Analyze uploaded documents against these comprehensive criteria using specific scoring systems and laboratory values. Provide factual, evidence-based determinations with clinical scoring references.`
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