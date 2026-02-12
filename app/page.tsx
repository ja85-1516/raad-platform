import streamlit as st

# 1. إعداد الصفحة (يجب أن يكون أول أمر في الكود)
st.set_page_config(page_title="منصة تدوير العالمية", layout="wide")

# 2. تصميم الواجهة (CSS) لجعلها بيضاء وخضراء وتدعم العربية
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    html, body, [class*="css"] {
        font-family: 'Cairo', sans-serif;
        direction: RTL; text-align: right;
    }
    .stApp { background-color: #FFFFFF; }
    h1, h2, h3 { color: #165d31 !important; }
    div.stButton > button {
        background-color: #165d31; color: white; border-radius: 10px;
        width: 100%; height: 3em; font-size: 1.1rem; border: none;
    }
    .main-box {
        padding: 20px; border: 2px solid #165d31; border-radius: 15px; background-color: #f9f9f9;
    }
    </style>
    """, unsafe_allow_input=True)

# 3. الهيدر وشعار الرؤية
col1, col2 = st.columns([1, 4])
with col1:
    st.image("https://www.vision2030.gov.sa/media/rc0bc5sc/vision_2030_logo.png", width=120)
with col2:
    st.title("منصة تدوير العالمية 🌍")
    st.subheader("سوق الخردة الذكي وحساب البصمة الكربونية")

st.divider()

# 4. محتوى التطبيق
tab1, tab2 = st.tabs(["📦 عرض مواد للبيع", "📊 الأسعار المباشرة"])

with tab1:
    st.write("### أضف الخردة أو المواد المعاد تدويرها")
    with st.container():
        st.markdown('<div class="main-box">', unsafe_allow_input=True)
        item_type = st.selectbox("نوع المادة:", ["حديد سكراب", "ألمنيوم", "نحاس", "بلاستيك", "كرتون"])
        weight = st.number_input("الكمية التقريبية (بالطن):", min_value=0.1)
        city = st.text_input("المدينة:")
        
        if st.button("إرسال العرض وحساب الأثر"):
            carbon_offset = weight * 1.5 # معادلة افتراضية
            st.success(f"تم الإدراج! بمشاركتك هذه وفرت {carbon_offset} طن من انبعاثات الكربون.")
        st.markdown('</div>', unsafe_allow_input=True)

with tab2:
    st.write("### أسعار السوق وتوفير الكربون")
    # عرض البيانات بشكل مبسط لتجنب أخطاء المكتبات الخارجية
    st.write("📍 **آخر العروض المتاحة:**")
    st.info("📦 حديد سكراب - 50 طن - الرياض | السعر الحالي: 1450 ريال")
    st.info("📦 بلاستيك PET - 10 طن - جدة | السعر الحالي: 650 ريال")
    st.info("📦 نحاس - 2 طن - الدمام | السعر الحالي: 27,000 ريال")

# 5. رسالة للمستثمر في الجانب
st.sidebar.success("هذا المشروع يدعم مبادرة السعودية الخضراء ويستهدف سوقاً بمليارات الريالات.")
