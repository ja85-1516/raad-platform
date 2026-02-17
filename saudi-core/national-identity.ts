/**
 * الهوية الوطنية السعودية
 * Saudi National Identity - Constants and data for administrative regions and industrial cities
 */

// ============ المناطق الإدارية السعودية (13 منطقة) ============
export const SAUDI_ADMINISTRATIVE_REGIONS = [
  'منطقة الرياض',
  'منطقة مكة المكرمة',
  'منطقة المدينة المنورة',
  'المنطقة الشرقية',
  'منطقة عسير',
  'منطقة تبوك',
  'منطقة حائل',
  'منطقة الحدود الشمالية',
  'منطقة الجوف',
  'منطقة القصيم',
  'منطقة نجران',
  'منطقة الباحة',
  'منطقة جازان',
] as const

export type SaudiRegion = (typeof SAUDI_ADMINISTRATIVE_REGIONS)[number]

// ============ المدن الصناعية السعودية ============
export const SAUDI_INDUSTRIAL_CITIES = [
  'مدينتي',
  'المدينة الصناعية الثانية بالرياض',
  'المدينة الصناعية الثالثة بالرياض',
  'المدينة الصناعية بجدة',
  'مدينة الجبيل الصناعية',
  'مدينة ينبع الصناعية',
  'مدينة رأس الخير',
  'المدينة الصناعية بالدمام',
  'مدينة الطائف الصناعية',
  'مدينة جازان الصناعية',
  'مدينة حائل الصناعية',
  'مدينة تبوك الصناعية',
  'مدينة نجران الصناعية',
  'المدينة الصناعية بالقصيم',
  'مدينة الباحة الصناعية',
  'المدينة الصناعية بالمدينة المنورة',
] as const

export type SaudiIndustrialCity = (typeof SAUDI_INDUSTRIAL_CITIES)[number]

// ============ رموز الهوية الوطنية ============
export const SAUDI_IDENTITY = {
  country: 'المملكة العربية السعودية',
}

export const SAUDI_NATIONAL_IDENTITY = {
  countryNameAr: 'المملكة العربية السعودية',
  countryNameEn: 'Kingdom of Saudi Arabia',
  vision2030: 'رؤية السعودية 2030',
  saudiGreenInitiative: 'مبادرة السعودية الخضراء',
  digitalSovereignty: 'السيادة الرقمية',
} as const
