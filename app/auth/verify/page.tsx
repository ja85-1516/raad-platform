// app/auth/verify/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function VerifyPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [timeLeft, setTimeLeft] = useState(120) // دقيقتين
  
  // مراجع لحقول الإدخال
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // عد تنازلي للوقت
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // التركيز على الحقل الأول عند التحميل
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  // تنسيق الوقت
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // معالجة التحقق
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const verificationCode = code.join('')
    
    if (verificationCode.length !== 6) {
      setError('يرجى إدخال رمز التحقق المكون من 6 أرقام')
      setLoading(false)
      return
    }

    try {
      // محاكاة عملية التحقق
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // رمز تجريبي للنجاح
      if (verificationCode === '123456') {
        setSuccess('✓ تم التحقق بنجاح! جاري التوجيه...')
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setError('رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.')
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.')
    } finally {
      setLoading(false)
    }
  }

  // إعادة إرسال الرمز
  const handleResend = async () => {
    if (timeLeft > 0) return
    
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setTimeLeft(120)
    setSuccess('✓ تم إرسال رمز التحقق الجديد إلى بريدك الإلكتروني')
    setLoading(false)
  }

  // تغيير حقل الرمز
  const handleCodeChange = (index: number, value: string) => {
    // السماح فقط بالأرقام
    if (value && !/^\d+$/.test(value)) return
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    // الانتقال للحقل التالي تلقائياً
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // التعامل مع لصق الرمز
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newCode = [...code]
      pastedData.split('').forEach((char, index) => {
        if (index < 6) newCode[index] = char
      })
      setCode(newCode)
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
    }
  }

  // التعامل مع حذف الخلفية
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
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
      {/* خلفية */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0, 255, 170, 0.3) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 20%)'
      }} />

      {/* البطاقة الرئيسية */}
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
        }} />

        {/* الشعار */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img
            src="/raad-logo.png"
            alt="شعار منصة راد"
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'contain',
              marginBottom: '24px',
              borderRadius: '24px',
              boxShadow: '0 0 40px rgba(0, 255, 170, 0.6)',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '12px'
            }}
          />
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #00ffaa, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            تحقق من بريدك الإلكتروني
          </h1>
          
          <p style={{
            color: '#888',
            fontSize: '1.1rem',
            lineHeight: '1.6'
          }}>
            أرسلنا رمز تحقق مكون من 6 أرقام إلى بريدك الإلكتروني
            <br />
            يرجى إدخاله أدناه لتفعيل حسابك
          </p>
        </div>

        {/* رسائل الخطأ والنجاح */}
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

        {/* نموذج التحقق */}
        <form onSubmit={handleVerify}>
          {/* حقول رمز التحقق */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '32px'
          }}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onPaste={handlePaste}
                onKeyDown={(e) => handleKeyDown(index, e)}
                placeholder="-"
                style={{
                  width: '60px',
                  height: '70px',
                  textAlign: 'center',
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  background: 'rgba(26, 58, 58, 0.4)',
                  border: '2px solid rgba(0, 255, 170, 0.3)',
                  borderRadius: '16px',
                  color: '#e6f7ff',
                  fontFamily: 'monospace',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  caretColor: '#00ffaa'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = '2px solid #00ffaa'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 170, 0.5)'
                  e.currentTarget.style.background = 'rgba(0, 255, 170, 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = '2px solid rgba(0, 255, 170, 0.3)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = 'rgba(26, 58, 58, 0.4)'
                }}
              />
            ))}
          </div>

          {/* زر التحقق */}
          <button
            type="submit"
            disabled={loading || code.join('').length !== 6}
            style={{
              width: '100%',
              background: loading || code.join('').length !== 6
                ? 'linear-gradient(90deg, #666, #444)'
                : 'linear-gradient(90deg, #00ffaa, #00cc88)',
              color: loading || code.join('').length !== 6 ? '#888' : '#050a0f',
              border: 'none',
              borderRadius: '22px',
              padding: '18px 24px',
              fontSize: '1.35rem',
              fontWeight: '800',
              cursor: loading || code.join('').length !== 6 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: loading || code.join('').length !== 6
                ? 'none'
                : '0 6px 25px rgba(0, 255, 170, 0.4)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '24px'
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
                }} />
                جاري التحقق...
              </>
            ) : (
              <>
                <span style={{ fontSize: '1.8rem' }}>✓</span>
                تحقق من الرمز
              </>
            )}
          </button>
        </form>

        {/* إعادة إرسال الرمز */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          borderTop: '1px solid rgba(26, 58, 58, 0.5)'
        }}>
          <p style={{
            color: '#888',
            marginBottom: '16px',
            fontSize: '1.05rem'
          }}>
            لم يصلك الرمز؟
          </p>
          
          <button
            onClick={handleResend}
            disabled={timeLeft > 0 || loading}
            style={{
              background: timeLeft > 0 || loading
                ? 'rgba(26, 58, 58, 0.3)'
                : 'rgba(0, 255, 170, 0.15)',
              color: timeLeft > 0 || loading ? '#666' : '#00ffaa',
              border: `1px solid ${timeLeft > 0 || loading ? 'rgba(26, 58, 58, 0.5)' : 'rgba(0, 255, 170, 0.4)'}`,
              padding: '12px 32px',
              borderRadius: '18px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: timeLeft > 0 || loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 auto'
            }}
          >
            <span>📧</span>
            {timeLeft > 0 ? `إعادة الإرسال خلال ${formatTime(timeLeft)}` : 'إعادة إرسال الرمز'}
          </button>
        </div>

        {/* رابط العودة */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center'
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

        {/* ملاحظة الأمان */}
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
              <strong style={{ color: '#00ffaa' }}>رمز آمن:</strong><br />
              رمز التحقق صالح لمدة دقيقتين فقط ولن نطلبه منك مرة أخرى بعد التفعيل.
            </div>
          </div>
        </div>
      </div>

      {/* الأنماط */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.02); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=text] {
          -moz-appearance: textfield;
        }
      ` }} />
    </div>
  )
}