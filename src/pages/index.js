import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [q, setQ] = useState('');
  const [locationId, setLocationId] = useState('');

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(setLocations);
  }, []);

  const search = async () => {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (locationId) params.append('locationId', locationId);
    const res = await fetch('/api/items?' + params.toString());
    setItems(await res.json());
  };

  useEffect(() => { search(); }, []);

  return (
    <div style={{ fontFamily: 'system-ui', background: '#f6f8fa', minHeight: '100vh', padding: 32 }}>
      <h1 style={{ textAlign: 'center', color: '#2d3748' }}>落とし物共有サイト</h1>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="説明で検索"
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 200 }}
        />
        <select
          value={locationId}
          onChange={e => setLocationId(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        >
          <option value="">場所を選択</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id}>{loc.name}</option>
          ))}
        </select>
        <button
          onClick={search}
          style={{ padding: '8px 16px', borderRadius: 6, background: '#3182ce', color: '#fff', border: 'none', fontWeight: 'bold' }}
        >検索</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {items.map(item => (
          <div key={item.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 16 }}>
            <img src={item.imageUrl} alt="item" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
            <div style={{ fontWeight: 'bold', color: '#2d3748', marginBottom: 4 }}>{item.description}</div>
            <div style={{ color: '#718096', fontSize: 14 }}>{item.location?.name}</div>
            <div style={{ color: '#a0aec0', fontSize: 12 }}>{new Date(item.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
