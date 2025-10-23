# Hospice Advisor

**Live Site:** [hospiceadvisor.com](https://hospiceadvisor.com) *(coming soon)*

AI-powered Next.js application for hospice patient eligibility assessment, care planning, and CMS compliance. Features an intelligent chatbot that helps healthcare providers identify appropriate hospice candidates and ensure proper documentation.

## 🏥 Features

- **Patient Eligibility Assessment** - AI-driven evaluation of hospice appropriateness
- **Future Qualification Forecasting** - Predictive analytics for care planning
- **CMS Compliance Monitoring** - Automated documentation and billing review
- **Interactive AI Advisor** - Chat interface for real-time guidance
- **Regulatory Resources** - Access to latest CMS guidelines and reports

## 🚀 Quick Start

### Local Development

1. **Clone and install:**
```bash
git clone https://github.com/yourusername/hospice-advisor.git
cd hospice-advisor
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env.local
# Edit .env.local and add your OpenAI API key
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open:** http://localhost:3000

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide to Vercel with custom domain.

## 🔒 Security

- Environment variables protected via `.gitignore`
- API keys stored securely on server-side only
- Input validation and rate limiting implemented
- HTTPS enforced in production

## 📊 Architecture

- **Frontend:** Next.js 14 + Tailwind CSS
- **Backend:** Next.js API Routes
- **AI:** OpenAI GPT-4 with custom hospice expertise
- **Hosting:** Vercel (recommended)
- **Domain:** hospiceadvisor.com

## 🤖 AI Capabilities

The Compassionate Care Advisor specializes in:
- Hospice eligibility criteria assessment
- 6-month prognosis evaluation
- Documentation requirements guidance
- Regulatory compliance checking
- Care timing optimization

## 📈 Usage

Perfect for:
- Hospice providers evaluating patient eligibility
- Healthcare systems monitoring compliance
- Clinical teams planning appropriate care transitions
- Quality assurance and audit preparation

## 🆘 Support

- **Documentation:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Issues:** Create GitHub issue
- **Security:** Report via private message

---

**Built with ❤️ for compassionate hospice care**
