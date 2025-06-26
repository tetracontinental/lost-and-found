import { useState } from 'react';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

export default function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('ユーザー名またはパスワードが違います');
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
      <p>ログイン成功！ここに管理機能を追加できます。</p>
    </div>
  );
}
