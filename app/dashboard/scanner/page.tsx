"use client";
import { useState } from "react";

export default function SmartScanner() {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-sans">
      {/* الهوية السيادية - راد */}
      <div className="absolute top-10 text-center">
        <h1 className="text-2xl font-bold text-green-400 tracking-tighter">RAAD | راد</h1>
        <p className="text-gray-500 text-sm mt-1">نظام التوثيق السيادي للموارد</p>
      </div>

      {/* زر الكاميرا الملياري */}
      <div className="relative group">
        <div className={`w-64 h-64 rounded-full border-4 ${isScanning ? 'border-green-500 animate-pulse' : 'border-green-800'} flex items-center justify-center cursor-pointer transition-all duration-500 shadow-[0_0_50px_rgba(34,197,94,0.2)]`}
             onClick={() => setIsScanning(!isScanning)}>
          <div className="text-center">
            <span className="text-5xl block mb-2">📸</span>
            <span className="text-xs font-medium uppercase tracking-widest text-green-500">
              {isScanning ? "جاري المسح الذكي..." : "صوّر وأرسل للمزاد"}
            </span>
          </div>
        </div>
      </div>

      {/* لوحة البيانات اللحظية (الذكاء الاصطناعي) */}
      <div className="mt-12 w-full max-w-md grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
          <p className="text-zinc-500 text-[10px] uppercase">تقدير المادة</p>
          <p className="text-lg font-semibold">{isScanning ? "حديد سكراب" : "--"}</p>
        </div>
        <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
          <p className="text-zinc-500 text-[10px] uppercase">الوفر الكربوني</p>
          <p className="text-lg font-semibold text-green-400">{isScanning ? "2.4 CO2e" : "0.0"}</p>
        </div>
      </div>

      {/* لغات بسيطة للعمالة */}
      <div className="mt-8 flex gap-4 text-[10px] text-zinc-600 font-bold">
        <span>العربية</span>
        <span>ENGLISH</span>
        <span>اردو</span>
      </div>
    </div>
  );
}