import { createClient } from '@supabase/supabase-js'

export default async function RaadLiveDashboard() {
  // الاتصال بقاعدة البيانات
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // سحب البيانات من جدول الخردة
  const { data: scrapItems } = await supabase.from('scrap_inventory').select('*')

  return (
    <div style={{ backgroundColor: '#1a365d', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', direction: 'rtl', padding: '40px' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', borderBottom: '5px solid #2ecc71', display: 'inline-block', paddingBottom: '10px' }}>
          منصة راد | RAAD
        </h1>
        <p style={{ fontSize: '1.2rem', marginTop: '15px', color: '#cbd5e0' }}>بيانات تتبع الخردة المباشرة 🚀</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
        {scrapItems?.map((item) => (
          <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(46, 204, 113, 0.3)', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: '#2ecc71', marginTop: '0' }}>📦 {item.material_type === 'Copper' ? 'نحاس' : item.material_type}</h2>
            <p style={{ fontSize: '1.3rem', margin: '10px 0' }}>⚖️ الوزن: <strong>{item.weight_kg}</strong> كجم</p>
            <div style={{ background: '#2ecc71', color: '#1a365d', padding: '10px', borderRadius: '10px', fontWeight: 'bold', textAlign: 'center' }}>
              🌱 كربون مُوفر: {item.carbon_saved_kg} كجم
            </div>
            <p style={{ color: '#a0aec0', fontSize: '0.8rem', marginTop: '15px' }}>🆔 رقم التتبع: {item.id.substring(0,8)}...</p>
          </div>
        ))}
      </div>
      
      {(!scrapItems || scrapItems.length === 0) && (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>جاري سحب البيانات من Supabase...</p>
      )}
    </div>
  )
}
