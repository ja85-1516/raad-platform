export default function Home() {
  return (
    <div style={{ 
      backgroundColor: '#1a365d', 
      color: 'white', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'sans-serif', 
      direction: 'rtl',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3.5rem', borderBottom: '5px solid #2ecc71', paddingBottom: '15px', marginBottom: '20px' }}>
        منصة راد | RAAD
      </h1>
      <p style={{ fontSize: '1.8rem', maxWidth: '600px', lineHeight: '1.5' }}>
        أول منصة سعودية عالمية لتتبع الخردة وأثر الكربون
      </p>
      <div style={{ marginTop: '30px', padding: '15px 30px', background: '#2ecc71', borderRadius: '50px', color: '#1a365d', fontWeight: 'bold', fontSize: '1.2rem' }}>
        الموقع متصل بـ Vercel وجاهز للانطلاق 🚀
      </div>
    </div>
  )
}
