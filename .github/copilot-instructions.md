# Hospice AI Advisor - Copilot Instructions

## Project Overview
This is a Next.js 14 + Tailwind CSS marketing site with an integrated chat widget for the "Compassionate Care Advisor" - an AI tool focused on hospice fraud detection and eligibility prediction. The architecture features a single-page marketing site with a floating chat interface powered by OpenAI's API.

## Key Architecture Patterns

### Chat Integration Strategy
- **Live integration**: `components/ChatWidget.js` makes real API calls to `/api/chat` endpoint
- **API endpoint**: `pages/api/chat.js` handles OpenAI API integration with custom hospice-focused system prompt
- **State management**: Uses React hooks for chat state - `messages` array with `{id, from, text}` objects
- **Environment setup**: Requires `OPENAI_API_KEY` in `.env.local` file (Git-ignored for security)

### UI/UX Conventions
- **Indigo-based color scheme**: `bg-indigo-600`, `text-indigo-600` used consistently across chat widget and CTA buttons
- **Fixed positioning**: Chat widget uses `fixed right-6 bottom-6` with responsive widths (`w-80 md:w-96`)
- **Component composition**: ChatWidget exports both the bubble and expanded chat interface in one component
- **Accessibility**: Proper ARIA labels on chat bubble (`aria-label="Open chat"`)

### Content & Messaging Patterns
- **Domain focus**: All content centers on hospice care, fraud detection, and eligibility prediction
- **Professional tone**: Uses terms like "Compassionate Care Advisor", "ethical AI", and "clinical oversight"
- **Brand identity**: "CA" logo/initials used in header and chat widget consistently

## Development Workflows

### Local Development
```bash
npm run dev  # Starts on localhost:3000
npm run build && npm run start  # Production preview
```

### Key File Relationships
- `pages/index.js` → imports and renders `ChatWidget` as overlay component
- `components/ChatWidget.js` → should call `/api/chat` endpoint (currently mocked)
- `pages/api/chat.js` → handles POST requests, has OpenAI integration template ready
- `tailwind.config.js` → includes both pages and components directories in content scanning

## Integration Points & Security

### Environment Variables (Required)
- `OPENAI_API_KEY`: OpenAI API key (stored in `.env.local`, Git-ignored)
- `OPENAI_MODEL`: Model to use (defaults to 'gpt-4')
- `OPENAI_MAX_TOKENS`: Response length limit (defaults to 500)
- `OPENAI_TEMPERATURE`: Response creativity (defaults to 0.7)

### Security Measures
- Input validation (1000 character limit, type checking)
- Environment variable protection via `.gitignore`
- Error handling for API failures and network issues
- Basic rate limiting implementation (enhance for production)

### API Configuration
- Custom system prompt for hospice care expertise
- Configurable model parameters via environment variables
- Structured error responses and logging

### Styling Conventions
- Uses Tailwind utility classes exclusively (no custom CSS beyond global imports)
- Responsive design with `md:` breakpoints for mobile-first approach
- Consistent spacing using Tailwind's spacing scale (`px-6`, `py-4`, `gap-3`, etc.)

## Domain-Specific Context
This is healthcare software focused on hospice care regulation and fraud prevention. When making changes:
- Maintain professional, compassionate language
- Reference real hospice concepts: eligibility criteria, documentation requirements, CMS guidelines
- Ensure any AI responses are appropriate for healthcare regulatory environment
- Keep focus on "ethical AI" and patient-centered outcomes

## File Structure Guidance
- `/components/`: React components (currently only ChatWidget)
- `/pages/api/`: Next.js API routes for backend functionality
- `/pages/`: Next.js pages (currently only index and _app)
- `/styles/`: Tailwind imports and any custom CSS
- Root config files follow standard Next.js + Tailwind setup patterns

## Quick Reference
- **API endpoint**: `pages/api/chat.js` - fully integrated with OpenAI API
- **Chat component**: `components/ChatWidget.js` - makes real API calls
- **Environment config**: `.env.local` - contains secure API keys (Git-ignored)
- **Brand colors**: Indigo (`indigo-600`, `indigo-700`) for primary actions
- **Security**: Input validation, error handling, and rate limiting implemented