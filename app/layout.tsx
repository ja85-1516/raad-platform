// app/layout.tsx
import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

// تحميل خط تجوال من Google Fonts
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
  variable: "--font-tajawal",
});

// ✅ إعدادات الميتاداتا الاحترافية
export const metadata: Metadata = {
  // ✅ إصلاح التحذير - إضافة metadataBase
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  
  // العنوان الذي يظهر في شريط المتصفح
  title: {
    default: "راد | RAAD - المنصة السيادية للموارد الثانوية",
    template: "%s | راد"
  },
  
  // الوصف الذي يظهر في محركات البحث
  description: "أول بورصة سيادية رقمية سعودية لتداول الموارد وأصول الكربون",
  
  // الكلمات المفتاحية
  keywords: [
    "راد",
    "RAAD",
    "منصة سيادية",
    "موارد ثانوية",
    "كربون",
    "رؤية 2030",
    "السعودية",
    "تداول",
    "مزادات"
  ],
  
  // المؤلفين
  authors: [
    { name: "RAAD Platform" },
    { name: "منصة راد", url: "https://raad.sa" }
  ],
  
  // ✅ الشعار في المتصفح - Favicon
  icons: {
    icon: [
      { url: '/raad-logo.png', sizes: 'any' },
      { url: '/raad-logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/raad-logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/raad-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/raad-logo.png',
  },
  
  // بيانات Open Graph للمشاركة على وسائل التواصل
  openGraph: {
    title: "راد | RAAD - المنصة السيادية للموارد الثانوية",
    description: "أول بورصة سيادية رقمية سعودية لتداول الموارد وأصول الكربون",
    url: "https://raad.sa",
    siteName: "RAAD Platform",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: '/raad-logo.png',
        width: 1200,
        height: 630,
        alt: 'شعار منصة راد'
      }
    ],
  },
  
  // بيانات Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: "راد | RAAD - المنصة السيادية للموارد الثانوية",
    description: "أول بورصة سيادية رقمية سعودية لتداول الموارد وأصول الكربون",
    images: ['/raad-logo.png'],
  },
  
  // إعدادات الروبوتات لمحركات البحث
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ✅ إعدادات العرض
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#050a0f' },
    { media: '(prefers-color-scheme: dark)', color: '#050a0f' },
  ],
};

// مكون التخطيط الرئيسي
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className={tajawal.className} style={{ margin: 0, padding: 0 }}>
        {children}
        
        {/* ✅ الأنماط المدمجة */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse {
            0%, 100% { 
              transform: scale(1);
              box-shadow: 0 0 40px rgba(0, 255, 170, 0.6);
            }
            50% { 
              transform: scale(1.05);
              box-shadow: 0 0 60px rgba(0, 255, 170, 0.8);
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html {
            scroll-behavior: smooth;
          }
          body {
            min-height: 100vh;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        ` }} />
      </body>
    </html>
  );
}