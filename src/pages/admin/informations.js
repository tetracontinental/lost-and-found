import { useEffect, useState } from 'react';

export default function InformationsAdmin() {
  const [informations, setInformations] = useState([]);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('info');
  const [loading, setLoading] = useState(false);

  const fetchInformations = async () => {
    const res = await fetch('/api/informations');
    setInformations(await res.json());
  };

  useEffect(() => { fetchInformations(); }, []);

  const handleAdd = async e => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/informations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, type })
    });
    setMessage('');
    setType('info');
    setLoading(false);
    fetchInformations();
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'system-ui' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>お知らせ管理</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="お知らせ内容"
          required
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <select value={type} onChange={e => setType(e.target.value)} style={{ padding: 8, borderRadius: 6 }}>
          <option value="info">info</option>
          <option value="alert">alert</option>
        </select>
        <button type="submit" disabled={loading} style={{ padding: '8px 16px', borderRadius: 6, background: '#3182ce', color: '#fff', border: 'none', fontWeight: 'bold' }}>
          追加
        </button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {informations.map(info => (
          <li key={info._id || info.id} style={{ background: '#f6f8fa', marginBottom: 12, borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{info.message}</span>
            <span style={{ color: '#888', fontSize: 12 }}>{info.type}</span>
            <span style={{ color: '#aaa', fontSize: 12 }}>{info.createdAt ? new Date(info.createdAt).toLocaleString() : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
