// app/dashboard/page.tsx
'use client'
import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

// دوال مساعدة لألوان المواد وأيقوناتها
function getMaterialColor(material: string) {
  const colors: any = {
    'نحاس': '#ff9e64',
    'ألومنيوم': '#c5a4ff',
    'بلاستيك': '#64b5f6',
    'إلكترونيات': '#ff5252',
    'حديد': '#9e9e9e',
    'ليثيوم': '#ffd700',
    'ذهب': '#ffd700'
  }
  return colors[material] || '#00ffaa'
}

function getMaterialIcon(material: string) {
  const icons: any = {
    'نحاس': '🟤',
    'ألومنيوم': '⚪',
    'بلاستيك': '⚫',
    'إلكترونيات': '🔌',
    'حديد': '⚙️',
    'ليثيوم': '🔋',
    'ذهب': '🟡'
  }
  return icons[material] || '📦'
}

// تهيئة سببيز بأمان
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
let supabase: any
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export default function SovereignDashboard() {
  const [inventory, setInventory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  // ✅ الإصلاح 1: بدء الوقت كـ null لتجنب Hydration Error
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [activeBid, setActiveBid] = useState<number | null>(null)
  const [aiInsightIndex, setAiInsightIndex] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  // ✅ الإصلاح 2: تعيين الوقت فقط على المتصفح (Client-side)
  useEffect(() => {
    setCurrentTime(new Date()) // تعيين الوقت الأولي
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // جلب البيانات
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!supabase) {
          setInventory(generateDemoData())
          setLoading(false)
          return
        }
        const { data, error } = await supabase
          .from('scrap_inventory')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8)
        if (error) throw error
        setInventory(data || generateDemoData())
      } catch (err) {
        setInventory(generateDemoData())
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  // تدوير رؤى الذكاء الاصطناعي
  useEffect(() => {
    const interval = setInterval(() => {
      setAiInsightIndex(prev => (prev + 1) % aiInsights.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // عرض الإشعارات
  const showNotificationMessage = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  // بيانات تجريبية احترافية
  const generateDemoData = () => [
    { id: 1, material_type: "نحاس", weight_kg: 15000, carbon_saved_kg: 45000, origin: "الرياض", last_bid: 562500 },
    { id: 2, material_type: "ألومنيوم", weight_kg: 8500, carbon_saved_kg: 25500, origin: "جدة", last_bid: 400500 },
    { id: 3, material_type: "بلاستيك", weight_kg: 25000, carbon_saved_kg: 18750, origin: "الدمام", last_bid: 945000 },
    { id: 4, material_type: "إلكترونيات", weight_kg: 4500, carbon_saved_kg: 101250, origin: "المدينة", last_bid: 1890000 },
    { id: 5, material_type: "حديد", weight_kg: 50000, carbon_saved_kg: 60000, origin: "ينبع", last_bid: 1575000 },
    { id: 6, material_type: "ليثيوم", weight_kg: 1200, carbon_saved_kg: 144000, origin: "الجبيل", last_bid: 8100000 },
    { id: 7, material_type: "ذهب", weight_kg: 85, carbon_saved_kg: 102000, origin: "الطائف", last_bid: 5400000 },
    { id: 8, material_type: "نحاس", weight_kg: 12000, carbon_saved_kg: 36000, origin: "الخبر", last_bid: 427500 }
  ]

  // رؤى الذكاء الاصطناعي السيادي
  const aiInsights = [
    "تحليل تنبؤي: ارتفاع متوقع في أسعار النحاس بنسبة 12.5% خلال الربع القادم وفقاً لبيانات السوق العالمية",
    "توصية استراتيجية: توجيه 30% من موارد الألمنيوم لمشاريع الطاقة المتجددة لتعظيم العائد السيادي",
    "تنبيه سوق: ندرة محتملة في مكونات الليثيوم بحلول الربع الثالث - يوصى بالاحتفاظ باحتياطي استراتيجي",
    "فرصة استثمارية: طلب متزايد على البلاستيك المعاد تدويره من السوق الأوروبي بأسعار تفوق السوق المحلي",
    "تحسين لوجستي: تقليل البصمة الكربونية بنسبة 18% عبر تجميع الشحنات في موانئ الدمام والجبيل"
  ]

  // تنسيق التاريخ والوقت
  const formattedDate = useMemo(() => {
    if (!currentTime) return ''
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    try {
      return new Intl.DateTimeFormat('ar-SA', options).format(currentTime)
    } catch (e) {
      return currentTime.toLocaleDateString('ar-SA', options)
    }
  }, [currentTime])

  const formattedTime = useMemo(() => {
    if (!currentTime) return ''
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }
    try {
      return new Intl.DateTimeFormat('ar-SA-u-nu-arab', options).format(currentTime)
    } catch (e) {
      return currentTime.toLocaleTimeString('ar-SA', options)
    }
  }, [currentTime])

  const handleBid = (id: number) => {
    setActiveBid(id)
    showNotificationMessage('✓ تم تقديم المزايدة بنجاح!')
    setTimeout(() => setActiveBid(null), 1500)
    setInventory(prev => prev.map(item =>
      item.id === id
        ? { ...item, last_bid: (item.last_bid || 0) + Math.floor(Math.random() * 50000) + 20000 }
        : item
    ))
  }

  // حساب الإحصائيات
  const stats = useMemo(() => {
    const totalWeight = inventory.reduce((sum, item) => sum + (item.weight_kg || 0), 0)
    const totalCarbon = inventory.reduce((sum, item) => sum + (item.carbon_saved_kg || 0), 0)
    const totalValue = inventory.reduce((sum, item) => sum + (item.last_bid || item.weight_kg * 450), 0)
    const sovereigntyScore = 95
    return { totalWeight, totalCarbon, totalValue, sovereigntyScore }
  }, [inventory])

  return (
    <div style={{
      backgroundColor: '#050a0f',
      color: '#e6f7ff',
      minHeight: '100vh',
      fontFamily: "'Tajawal', system-ui, -apple-system, sans-serif",
      padding: '24px',
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0, 255, 170, 0.05) 0%, transparent 25%), radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.05) 0%, transparent 25%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* نمط سعودي خفيف */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0, 255, 170, 0.3) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 20%), repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 243, 255, 0.1) 10px, rgba(0, 243, 255, 0.1) 20px)'
      }}></div>

      {/* الهيدر الاحترافي */}
      <header style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        marginBottom: '40px',
        paddingBottom: '24px',
        borderBottom: '1px solid rgba(0, 255, 170, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: '-6px',
              background: 'linear-gradient(45deg, #00ffaa, #ffd700)',
              borderRadius: '9999px',
              opacity: 0.3,
              animation: 'pulse 3s infinite'
            }}></div>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '800',
              background: 'linear-gradient(90deg, #00ffaa, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              position: 'relative',
              letterSpacing: '-0.03em'
            }}>
              راد | RAAD
            </h1>
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '12px',
              flexWrap: 'wrap'
            }}>
              <span style={{
                padding: '6px 20px',
                background: 'rgba(10, 21, 26, 0.7)',
                border: '1px solid rgba(0, 255, 170, 0.2)',
                borderRadius: '9999px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(4px)'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  background: '#00ffaa',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></span>
                السيادة الرقمية
              </span>
              <span style={{
                padding: '6px 20px',
                background: 'rgba(10, 21, 26, 0.7)',
                border: '1px solid rgba(0, 243, 255, 0.2)',
                borderRadius: '9999px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(4px)'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  background: '#00f3ff',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></span>
                المملكة العربية السعودية
              </span>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            {/* شعار رؤية 2030 */}
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <div style={{
                background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05))',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(45deg, #ffd700, #ffab00)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.2rem',
                  fontWeight: 'bold',
                  color: '#050a0f',
                  boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
                }}>
                  2030
                </div>
                <div style={{
                  textAlign: 'center',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#ffd700',
                  lineHeight: '1.4'
                }}>
                  <div>رؤية المملكة</div>
                  <div>العربية السعودية</div>
                </div>
              </div>
              <p style={{
                marginTop: '10px',
                fontSize: '0.8rem',
                color: '#888',
                fontStyle: 'italic'
              }}>
                داعم لمستهدفات الرؤية
              </p>
            </div>

            {/* علم السعودية */}
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <div style={{
                width: '90px',
                height: '90px',
                background: 'linear-gradient(145deg, #0a1a12, #050f0a)',
                border: '2px solid #00ffaa',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 0 20px rgba(0, 255, 170, 0.3)'
              }}>
                <div style={{
                  fontSize: '3.5rem',
                  background: 'linear-gradient(45deg, #00ffaa, #ffd700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold'
                }}>
                  🇸🇦
                </div>
              </div>
              <p style={{
                marginTop: '12px',
                fontSize: '0.95rem',
                color: '#00ffaa',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}>
                مشروع وطني معتمد
              </p>
            </div>
          </div>

          {/* الساعة الاحترافية + زر الدخول */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* ✅ الإصلاح 3: عرض الساعة فقط عندما يكون currentTime موجود */}
            {currentTime && (
              <div style={{
                background: 'linear-gradient(145deg, rgba(10, 21, 26, 0.9), rgba(8, 16, 21, 0.9))',
                border: '1px solid rgba(0, 255, 170, 0.2)',
                borderRadius: '24px',
                padding: '24px',
                minWidth: '240px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#00f3ff',
                    boxShadow: '0 0 10px rgba(0, 243, 255, 0.7)'
                  }}></div>
                  <span style={{
                    fontSize: '1.1rem',
                    color: '#00ffaa',
                    fontWeight: 600,
                    letterSpacing: '1px'
                  }}>التوقيت الوطني</span>
                </div>
                {/* ✅ الإصلاح 4: إضافة suppressHydrationWarning */}
                <div
                  style={{
                    fontSize: '2.8rem',
                    fontWeight: '800',
                    textAlign: 'center' as any,
                    marginBottom: '8px',
                    background: 'linear-gradient(90deg, #00ffaa, #00f3ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'monospace',
                    letterSpacing: '-1px',
                    animation: 'pulse 1s infinite'
                  }}
                  suppressHydrationWarning
                >
                  {formattedTime}
                </div>
                <div
                  style={{
                    textAlign: 'center' as any,
                    fontSize: '1.2rem',
                    color: '#aaa',
                    fontWeight: '500',
                    marginBottom: '16px'
                  }}
                  suppressHydrationWarning
                >
                  {formattedDate}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    padding: '6px 16px',
                    background: 'rgba(0, 255, 170, 0.15)',
                    color: '#00ffaa',
                    borderRadius: '9999px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                  }}>
                    تحديث تلقائي: 5 ثوانٍ
                  </span>
                </div>
              </div>
            )}

            {/* زر دخول المنصة */}
            <Link
              href="/auth"
              style={{
                background: 'linear-gradient(120deg, #00ffaa 0%, #00cc88 50%, #009966 100%)',
                color: '#050a0f',
                border: 'none',
                borderRadius: '24px',
                padding: '16px 42px',
                fontWeight: '800',
                fontSize: '1.4rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(0, 255, 170, 0.7), 0 0 60px rgba(0, 255, 170, 0.4)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                letterSpacing: '1px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 170, 0.9), 0 0 80px rgba(0, 255, 170, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 170, 0.7), 0 0 60px rgba(0, 255, 170, 0.4)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                animation: 'pulse 3s infinite'
              }}></div>
              <span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '2rem' }}>🔐</span>
                دخول المنصة
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* مؤشرات التقدم */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: 'rgba(10, 21, 26, 0.8)',
          borderRadius: '20px',
          padding: '20px',
          minWidth: '200px',
          border: '1px solid rgba(0, 255, 170, 0.3)'
        }}>
          <div style={{
            fontSize: '0.95rem',
            color: '#888',
            marginBottom: '10px',
            fontWeight: '500'
          }}>
            تحديث البيانات
          </div>
          <div style={{
            height: '8px',
            background: 'rgba(26, 58, 58, 0.7)',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #00ffaa, #00cc88)',
              borderRadius: '4px',
              position: 'absolute',
              top: 0,
              left: 0
            }}></div>
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: '#666',
            marginTop: '8px',
            textAlign: 'center'
          }}>
            جاري التحديث التلقائي...
          </div>
        </div>
        <div style={{
          background: 'rgba(10, 21, 26, 0.8)',
          borderRadius: '20px',
          padding: '20px',
          minWidth: '200px',
          border: '1px solid rgba(255, 215, 0, 0.3)'
        }}>
          <div style={{
            fontSize: '0.95rem',
            color: '#888',
            marginBottom: '10px',
            fontWeight: '500'
          }}>
            اتصال النظام
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#00ffaa',
              boxShadow: '0 0 10px rgba(0, 255, 170, 0.7)',
              animation: 'pulse 1.5s infinite'
            }}></div>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#00ffaa'
            }}>
              متصل ✓
            </div>
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: '#666',
            marginTop: '8px'
          }}>
            اتصال آمن ومستقر
          </div>
        </div>
      </div>

      {/* لوحة المؤشرات السيادية */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        marginBottom: '40px'
      }}>
        <SovereignStat
          title="درجة السيادة الرقمية"
          value={`${stats.sovereigntyScore}`}
          unit="%"
          color="#00ffaa"
          description="متوافق مع معايير مجلس الأمن السيبراني السعودي"
          icon="🛡️"
        />
        <SovereignStat
          title="الكربون الموفر"
          value={stats.totalCarbon.toLocaleString('ar-SA')}
          unit="طن"
          color="#00cc88"
          description="مساهمة في المبادرة السعودية الخضراء"
          icon="🌱"
        />
        <SovereignStat
          title="القيمة السوقية"
          value={stats.totalValue.toLocaleString('ar-SA')}
          unit="ر.س"
          color="#ffd700"
          description="التقييم الفوري للموارد الموثقة"
          icon="💰"
        />
      </div>

      {/* الرسوم البيانية التفاعلية */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        marginBottom: '40px'
      }}>
        <ResourceChart data={inventory} />
        <SaudiMap />
      </div>

      {/* جدول التداول المباشر */}
      <div style={{
        background: 'rgba(10, 21, 26, 0.95)',
        borderRadius: '28px',
        padding: '32px',
        border: '1px solid rgba(0, 255, 170, 0.3)',
        backdropFilter: 'blur(10px)',
        marginBottom: '40px',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <h2 style={{
            fontSize: '2.4rem',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #00ffaa, #00f3ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <span>📊</span>
            بورصة التداول المباشر
          </h2>
          <div style={{
            background: 'linear-gradient(90deg, rgba(0, 255, 170, 0.15), rgba(0, 204, 136, 0.1))',
            border: '1px solid rgba(0, 255, 170, 0.3)',
            borderRadius: '20px',
            padding: '12px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#00ffaa',
              boxShadow: '0 0 8px rgba(0, 255, 170, 0.7)',
              animation: 'pulse 1.5s infinite'
            }}></div>
            <span style={{ fontWeight: '600', color: '#00ffaa' }}>مباشر • تحديث كل 5 ثوانٍ</span>
          </div>
        </div>
        <div style={{
          overflowX: 'auto',
          borderRadius: '24px',
          border: '1px solid rgba(26, 58, 58, 0.7)',
          background: 'rgba(8, 16, 21, 0.8)'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '900px'
          }}>
            <thead>
              <tr style={{
                backgroundColor: 'rgba(0, 255, 170, 0.08)',
                color: '#aaa',
                fontSize: '1.25rem',
                fontWeight: '700'
              }}>
                <th style={{ padding: '24px 20px', textAlign: 'right' as any, width: '15%' }}>المادة</th>
                <th style={{ padding: '24px 20px', textAlign: 'right' as any, width: '15%' }}>الوزن (طن)</th>
                <th style={{ padding: '24px 20px', textAlign: 'right' as any, width: '20%' }}>آخر مزايدة</th>
                <th style={{ padding: '24px 20px', textAlign: 'right' as any, width: '20%' }}>الموقع</th>
                <th style={{ padding: '24px 20px', textAlign: 'right' as any, width: '20%' }}>الحالة</th>
                <th style={{ padding: '24px 20px', textAlign: 'right' as any, width: '10%' }}>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{
                    padding: '50px',
                    textAlign: 'center' as any,
                    color: '#888',
                    fontSize: '1.3rem'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      width: '40px',
                      height: '40px',
                      border: '4px solid rgba(0, 255, 170, 0.3)',
                      borderTopColor: '#00ffaa',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginBottom: '16px',
                      margin: '0 auto'
                    }}></div>
                    جارٍ تحميل بيانات البورصة...
                  </td>
                </tr>
              ) : inventory.map((item, i) => (
                <tr
                  key={item.id || i}
                  style={{
                    borderBottom: '1px solid rgba(26, 58, 58, 0.5)',
                    background: i % 2 === 0 ? 'rgba(10, 21, 26, 0.5)' : 'rgba(8, 16, 21, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 170, 0.08)'
                    e.currentTarget.style.transform = 'translateX(5px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = i % 2 === 0 ? 'rgba(10, 21, 26, 0.5)' : 'rgba(8, 16, 21, 0.5)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <td style={{
                    padding: '24px 20px',
                    fontWeight: 'bold',
                    fontSize: '1.35rem',
                    color: getMaterialColor(item.material_type),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ fontSize: '1.8rem' }}>{getMaterialIcon(item.material_type)}</span>
                    {item.material_type}
                  </td>
                  <td style={{
                    padding: '24px 20px',
                    fontSize: '1.4rem',
                    fontFamily: 'monospace',
                    fontWeight: '700',
                    color: '#e6f7ff'
                  }}>
                    {(item.weight_kg / 1000).toLocaleString('ar-SA', { maximumFractionDigits: 1 })} <span style={{ color: '#888', fontSize: '1.1rem' }}>طن</span>
                  </td>
                  {/* ✅ هنا تم الإصلاح: إضافة قيمة افتراضية في حال عدم وجود last_bid */}
                  <td style={{
                    padding: '24px 20px',
                    fontWeight: 'bold',
                    fontSize: '1.45rem',
                    color: '#ffd700',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
                  }}>
                    {(item.last_bid || Math.floor(item.weight_kg * 450)).toLocaleString('ar-SA')} <span style={{ color: '#888', fontSize: '1.15rem' }}>ر.س</span>
                  </td>
                  <td style={{
                    padding: '24px 20px',
                    fontSize: '1.25rem',
                    color: '#888'
                  }}>
                    {item.origin}
                  </td>
                  <td style={{
                    padding: '24px 20px'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      background: 'linear-gradient(90deg, rgba(0, 255, 170, 0.2), rgba(0, 204, 136, 0.2))',
                      color: '#00ffaa',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontWeight: '700',
                      fontSize: '1.05rem',
                      border: '1px solid rgba(0, 255, 170, 0.4)',
                      boxShadow: '0 0 10px rgba(0, 255, 170, 0.2)'
                    }}>
                      موثق سيادياً
                    </span>
                  </td>
                  <td style={{ padding: '24px 20px' }}>
                    <button
                      onClick={() => handleBid(item.id || i)}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '16px',
                        fontWeight: 'bold',
                        fontSize: '1.15rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: 'none',
                        background: activeBid === (item.id || i)
                          ? 'linear-gradient(90deg, #ffd700, #ffab00)'
                          : 'linear-gradient(90deg, #00ffaa, #00cc88)',
                        color: '#050a0f',
                        boxShadow: activeBid === (item.id || i)
                          ? '0 0 25px rgba(255, 215, 0, 0.7)'
                          : '0 6px 20px rgba(0, 255, 170, 0.4)',
                        transform: activeBid === (item.id || i) ? 'scale(1.05)' : 'scale(1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        minWidth: '140px'
                      }}
                      onMouseEnter={(e) => {
                        if (activeBid !== (item.id || i)) {
                          e.currentTarget.style.transform = 'scale(1.08)'
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 170, 0.6)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeBid !== (item.id || i)) {
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 170, 0.4)'
                        }
                      }}
                    >
                      {activeBid === (item.id || i) ? (
                        <>
                          <span style={{ fontSize: '1.5rem' }}>✓</span>
                          تم
                        </>
                      ) : (
                        <>
                          <span style={{ fontSize: '1.5rem' }}>💰</span>
                          زايد الآن
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: 'rgba(0, 30, 25, 0.4)',
          borderRadius: '20px',
          border: '1px solid rgba(0, 255, 170, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          fontSize: '1.2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#00ffaa',
              boxShadow: '0 0 8px rgba(0, 255, 170, 0.7)'
            }}></div>
            <span>جميع البيانات موثقة من المركز الوطني للسيادة الرقمية</span>
          </div>
          <div style={{ fontWeight: 'bold', color: '#00ffaa' }}>
            إجمالي الصفقات النشطة: {inventory.length}
          </div>
        </div>
      </div>

      {/* قسم الذكاء الاصطناعي السيادي */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{
          background: 'linear-gradient(1px, #00ffaa, #ffd700, #00f3ff)',
          padding: '2px',
          borderRadius: '28px',
          animation: 'border-spin 10s linear infinite',
          backgroundSize: '300% 300%'
        }}>
          <div style={{
            background: 'rgba(10, 21, 26, 0.95)',
            borderRadius: '26px',
            padding: '36px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(26, 58, 58, 0.5)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '240px',
              height: '240px',
              background: 'radial-gradient(circle, rgba(0, 255, 170, 0.15) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-90px',
              left: '-90px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
                marginBottom: '36px'
              }}>
                <div style={{
                  background: 'rgba(5, 10, 15, 0.9)',
                  border: '2px solid #00ffaa',
                  borderRadius: '24px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '70px',
                  minHeight: '70px',
                  boxShadow: '0 0 25px rgba(0, 255, 170, 0.4)'
                }}>
                  <div style={{ fontSize: '2.8rem' }}>🧠</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                    alignItems: 'center'
                  }}>
                    <h3 style={{
                      fontSize: '2.6rem',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      background: 'linear-gradient(90deg, #00ffaa, #00cc88)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      RAAD-AI
                      <span style={{
                        fontSize: '1.4rem',
                        background: 'linear-gradient(90deg, #ffd700, #ffab00)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        السيادي
                      </span>
                    </h3>
                    <span style={{
                      padding: '10px 24px',
                      background: 'rgba(0, 255, 170, 0.15)',
                      color: '#00ffaa',
                      borderRadius: '9999px',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      boxShadow: '0 0 15px rgba(0, 255, 170, 0.3)'
                    }}>
                      ذكاء اصطناعي استراتيجي
                    </span>
                  </div>
                </div>
              </div>
              <div style={{
                background: 'rgba(8, 16, 21, 0.8)',
                border: '1px solid rgba(26, 58, 58, 0.6)',
                borderRadius: '24px',
                padding: '32px',
                marginBottom: '36px',
                backdropFilter: 'blur(5px)'
              }}>
                <p style={{
                  fontSize: '1.45rem',
                  lineHeight: '1.8',
                  color: '#e6f7ff',
                  fontWeight: '500'
                }}>
                  <span style={{ color: '#00ffaa', fontWeight: '800', fontSize: '1.6rem' }}>تحليل تنبؤي:</span>
                  <span style={{ marginInlineStart: '8px' }}>بناءً على تحليل</span>
                  <span style={{
                    color: '#ffd700',
                    fontWeight: '800',
                    marginInlineStart: '6px',
                    marginInlineEnd: '6px',
                    fontSize: '1.7rem'
                  }}>1,284</span>
                  <span>مصدر بيانات عالمي، نتوقع</span>
                  <span style={{
                    color: '#ff5252',
                    fontWeight: '800',
                    marginInlineStart: '6px',
                    marginInlineEnd: '6px',
                    fontSize: '1.7rem'
                  }}>+12.5%</span>
                  <span>في أسعار النحاس خلال الربع القادم وفقاً لتوقعات السوق السعودي.</span>
                </p>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
                marginBottom: '36px'
              }}>
                <AiInsightCard
                  icon="⚠️"
                  title="توصية استراتيجية"
                  color="#ffd700"
                  content="توجيه 30% من موارد الألمنيوم لمشاريع الطاقة المتجددة لتعظيم العائد السيادي ودعم رؤية 2030"
                />
                <AiInsightCard
                  icon="💎"
                  title="فرصة استثمارية"
                  color="#00ffaa"
                  content="طلب متزايد على البلاستيك المعاد تدويره من السوق الأوروبي - سعر محتمل: 8.2 ر.س/كجم"
                />
              </div>
              <div style={{
                padding: '28px',
                background: 'linear-gradient(145deg, rgba(10, 21, 26, 0.9), rgba(8, 16, 21, 0.9))',
                border: '1px solid rgba(26, 58, 58, 0.6)',
                borderRadius: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                backdropFilter: 'blur(5px)'
              }}>
                <div style={{
                  fontSize: '1.35rem',
                  fontWeight: '500',
                  lineHeight: '1.6',
                  maxWidth: '800px'
                }}>
                  "{aiInsights[aiInsightIndex]}"
                </div>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  direction: 'ltr'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: i === aiInsightIndex
                          ? 'linear-gradient(45deg, #00ffaa, #00cc88)'
                          : 'rgba(26, 58, 58, 0.7)',
                        transition: 'all 0.4s ease',
                        boxShadow: i === aiInsightIndex
                          ? '0 0 10px rgba(0, 255, 170, 0.7)'
                          : 'none'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(1px, #00ffaa, #00cc88)',
          padding: '2px',
          borderRadius: '28px',
          animation: 'border-spin 12s linear infinite',
          backgroundSize: '300% 300%'
        }}>
          <button
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #00ffaa, #00cc88)',
              color: '#050a0f',
              border: 'none',
              borderRadius: '26px',
              padding: '36px',
              fontWeight: '800',
              fontSize: '1.8rem',
              cursor: 'pointer',
              boxShadow: '0 15px 40px rgba(0, 255, 170, 0.5)',
              transition: 'all 0.5s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 255, 170, 0.7)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 170, 0.5)'
            }}
            onClick={() => {
              showNotificationMessage('✓ تم إنشاء تقرير السيادة الرقمية بنجاح!')
              setTimeout(() => alert('✓ تم إنشاء تقرير السيادة الرقمية بنجاح!\nالتقرير جاهز للتنزيل خلال 5 ثوانٍ'), 1000)
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
              animation: 'pulse 4s infinite'
            }}></div>
            <div style={{ fontSize: '4rem', marginTop: '-10px' }}>📄</div>
            <span style={{ fontSize: '2.2rem', letterSpacing: '-1px' }}>إصدار تقرير السيادة الفوري</span>
            <span style={{
              fontSize: '1.4rem',
              opacity: 0.9,
              fontWeight: '500',
              maxWidth: '800px',
              textAlign: 'center'
            }}>
              تقرير الأثر الاقتصادي والبيئي الموثق معتمد من المركز الوطني للسيادة الرقمية
            </span>
          </button>
        </div>
        <div style={{
          background: 'rgba(10, 21, 26, 0.9)',
          border: '1px solid rgba(26, 58, 58, 0.6)',
          borderRadius: '28px',
          padding: '32px',
          backdropFilter: 'blur(10px)'
        }}>
          <h4 style={{
            fontSize: '1.9rem',
            fontWeight: '800',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#ff5252'
          }}>
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#ff5252',
              boxShadow: '0 0 10px rgba(255, 82, 82, 0.7)'
            }}></div>
            تنبيهات النظام السيادي
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <AlertItem
              icon="⚠️"
              color="#ff5252"
              text="انخفاض مفاجئ في عروض شراء البلاستيك - يوصى بالمراجعة الفورية من قبل اللجنة الوطنية"
            />
            <AlertItem
              icon="🔄"
              color="#ffd700"
              text="تحديث معايير الجودة للمعادن الثمينة يدخل حيز التنفيذ 15 فبراير 2026"
            />
          </div>
        </div>
      </div>

      {/* إشعارات تفاعلية */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(145deg, #00ffaa, #00cc88)',
          color: '#050a0f',
          padding: '16px 32px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 255, 170, 0.6)',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          animation: 'float 0.5s ease-out, glow 2s infinite',
          zIndex: 1000,
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease'
        }}>
          {notificationMessage}
        </div>
      )}

      {/* الأنماط العالمية */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap');
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-slow {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes border-spin {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 170, 0.5); }
          50% { box-shadow: 0 0 25px rgba(0, 255, 170, 0.8); }
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 255, 170, 0.3);
          border-color: rgba(0, 255, 170, 0.5);
        }
        .button-hover {
          transition: all 0.3s ease;
        }
        .button-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0, 255, 170, 0.6);
        }
        .loading-spinner {
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 255, 170, 0.3);
          border-top-color: #00ffaa;
          border-radius: '50%';
          animation: spin 1s linear infinite;
        }
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(8, 16, 21, 0.7);
          border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00ffaa, #00cc88);
          border-radius: 6px;
          border: 2px solid rgba(10, 21, 26, 0.5);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00e676, #00b366);
          box-shadow: 0 0 10px rgba(0, 255, 170, 0.5);
        }
        @media (max-width: 768px) {
          header {
            padding: 16px !important;
          }
          h1 {
            font-size: 2.5rem !important;
            letter-spacing: -0.5px !important;
          }
          .stat-card, .resource-card {
            padding: 20px !important;
            border-radius: 16px !important;
          }
          table {
            font-size: 0.85rem !important;
            min-width: 800px !important;
          }
          th, td {
            padding: 12px 8px !important;
          }
          .desktop-only {
            display: none !important;
          }
          button {
            padding: 10px 16px !important;
            font-size: 0.95rem !important;
          }
          .clock-container {
            min-width: 180px !important;
            padding: 16px !important;
          }
          .main-container {
            padding: 16px !important;
          }
          .chart-container {
            height: 300px !important;
          }
          .map-container {
            height: 300px !important;
          }
          a[href="/auth"] {
            padding: 14px 28px !important;
            font-size: 1.2rem !important;
            width: 100%;
            justify-content: center;
          }
        }
        @media (hover: none) and (pointer: coarse) {
          button, .card-hover, a[href="/auth"] {
            transform: none !important;
            box-shadow: 0 4px 15px rgba(0, 255, 170, 0.3) !important;
          }
          button:active, a[href="/auth"]:active {
            transform: scale(0.98) !important;
            box-shadow: 0 2px 8px rgba(0, 255, 170, 0.5) !important;
          }
        }
        .city-label {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        div:hover > .city-label {
          opacity: 1;
        }
      ` }} />
    </div>
  )
}

// مكون المؤشرات السيادية
function SovereignStat({ title, value, unit, color, description, icon }: any) {
  return (
    <div style={{
      background: 'linear-gradient(1px, #00ffaa, #ffd700, #00f3ff)',
      padding: '2px',
      borderRadius: '28px',
      animation: 'border-spin 12s linear infinite',
      backgroundSize: '300% 300%'
    }}>
      <div style={{
        background: 'rgba(10, 21, 26, 0.9)',
        borderRadius: '26px',
        padding: '36px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(26, 58, 58, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${color}25 0%, transparent 70%)`,
          borderRadius: '50%'
        }}></div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          gap: '20px'
        }}>
          <div style={{
            fontSize: '3.2rem',
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '-10px'
          }}>
            {icon}
          </div>
          <p style={{
            color: '#aaa',
            fontSize: '1.4rem',
            marginBottom: '16px',
            textAlign: 'center' as any,
            fontWeight: '500'
          }}>
            {title}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <span style={{
              fontSize: '4.2rem',
              fontWeight: '800',
              color: '#e6f7ff',
              textShadow: `0 0 20px ${color}50`
            }}>
              {value}
            </span>
            <span style={{
              fontSize: '2.1rem',
              fontWeight: 'bold',
              color: color,
              textShadow: `0 0 15px ${color}70`
            }}>
              {unit}
            </span>
          </div>
          <p style={{
            color: '#666',
            fontSize: '1.15rem',
            textAlign: 'center' as any,
            maxWidth: '90%',
            lineHeight: '1.6'
          }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

// مكون رؤى الذكاء الاصطناعي
function AiInsightCard({ icon, title, color, content }: any) {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      padding: '28px',
      background: 'rgba(10, 21, 26, 0.7)',
      border: `1px solid ${color}30`,
      borderRadius: '24px',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.border = `1px solid ${color}`
      e.currentTarget.style.transform = 'translateX(5px)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.border = `1px solid ${color}30`
      e.currentTarget.style.transform = 'translateX(0)'
    }}
    >
      <div style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '60px',
        minHeight: '60px',
        fontSize: '2.4rem'
      }}>
        {icon}
      </div>
      <div>
        <h4 style={{
          fontWeight: '700',
          fontSize: '1.65rem',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          color: color
        }}>
          <span style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}80`
          }}></span>
          {title}
        </h4>
        <p style={{
          color: '#ccc',
          lineHeight: '1.8',
          fontSize: '1.3rem',
          fontWeight: '500'
        }}>
          {content}
        </p>
      </div>
    </div>
  )
}

// مكون تنبيهات النظام
function AlertItem({ icon, color, text }: any) {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '22px',
      background: `rgba(${color === '#ff5252' ? '255, 82, 82' : '255, 215, 0'}, 0.1)`,
      border: `1px solid ${color}40`,
      borderRadius: '20px',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateX(5px)'
      e.currentTarget.style.boxShadow = `0 5px 15px ${color}30`
    }}
    >
      <div style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        minWidth: '40px'
      }}>
        {icon}
      </div>
      <p style={{
        color: color === '#ff5252' ? '#ffabab' : '#ffeb99',
        fontSize: '1.25rem',
        lineHeight: '1.7',
        fontWeight: '500'
      }}>
        {text}
      </p>
    </div>
  )
}

// مكون الرسوم البيانية التفاعلية
function ResourceChart({ data }: { data: any[] }) {
  const totalWeight = data.reduce((sum, item) => sum + (item.weight_kg || 0), 0)
  return (
    <div style={{
      background: 'rgba(10, 21, 26, 0.9)',
      borderRadius: '24px',
      padding: '32px',
      border: '1px solid rgba(26, 58, 58, 0.5)',
      backdropFilter: 'blur(10px)',
      marginTop: '0'
    }}>
      <h3 style={{
        fontSize: '1.8rem',
        fontWeight: '700',
        marginBottom: '24px',
        textAlign: 'center' as any,
        color: '#00ffaa'
      }}>
        توزيع الموارد حسب النوع
      </h3>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxHeight: '400px',
        overflow: 'auto'
      }}>
        {data.map((item, index) => {
          const percentage = totalWeight ? ((item.weight_kg || 0) / totalWeight) * 100 : 0
          const color = getMaterialColor(item.material_type)
          return (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '120px',
                fontSize: '1.15rem',
                fontWeight: '600',
                color: color,
                minWidth: '120px'
              }}>
                {getMaterialIcon(item.material_type)} {item.material_type}
              </div>
              <div style={{
                flex: 1,
                height: '24px',
                background: 'rgba(26, 58, 58, 0.5)',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  width: `${Math.min(percentage, 100)}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${color}80, ${color})`,
                  borderRadius: '12px',
                  transition: 'width 1s ease-out'
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 10px',
                  color: '#050a0f',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  textShadow: '0 0 2px rgba(0,0,0,0.5)'
                }}>
                  {percentage.toFixed(1)}%
                </div>
              </div>
              <div style={{
                width: '100px',
                textAlign: 'left' as any,
                fontWeight: 'bold',
                color: '#e6f7ff',
                fontSize: '1.1rem'
              }}>
                {(item.weight_kg / 1000).toLocaleString('ar-SA', { maximumFractionDigits: 1 })} <span style={{ color: '#888', fontSize: '0.95rem' }}>طن</span>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: 'rgba(0, 30, 25, 0.5)',
        borderRadius: '16px',
        border: '1px solid rgba(0, 255, 170, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1.15rem'
      }}>
        <span>الإجمالي:</span>
        <span style={{ fontWeight: 'bold', color: '#00ffaa' }}>
          {(totalWeight / 1000).toLocaleString('ar-SA', { maximumFractionDigits: 1 })} طن
        </span>
      </div>
    </div>
  )
}

// مكون الخريطة التفاعلية
function SaudiMap() {
  const cities = [
    { name: "الرياض", coords: [50, 40], value: 15000 },
    { name: "جدة", coords: [30, 60], value: 8500 },
    { name: "الدمام", coords: [75, 70], value: 25000 },
    { name: "ينبع", coords: [40, 80], value: 50000 },
    { name: "الجبيل", coords: [70, 75], value: 1200 },
    { name: "الطائف", coords: [45, 35], value: 85 }
  ]
  return (
    <div style={{
      background: 'rgba(10, 21, 26, 0.9)',
      borderRadius: '24px',
      padding: '32px',
      border: '1px solid rgba(26, 58, 58, 0.5)',
      backdropFilter: 'blur(10px)',
      marginTop: '0'
    }}>
      <h3 style={{
        fontSize: '1.8rem',
        fontWeight: '700',
        marginBottom: '24px',
        textAlign: 'center' as any,
        color: '#ffd700'
      }}>
        توزيع الموارد الجغرافي
      </h3>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        background: 'radial-gradient(circle at 30% 40%, rgba(0, 108, 53, 0.15), transparent 70%), radial-gradient(circle at 70% 60%, rgba(255, 215, 0, 0.05), transparent 70%)',
        borderRadius: '16px',
        border: '1px solid rgba(26, 58, 58, 0.7)',
        overflow: 'hidden'
      }}>
        {/* حدود السعودية المبسطة */}
        <svg
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0
          }}
        >
          <path
            d="M20,30 L30,25 L45,20 L60,22 L75,30 L85,45 L82,65 L70,80 L55,85 L40,82 L25,75 L15,60 L12,45 Z"
            fill="none"
            stroke="#006c35"
            strokeWidth="0.8"
            strokeDasharray="2,2"
          />
        </svg>
        {/* النقاط التفاعلية */}
        {cities.map((city, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${city.coords[0]}%`,
              top: `${city.coords[1]}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.zIndex = '10'
              const dot = e.currentTarget.querySelector('div') as HTMLElement
              if (dot) dot.style.transform = 'scale(1.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.zIndex = '1'
              const dot = e.currentTarget.querySelector('div') as HTMLElement
              if (dot) dot.style.transform = 'scale(1)'
            }}
          >
            <div style={{
              width: `${Math.min(20 + city.value/500, 50)}px`,
              height: `${Math.min(20 + city.value/500, 50)}px`,
              background: `radial-gradient(circle, rgba(0, 255, 170, 0.9), rgba(0, 204, 136, 0.7))`,
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 0 15px rgba(0, 255, 170, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#050a0f',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              transition: 'all 0.3s ease'
            }}>
              {(city.value / 1000).toFixed(1)}
            </div>
            <div style={{
              marginTop: '8px',
              padding: '4px 10px',
              background: 'rgba(5, 10, 15, 0.95)',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              color: '#ffd700',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              opacity: 0,
              transition: 'opacity 0.3s ease'
            }} className="city-label">
              {city.name}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px'
      }}>
        {cities.map((city, index) => (
          <div
            key={index}
            style={{
              padding: '12px',
              background: 'rgba(26, 58, 58, 0.3)',
              borderRadius: '12px',
              borderLeft: `3px solid ${index % 2 === 0 ? '#00ffaa' : '#ffd700'}`,
              fontSize: '0.95rem'
            }}
          >
            <div style={{ fontWeight: 'bold', color: '#e6f7ff' }}>{city.name}</div>
            <div style={{ color: '#00ffaa', fontWeight: '600', marginTop: '4px' }}>
              {(city.value / 1000).toLocaleString('ar-SA', { maximumFractionDigits: 1 })} طن
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}