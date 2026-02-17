// app/about/page.tsx
'use client'

import Link from 'next/link'

export default function AboutPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #050a0f 0%, #0a151a 100%)',
      color: '#e6f7ff',
      fontFamily: "'Tajawal', system-ui, -apple-system, sans-serif"
    }}>
      {/* الهيدر */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        borderBottom: '1px solid rgba(0, 255, 170, 0.1)',
        flexWrap: 'wrap' as any,
        gap: '20px'
      }}>
        <Link href="/" style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(90deg, #00ffaa, #ffd700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none'
        }}>راد | RAAD</Link>
        <nav style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap' as any
        }}>
          <Link href="/" style={navLinkStyle}>الرئيسية</Link>
          <Link href="/how-it-works" style={navLinkStyle}>كيف نعمل</Link>
          <Link href="/pricing" style={navLinkStyle}>الأسعار</Link>
          <Link href="/auth" style={navButtonStyle}>دخول المنصة</Link>
        </nav>
      </header>

      {/* المحتوى */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          background: 'linear-gradient(90deg, #00ffaa, #ffd700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          عن منصة راد
        </h1>

        <p style={{
          fontSize: '1.3rem',
          color: '#888',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 64px',
          lineHeight: '1.8'
        }}>
          أول بورصة سيادية رقمية سعودية لتداول الموارد الثانوية وأصول الكربون
        </p>

        {/* البطاقات */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '64px'
        }}>
          <InfoCard
            icon="🎯"
            title="الرؤية"
            content="تحويل المملكة العربية السعودية إلى مركز عالمي لتداول الموارد الثانوية وأصول الكربون، مع الحفاظ على السيادة الرقمية للبيانات الوطنية."
            color="#00ffaa"
          />
          <InfoCard
            icon="🛡️"
            title="الرسالة"
            content="توفير منصة آمنة وموثقة لتداول الموارد مع ضمان الشفافية الكاملة والامتثال لأعلى معايير الأمن السيبراني السعودي."
            color="#ffd700"
          />
          <InfoCard
            icon="🌱"
            title="القيم"
            content="السيادة الرقمية • الشفافية • الاستدامة • الابتكار • التوافق مع رؤية 2030"
            color="#00f3ff"
          />
        </div>

        {/* الإحصائيات */}
        <div style={{
          background: 'rgba(10, 21, 26, 0.8)',
          borderRadius: '32px',
          padding: '48px',
          border: '1px solid rgba(0, 255, 170, 0.2)',
          marginBottom: '64px'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#00ffaa',
            textAlign: 'center',
            marginBottom: '48px'
          }}>
            إنجازاتنا
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px'
          }}>
            <StatItem value="2026" label="سنة التأسيس" />
            <StatItem value="500+" label="شريك استراتيجي" />
            <StatItem value="1.2M" label="طن موارد متداولة" />
            <StatItem value="100%" label="سيادة رقمية" />
          </div>
        </div>

        {/* زر الدعوة للعمل */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/auth/register" style={ctaButtonStyle}>
            انضم إلى المنصة الآن
          </Link>
        </div>
      </main>

      {/* الفوتر */}
      <footer style={{
        padding: '32px 48px',
        borderTop: '1px solid rgba(0, 255, 170, 0.1)',
        textAlign: 'center' as any,
        color: '#666',
        fontSize: '0.95rem'
      }}>
        <p>© 2026 منصة راد السيادية. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  )
}

function InfoCard({ icon, title, content, color }: any) {
  return (
    <div style={{
      background: 'rgba(10, 21, 26, 0.8)',
      borderRadius: '24px',
      padding: '40px',
      border: '1px solid rgba(0, 255, 170, 0.2)',
      transition: 'transform 0.3s'
    }}
    onMouseEnter={(e: any) => {
      e.currentTarget.style.transform = 'translateY(-8px)'
    }}
    >
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{icon}</div>
      <h3 style={{
        fontSize: '1.8rem',
        fontWeight: '700',
        color: color,
        marginBottom: '16px'
      }}>
        {title}
      </h3>
      <p style={{
        color: '#888',
        fontSize: '1.1rem',
        lineHeight: '1.8'
      }}>
        {content}
      </p>
    </div>
  )
}

function StatItem({ value, label }: any) {
  return (
    <div style={{ textAlign: 'center' as any }}>
      <div style={{
        fontSize: '3rem',
        fontWeight: '800',
        color: '#00ffaa',
        marginBottom: '8px'
      }}>
        {value}
      </div>
      <div style={{ color: '#888', fontSize: '1.1rem' }}>{label}</div>
    </div>
  )
}

const navLinkStyle = {
  color: '#00ffaa',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: '600',
  padding: '8px 16px'
}

const navButtonStyle = {
  background: 'linear-gradient(90deg, #00ffaa, #00cc88)',
  color: '#050a0f',
  padding: '12px 32px',
  borderRadius: '16px',
  fontSize: '1.1rem',
  fontWeight: '700',
  textDecoration: 'none'
}

const ctaButtonStyle = {
  background: 'linear-gradient(90deg, #00ffaa, #00cc88)',
  color: '#050a0f',
  padding: '20px 60px',
  borderRadius: '24px',
  fontSize: '1.4rem',
  fontWeight: '800',
  textDecoration: 'none',
  display: 'inline-block',
  boxShadow: '0 0 40px rgba(0, 255, 170, 0.5)'
}