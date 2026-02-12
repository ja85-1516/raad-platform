"use client"
import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@supabase/supabase-js'
import { 
  Zap, 
  Leaf, 
  TrendingUp, 
  Database, 
  Brain, 
  AlertCircle,
  Clock,
  Award,
  Recycle,
  Globe
} from 'lucide-react'

// تأكد من إضافة هذه المتغيرات في إعدادات Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const COLORS = {
  primary: '#00ffaa',
  secondary: '#ffd700',
  accent: '#00f3ff',
  dark: '#050a0f',
  surface: '#0a151a',
  success: '#00e676',
  warning: '#ffab00'
}

export default function RaadDashboard() {
  const [data, setData] = useState<any[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeBid, setActiveBid] = useState<number | null>(null)
  const [aiInsight, setAiInsight] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!supabaseUrl) {
           setData(generateDemoData());
           return;
        }
        const { data: inventory, error } = await supabase
          .from('scrap_inventory')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8)
        
        if (error) throw error
        setData(inventory || generateDemoData())
      } catch (err) {
        setData(generateDemoData())
      }
    }
    fetchData()
  }, [])

  const generateDemoData = () => [
    { id: 1, material_type: "نحاس", weight_kg: 1250, carbon_saved_kg: 3800, origin: "الرياض", last_bid: 5600 },
    { id: 2, material_type: "ألومنيوم", weight_kg: 890, carbon_saved_kg: 2100, origin: "جدة", last_bid: 3200 }
  ]

  const formattedTime = useMemo(() => currentTime.toLocaleTimeString('ar-SA'), [currentTime])
  const formattedDate = useMemo(() => currentTime.toLocaleDateString('ar-SA'), [currentTime])

  return (
    <div dir="rtl" className="min-h-screen p-6 text-white" style={{ backgroundColor: COLORS.dark }}>
       {/* شعار "راد" الكبير في المنتصف لجذب المستثمر */}
       <header className="text-center mb-12">
          <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#00ffaa] to-[#ffd700]">
            راد | RAAD
          </h1>
          <p className="mt-4 text-xl text-gray-400">منصة السيادة الرقمية لإعادة التدوير</p>
       </header>

       {/* شبكة البيانات */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl border border-[#1a3a3a] bg-[#0a151a] text-center">
             <Leaf className="w-12 h-12 text-[#00ffaa] mx-auto mb-4" />
             <h3 className="text-gray-400">الكربون الموفر</h3>
             <p className="text-4xl font-bold">1,284 طن</p>
          </div>
          <div className="p-8 rounded-2xl border border-[#1a3a3a] bg-[#0a151a] text-center">
             <Zap className="w-12 h-12 text-[#ffd700] mx-auto mb-4" />
             <h3 className="text-gray-400">مزادات نشطة</h3>
             <p className="text-4xl font-bold">14 مزاد</p>
          </div>
          <div className="p-8 rounded-2xl border border-[#1a3a3a] bg-[#0a151a] text-center">
             <Globe className="w-12 h-12 text-[#00f3ff] mx-auto mb-4" />
             <h3 className="text-gray-400">المناطق المغطاة</h3>
             <p className="text-4xl font-bold">كل المملكة</p>
          </div>
       </div>

       {/* جدول المزايدة المبسط لضمان عمله */}
       <div className="mt-12 overflow-hidden rounded-xl border border-[#1a3a3a]">
          <table className="w-full text-right bg-[#0a151a]">
             <thead className="bg-[#050a0f] text-gray-400 uppercase">
                <tr>
                   <th className="p-4">المادة</th>
                   <th className="p-4">الكمية</th>
                   <th className="p-4">أعلى مزايدة</th>
                   <th className="p-4">الإجراء</th>
                </tr>
             </thead>
             <tbody>
                {data.map((item) => (
                   <tr key={item.id} className="border-t border-[#1a3a3a]">
                      <td className="p-4 font-bold">{item.material_type}</td>
                      <td className="p-4">{item.weight_kg} كجم</td>
                      <td className="p-4 text-[#ffd700]">{item.last_bid} ر.س</td>
                      <td className="p-4">
                         <button className="bg-[#00ffaa] text-black px-4 py-2 rounded-lg font-bold">زايد</button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  )
}
