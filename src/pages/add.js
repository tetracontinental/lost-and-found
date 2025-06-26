import { useEffect, useState } from 'react';

export default function AddItem() {
  const [locations, setLocations] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [locationId, setLocationId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(setLocations);
  }, []);

  const submit = async e => {
    e.preventDefault();
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, description, locationId }),
    });
    if (res.ok) {
      setMessage('登録しました');
      setImageUrl('');
      setDescription('');
      setLocationId('');
    } else {
      setMessage('エラーが発生しました');
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui', background: '#f6f8fa', minHeight: '100vh', padding: 32 }}>
      <h1 style={{ textAlign: 'center', color: '#2d3748' }}>落とし物登録</h1>
      <form onSubmit={submit} style={{ maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <input
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="画像URL"
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="説明"
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 80 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <select
            value={locationId}
            onChange={e => setLocationId(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          >
            <option value="">場所を選択</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px 0', borderRadius: 6, background: '#3182ce', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: 16 }}
        >登録</button>
        {message && <div style={{ marginTop: 16, color: '#38a169', textAlign: 'center' }}>{message}</div>}
      </form>
    </div>
  );
}
