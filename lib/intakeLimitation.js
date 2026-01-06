// lib/intakeLimitation.js
// Temporary workaround (intake limitation): detect known technical constraints that prevent
// patient-upload ingestion (e.g., request size limits, payload too large, token/context limits,
// ingestion timeouts, parsing/embedding overload). When detected, we return a gated message
// telling the user uploads aren't enabled for them yet.
// IMPORTANT: This must NOT trigger for unrelated errors (auth, network, invalid file type, etc.).

function isPatientUploadIntakeLimitation(err) {
  if (!err) return false

  const status = Number(err.status || err.statusCode || err?.response?.status || NaN)
  const code = typeof err.code === 'string' ? err.code : ''
  const name = typeof err.name === 'string' ? err.name : ''
  const message = (typeof err.message === 'string' ? err.message : '').toLowerCase()

  // Known request-size / payload limits
  if (status === 413) return true

  // Next.js body parser / upstream proxies may throw variants of these.
  if (name === 'PayloadTooLargeError') return true

  // Common wording variants for size/context/token constraints.
  const limitPhrases = [
    'payload too large',
    'request entity too large',
    'request too large',
    'body exceeded',
    'entity too large',
    'maxcontentlength',
    'content-length',
    'size limit',
    'context_length_exceeded',
    'maximum context length',
    'token limit',
    'too many tokens',
    'ingestion_timeout',
    'ingestion timeout',
    'embedding',
    'vector store',
    'failed to parse',
    'unable to parse'
  ]

  if (limitPhrases.some((p) => message.includes(p))) return true

  // Some libs throw typed codes.
  const lowerCode = code.toLowerCase()
  if (lowerCode.includes('context_length_exceeded')) return true
  if (lowerCode.includes('payload')) return true
  if (lowerCode.includes('request_too_large')) return true

  return false
}

module.exports = {
  isPatientUploadIntakeLimitation
}
