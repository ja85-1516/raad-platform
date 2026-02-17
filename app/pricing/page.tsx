// app/pricing/page.tsx
'use client'

import Link from 'next/link'

export default function PricingPage() {
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
          <Link href="/about" style={navLinkStyle}>عن المنصة</Link>
          <Link href="/how-it-works" style={navLinkStyle}>كيف نعمل</Link>
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
          باقات الأسعار
        </h1>

        <p style={{
          fontSize: '1.3rem',
          color: '#888',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 64px',
          lineHeight: '1.8'
        }}>
          اختر الباقة المناسبة لاحتياجاتك مع شفافية كاملة في الرسوم
        </p>

        {/* الباقات */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          <PricingCard
            title="البداية"
            price="مجاني"
            period="للأفراد"
            features={[
              'تسجيل وحساب مجاني',
              'تصفح المزادات',
              '5 موارد كحد أقصى',
              'دعم عبر البريد'
            ]}
            color="#888"
            popular={false}
          />
          <PricingCard
            title="الأعمال"
            price="2,500"
            period="ريال/شهر"
            features={[
              'موارد غير محدودة',
              'المشاركة في المزادات',
              'تقارير أساسية',
              'دعم فني متميز',
              'API للوصول'
            ]}
            color="#00ffaa"
            popular={true}
          />
          <PricingCard
            title="المؤسسات"
            price="10,000"
            period="ريال/شهر"
            features={[
              'كل مميزات الأعمال',
              'تقارير متقدمة',
              'مدير حساب مخصص',
              'تكامل مع أنظمتك',
              'أولوية في الدعم'
            ]}
            color="#ffd700"
            popular={false}
          />
        </div>

        {/* نموذج الربح */}
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
            مصادر الرسوم
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            <FeeCard
              icon="💰"
              title="عمولة المزادات"
              percentage="3-5%"
              description="من كل صفقة ناجحة"
              color="#00ffaa"
            />
            <FeeCard
              icon="📊"
              title="تقارير البيانات"
              percentage="حسب الطلب"
              description="تقارير مخصصة للمستثمرين"
              color="#ffd700"
            />
            <FeeCard
              icon="🔐"
              title="خدمات التوثيق"
              percentage="500-2000 ر.س"
              description="توثيق ميداني للموارد"
              color="#00f3ff"
            />
          </div>
        </div>

        {/* زر الدعوة للعمل */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/auth/register" style={ctaButtonStyle}>
            ابدأ الآن مجاناً
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

function PricingCard({ title, price, period, features, color, popular }: any) {
  return (
    <div style={{
      padding: '40px',
      background: popular 
        ? 'linear-gradient(145deg, rgba(0, 108, 53, 0.3), rgba(0, 204, 136, 0.1))'
        : 'rgba(10, 21, 26, 0.8)',
      borderRadius: '32px',
      border: `2px solid ${popular ? color : color + '30'}`,
      position: 'relative',
      transition: 'transform 0.3s'
    }}
    onMouseEnter={(e: any) => {
      e.currentTarget.style.transform = 'translateY(-10px)'
    }}
    >
      {popular && (
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: color,
          color: '#050a0f',
          padding: '8px 24px',
          borderRadius: '20px',
          fontWeight: '700',
          fontSize: '0.95rem'
        }}>
          الأكثر شعبية
        </div>
      )}
      
      <h3 style={{
        fontSize: '1.8rem',
        fontWeight: '700',
        color: color,
        marginBottom: '16px',
        textAlign: 'center' as any
      }}>
        {title}
      </h3>
      
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          color: '#e6f7ff'
        }}>
          {price}
        </div>
        <div style={{
          color: '#888',
          fontSize: '1.1rem',
          marginTop: '8px'
        }}>
          {period}
        </div>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
        {features.map((feature: string, i: number) => (
          <li key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#e6f7ff',
            marginBottom: '14px',
            fontSize: '1.05rem'
          }}>
            <span style={{ color: '#00ffaa', fontSize: '1.2rem' }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href="/auth/register"
        style={{
          display: 'block',
          textAlign: 'center' as any,
          background: popular ? color : 'transparent',
          color: popular ? '#050a0f' : color,
          padding: '16px',
          borderRadius: '16px',
          fontWeight: '700',
          fontSize: '1.1rem',
          textDecoration: 'none',
          border: `2px solid ${color}`,
          transition: 'all 0.3s'
        }}
      >
        اختر الباقة
      </Link>
    </div>
  )
}

function FeeCard({ icon, title, percentage, description, color }: any) {
  return (
    <div style={{
      padding: '32px',
      background: 'rgba(8, 16, 21, 0.8)',
      borderRadius: '24px',
      border: `1px solid ${color}30`,
      textAlign: 'center' as any,
      transition: 'all 0.3s'
    }}
    onMouseEnter={(e: any) => {
      e.currentTarget.style.borderColor = color
      e.currentTarget.style.transform = 'translateY(-5px)'
    }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{
        fontSize: '1.4rem',
        fontWeight: '700',
        color: color,
        marginBottom: '12px'
      }}>
        {title}
      </h3>
      <div style={{
        fontSize: '2rem',
        fontWeight: '800',
        color: '#e6f7ff',
        marginBottom: '8px'
      }}>
        {percentage}
      </div>
      <p style={{
        color: '#888',
        fontSize: '1.05rem'
      }}>
        {description}
      </p>
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