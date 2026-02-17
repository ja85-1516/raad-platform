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

    setTimeout(() => {
      setSuccess('✓ تم إرسال رابط الاستعادة')
      setLoading(false)
    }, 2000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #050a0f 0%, #0a151a 100%)',
      color: '#e6f7ff',
      fontFamily: 'sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: 'rgba(10, 21, 26, 0.95)',
        borderRadius: '32px',
        border: '1px solid rgba(0, 255, 170, 0.2)',
        width: '100%',
        maxWidth: '500px',
        padding: '48px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img
            src="/raad-logo.png"
            alt="شعار راد"
            style={{
              width: '100px',
              height: '100px',
              marginBottom: '24px',
              borderRadius: '20px'
            }}
          />
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#00ffaa',
            marginBottom: '16px'
          }}>
            استعادة كلمة المرور
          </h1>
          <p style={{ color: '#888' }}>
            أدخل بريدك الإلكتروني وسنرسل لك رابط الاستعادة
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 82, 82, 0.15)',
            border: '1px solid rgba(255, 82, 82, 0.4)',
            borderRadius: '16px',
            padding: '16px',
            color: '#ffabab',
            marginBottom: '24px'
          }}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={{
            background: 'rgba(0, 255, 170, 0.15)',
            border: '1px solid rgba(0, 255, 170, 0.4)',
            borderRadius: '16px',
            padding: '16px',
            color: '#00ffaa',
            marginBottom: '24px'
          }}>
            ✓ {success}
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
              padding: '16px',
              borderRadius: '18px',
              background: 'rgba(26, 58, 58, 0.4)',
              border: '1px solid rgba(0, 255, 170, 0.3)',
              color: '#e6f7ff',
              fontSize: '1.1rem',
              marginBottom: '24px',
              boxSizing: 'border-box'
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px',
              background: loading ? '#666' : 'linear-gradient(90deg, #00ffaa, #00cc88)',
              color: loading ? '#888' : '#050a0f',
              border: 'none',
              borderRadius: '22px',
              fontSize: '1.3rem',
              fontWeight: '800',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'جاري الإرسال...' : '📧 إرسال الرابط'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/auth" style={{ color: '#00ffaa', textDecoration: 'none' }}>
            ← العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  )
}