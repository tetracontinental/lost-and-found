export default function Custom404() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f6f8fa',
      fontFamily: 'system-ui',
      color: '#2d3748'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: 0 }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginTop: 0 }}>ページが見つかりません</p>
      <a href="/" style={{
        marginTop: 24,
        color: '#3182ce',
        textDecoration: 'underline',
        fontWeight: 'bold',
        fontSize: '1.1rem'
      }}>トップページへ戻る</a>
    </div>
  );
}
