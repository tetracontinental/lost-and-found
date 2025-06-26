import { useEffect, useState } from 'react';
import InformationBanner from '../components/InformationBanner';

export default function Home() {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [q, setQ] = useState('');
  const [locationId, setLocationId] = useState('');
  const [informations, setInformations] = useState([]);

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(setLocations);
  }, []);

  useEffect(() => {
    fetch('/api/informations')
      .then(res => res.json())
      .then(setInformations);
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
    <div style={{ fontFamily: 'system-ui', background: '#f6f8fa', minHeight: '100vh', padding: '5vw 2vw' }}>
      <h1 style={{ textAlign: 'center', color: '#2d3748', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1vw' }}>落とし物共有サイト</h1>
      {/* お知らせバナー */}
      <InformationBanner informations={informations} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="説明で検索"
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120, flex: '1 1 160px', maxWidth: 300 }}
        />
        <select
          value={locationId}
          onChange={e => setLocationId(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', flex: '1 1 120px', maxWidth: 200 }}
        >
          <option value="">場所を選択</option>
          {locations.map((loc, idx) => (
            <option key={loc._id || loc.id || idx} value={loc._id || loc.id}>{loc.name}</option>
          ))}
        </select>
        <button
          onClick={search}
          style={{ padding: '8px 16px', borderRadius: 6, background: '#3182ce', color: '#fff', border: 'none', fontWeight: 'bold', flex: '1 1 80px', minWidth: 80 }}
        >検索</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '4vw', alignItems: 'stretch' }}>
        {items.map((item, idx) => (
          <div key={item._id || item.id || idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 'min(4vw, 20px)', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <img src={item.images && item.images[0] ? item.images[0].url : ''} alt="item" style={{ width: '100%', height: '32vw', maxHeight: 220, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
            <div style={{ fontWeight: 'bold', color: '#2d3748', marginBottom: 4, fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>{item.description}</div>
            <div style={{ color: '#718096', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>{item.location?.name}</div>
            <div style={{ color: '#a0aec0', fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}>{new Date(item.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
