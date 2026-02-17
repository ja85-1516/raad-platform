-- جدول sovereign_resources للموارد السيادية
-- نفّذ هذا الملف في SQL Editor في لوحة تحكم Supabase

CREATE TABLE IF NOT EXISTS sovereign_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  material_type TEXT NOT NULL,
  weight_kg NUMERIC NOT NULL,
  carbon_saved_kg NUMERIC NOT NULL,
  origin TEXT,
  region TEXT NOT NULL,
  industrial_city TEXT NOT NULL,
  saudi_green_compatibility BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- تمكين Row Level Security (اختياري)
ALTER TABLE sovereign_resources ENABLE ROW LEVEL SECURITY;

-- سياسة للسماح بقراءة السجلات للجميع
CREATE POLICY "Allow public read" ON sovereign_resources
  FOR SELECT USING (true);

-- سياسة للسماح بإدخال السجلات (عدّل حسب احتياجاتك للأمان)
CREATE POLICY "Allow public insert" ON sovereign_resources
  FOR INSERT WITH CHECK (true);
