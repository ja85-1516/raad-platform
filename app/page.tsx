"use client"
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Leaf, Zap, Globe, TrendingUp, Brain } from 'lucide-react'

// الربط مع Supabase باستخدام المفاتيح التي وضعتها في Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function RaadDashboard() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data: inventory } = await supabase
        .from('scrap_inventory')
        .select('*')
        .limit(5)
      
      if (inventory && inventory.length > 0) {
        setData(inventory)
      } else {
        // بيانات تجريبية في حال كانت القاعدة فارغة لضمان ظهور العرض للمستثمر
        setData([
          { id: 1, material_type: "نحاس", weight_kg: 1250, last_bid: 5600, origin: "الرياض" },
          { id: 2, material_type: "ألومنيوم", weight_kg: 890, last_bid: 3200, origin: "جدة" }
        ])
      }
    }
    fetchData()
  }, [])

  return (
    <div dir="rtl" className="min-h-screen bg-[#050a0f] text-[#e6f7ff] p-8 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-12 border-b border-[#1a3a3a] pb-6">
        <div>
          <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#00ffaa] to-[#ffd700]">
            راد | RAAD
          </h1>
          <p className="text-[#00ffaa] mt-2 tracking-widest text-sm">منصة السيادة الرقمية للموارد</p>
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Saudi_Vision_2030_logo.svg" className="h-16 brightness-200" alt="Vision 2030" />
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#0a151a] p-6 rounded-2xl border border-[#00ffaa]/20 shadow-[0_0_15px_rgba(0,255,170,0.1)]">
          <Leaf className="text-[#00ffaa] mb-4 w-10 h-10" />
          <h3 className="text-gray-400 text-sm">الكربون الموفر</h3>
          <p className="text-3xl font-bold">1,284.5 <span className="text-sm">طن</span></p>
        </div>
        <div className="bg-[#0a151a] p-6 rounded-2xl border border-[#ffd700]/20 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
          <TrendingUp className="text-[#ffd700] mb-4 w-10 h-10" />
          <h3 className="text-gray-400 text-sm">قيمة التداولات</h3>
          <p className="text-3xl font-bold">4.2M <span className="text-sm">ريال</span></p>
        </div>
        <div className="bg-[#0a151a] p-6 rounded-2xl border border-[#00f3ff]/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
          <Brain className="text-[#00f3ff] mb-4 w-10 h-10" />
          <h3 className="text-gray-400 text-sm">دقة توقعات AI</h3>
          <p className="text-3xl font-bold">98%</p>
        </div>
      </div>

      {/* Live Market */}
      <div className="bg-[#0a151a] rounded-3xl border border-[#1a3a3a] overflow-hidden">
        <div className="p-6 bg-[#081015] border-b border-[#1a3a3a] flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Zap className="text-[#ffd700]" /> بورصة الموارد المباشرة
          </h2>
          <span className="flex items-center gap-2 text-xs text-[#ff5252] animate-pulse">
            <span className="w-2 h-2 bg-[#ff5252] rounded-full"></span> بث حي من المصانع
          </span>
        </div>
        <table className="w-full text-right">
          <thead className="text-gray-500 text-sm">
            <tr>
              <th className="p-6">المادة</th>
              <th className="p-6">الكمية</th>
              <th className="p-6">المصدر</th>
              <th className="p-6">أعلى مزايدة</th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t border-[#1a3a3a] hover:bg-[#0c1a20] transition-colors">
                <td className="p-6 font-bold text-lg">{item.material_type}</td>
                <td className="p-6 font-mono">{item.weight_kg} كجم</td>
                <td className="p-6 text-gray-400">{item.origin}</td>
                <td className="p-6 text-[#ffd700] font-bold">{item.last_bid} ر.س</td>
                <td className="p-6">
                  <button className="bg-gradient-to-r from-[#00ffaa] to-[#00cc88] text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">
                    مزايدة
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
