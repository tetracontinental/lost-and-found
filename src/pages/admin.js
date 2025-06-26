import { useState, useEffect } from 'react';

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'password123';

export default function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  // フックはここで宣言
  const [locationName, setLocationName] = useState('');
  const [locations, setLocations] = useState([]);
  const [locMsg, setLocMsg] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/locations')
        .then(res => res.json())
        .then(setLocations);
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('ユーザー名またはパスワードが違います');
    }
  };

  const addLocation = async e => {
    e.preventDefault();
    const res = await fetch('/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: locationName }),
    });
    if (res.ok) {
      setLocMsg('場所を追加しました');
      setLocationName('');
      fetch('/api/locations').then(r => r.json()).then(setLocations);
    } else {
      setLocMsg('追加に失敗しました');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
        <h2>管理者ログイン</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 12 }}>
            <label>ユーザー名<br />
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%' }} />
            </label>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>パスワード<br />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%' }} />
            </label>
          </div>
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          <button type="submit" style={{ width: '100%' }}>ログイン</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <h2>管理者画面</h2>
      <div style={{ margin: '24px 0', padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
        <h3>場所の追加</h3>
        <form onSubmit={addLocation} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="text"
            value={locationName}
            onChange={e => setLocationName(e.target.value)}
            placeholder="場所名"
            required
            style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 16px', borderRadius: 6, background: '#3182ce', color: '#fff', border: 'none', fontWeight: 'bold' }}>追加</button>
        </form>
        {locMsg && <div style={{ marginTop: 8, color: '#38a169' }}>{locMsg}</div>}
        <div style={{ marginTop: 16 }}>
          <strong>登録済みの場所:</strong>
          <ul>
            {locations.map(loc => <li key={loc._id || loc.id}>{loc.name}</li>)}
          </ul>
        </div>
      </div>
      <p>ログイン成功！ここに管理機能を追加できます。</p>
    </div>
  );
}
