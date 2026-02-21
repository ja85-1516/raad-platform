'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let supabase: any
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    checkUserSession()
  }, [])

  const checkUserSession = async () => {
    if (!supabase) return
    try {
      const { data } = await supabase.auth.getSession()
      if (data?.session?.user) {
        router.replace('/auctions/live')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!supabase) throw new Error('خطأ في الاتصال')

      if (isLogin) {
        // تسجيل دخول
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        if (data.user) {
          setSuccess('✓ تم تسجيل الدخول بنجاح!')
          setTimeout(() => router.replace('/auctions/live'), 1000)
        }
      } else {
        // إنشاء حساب جديد
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        if (data.user) {
          setSuccess('✓ تم إنشاء الحساب! تحقق من بريدك الإلكتروني لتفعيل الحساب.')
        }
      }
    } catch (err: any) {
      if (err.message.includes('Invalid login credentials')) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      } else if (err.message.includes('Email not confirmed')) {
        setError('يرجى تفعيل حسابك من البريد الإلكتروني أولاً')
      } else if (err.message.includes('User already registered')) {
        setError('هذا البريد مسجل مسبقاً، سجل دخولك')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      backgroundColor: '#050a0f',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Tajawal', system-ui, sans-serif",
      padding: '20px',
      direction: 'rtl'
    }}>
      <div style={{
        background: 'rgba(10, 21, 26, 0.95)',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,170,0.2)',
        border: '1px solid rgba(0,255,170,0.2)',
        width: '100%',
        maxWidth: '480px',
        padding: '48px',
      }}>

        {/* الشعار */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #00ffaa, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}>
            راد | RAAD
          </h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>
            المنصة السيادية للموارد الثانوية
          </p>
        </div>

        {/* تبديل بين دخول وتسجيل */}
        <div style={{
          display: 'flex',
          background: 'rgba(26,58,58,0.3)',
          borderRadius: '16px',
          padding: '4px',
          marginBottom: '32px'
        }}>
          <button onClick={() => { setIsLogin(true); setError(''); setSuccess('') }}
            style={{
              flex: 1, padding: '12px',
              background: isLogin ? 'linear-gradient(90deg,#00ffaa,#00cc88)' : 'transparent',
              color: isLogin ? '#050a0f' : '#888',
              border: 'none', borderRadius: '12px',
              fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer',
              fontFamily: 'Tajawal, sans-serif'
            }}>
            تسجيل دخول
          </button>
          <button onClick={() => { setIsLogin(false); setError(''); setSuccess('') }}
            style={{
              flex: 1, padding: '12px',
              background: !isLogin ? 'linear-gradient(90deg,#00ffaa,#00cc88)' : 'transparent',
              color: !isLogin ? '#050a0f' : '#888',
              border: 'none', borderRadius: '12px',
              fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer',
              fontFamily: 'Tajawal, sans-serif'
            }}>
            حساب جديد
          </button>
        </div>

        {/* رسائل */}
        {error && (
          <div style={{
            background: 'rgba(255,82,82,0.15)',
            border: '1px solid rgba(255,82,82,0.4)',
            borderRadius: '12px', padding: '14px',
            color: '#ffabab', marginBottom: '20px',
            fontSize: '1rem'
          }}>
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div style={{
            background: 'rgba(0,255,170,0.15)',
            border: '1px solid rgba(0,255,170,0.4)',
            borderRadius: '12px', padding: '14px',
            color: '#00ffaa', marginBottom: '20px',
            fontSize: '1rem'
          }}>
            {success}
          </div>
        )}

        {/* الفورم */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontWeight: '600' }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              placeholder="example@email.com"
              required
              style={{
                width: '100%', padding: '14px 16px',
                background: 'rgba(26,58,58,0.4)',
                border: '1px solid rgba(0,255,170,0.3)',
                borderRadius: '14px', color: '#e6f7ff',
                fontSize: '1.05rem', outline: 'none',
                boxSizing: 'border-box', fontFamily: 'Tajawal, sans-serif'
              }}
              onFocus={e => e.currentTarget.style.border = '1px solid #00ffaa'}
              onBlur={e => e.currentTarget.style.border = '1px solid rgba(0,255,170,0.3)'}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ color: '#aaa', fontWeight: '600' }}>كلمة المرور</label>
              {isLogin && (
                <Link href="/auth/password" style={{ color: '#00ffaa', fontSize: '0.95rem', textDecoration: 'none' }}>
                  نسيت كلمة المرور؟
                </Link>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                required
                minLength={6}
                style={{
                  width: '100%', padding: '14px 50px 14px 16px',
                  background: 'rgba(26,58,58,0.4)',
                  border: '1px solid rgba(0,255,170,0.3)',
                  borderRadius: '14px', color: '#e6f7ff',
                  fontSize: '1.05rem', outline: 'none',
                  boxSizing: 'border-box', fontFamily: 'Tajawal, sans-serif'
                }}
                onFocus={e => e.currentTarget.style.border = '1px solid #00ffaa'}
                onBlur={e => e.currentTarget.style.border = '1px solid rgba(0,255,170,0.3)'}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', left: '14px', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  color: '#00ffaa', cursor: 'pointer', fontSize: '1.2rem'
                }}>
                {showPassword ? '🔓' : '🔒'}
              </button>
            </div>
            {!isLogin && (
              <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '6px' }}>
                كلمة المرور يجب أن تكون ٦ أحرف على الأقل
              </p>
            )}
          </div>

          <button type="submit" disabled={loading}
            style={{
              width: '100%', padding: '16px',
              background: loading ? 'rgba(0,255,170,0.3)' : 'linear-gradient(90deg,#00ffaa,#00cc88)',
              color: '#050a0f', border: 'none', borderRadius: '16px',
              fontSize: '1.2rem', fontWeight: '800',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 0 25px rgba(0,255,170,0.4)',
              fontFamily: 'Tajawal, sans-serif'
            }}>
            {loading ? 'جاري التحقق...' : isLogin ? '🔐 دخول المنصة' : '✨ إنشاء الحساب'}
          </button>

        </form>

        <p style={{ textAlign: 'center', color: '#555', fontSize: '0.9rem', marginTop: '24px' }}>
          🔒 بياناتك محمية ومشفرة بالكامل
        </p>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700;800&display=swap');
      `}} />
    </div>
  )
}