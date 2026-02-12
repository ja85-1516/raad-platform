"use client"
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export default function RaadLiveDashboard() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    supabase.from('scrap_inventory').select('*').then(({ data }) => {
      if (data) setItems(data)
    })
  }, [])

  return (
    <div style={{ backgroundColor: '#1a365d', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', direction: 'rtl', padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', borderBottom: '5px solid #2ecc71', display: 'inline-block', paddingBottom: '10px' }}>منصة راد | RAAD</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '15px', color: '#cbd5e0' }}>لوحة تتبع البيانات الحية 🚀</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '40px auto' }}>
        {items.map((item) => (
          <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '25px', borderRadius: '20px', border: '1px solid #2ecc71' }}>
            <h2 style={{ color: '#2ecc71' }}>📦 {item.material_type}</h2>
            <p style={{ fontSize: '1.4rem' }}>الوزن: {item.weight_kg} كجم</p>
            <div style={{ background: '#2ecc71', color: '#1a365d', padding: '10px', borderRadius: '10px', fontWeight: 'bold' }}>
              🌱 كربون مُوفر: {item.carbon_saved_kg} كجم
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p>جاري تحميل البيانات من الخادم...</p>}
    </div>
  )
}
