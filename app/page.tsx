"use client"
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RaadVision2030Dashboard() {
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
    <div dir="rtl" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '30px' }}>
      
      {/* Header السيادي: الهوية الوطنية الكاملة */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #1a1a1a', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* شعار راد */}
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#00ff88', margin: 0 }}>راد | RAAD</h1>
            <p style={{ color: '#888', fontSize: '1rem', marginTop: '5px' }}>المنصة السيادية للتحكم في الموارد الاستراتيجية</p>
          </div>
        </div>

        {/* الرموز الوطنية: العلم والرؤية */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Saudi_Vision_2030_logo.svg" alt="Vision 2030" style={{ height: '60px', filter: 'brightness(0) invert(1)' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg" alt="Saudi Flag" style={{ height: '50px', borderRadius: '5px', border: '1px solid #333' }} />
          </div>
          <div style={{ background: '#0a1a12', border: '1px solid #00ff88', padding: '10px 20px', borderRadius: '12px' }}>
            <div style={{ color: '#00ff88', fontSize: '0.8rem' }}>التاريخ المرجعي</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>2026.02.12</div>
          </div>
        </div>
      </header>

      {/* لوحة المؤشرات الاستراتيجية (The Pillars) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '40px' }}>
        <StatBox title="وفر الكربون التراكمي الموثق" value="1,284.5" unit="MT CO2e" color="#00ff88" label="موافق لمعايير رؤية 2030" />
        <StatBox title="مؤشر ندرة المعادن (E-Waste)" value="84.2" unit="Index" color="#ffcc00" label="رصد (ليثيوم، كوبالت، ذهب)" />
        <StatBox title="جاهزية الإمداد الصناعي" value="92" unit="%" color="#00d1ff" label="عقود تجميع ذكية نشطة" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '30px' }}>
        
        {/* قسم البورصة والمزاد الحي */}
        <div style={{ background: '#080808', borderRadius: '25px', padding: '30px', border: '1px solid #111' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '1.8rem' }}>بورصة راد للموارد (المزاد الحي)</h2>
            <div style={{ background: '#ff4444', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>LIVE BIDDING</div>
          </div>
          <table style={{ width: '100%', textAlign: 'right', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#444', borderBottom: '2px solid #111' }}>
                <th style={{ padding: '15px' }}>المورد / المصنع</th>
                <th>المادة الاستراتيجية</th>
                <th>الكتلة الموثقة</th>
                <th>البصمة الكربونية</th>
                <th>أعلى مزايدة حالية</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #111' }}>
                  <td style={{ padding: '20px 15px', color: '#777' }}>مصانع المنطقة
