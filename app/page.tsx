"use client"
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// ربط المحرك السيادي ببيانات راد الحقيقية
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RaadUltimateMVP() {
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
    <div dir="rtl" style={{ backgroundColor: '#020202', color: '#f0f0f0', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '30px' }}>
      
      {/* الجزء العلوي: الهوية السيادية */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderRight: '5px solid #00ff88', paddingRight: '20px' }}>
        <div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fff', margin: 0 }}>راد <span style={{ color: '#00ff88' }}>| RAAD</span></h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>المنصة السيادية السعودية للتحكم في الموارد الاستراتيجية والمناجم الحضرية</p>
        </div>
        <div style={{ textAlign: 'left', background: 'rgba(0,255,136,0.1)', padding: '15px', borderRadius: '12px', border: '1px solid #00ff88' }}>
          <div style={{ fontSize: '0.8rem', color: '#00ff88' }}>حالة النظام: متصل بالذكاء الاصطناعي العالمي</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{new Date().toLocaleDateString('en-GB')}</div>
        </div>
      </div>

      {/* المؤشرات الثلاثية الكبرى (The Power of 3) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginBottom: '40px' }}>
        <HeroCard title="وفر الكربون التراكمي الموثق" value="1,284.5" unit="MT CO2e" color="#00ff88" desc="موافق لمعايير رؤية السعودية 2030" />
        <HeroCard title="مؤشر المعادن النادرة المرصودة" value="84.2" unit="Scarcity Index" color="#ffcc00" desc="رصد (ليثيوم، كوبالت، ذهب) في النفايات الإلكترونية" />
        <HeroCard title="جاهزية الإمداد الصناعي (Local/Global)" value="92" unit="%" color="#00d1ff" desc="عقود تجميع ذكية نشطة للتصدير المباشر" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '30px' }}>
        
        {/* قسم المزاد والعمليات الحية */}
        <div style={{ background: '#0a0a0a', borderRadius: '20px', padding: '30px', border: '1px solid #1a1a1a', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>بورصة راد للموارد (المزاد الحي)</h2>
            <div style={{ background: '#ff4444', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>LIVE BIDDING</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
            <thead>
              <tr style={{ color: '#444', borderBottom: '2px solid #1a1a1a' }}>
                <th style={{ padding: '15px' }}>المورد / المصنع</th>
                <th>المادة الاستراتيجية</th>
                <th>الكتلة الموثقة</th>
                <th>البصمة الكربونية</th>
                <th>أعلى مزايدة حالية</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #111', transition: '0.3s' }}>
                  <td style={{ padding: '15px', color: '#aaa' }}>مصانع المنطقة المركزية</td>
                  <td style={{ fontWeight: 'bold', color: '#00ff88' }}>{item.material_type}</td>
                  <td>{item.weight_kg} كجم</td>
                  <td style={{ color: '#ffcc00' }}>-{item.carbon_saved_kg} kg CO2</td>
                  <td>
                    <button style={{ background: '#00ff88', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                      مزايدة: {Math.floor(item.weight_kg * 4.5)} ريال
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* محرك التنبؤ والذكاء الاصطناعي (The AI Brain) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)', borderRadius: '20px', padding: '25px', border: '1px solid #333' }}>
            <h3 style={{ color: '#00ff88', marginBottom: '15px' }}>🧠 رؤية RAAD-AI الاستباقية</h3>
            <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: '1.6' }}>
              بناءً على تحليل <span style={{ color: '#fff' }}>1000 خوارزمية</span> لبورصة المعادن العالمية LME، نتوقع ارتفاع سعر النحاس بنسبة <span style={{ color: '#00ff88' }}>12.5%</span> خلال الـ 48 ساعة القادمة. نوصي بتجميد البيع المباشر وفتح المزاد الدولي الموحد.
            </p>
            <div style={{ marginTop: '20px', padding: '15px', background: '#000', borderRadius: '12px', border: '1px dashed #444' }}>
              <span style={{ fontSize: '0.8rem', color: '#888' }}>توصية السيادة:</span>
              <div style={{ color: '#ffcc00', fontWeight: 'bold' }}>توجيه الموارد نحو المصانع المحلية (الاكتفاء الذاتي)</div>
            </div>
          </div>

          <div style={{ background: '#0a0a0a', borderRadius: '20px', padding: '25px', border: '1px solid #1a1a1a', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '15px' }}>إجمالي القيمة الموثقة للتصدير</h4>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>SAR 4,820,000</div>
            <button style={{ width: '100%', marginTop: '20px', padding: '15px', borderRadius: '12px', background: 'transparent', border: '2px solid #00ff88', color: '#00ff88', fontWeight: 'bold', cursor: 'pointer' }}>
              تصدير تقرير الحوكمة والسيادة
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

function HeroCard({ title, value, unit, color, desc }: any) {
  return (
    <div style={{ background: '#0a0a0a', padding: '30px', borderRadius: '24px', border: '1px solid #1a1a1a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: color, filter: 'blur(80px)', opacity: 0.1 }}></div>
      <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '15px' }}>{title}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        <span style={{ fontSize: '3rem', fontWeight: '900', color: '#fff' }}>{value}</span>
        <span style={{ color: color, fontWeight: 'bold', fontSize: '1.2rem' }}>{unit}</span>
      </div>
      <p style={{ color: '#444', fontSize: '0.8rem', marginTop: '15px' }}>{desc}</p>
    </div>
  )
}
