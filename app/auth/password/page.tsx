// app/auth/password/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // محاكاة إرسال الرابط
    setTimeout(() => {
      setSuccess('تم إرسال رابط الاستعادة')
      setLoading(false)
    }, 2000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050a0f',
      color: '#e6f7ff',
      fontFamily: 'sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(10, 21, 26, 0.95)',
        borderRadius: '20px',
        border: '1px solid #00ffaa',
        width: '100%',
        maxWidth: '450px',
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#00ffaa', marginBottom: '10px', fontSize: '24px' }}>
            استعادة كلمة المرور
          </h1>
          <p style={{ color: '#888', fontSize: '14px' }}>
            أدخل بريدك الإلكتروني وسنرسل لك رابط الاستعادة
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 82, 82, 0.2)',
            color: '#ffabab',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: 'rgba(0, 255, 170, 0.2)',
            color: '#00ffaa',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(26, 58, 58, 0.5)',
              border: '1px solid #00ffaa',
              color: '#fff',
              marginBottom: '20px',
              boxSizing: 'border-box'
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#555' : '#00ffaa',
              color: loading ? '#888' : '#000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            {loading ? 'جاري الإرسال...' : 'إرسال الرابط'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/auth" style={{ color: '#00ffaa', textDecoration: 'none', fontSize: '14px' }}>
            ← العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  )
}