// app/auth/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

// تهيئة سببيز
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
  const [authMethod, setAuthMethod] = useState<'email' | 'absher' | 'nafath'>('email')
  const [isRegistered, setIsRegistered] = useState(false)

  // التحقق من حالة تسجيل الدخول عند التحميل
  useEffect(() => {
    checkUserSession()
  }, [])

  const checkUserSession = async () => {
    if (!supabase) return
    const { data, error } = await supabase.auth.getSession()
    if (data.session) {
      router.push('/dashboard')
    }
  }

  // معالجة تسجيل الدخول
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!supabase) throw new Error('Supabase client not initialized')

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        setSuccess('✓ تم تسجيل الدخول بنجاح! جاري التوجيه إلى لوحة التحكم...')
        setTimeout(() => {
          router.push('/dashboard')
          router.refresh()
        }, 1500)
      }
    } catch (err: any) {
      console.error('Error signing in:', err)
      setError(
        err.message.includes('Invalid login credentials')
          ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.'
          : err.message.includes('Email not confirmed')
          ? 'لم يتم تأكيد البريد الإلكتروني. يرجى التحقق من صندوق الوارد.'
          : 'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.'
      )
    } finally {
      setLoading(false)
    }
  }

  // معالجة تسجيل الدخول عبر أبشر/نفاذ (محاكاة)
  const handleGovSignIn = (method: 'absher' | 'nafath') => {
    setError('')
    setSuccess('')
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSuccess(`✓ جاري توجيهك إلى بوابة ${method === 'absher' ? 'أبشر' : 'نفاذ'} الرسمية...`)
      
      setTimeout(() => {
        alert(`تم محاكاة الدخول عبر ${method === 'absher' ? 'أبشر' : 'نفاذ'} بنجاح!`)
        router.push('/dashboard')
      }, 2000)
    }, 1500)
  }

  // التحقق من وجود حساب مسبق
  const checkExistingAccount = async () => {
    if (!email.trim()) return
    
    try {
      const demoAccounts = ['admin@rad.sa', 'user@rad.sa']
      setIsRegistered(demoAccounts.includes(email.toLowerCase()))
    } catch (err) {
      console.error('Error checking account:', err)
    }
  }

  return (
    <div style={{
      backgroundColor: '#050a0f',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Tajawal', system-ui, -apple-system, sans-serif",
      padding: '20px',
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0, 255, 170, 0.03) 0%, transparent 25%), radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.03) 0%, transparent 25%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* نمط سعودي خفيف */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0, 255, 170, 0.3) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 20%), repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 243, 255, 0.1) 10px, rgba(0, 243, 255, 0.1) 20px)'
      }}></div>

      <div style={{
        background: 'linear-gradient(145deg, rgba(10, 21, 26, 0.95), rgba(8, 16, 21, 0.95))',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 255, 170, 0.2)',
        border: '1px solid rgba(0, 255, 170, 0.2)',
        backdropFilter: 'blur(12px)',
        width: '100%',
        maxWidth: '520px',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* تأثيرات ضوئية */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(0, 255, 170, 0.1) 0%, transparent 70%)',
          animation: 'pulse 8s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%)',
          animation: 'pulse 10s infinite reverse'
        }}></div>

        {/* شعار المنصة */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            position: 'relative',
            display: 'inline-block',
            marginBottom: '16px'
          }}>
            <div style={{
              position: 'absolute',
              inset: '-8px',
              background: 'linear-gradient(45deg, #00ffaa, #ffd700)',
              borderRadius: '9999px',
              opacity: 0.4,
              animation: 'pulse 3s infinite'
            }}></div>
            <div style={{
              fontSize: '3.8rem',
              fontWeight: '800',
              background: 'linear-gradient(90deg, #00ffaa, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              letterSpacing: '-0.03em'
            }}>
              راد | RAAD
            </div>
          </div>
          <p style={{ 
            color: '#888', 
            fontSize: '1.25rem',
            marginTop: '8px'
          }}>
            المنصة السيادية للموارد الثانوية
          </p>
        </div>

        {/* مؤشر خطوات التسجيل */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '32px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: isRegistered ? '#00ffaa' : 'rgba(0, 255, 170, 0.3)',
            boxShadow: isRegistered ? '0 0 8px rgba(0, 255, 170, 0.7)' : 'none',
            transition: 'all 0.3s ease'
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: authMethod !== 'email' ? '#00ffaa' : 'rgba(0, 255, 170, 0.3)',
            boxShadow: authMethod !== 'email' ? '0 0 8px rgba(0, 255, 170, 0.7)' : 'none',
            transition: 'all 0.3s ease'
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'rgba(0, 255, 170, 0.3)',
            transition: 'all 0.3s ease'
          }}></div>
        </div>

        {/* عنوان القسم */}
        <h2 style={{ 
          fontSize: '2.2rem', 
          fontWeight: '800', 
          textAlign: 'center', 
          marginBottom: '8px',
          background: 'linear-gradient(90deg, #00ffaa, #00f3ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          zIndex: 1
        }}>
          {authMethod === 'email' ? 'تسجيل الدخول' : 
           authMethod === 'absher' ? 'الدخول عبر أبشر' : 'الدخول عبر نفاذ'}
        </h2>
        <p style={{ 
          textAlign: 'center', 
          color: '#888', 
          marginBottom: '32px',
          fontSize: '1.05rem',
          position: 'relative',
          zIndex: 1
        }}>
          {authMethod === 'email' ? 'أدخل بياناتك للوصول إلى لوحة التحكم السيادية' : 
           authMethod === 'absher' ? 'استخدم هويتك الوطنية للدخول عبر بوابة أبشر الرسمية' : 
           'استخدم بصمة الهوية الرقمية للدخول عبر منصة نفاذ'}
        </p>

        {/* رسائل النجاح والخطأ */}
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
            fontSize: '1.05rem',
            position: 'relative',
            zIndex: 1
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
            fontSize: '1.05rem',
            position: 'relative',
            zIndex: 1
          }}>
            <span style={{ fontSize: '1.5rem' }}>✓</span>
            {success}
          </div>
        )}

        {/* نموذج تسجيل الدخول */}
        {authMethod === 'email' ? (
          <form onSubmit={handleSignIn} style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                marginBottom: '10px', 
                fontWeight: '600', 
                color: '#aaa',
                fontSize: '1.05rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>البريد الإلكتروني</span>
                <Link 
                  href="/auth/password" 
                  style={{ 
                    color: '#00ffaa', 
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'opacity 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  نسيت كلمة المرور؟
                </Link>
              </label>
              <div style={{
                position: 'relative'
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  // ✅ تم الإصلاح: دمج onBlur في دالة واحدة
                  onBlur={(e) => {
                    checkExistingAccount()
                    e.currentTarget.style.border = '1px solid rgba(0, 255, 170, 0.3)'
                  }}
                  placeholder="example@rad.sa"
                  required
                  style={{
                    width: '100%',
                    padding: '16px 20px 16px 50px',
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
                />
                <div style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#00ffaa',
                  fontSize: '1.4rem'
                }}>
                  ✉️
                </div>
              </div>
              {isRegistered && email && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  background: 'rgba(0, 255, 170, 0.1)',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  color: '#00ffaa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>✓</span> حساب موجود - أدخل كلمة المرور
                </div>
              )}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                marginBottom: '10px', 
                fontWeight: '600', 
                color: '#aaa',
                fontSize: '1.05rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>كلمة المرور</span>
              </label>
              <div style={{
                position: 'relative'
              }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="••••••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '16px 60px 16px 50px',
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
                <div style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#00ffaa',
                  fontSize: '1.4rem'
                }}>
                  🔒
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#00ffaa',
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 255, 170, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                  {showPassword ? '🔓' : '🔒'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading 
                  ? 'linear-gradient(90deg, #00cc88, #009966)' 
                  : 'linear-gradient(90deg, #00ffaa, #00cc88)',
                color: '#050a0f',
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
                boxShadow: '0 6px 25px rgba(0, 255, 170, 0.4)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 255, 170, 0.6)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 255, 170, 0.4)'
                }
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                animation: loading ? 'none' : 'pulse 3s infinite'
              }}></div>
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
                  جاري التحقق...
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1.8rem' }}>🔐</span>
                  دخول المنصة السيادية
                </>
              )}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{
              background: 'rgba(26, 58, 58, 0.4)',
              border: '1px solid rgba(0, 255, 170, 0.3)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '28px'
            }}>
              <div style={{
                fontSize: '5rem',
                marginBottom: '20px',
                background: authMethod === 'absher' 
                  ? 'linear-gradient(45deg, #006c35, #00994c)' 
                  : 'linear-gradient(45deg, #1a3a6c, #2a5da8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold'
              }}>
                {authMethod === 'absher' ? 'أ' : 'ن'}
              </div>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                marginBottom: '12px',
                color: authMethod === 'absher' ? '#006c35' : '#1a3a6c'
              }}>
                {authMethod === 'absher' ? 'بوابة أبشر الرسمية' : 'منصة نفاذ الوطنية'}
              </h3>
              <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '20px' }}>
                {authMethod === 'absher' 
                  ? 'استخدم بياناتك الوطنية في أبشر للدخول إلى المنصة السيادية'
                  : 'استخدم هويتك الرقمية عبر نفاذ للتحقق من هويتك والدخول الآمن'}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '20px'
              }}>
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: i === 0 ? (authMethod === 'absher' ? '#006c35' : '#1a3a6c') : 'rgba(26, 58, 58, 0.5)',
                      boxShadow: i === 0 ? `0 0 8px ${authMethod === 'absher' ? 'rgba(0, 108, 53, 0.7)' : 'rgba(26, 58, 108, 0.7)'}` : 'none'
                    }}
                  ></div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleGovSignIn(authMethod)}
              disabled={loading}
              style={{
                width: '100%',
                background: loading 
                  ? 'linear-gradient(90deg, #006c35, #004d26)' 
                  : authMethod === 'absher'
                  ? 'linear-gradient(90deg, #006c35, #004d26)'
                  : 'linear-gradient(90deg, #1a3a6c, #0d234a)',
                color: '#ffffff',
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
                boxShadow: authMethod === 'absher'
                  ? '0 6px 25px rgba(0, 108, 53, 0.4)'
                  : '0 6px 25px rgba(26, 58, 108, 0.4)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.boxShadow = authMethod === 'absher'
                    ? '0 8px 30px rgba(0, 108, 53, 0.6)'
                    : '0 8px 30px rgba(26, 58, 108, 0.6)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = authMethod === 'absher'
                    ? '0 6px 25px rgba(0, 108, 53, 0.4)'
                    : '0 6px 25px rgba(26, 58, 108, 0.4)'
                }
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                animation: loading ? 'none' : 'pulse 3s infinite'
              }}></div>
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
                  جاري التوجيه...
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1.8rem' }}>
                    {authMethod === 'absher' ? '🇸🇦' : '🛡️'}
                  </span>
                  {authMethod === 'absher' 
                    ? 'الدخول عبر أبشر' 
                    : 'الدخول عبر نفاذ'}
                </>
              )}
            </button>
          </div>
        )}

        {/* مفتاح تبديل طريقة المصادقة */}
        <div style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(26, 58, 58, 0.5)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <p style={{ 
            color: '#888', 
            marginBottom: '16px',
            fontSize: '1.1rem'
          }}>
            {authMethod === 'email' 
              ? 'أو سجل الدخول باستخدام' 
              : 'أو استخدم بريدك الإلكتروني'}
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {authMethod !== 'email' && (
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                style={{
                  background: 'rgba(26, 58, 58, 0.5)',
                  border: '1px solid rgba(0, 255, 170, 0.4)',
                  color: '#00ffaa',
                  padding: '10px 20px',
                  borderRadius: '16px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 170, 0.15)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(26, 58, 58, 0.5)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <span>📧</span>
                البريد الإلكتروني
              </button>
            )}
            
            {authMethod !== 'absher' && (
              <button
                type="button"
                onClick={() => setAuthMethod('absher')}
                style={{
                  background: 'rgba(0, 108, 53, 0.15)',
                  border: '1px solid rgba(0, 108, 53, 0.5)',
                  color: '#006c35',
                  padding: '10px 20px',
                  borderRadius: '16px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 108, 53, 0.25)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 108, 53, 0.15)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <span>🇸🇦</span>
                أبشر
              </button>
            )}
            
            {authMethod !== 'nafath' && (
              <button
                type="button"
                onClick={() => setAuthMethod('nafath')}
                style={{
                  background: 'rgba(26, 58, 108, 0.15)',
                  border: '1px solid rgba(26, 58, 108, 0.5)',
                  color: '#1a3a6c',
                  padding: '10px 20px',
                  borderRadius: '16px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(26, 58, 108, 0.25)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(26, 58, 108, 0.15)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <span>🛡️</span>
                نفاذ
              </button>
            )}
          </div>

          {/* ملاحظة حول الخصوصية والأمان */}
          <div style={{
            marginTop: '28px',
            background: 'rgba(26, 58, 58, 0.3)',
            borderLeft: '3px solid #00ffaa',
            padding: '16px',
            borderRadius: '0 12px 12px 0',
            fontSize: '0.95rem',
            color: '#888',
            lineHeight: '1.6'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem', marginTop: '2px' }}>🔒</span>
              <div>
                <strong style={{ color: '#00ffaa' }}>بياناتك آمنة معنا:</strong><br />
                نستخدم تشفير end-to-end لحماية معلوماتك. لا نشارك بياناتك مع أي جهة خارجية دون موافقتك الصريحة.
              </div>
            </div>
          </div>

          {/* رابط التسجيل للمستخدمين الجدد */}
          <div style={{ marginTop: '24px' }}>
            <p style={{ color: '#888', marginBottom: '12px' }}>
              مستخدم جديد؟
            </p>
            <Link 
              href="/auth/register" 
              style={{ 
                display: 'inline-block',
                background: 'linear-gradient(90deg, rgba(0, 255, 170, 0.15), rgba(0, 204, 136, 0.1))',
                color: '#00ffaa',
                border: '1px solid rgba(0, 255, 170, 0.4)',
                padding: '12px 32px',
                borderRadius: '18px',
                fontSize: '1.15rem',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 255, 170, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 170, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 170, 0.2)'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <span>✨</span>
                إنشاء حساب جديد
              </span>
            </Link>
          </div>
        </div>

        {/* شعار احترافي في الزاوية */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          right: '24px',
          textAlign: 'center',
          color: 'rgba(0, 255, 170, 0.5)',
          fontSize: '0.9rem',
          fontWeight: '500',
          zIndex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>🛡️</span>
            <span>منصة سيادية معتمدة - متوافقة مع مجلس الأمن السيبراني السعودي</span>
            <span>🛡️</span>
          </div>
        </div>
      </div>

      {/* الأنماط العالمية */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(8, 16, 21, 0.7);
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00ffaa, #00cc88);
          border-radius: 5px;
          border: 2px solid rgba(10, 21, 26, 0.5);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00e676, #00b366);
          box-shadow: 0 0 10px rgba(0, 255, 170, 0.5);
        }
        
        @media (max-width: 480px) {
          div[style*="maxWidth: '520px'"] {
            margin: 16px;
            padding: 32px 24px !important;
          }
          
          h2 {
            font-size: 1.9rem !important;
          }
          
          p[style*="fontSize: '1.25rem'"] {
            font-size: 1.1rem !important;
          }
          
          button {
            font-size: 1.2rem !important;
            padding: 16px !important;
          }
          
          input {
            font-size: 1.05rem !important;
            padding: 14px 20px !important;
          }
        }
      ` }} />
    </div>
  )
}