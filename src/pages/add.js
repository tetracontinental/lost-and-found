import { useEffect, useState, useRef } from 'react';

export default function AddItem() {
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]); // 画像ファイル配列
  const [previews, setPreviews] = useState([]); // プレビュー用URL
  const [description, setDescription] = useState('');
  const [locationId, setLocationId] = useState('');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(setLocations);
  }, []);

  // 画像選択・ドラッグ&ドロップ
  const handleFiles = files => {
    let arr = Array.from(files).slice(0, 5 - images.length);
    if (images.length + arr.length > 5) arr = arr.slice(0, 5 - images.length);
    setImages(prev => [...prev, ...arr]);
    setPreviews(prev => [...prev, ...arr.map(f => URL.createObjectURL(f))]);
  };

  const onDrop = e => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const onFileChange = e => {
    handleFiles(e.target.files);
  };
  const removeImage = idx => {
    setImages(imgs => imgs.filter((_, i) => i !== idx));
    setPreviews(pvs => pvs.filter((_, i) => i !== idx));
  };

  const submit = async e => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach(img => formData.append('images', img));
    formData.append('description', description);
    formData.append('locationId', locationId);
    const res = await fetch('/api/items', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      setMessage('登録しました');
      setImages([]); setPreviews([]); setDescription(''); setLocationId('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else {
      setMessage('エラーが発生しました');
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui', background: '#f6f8fa', minHeight: '100vh', padding: 32 }}>
      <h1 style={{ textAlign: 'center', color: '#2d3748' }}>落とし物登録</h1>
      <form onSubmit={submit} style={{ maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24 }}>
        <div
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          style={{ marginBottom: 16, border: '2px dashed #3182ce', borderRadius: 8, padding: 16, textAlign: 'center', background: '#f0f6ff', cursor: 'pointer' }}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={onFileChange}
            disabled={images.length >= 5}
          />
          {images.length < 5 ? (
            <span>画像をドラッグ＆ドロップ またはクリックで選択（最大5枚）</span>
          ) : (
            <span style={{ color: '#888' }}>最大5枚までです</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {previews.map((url, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <img src={url} alt="preview" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6, border: '1px solid #ccc' }} />
              <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: -8, right: -8, background: '#e53e3e', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12 }}>×</button>
            </div>
          ))}
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
              <option key={loc._id || loc.id} value={loc._id || loc.id}>{loc.name}</option>
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
