"use client"
import { useEffect, useState } from 'react'

export default function RaadPlatform() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // محاكاة تحميل البيانات لضمان استقرار التطبيق عند التشغيل الأول
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div dir="rtl" style={{ 
      backgroundColor: '#050a0f', 
      color: 'white', 
      minHeight: '100vh', 
      padding: '40px', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      
      {/* رأس الصفحة - الهوية الوطنية والتقنية */}
      <header style={{ 
        borderBottom: '5px solid #00ffaa', 
        paddingBottom: '20px', 
        marginBottom: '50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '65px', fontWeight: '900', color: '#00ffaa', margin: '0' }}>راد | RAAD</h1>
          <p style={{ fontSize: '28px', color: '#888', marginTop: '10px' }}>السيادة الرقمية لإعادة التدوير</p>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '20px', color: '#ffd700', fontWeight: 'bold' }}>رؤية السعودية 2030</div>
          <div style={{ fontSize: '16px', color: '#00f3ff' }}>المبادرة الخضراء</div>
        </div>
      </header>

      {/* لوحة التحكم السريعة */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px', 
        marginBottom: '60px' 
      }}>
        <div style={statCardStyle('#00ffaa')}>
          <h2 style={{ fontSize: '24px' }}>إجمالي الكربون الموفر</h2>
          <p style={{ fontSize: '55px', fontWeight: 'bold' }}>1,284 <span style={{ fontSize: '20px' }}>طن</span></p>
        </div>
        
        <div style={statCardStyle('#ffd700')}>
          <h2 style={{ fontSize: '24px' }}>قيمة التداولات اليومية</h2>
          <p style={{ fontSize: '55px', fontWeight: 'bold' }}>4.2M <span style={{ fontSize: '20px' }}>ريال</span></p>
        </div>
      </div>

      {/* جدول البيانات الرئيسي بوضوح عالٍ */}
      <div style={{ 
        backgroundColor: '#0a151a', 
        borderRadius: '30px', 
        padding: '30px', 
        border: '2px solid #1a3a3a' 
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#00ffaa' }}>📦 بورصة الموارد المباشرة</h2>
        
        <table style={{ width: '100%', textAlign: 'right', fontSize: '22px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #1a3a3a', color: '#888' }}>
              <th style={{ padding: '20px' }}>نوع المادة</th>
              <th style={{ padding: '20px' }}>الكمية</th>
              <th style={{ padding: '20px' }}>الحالة</th>
              <th style={{ padding: '20px' }}>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            <tr style={tableRowStyle}>
              <td style={{ padding: '25px', fontWeight: 'bold' }}>حديد سكراب (ثقيل)</td>
              <td style={{ padding: '25px' }}>450 طن</td>
              <td style={{ padding: '25px', color: '#ffd700' }}>مزايدة نشطة</td>
              <td style={{ padding: '25px' }}><button style={bidButtonStyle}>دخول المزاد</button></td>
            </tr>
            <tr style={tableRowStyle}>
              <td style={{ padding: '25px', fontWeight: 'bold' }}>نحاس أحمر</td>
              <td style={{ padding: '25px' }}>12 طن</td>
              <td style={{ padding: '25px', color: '#00ffaa' }}>متاح للبيع</td>
              <td style={{ padding: '25px' }}><button style={bidButtonStyle}>شراء فوري</button></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

// تنسيقات العناصر لضمان الوضوح
const statCardStyle = (color: string) => ({
  padding: '40px',
  backgroundColor: '#0a151a',
  borderRadius: '25px',
  border: `1px solid ${color}44`,
  textAlign: 'center' as const,
  boxShadow: `0 10px 30px ${color}11`
});

const tableRowStyle = {
  borderBottom: '1px solid #1a3a3a',
  transition: 'background 0.3s'
};

const bidButtonStyle = {
  backgroundColor: '#00ffaa',
  color: '#050a0f',
  border: 'none',
  padding: '12px 30px',
  borderRadius: '12px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer'
};
