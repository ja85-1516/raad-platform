"use client"
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RaadArabicSovereignDashboard() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: inventory } = await supabase.from('scrap_inventory').select('*')
      if (inventory) setData(inventory)
    }
    fetchData()
    const subscription = setInterval(fetchData, 5000)
    return () => clearInterval(subscription)
  }, [])

  return (
    <div dir="rtl" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '30px' }}>
      
      {/* Header السيادي: الهوية الوطنية */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #1a1a1a', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#00ff88', margin: 0 }}>راد | RAAD</h1>
            <p style={{ color: '#888', fontSize: '1.1rem', marginTop: '5px' }}>نظام السيادة الرقمية على الموارد الثانوية - المملكة العربية السعودية</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Saudi_Vision_2030_logo.svg" alt="رؤية 2030" style={{ height: '70px', filter: 'brightness(0) invert(1)' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg" alt="علم السعودية" style={{ height: '55px', borderRadius: '8px', border: '1px solid #333' }} />
          </div>
          <div style={{ background: '#0a1a12', border: '1px solid #00ff88', padding: '12px 25px', borderRadius: '15px' }}>
            <div style={{ color: '#00ff88', fontSize: '0.85rem' }}>توقيت النظام الموحد</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>2026.02.12</div>
          </div>
        </div>
      </header>

      {/* لوحة المؤشرات الاستراتيجية */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '40px' }}>
        <StatBox title="وفر الكربون التراكمي الموثق" value="1,284.5" unit="طن CO2" color="#00ff88" label="متوافق مع مبادرة السعودية الخضراء" />
        <StatBox title="مؤشر ندرة المعادن (الخردة الإلكترونية)" value="84.2" unit="مؤشر" color="#ffcc00" label="رصد عالي لليثيوم والذهب والنحاس" />
        <StatBox title="جاهزية الإمداد الصناعي" value="92" unit="%" color="#00d1ff" label="عقود تجميع ذكية نشطة محلياً" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '35px' }}>
        
        {/* قسم البورصة والمزاد الحي */}
        <div style={{ background: '#080808', borderRadius: '25px', padding: '35px', border: '1px solid #1a1a1a', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>بورصة راد للموارد (المزاد الحي)</h2>
            <div style={{ background: '#ff4444', color: '#fff', padding: '8px 20px', borderRadius: '25px', fontSize: '0.9rem', fontWeight: 'bold', animation: 'pulse 2s infinite' }}>مزاد حي الآن</div>
          </div>
          <table style={{ width: '100%', textAlign: 'right', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#555', borderBottom: '2px solid #222' }}>
                <th style={{ padding: '20px' }}>المورد / المنشأ</th>
                <th>المادة الاستراتيجية</th>
                <th>الكتلة الموثقة</th>
                <th>البصمة الكربونية</th>
                <th>المزايدة الحالية</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #111', transition: '0.3s' }}>
                  <td style={{ padding: '25px 20px', color: '#888' }}>تجمع المصانع المركزية</td>
                  <td style={{ fontWeight: 'bold', color: '#00ff88', fontSize: '1.2rem' }}>{item.material_type}</td>
                  <td style={{ fontSize: '1.1rem' }}>{item.weight_kg?.toLocaleString()} كجم</td>
                  <td style={{ color: '#ffcc00' }}>-{item.carbon_saved_kg} كجم CO2</td>
                  <td>
                    <button style={{ background: '#00ff88', color: '#000', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                      زايد بـ: {Math.floor(item.weight_kg * 4.5).toLocaleString()} ريال
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ذكاء راد الاصطناعي RAAD-AI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ background: 'linear-gradient(145deg, #0a0a0a, #151515)', padding: '35px', borderRadius: '25px', border: '1px solid #333' }}>
            <h3 style={{ color: '#00ff88', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>🧠 رؤية RAAD-AI الاستباقية</h3>
            <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '1.1rem' }}>
              بناءً على تحليل <span style={{ color: '#fff' }}>1000 خوارزمية</span> لبورصة المعادن العالمية، نتوقع ارتفاع سعر النحاس بنسبة <span style={{ color: '#00ff88' }}>12.5%</span>. نوصي بتجميد البيع المباشر حالياً لتعظيم العائد السيادي.
            </p>
            <div style={{ background: '#000', padding: '20px', borderRadius: '15px', border: '1px dashed #ffcc00', marginTop: '25px' }}>
              <span style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '0.9rem' }}>توصية الأمن الموردي:</span>
              <div style={{ color: '#fff', marginTop: '8px', fontSize: '1.1rem' }}>توجيه الموارد نحو المصانع الوطنية لدعم المحتوى المحلي</div>
            </div>
          </div>

          <div style={{ background: '#00ff88', color: '#000', padding: '35px', borderRadius: '25px', textAlign: 'center', cursor: 'pointer', transition: '0.3s' }}>
            <h4 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '900' }}>إصدار تقرير السيادة الفوري</h4>
            <p style={{ fontSize: '1rem', marginTop: '8px', opacity: 0.8 }}>تقرير الأثر الاقتصادي والبيئي الموثق</p>
          </div>
        </div>
      </div>
      <style jsx>{` @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } } `}</style>
    </div>
  )
}

function StatBox({ title, value, unit, color, label }: any) {
  return (
    <div style={{ background: '#0a0a0a', padding: '35px', borderRadius: '30px', border: '1px solid #1a1a1a', textAlign: 'center' }}>
      <p style={{ color: '#777', fontSize: '1.1rem', marginBottom: '15px' }}>{title}</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '10px' }}>
        <span style={{ fontSize: '3.8rem', fontWeight: '900', color: '#fff' }}>{value}</span>
        <span style={{ color: color, fontWeight: 'bold', fontSize: '1.4rem' }}>{unit}</span>
      </div>
      <p style={{ color: '#444', fontSize: '0.9rem', marginTop: '15px' }}>{label}</p>
    </div>
  )
}
