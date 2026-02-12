"use client"
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// إعداد الاتصال
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RaadSovereignDashboard() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const { data: inventory } = await supabase.from('scrap_inventory').select('*')
      if (inventory) setData(inventory)
      setLoading(false)
    }
    fetchStats()
  }, [])

  return (
    <div dir="rtl" style={{ backgroundColor: '#050505', color: '#e0e0e0', minHeight: '100vh', fontFamily: 'Inter, sans-serif', padding: '20px' }}>
      
      {/* Header السيادي */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00ff88', letterSpacing: '-1px' }}>راد | RAAD</h1>
          <p style={{ color: '#888' }}>نظام السيادة الرقمية على الموارد الثانوية - المملكة العربية السعودية</p>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '0.8rem', color: '#00ff88' }}>● نظام حي (LIVE)</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>2026.02.12</div>
        </div>
      </header>

      {/* بطاقات المؤشرات الكبرى - تسبق العالم بـ 5 سنوات */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <StatCard title="إجمالي الوفر الكربوني الموثق" value="1,284" unit="طن CO2" color="#00ff88" subtitle="موافق لمعايير السعودية الخضراء" />
        <StatCard title="قيمة المعادن النادرة المرصودة" value="4.2M" unit="ريال" color="#ffcc00" subtitle="ذهب، ليثيوم، كوبالت (مستخرجة حضرياً)" />
        <StatCard title="جاهزية التصدير / البيع الكلي" value="89%" unit="Capacity" color="#00d1ff" subtitle="عقود تجميع ذكية نشطة" />
      </div>

      {/* المزاد والبيانات الحية */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {/* قسم المخزون والمزادات */}
        <div style={{ background: '#111', borderRadius: '15px', padding: '25px', border: '1px solid #222' }}>
          <h2 style={{ marginBottom: '20px', borderRight: '4px solid #00ff88', paddingRight: '15px' }}>مركز التحكم في الموارد (المناجم الحضرية)</h2>
          <table style={{ width: '100%', textAlign: 'right', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#555', borderBottom: '1px solid #222' }}>
                <th style={{ padding: '15px' }}>المادة الاستراتيجية</th>
                <th>الكتلة (كجم)</th>
                <th>البصمة الكربونية</th>
                <th>حالة المزاد</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: '#fff' }}>{item.material_type}</td>
                  <td>{item.weight_kg?.toLocaleString()}</td>
                  <td style={{ color: '#00ff88' }}>-{item.carbon_saved_kg} kg</td>
                  <td>
                    <span style={{ background: '#1a332a', color: '#00ff88', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem' }}>نشط الآن</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ذكاء راد الاصطناعي (AI Insights) */}
        <div style={{ background: 'linear-gradient(145deg, #0a0a0a, #151515)', borderRadius: '15px', padding: '25px', border: '1px solid #333' }}>
          <h3 style={{ color: '#ffcc00', marginBottom: '20px' }}>⚡ رؤية راد الذكية (RAAD AI)</h3>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '0.9rem', color: '#aaa' }}>توقعات العائد المالي القادم:</p>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>+12.5%</div>
            <p style={{ fontSize: '0.7rem', color: '#00ff88' }}>بناءً على بورصة لندن للمعادن (LME)</p>
          </div>
          <div style={{ padding: '15px', background: '#000', borderRadius: '10px', fontSize: '0.85rem', lineHeight: '1.6', color: '#ccc' }}>
            تنبيه: رصد زيادة في استخراج "النحاس الأحمر" في منطقة الرياض. نوصي بفتح مزاد تجميع دولي لرفع السعر بنسبة 18%.
          </div>
          <button style={{ width: '100%', marginTop: '20px', padding: '12px', borderRadius: '8px', border: 'none', background: '#00ff88', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>
            إصدار تقرير السيادة للمسؤولين
          </button>
        </div>

      </div>
    </div>
  )
}

function StatCard({ title, value, unit, color, subtitle }: any) {
  return (
    <div style={{ background: '#111', padding: '25px', borderRadius: '15px', borderBottom: `4px solid ${color}` }}>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>{title}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>{value}</span>
        <span style={{ color: color, fontWeight: 'bold' }}>{unit}</span>
      </div>
      <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '10px' }}>{subtitle}</p>
    </div>
  )
}
