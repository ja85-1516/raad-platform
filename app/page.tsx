import { createClient } from '@supabase/supabase-js'

export default async function RaadDashboard() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: scrap } = await supabase.from('scrap_inventory').select('*')

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', direction: 'rtl' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '3px solid #2ecc71', paddingBottom: '20px' }}>
        <h1 style={{ color: '#1a365d', fontSize: '2.5rem' }}>منصة راد | RAAD Platform</h1>
        <p style={{ color: '#4a5568', fontSize: '1.2rem' }}>النظام العالمي لتتبع الخردة وأثر الكربون 🌍</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {scrap?.map((item) => (
          <div key={item.id} style={{ background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', borderRight: '10px solid #2ecc71' }}>
            <h2 style={{ color: '#2d3748', marginTop: '0' }}>📦 المادة: {item.material_type === 'Copper' ? 'نحاس' : item.material_type}</h2>
            <p style={{ fontSize: '1.1rem' }}>⚖️ **الوزن:** {item.weight_kg} كجم</p>
            <p style={{ fontSize: '1.1rem', color: '#2f855a' }}>🌱 **توفير الكربون:** {item.carbon_saved_kg} كجم CO2</p>
            <p style={{ color: '#a0aec0', fontSize: '0.9rem' }}>📅 التاريخ: {new Date(item.created_at).toLocaleDateString('ar-SA')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
