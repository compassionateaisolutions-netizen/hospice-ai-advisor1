const {
  isPatientUploadIntakeLimitation
} = require('../lib/intakeLimitation')

describe('isPatientUploadIntakeLimitation (temporary gating)', () => {
  test('intake limit error -> true (413 / payload too large)', () => {
    const err = new Error('Payload too large')
    err.status = 413
    expect(isPatientUploadIntakeLimitation(err)).toBe(true)
  })

  test('other error -> false (auth / unrelated)', () => {
    const err = new Error('Missing OPENAI_API_KEY')
    err.status = 401
    expect(isPatientUploadIntakeLimitation(err)).toBe(false)
  })

  test('context length exceeded -> true', () => {
    const err = new Error('context_length_exceeded: maximum context length')
    expect(isPatientUploadIntakeLimitation(err)).toBe(true)
  })
})
