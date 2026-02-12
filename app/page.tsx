import streamlit as st
import pandas as pd

# إعداد الصفحة
st.set_page_config(page_title="منصة تدوير العالمية", layout="wide", initial_sidebar_state="collapsed")

# CSS متطور: أبيض، أخضر، احترافي، RTL
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    html, body, [class*="css"] {
        font-family: 'Cairo', sans-serif;
        direction: RTL; text-align: right;
        background-color: #FFFFFF;
    }
    .main { background-color: #FFFFFF; }
    .stMetric { background-color: #f0f9f4; padding: 15px; border-radius: 10px; border: 1px solid #165d31; }
    h1, h2, h3 { color: #165d31 !important; }
    .stButton > button {
        background-color: #165d31; color: white; border-radius: 8px;
        width: 100%; font-weight: bold; border: none; height: 3em;
    }
    .stTable { border: 1px solid #165d31; }
    thead tr th { background-color: #165d31 !important; color: white !important; }
    </style>
    """, unsafe_allow_input=True)

# الهيدر
col_logo, col_text = st.columns([1, 4])
with col_logo:
    st.image("https://www.vision2030.gov.sa/media/rc0bc5sc/vision_2030_logo.png", width=120)
with col_text:
    st.title("منصة تدوير العالمية 🌍")
    st.subheader("سوق الخردة الذكي وحساب البصمة الكربونية")

st.divider()

# قسم الإحصائيات السريعة (Dashboard) لزيادة الاحترافية
c1, c2, c3 = st.columns(3)
with c1:
    st.metric(label="إجمالي الكميات المتداولة (طن)", value="1,250", delta="15% نمو")
with c2:
    st.metric(label="انبعاثات CO2 التي تم توفيرها", value="3,400 طن", delta="محقق")
with c3:
    st.metric(label="متوسط سعر الطن اليوم", value="1,850 ريال", delta="مستقر")

st.divider()

# واجهة المستخدم للبائع والمشتري
tab1, tab2 = st.tabs(["📦 عرض مواد (بائع)", "📊 لوحة التحكم والأسعار (مشتري)"])

with tab1:
    st.write("### أضف الخردة أو المواد القابلة للتدوير")
    with st.form("scrap_form"):
        material = st.selectbox("نوع المادة:", ["حديد", "نحاس", "بلاستيك (PET)", "ورق وكارتون", "بطاريات"])
        weight = st.number_input("الكمية (بالطن):", min_value=0.1)
        location = st.text_input("موقع التحميل (المدينة):", placeholder="مثال: الرياض - المنطقة الصناعية")
        submitted = st.form_submit_button("عرض للمزايدة وحساب الأثر")
        
        if submitted:
            # معادلة افتراضية لحساب توفير الكربون (مثلاً الحديد يوفر 1.5 طن CO2 لكل طن معاد تدويره)
            carbon_saved = weight * 1.5 
            st.success(f"✅ تم إدراج عرضك! بصمتك الكربونية التي ستوفرها: {carbon_saved} طن CO2")

with tab2:
    st.write("### العروض المتاحة حالياً للمصانع")
    # بيانات تجريبية تحاكي الواقع
    market_data = {
        "المادة": ["حديد سكراب", "بلاستيك مختلط", "نحاس أحمر"],
        "الكمية": ["50 طن", "12 طن", "5 طن"],
        "الموقع": ["جدة", "الدمام", "الرياض"],
        "أعلى عرض سعر حالي": ["1,400 ريال", "600 ريال", "28,000 ريال"],
        "توفير الكربون (CO2)": ["75 طن", "18 طن", "10 طن"]
    }
    st.table(pd.DataFrame(market_data))

# تذييل الصفحة للمستثمر
st.sidebar.title("ملخص الاستثمار")
st.sidebar.info("""
**لماذا تدوير؟**
1. ربط مباشر بين المصدر والمصنع.
2. عمولة 2.5% على كل عملية تداول.
3. إصدار شهادات "كربون" معتمدة للمصانع.
4. التوسع من السعودية إلى الخليج ثم العالم.
""")
