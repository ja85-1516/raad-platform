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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050a0f', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '40px', background: '#1a1a1a', borderRadius: '20px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ color: '#00ffaa', marginBottom: '20px' }}>استعادة كلمة المرور</h1>
        {success && <p style={{ color: '#00ffaa' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="البريد الإلكتروني" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff' }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#00ffaa', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'جاري الإرسال...' : 'إرسال الرابط'}
          </button>
        </form>
        <div style={{ marginTop: '20px' }}>
          <Link href="/auth" style={{ color: '#888', textDecoration: 'none' }}>← العودة</Link>
        </div>
      </div>
    </div>
  )
}