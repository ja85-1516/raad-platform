// app/auth/register/page.tsx

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

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [authMethod, setAuthMethod] = useState<'email' | 'absher' | 'nafath'>('email')

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

  // معالجة التسجيل
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // التحقق من صحة البيانات
    if (!name.trim()) {
      setError('الاسم مطلوب')
      setLoading(false)
      return
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('البريد الإلكتروني غير صحيح')
      setLoading(false)
      return
    }
    
    if (!organization.trim()) {
      setError('اسم المؤسسة مطلوب')
      setLoading(false)
      return
    }
    
    if (!phone.trim() || !/^(?:\+966|00966|966|0)?5\d{8}$/.test(phone)) {
      setError('رقم الجوال غير صحيح')
      setLoading(false)
      return
    }
    
    if (password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      setLoading(false)
      return
    }
    
    if (password !== confirmPassword) {
      setError('كلمة المرور غير متطابقة')
      setLoading(false)
      return
    }

    try {
      if (!supabase) throw new Error('Supabase client not initialized')
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            organization,
            phone
          }
        }
      })

      if (error) throw error

      if (data.user) {
        setSuccess('✓ تم إنشاء الحساب بنجاح! يرجى التحقق من صندوق الوارد للتأكيد.')
        setTimeout(() => {
          router.push('/auth/verify')
        }, 2000)
      }
    } catch (err: any) {
      console.error('Error registering:', err)
      setError(
        err.message.includes('Email is already in use')
          ? 'البريد الإلكتروني مستخدم مسبقاً. يرجى استخدام بريد إلكتروني آخر.'
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

    // محاكاة عملية التحقق (في التطبيق الفعلي سيتم توجيه المستخدم لبوابة أبشر/نفاذ)
    setTimeout(() => {
      setLoading(false)
      setSuccess(`✓ جاري توجيهك إلى بوابة ${method === 'absher' ? 'أبشر' : 'نفاذ'} الرسمية...`)
      
      // في التطبيق الفعلي: سيتم توجيه المستخدم لبوابة أبشر/نفاذ
      setTimeout(() => {
        alert(`تم محاكاة الدخول عبر ${method === 'absher' ? 'أبشر' : 'نفاذ'} بنجاح!`)
        router.push('/auth/verify')
      }, 2000)
    }, 1500)
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
            background: 'rgba(0, 255, 170, 0.3)',
            boxShadow: '0 0 8px rgba(0, 255, 170, 0.7)',
            transition: 'all 0.3s ease'
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'rgba(0, 255, 170, 0.3)',
            boxShadow: '0 0 8px rgba(0, 255, 170, 0.7)',
            transition: 'all 0.3s ease'
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#00ffaa',
            boxShadow: '0 0 8px rgba(0, 255, 170, 0.7)',
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
          إنشاء حساب جديد
        </h2>
        <p style={{ 
          textAlign: 'center', 
          color: '#888', 
          marginBottom: '32px',
          fontSize: '1.05rem',
          position: 'relative',
          zIndex: 1
        }}>
          أدخل معلوماتك لإنشاء حسابك السيادي
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

        {/* نموذج التسجيل */}
        <form onSubmit={handleRegister} style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '24px' }}>
            {/* تم إصلاح الخطأ هنا: إزالة display المكرر */}
            <label style={{ 
              marginBottom: '10px', 
              fontWeight: '600', 
              color: '#aaa',
              fontSize: '1.05rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>الاسم الكامل</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="محمد عبدالله"
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

          <div style={{ marginBottom: '24px' }}>
             {/* تم إصلاح الخطأ هنا: إزالة display المكرر */}
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

          <div style={{ marginBottom: '24px' }}>
             {/* تم إصلاح الخطأ هنا: إزالة display المكرر */}
            <label style={{ 
              marginBottom: '10px', 
              fontWeight: '600', 
              color: '#aaa',
              fontSize: '1.05rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>اسم المؤسسة</span>
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="شركة راد للخدمات السيادية"
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

          <div style={{ marginBottom: '24px' }}>
             {/* تم إصلاح الخطأ هنا: إزالة display المكرر */}
            <label style={{ 
              marginBottom: '10px', 
              fontWeight: '600', 
              color: '#aaa',
              fontSize: '1.05rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>رقم الجوال</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+966 50 123 4567"
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

          <div style={{ marginBottom: '24px' }}>
             {/* تم إصلاح الخطأ هنا: إزالة display المكرر */}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  width: '100%',
                  padding: '16px 60px 16px 20px',
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
                {/* تم التعديل هنا: قفل مفتوح ومغلق */}
                {showPassword ? '🔓' : '🔒'}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
             {/* تم إصلاح الخطأ هنا: إزالة display المكرر */}
            <label style={{ 
              marginBottom: '10px', 
              fontWeight: '600', 
              color: '#aaa',
              fontSize: '1.05rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>تأكيد كلمة المرور</span>
            </label>
            <div style={{
              position: 'relative'
            }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  width: '100%',
                  padding: '16px 60px 16px 20px',
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
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {/* تم التعديل هنا: قفل مفتوح ومغلق */}
                {showConfirmPassword ? '🔓' : '🔒'}
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
                جاري التسجيل...
              </>
            ) : (
              <>
                <span style={{ fontSize: '1.8rem' }}>✅</span>
                إنشاء الحساب
              </>
            )}
          </button>
        </form>

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
            هل ترغب في استخدام طريقة أخرى؟
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px',
            flexWrap: 'wrap'
          }}>
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
              لديك حساب بالفعل؟
            </p>
            <Link 
              href="/auth"
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
                <span>🔐</span>
                دخول المنصة
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

      {/* الأنماط العالمية - تم إزالة @import الخطأ */}
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
        
        /* شريط التمرير المخصص */
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
        
        /* تحسينات الجوال */
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