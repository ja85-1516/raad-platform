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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Saudi-themed color palette with futuristic accents
const COLORS = {
  primary: '#00ffaa',    // Vibrant green (Saudi heritage)
  secondary: '#ffd700',  // Gold (royal accent)
  accent: '#00f3ff',     // Cyan (tech/future)
  dark: '#050a0f',       // Deep space background
  surface: '#0a151a',    // Card surface
  border: '#1a3a3a',     // Subtle borders
  success: '#00e676',
  warning: '#ffab00',
  critical: '#ff5252'
}

// Animated gradient border component
const GradientBorder = ({ children, intensity = 1 }) => (
  <div className="relative rounded-2xl p-0.5 bg-gradient-to-r from-[#00ffaa] via-[#ffd700] to-[#00f3ff] animate-border-spin">
    <div className="bg-[#050a0f] rounded-xl">
      {children}
    </div>
  </div>
)

// Saudi pattern overlay (subtle geometric design)
const SaudiPattern = () => (
  <div 
    className="absolute inset-0 opacity-5 pointer-events-none"
    style={{
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(0, 255, 170, 0.1) 0%, transparent 20%),
        radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 20%),
        repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 243, 255, 0.05) 10px, rgba(0, 243, 255, 0.05) 20px)
      `
    }}
  />
)

export default function RaadArabicSovereignDashboard() {
  const [data, setData] = useState<any[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeBid, setActiveBid] = useState<number | null>(null)
  const [aiInsight, setAiInsight] = useState(0)

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Data fetching with error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {  inventory, error } = await supabase
          .from('scrap_inventory')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8)
        
        if (error) throw error
        if (inventory) setData(inventory)
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback demo data
        setData(generateDemoData())
      }
    }
    
    fetchData()
    const subscription = setInterval(fetchData, 5000)
    return () => clearInterval(subscription)
  }, [])

  // Dynamic AI insights rotation
  useEffect(() => {
    const insights = [
      "تحليل تنبؤي: ارتفاع متوقع في أسعار النحاس بنسبة 12.5% خلال الربع القادم",
      "توصية استراتيجية: توجيه 30% من موارد الألمنيوم لمشاريع الطاقة المتجددة",
      "تنبيه سوق: ندرة محتملة في مكونات الليثيوم بحلول الربع الثالث",
      "فرصة استثمارية: طلب متزايد على البلاستيك المعاد تدويره من أوروبا",
      "تحسين لوجستي: تقليل البصمة الكربونية عبر تجميع الشحنات في الدمام"
    ]
    
    const interval = setInterval(() => {
      setAiInsight(prev => (prev + 1) % insights.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  // Generate realistic demo data when needed
  const generateDemoData = () => [
    { id: 1, material_type: "نحاس", weight_kg: 1250, carbon_saved_kg: 3800, origin: "الرياض" },
    { id: 2, material_type: "ألومنيوم", weight_kg: 890, carbon_saved_kg: 2100, origin: "جدة" },
    { id: 3, material_type: "بلاستيك", weight_kg: 2100, carbon_saved_kg: 1500, origin: "الدمام" },
    { id: 4, material_type: "إلكترونيات", weight_kg: 420, carbon_saved_kg: 9500, origin: "المدينة" },
    { id: 5, material_type: "حديد", weight_kg: 3500, carbon_saved_kg: 4200, origin: "ينبع" },
    { id: 6, material_type: "ليثيوم", weight_kg: 180, carbon_saved_kg: 12000, origin: "الجبيل" },
    { id: 7, material_type: "ذهب", weight_kg: 12, carbon_saved_kg: 8500, origin: "الطائف" },
    { id: 8, material_type: "نحاس", weight_kg: 950, carbon_saved_kg: 2900, origin: "الخبر" }
  ]

  // Format date to Saudi Hijri calendar style
  const formattedDate = useMemo(() => {
    return currentTime.toLocaleDateString('ar-SA-u-nu-arab', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }, [currentTime])

  // Format time with Arabic numerals
  const formattedTime = useMemo(() => {
    return currentTime.toLocaleTimeString('ar-SA-u-nu-arab', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }, [currentTime])

  const handleBid = (id: number) => {
    setActiveBid(id)
    setTimeout(() => setActiveBid(null), 1500)
    
    // Simulate bid update
    setData(prev => prev.map(item => 
      item.id === id 
        ? { ...item, last_bid: (item.last_bid || 0) + Math.floor(Math.random() * 500) + 200 }
        : item
    ))
  }

  return (
    <div 
      dir="rtl" 
      className="min-h-screen font-sans p-6"
      style={{ 
        backgroundColor: COLORS.dark,
        color: '#e6f7ff',
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(0, 255, 170, 0.03) 0%, transparent 25%),
          radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.03) 0%, transparent 25%)
        `
      }}
    >
      <SaudiPattern />
      
      {/* Header with enhanced Saudi elements */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-[#1a3a3a]">
        <div className="flex items-center space-x-6 space-x-reverse mb-6 md:mb-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffaa] to-[#ffd700] rounded-full blur opacity-20 animate-pulse"></div>
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#00ffaa] to-[#ffd700] tracking-tight">
                راد | RAAD
              </h1>
              <div className="mt-2 flex items-center space-x-3 space-x-reverse">
                <span className="px-4 py-1 bg-[#0a151a]/80 border border-[#1a3a3a] rounded-full text-sm font-medium flex items-center">
                  <Leaf className="w-4 h-4 ml-2 text-[#00ffaa]" />
                  السيادة الرقمية
                </span>
                <span className="px-4 py-1 bg-[#0a151a]/80 border border-[#1a3a3a] rounded-full text-sm font-medium flex items-center">
                  <Globe className="w-4 h-4 ml-2 text-[#00f3ff]" />
                  المملكة العربية السعودية
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse">
          <div className="flex space-x-6 space-x-reverse">
            <div className="text-center transform hover:scale-105 transition-transform">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Saudi_Vision_2030_logo.svg" 
                alt="رؤية 2030" 
                className="h-20 w-auto filter brightness-200"
              />
              <p className="mt-2 text-xs text-[#888]">رؤية السعودية 2030</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="relative w-20 h-14 overflow-hidden rounded-sm border border-[#1a3a3a]">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg" 
                  alt="علم السعودية" 
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-2 text-xs text-[#888]">الهوية الوطنية</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#0a151a] to-[#081015] border border-[#1a3a3a] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-[#00f3ff] mr-2" />
              <span className="text-xs text-[#00ffaa]">التوقيت المحلي</span>
            </div>
            <div className="text-2xl font-bold text-center mb-1">{formattedTime}</div>
            <div className="text-center text-sm text-[#888]">{formattedDate}</div>
            <div className="mt-3 flex justify-center">
              <span className="px-3 py-1 bg-[#00ffaa]/10 text-[#00ffaa] rounded-full text-xs font-medium">
                التحديث التلقائي: 5 ثوانٍ
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Strategic Metrics with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <GradientBorder>
          <StatBox 
            icon={<Leaf className="w-10 h-10 text-[#00ffaa]" />}
            title="الكربون الموفر" 
            value="1,284.5" 
            unit="طن CO₂" 
            label="متوافق مع المبادرة السعودية الخضراء"
            trend="+12.3% عن الشهر السابق"
            color={COLORS.success}
          />
        </GradientBorder>
        
        <GradientBorder>
          <StatBox 
            icon={<Database className="w-10 h-10 text-[#ffd700]" />}
            title="ندرة المعادن" 
            value="84.2" 
            unit="مؤشر" 
            label="رصد عالي لليثيوم والذهب والنحاس"
            trend="تحديث فوري"
            color={COLORS.warning}
          />
        </GradientBorder>
        
        <GradientBorder>
          <StatBox 
            icon={<TrendingUp className="w-10 h-10 text-[#00f3ff]" />}
            title="جاهزية الإمداد" 
            value="92" 
            unit="%" 
            label="عقود تجميع ذكية نشطة"
            trend="مستوى ممتاز"
            color={COLORS.accent}
          />
        </GradientBorder>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Live Auction Section */}
        <div className="lg:col-span-2">
          <GradientBorder intensity={1.5}>
            <div className="bg-[#0a151a] rounded-xl p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                    <Zap className="w-8 h-8 text-[#ffd700] ml-3" />
                    بورصة راد للموارد (مباشر)
                  </h2>
                  <p className="text-[#888] mt-2 flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#ff5252] rounded-full mr-2 animate-pulse"></span>
                    بث حي • آخر تحديث: {formattedTime}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="bg-gradient-to-r from-[#ff5252] to-[#ff1a1a] text-white px-5 py-2.5 rounded-full font-bold text-lg shadow-lg animate-pulse-slow">
                    مزاد نشط
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto rounded-xl border border-[#1a3a3a]">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-[#081015] text-[#aaa] text-right">
                      <th className="px-6 py-4 font-medium">المورد</th>
                      <th className="px-6 py-4 font-medium">المادة</th>
                      <th className="px-6 py-4 font-medium">الكمية</th>
                      <th className="px-6 py-4 font-medium">البصمة الكربونية</th>
                      <th className="px-6 py-4 font-medium">أعلى مزايدة</th>
                      <th className="px-6 py-4 font-medium">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => (
                      <tr 
                        key={item.id || i} 
                        className={`border-b border-[#1a3a3a] hover:bg-[#0c1a20]/50 transition-colors ${
                          i % 2 === 0 ? 'bg-[#0a1317]' : 'bg-[#081115]'
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-[#888]">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-[#00ffaa] rounded-full mr-3"></div>
                            {item.origin || 'تجمع المصانع المركزية'}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-lg" style={{ color: getMaterialColor(item.material_type) }}>
                          {item.material_type}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono">{item.weight_kg?.toLocaleString('ar-SA')} كجم</span>
                        </td>
                        <td className="px-6 py-4 text-[#00ffaa] font-medium">
                          <Leaf className="w-4 h-4 inline-block ml-1" />
                          -{item.carbon_saved_kg?.toLocaleString('ar-SA')} كجم
                        </td>
                        <td className="px-6 py-4 font-bold text-[#ffd700]">
                          {(item.last_bid || Math.floor(item.weight_kg * 4.5)).toLocaleString('ar-SA')} ر.س
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleBid(item.id || i)}
                            className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                              activeBid === (item.id || i)
                                ? 'bg-[#ffd700] text-[#050a0f] shadow-lg shadow-[#ffd700]/50 animate-pulse'
                                : 'bg-gradient-to-r from-[#00ffaa] to-[#00cc88] text-[#050a0f] hover:from-[#00e676] hover:to-[#00b366]'
                            }`}
                          >
                            {activeBid === (item.id || i) ? 'تمت المزايدة!' : 'زايد الآن'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center text-sm text-[#888]">
                    <div className="w-3 h-3 bg-[#00ffaa] rounded-full mr-2"></div>
                    مورد معتمد
                  </div>
                  <div className="flex items-center text-sm text-[#888]">
                    <div className="w-3 h-3 bg-[#ffd700] rounded-full mr-2"></div>
                    مورد متميز
                  </div>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-[#0a151a] to-[#081015] border border-[#1a3a3a] rounded-xl font-medium hover:border-[#00ffaa] transition-colors flex items-center">
                  <Recycle className="w-5 h-5 ml-2" />
                  عرض جميع الموارد
                </button>
              </div>
            </div>
          </GradientBorder>
        </div>

        {/* Enhanced RAAD-AI Section */}
        <div className="space-y-8">
          <GradientBorder>
            <div className="bg-[#0a151a] rounded-xl p-7 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#00ffaa]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tl from-[#ffd700]/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-5">
                  <div className="bg-[#050a0f] border-2 border-[#00ffaa] rounded-xl p-3 mr-4">
                    <Brain className="w-8 h-8 text-[#00ffaa]" />
                  </div>
                  <h3 className="text-2xl font-bold flex-1">RAAD-AI</h3>
                  <div className="px-3 py-1 bg-[#00ffaa]/10 text-[#00ffaa] rounded-full text-sm font-medium">
                    ذكاء اصطناعي استراتيجي
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="bg-[#081015] border border-[#1a3a3a] rounded-xl p-5">
                    <p className="text-lg leading-relaxed text-[#e6f7ff]">
                      <span className="text-[#00ffaa] font-bold">تحليل تنبؤي:</span> 
                      <span className="ml-1">بناءً على تحليل</span> 
                      <span className="text-[#ffd700] font-bold mx-1">1,284</span> 
                      <span>مصدر بيانات عالمي، نتوقع</span>
                      <span className="text-[#ff5252] font-bold mx-1">+12.5%</span>
                      <span>في أسعار النحاس خلال الربع القادم</span>
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <AlertCircle className="w-6 h-6 text-[#ffd700] mt-1 ml-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1 flex items-center">
                          <span className="inline-block w-2 h-2 bg-[#ffd700] rounded-full mr-2"></span>
                          توصية استراتيجية
                        </h4>
                        <p className="text-[#aaa] leading-relaxed">
                          توجيه 30% من موارد الألمنيوم لمشاريع الطاقة المتجددة لتعظيم العائد السيادي ودعم رؤية 2030
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Award className="w-6 h-6 text-[#00ffaa] mt-1 ml-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-1 flex items-center">
                          <span className="inline-block w-2 h-2 bg-[#00ffaa] rounded-full mr-2"></span>
                          فرصة استثمارية
                        </h4>
                        <p className="text-[#aaa] leading-relaxed">
                          طلب متزايد على البلاستيك المعاد تدويره من السوق الأوروبي - سعر محتمل: 8.2 ر.س/كجم
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-4 bg-gradient-to-r from-[#0a151a] to-[#081015] border border-[#1a3a3a] rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#888]">التحديث التالي:</span>
                      <div className="flex space-x-1 space-x-reverse">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full ${
                              i <= aiInsight ? 'bg-[#00ffaa]' : 'bg-[#1a3a3a]'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GradientBorder>
          
          <GradientBorder>
            <button 
              className="w-full bg-gradient-to-r from-[#00ffaa] to-[#00cc88] text-[#050a0f] rounded-xl p-7 font-bold text-xl shadow-lg hover:shadow-[0_0_30px_rgba(0,255,170,0.5)] transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => alert('جارٍ إنشاء تقرير السيادة الرقمية...')}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">📊</span>
                <span>إصدار تقرير السيادة الفوري</span>
                <span className="mt-2 text-sm font-normal opacity-90">
                  تقرير الأثر الاقتصادي والبيئي الموثق
                </span>
              </div>
            </button>
          </GradientBorder>
          
          <div className="bg-[#0a151a] rounded-xl p-6 border border-[#1a3a3a]">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <span className="inline-block w-3 h-3 bg-[#ff5252] rounded-full ml-3"></span>
              تنبيهات النظام
            </h4>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-[#150a0a]/50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-[#ff5252] mt-0.5 ml-3 flex-shrink-0" />
                <p className="text-sm text-[#ffabab]">انخفاض مفاجئ في عروض شراء البلاستيك - يوصى بالمراجعة</p>
              </div>
              <div className="flex items-start p-3 bg-[#1a150a]/50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-[#ffd700] mt-0.5 ml-3 flex-shrink-0" />
                <p className="text-sm text-[#ffeb99]">تحديث معايير الجودة للمعادن الثمينة يدخل حيز التنفيذ 15 فبراير</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating action button for quick actions */}
      <div className="fixed bottom-8 left-8 z-50">
        <button className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00ffaa] to-[#00cc88] text-[#050a0f] font-bold text-2xl shadow-xl flex items-center justify-center animate-float">
          +
        </button>
      </div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        
        * {
          font-family: 'Tajawal', system-ui, -apple-system, sans-serif;
        }
        
        @keyframes border-spin {
          0% { background-position: 0% 50% }
          100% { background-position: 100% 50% }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 1 }
          50% { opacity: 0.7 }
          100% { opacity: 1 }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) }
          50% { transform: translateY(-10px) }
          100% { transform: translateY(0px) }
        }
        
        .animate-border-spin {
          animation: border-spin 8s linear infinite;
          background-size: 300% 300%;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #081015;
        }
        ::-webkit-scrollbar-thumb {
          background: #1a3a3a;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #00ffaa;
        }
      `}</style>
    </div>
  )
}

function StatBox({ icon, title, value, unit, label, trend, color }: any) {
  return (
    <div className="p-7 bg-[#0a151a] rounded-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#00ffaa]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-[#ffd700]/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex justify-center mb-5">
          {icon}
        </div>
        <p className="text-center text-[#aaa] text-sm mb-3">{title}</p>
        <div className="flex justify-center items-baseline gap-2 mb-2">
          <span className="text-4xl md:text-5xl font-extrabold" style={{ color: '#e6f7ff' }}>{value}</span>
          <span className="text-xl font-bold" style={{ color }}>{unit}</span>
        </div>
        <p className="text-center text-xs text-[#666] mb-4">{label}</p>
        <div className="flex justify-center">
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: `${color}15`,
              color: color
            }}
          >
            {trend}
          </span>
        </div>
      </div>
    </div>
  )
}

// Helper function to assign colors based on material type
function getMaterialColor(material: string) {
  const colors: any = {
    'نحاس': '#ff9e64',
    'ألومنيوم': '#c5a4ff',
    'بلاستيك': '#64b5f6',
    'إلكترونيات': '#ff5252',
    'حديد': '#9e9e9e',
    'ليثيوم': '#ffd700',
    'ذهب': '#ffd700',
    ' default': '#00ffaa'
  }
  return colors[material] || colors[' default']
}
