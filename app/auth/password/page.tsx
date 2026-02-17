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
      fontFamily: "'Tajawal', system-ui, -apple-system, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: 'linear-gradient(145deg, rgba(10, 21, 26, 0.95), rgba(8, 16, 21, 0.95))',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 255, 170, 0.2)',
        border: '1px solid rgba(0, 255, 170, 0.2)',
        backdropFilter: 'blur(12px)',
        width: '100%',
        maxWidth: '500px',
        padding: '48px',
        position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img
            src="/raad-logo.png"
            alt="شعار منصة راد"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'contain',
              marginBottom: '24px',
              borderRadius: '20px',
              boxShadow: '0 0 30px rgba(0, 255, 170, 0.5)',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '10px'
            }}
          />
          
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #00ffaa, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            استعادة كلمة المرور
          </h1>
          
          <p style={{
            color: '#888',
            fontSize: '1.1rem',
            lineHeight: '1.6'
          }}>
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً لاستعادة كلمة المرور
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 82, 82, 0.15)',
            border: '1px solid rgba(255, 82, 82, 0.4)',
            borderRadius: '16px',
            padding: '16px',
            color: '#ffabab',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '1.05rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: 'rgba(0, 255, 170, 0.15)',
            border: '1px solid rgba(0, 255, 170, 0.4)',
            borderRadius: '16px',
            padding: '16px',
            color: '#00ffaa',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '1.05rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>✓</span>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontWeight: '600', 
              color: '#aaa',
              fontSize: '1.05rem'
            }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@rad.sa"
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '18px',
                background: 'rgba(26, 58, 58, 0.4)',
                border: '1px solid rgba(0, 255, 170, 0.3)',
                color: '#e6f7ff',
                fontSize: '1.15rem',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.currentTarget.style.border = '1px solid #00ffaa'}
              onBlur={(e) => e.currentTarget.style.border = '1px solid rgba(0, 255, 170, 0.3)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading 
                ? 'linear-gradient(90deg, #666, #444)'
                : 'linear-gradient(90deg, #00ffaa, #00cc88)',
              color: loading ? '#888' : '#050a0f',
              border: 'none',
              borderRadius: '22px',
              padding: '18px 24px',
              fontSize: '1.35rem',
              fontWeight: '800',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: loading ? 'none' : '0 6px 25px rgba(0, 255, 170, 0.4)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: '#050a0f',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                جاري الإرسال...
              </>
            ) : (
              <>
                <span style={{ fontSize: '1.8rem' }}>📧</span>
                إرسال رابط الاستعادة
              </>
            )}
          </button>
        </form>

        <div style={{
          marginTop: '32px',
          textAlign: 'center',
          paddingTop: '24px',
          borderTop: '1px solid rgba(26, 58, 58, 0.5)'
        }}>
          <Link
            href="/auth"
            style={{
              color: '#00ffaa',
              textDecoration: 'none',
              fontSize: '1.05rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'opacity 0.3s'
            }}
          >
            <span>←</span>
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      ` }} />
    </div>
  )
}
