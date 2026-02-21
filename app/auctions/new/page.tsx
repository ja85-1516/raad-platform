'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const carbonFactors: any = {
  'نحاس': 3.0,
  'ألومنيوم': 9.0,
  'حديد': 1.2,
  'بلاستيك': 1.5,
  'إلكترونيات': 22.5,
  'ليثيوم': 120.0,
  'ذهب': 1200.0,
  'زجاج': 0.3,
  'ورق': 0.7,
}

export default function NewAuction() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    material_type: 'نحاس',
    weight_kg: '',
    location: '',
    starting_price: '',
    hours: '24',
  })

  const carbonSaved = form.weight_kg
    ? (parseFloat(form.weight_kg) * (carbonFactors[form.material_type] || 1.0)).toFixed(1)
    : '0'

  const handleSubmit = async () => {
    if (!form.weight_kg || !form.location || !form.starting_price) {
      alert('يرجى تعبئة جميع الحقول')
      return
    }
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }

      const qrCode = `RAAD-${Date.now()}-${Math.random().toString(36).substr(2,9).toUpperCase()}`
      const endsAt = new Date(Date.now() + parseInt(form.hours) * 3600000).toISOString()

      const { error } = await supabase.from('auctions').insert({
        user_id: user.id,
        material_type: form.material_type,
        weight_kg: parseFloat(form.weight_kg),
        location: form.location,
        starting_price: parseFloat(form.starting_price),
        current_price: parseFloat(form.starting_price),
        carbon_saved_kg: parseFloat(carbonSaved),
        qr_code: qrCode,
        ends_at: endsAt,
        status: 'active',
      })
      if (error) throw error
      setSuccess(true)
      setTimeout(() => router.push('/auctions/live'), 2000)
    } catch (err: any) {
      alert('خطأ: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div style={{ minHeight:'100vh', background:'#050a0f', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Tajawal,sans-serif' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:'5rem', marginBottom:'24px' }}>✅</div>
        <h2 style={{ fontSize:'2rem', color:'#00ffaa', marginBottom:'12px' }}>تم رفع المزاد بنجاح!</h2>
        <p style={{ color:'#888' }}>جاري التحويل للمزادات المباشرة...</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#050a0f', fontFamily:'Tajawal,sans-serif', color:'#e6f7ff', direction:'rtl' }}>

      {/* الهيدر */}
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 48px', borderBottom:'1px solid rgba(0,255,170,0.1)', flexWrap:'wrap', gap:'16px' }}>
        <Link href="/" style={{ fontSize:'2rem', fontWeight:'800', background:'linear-gradient(90deg,#00ffaa,#ffd700)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', textDecoration:'none' }}>
          راد | RAAD
        </Link>
        <Link href="/auctions/live" style={{ color:'#888', textDecoration:'none', fontSize:'1.1rem' }}>
          ← المزادات المباشرة
        </Link>
      </header>

      <main style={{ maxWidth:'600px', margin:'0 auto', padding:'48px 24px' }}>

        {/* العنوان */}
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <h1 style={{ fontSize:'2.5rem', fontWeight:'800', background:'linear-gradient(90deg,#00ffaa,#ffd700)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'8px' }}>
            🚀 رفع مزاد جديد
          </h1>
          <p style={{ color:'#888', fontSize:'1.1rem' }}>البصمة الكربونية تُحسب تلقائياً</p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>

          {/* نوع المادة */}
          <div>
            <label style={{ display:'block', marginBottom:'8px', color:'#00ffaa', fontWeight:'600' }}>نوع المادة</label>
            <select value={form.material_type} onChange={e => setForm({...form, material_type:e.target.value})}
              style={{ width:'100%', padding:'14px', background:'rgba(10,21,26,0.9)', border:'1px solid rgba(0,255,170,0.3)', borderRadius:'12px', color:'#e6f7ff', fontSize:'1.1rem', outline:'none' }}>
              {Object.keys(carbonFactors).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* الوزن */}
          <div>
            <label style={{ display:'block', marginBottom:'8px', color:'#00ffaa', fontWeight:'600' }}>الوزن (كيلوغرام)</label>
            <input type="number" placeholder="مثال: 5000" value={form.weight_kg}
              onChange={e => setForm({...form, weight_kg:e.target.value})}
              style={{ width:'100%', padding:'14px', background:'rgba(10,21,26,0.9)', border:'1px solid rgba(0,255,170,0.3)', borderRadius:'12px', color:'#e6f7ff', fontSize:'1.1rem', outline:'none', boxSizing:'border-box' }} />
          </div>

          {/* الموقع */}
          <div>
            <label style={{ display:'block', marginBottom:'8px', color:'#00ffaa', fontWeight:'600' }}>الموقع</label>
            <input type="text" placeholder="مثال: الرياض" value={form.location}
              onChange={e => setForm({...form, location:e.target.value})}
              style={{ width:'100%', padding:'14px', background:'rgba(10,21,26,0.9)', border:'1px solid rgba(0,255,170,0.3)', borderRadius:'12px', color:'#e6f7ff', fontSize:'1.1rem', outline:'none', boxSizing:'border-box' }} />
          </div>

          {/* السعر الابتدائي */}
          <div>
            <label style={{ display:'block', marginBottom:'8px', color:'#00ffaa', fontWeight:'600' }}>السعر الابتدائي (ريال)</label>
            <input type="number" placeholder="مثال: 10000" value={form.starting_price}
              onChange={e => setForm({...form, starting_price:e.target.value})}
              style={{ width:'100%', padding:'14px', background:'rgba(10,21,26,0.9)', border:'1px solid rgba(0,255,170,0.3)', borderRadius:'12px', color:'#e6f7ff', fontSize:'1.1rem', outline:'none', boxSizing:'border-box' }} />
          </div>

          {/* مدة المزاد */}
          <div>
            <label style={{ display:'block', marginBottom:'8px', color:'#00ffaa', fontWeight:'600' }}>مدة المزاد</label>
            <select value={form.hours} onChange={e => setForm({...form, hours:e.target.value})}
              style={{ width:'100%', padding:'14px', background:'rgba(10,21,26,0.9)', border:'1px solid rgba(0,255,170,0.3)', borderRadius:'12px', color:'#e6f7ff', fontSize:'1.1rem', outline:'none' }}>
              <option value="6">٦ ساعات</option>
              <option value="12">١٢ ساعة</option>
              <option value="24">٢٤ ساعة</option>
              <option value="48">٤٨ ساعة</option>
            </select>
          </div>

          {/* البصمة الكربونية */}
          {form.weight_kg && (
            <div style={{ padding:'20px', background:'rgba(0,255,170,0.08)', border:'1px solid rgba(0,255,170,0.3)', borderRadius:'16px', textAlign:'center' }}>
              <div style={{ color:'#888', fontSize:'0.95rem', marginBottom:'8px' }}>🌱 الكربون الموفر (محتسب تلقائياً)</div>
              <div style={{ fontSize:'2.5rem', fontWeight:'800', color:'#00ffaa' }}>
                {parseFloat(carbonSaved).toLocaleString('ar-SA')} كغ
              </div>
              <div style={{ color:'#555', fontSize:'0.85rem', marginTop:'6px' }}>معايير EPA و IPCC الدولية</div>
            </div>
          )}

          {/* زر الرفع */}
          <button onClick={handleSubmit} disabled={loading}
            style={{ width:'100%', padding:'18px', background:loading ? 'rgba(0,255,170,0.3)' : 'linear-gradient(90deg,#00ffaa,#00cc88)', color:'#050a0f', border:'none', borderRadius:'16px', fontSize:'1.3rem', fontWeight:'800', cursor:loading?'not-allowed':'pointer', boxShadow:'0 0 30px rgba(0,255,170,0.4)' }}>
            {loading ? 'جاري الرفع...' : '🚀 رفع المزاد الآن'}
          </button>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700;800&display=swap');
      `}} />
    </div>
  )
}