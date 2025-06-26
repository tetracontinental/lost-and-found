// お知らせバナーの共通コンポーネント
export default function InformationBanner({ informations }) {
  if (!informations?.length) return null;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      margin: '0 auto 2vw auto', maxWidth: 600
    }}>
      {informations.map(info => (
        <div key={info._id || info.id} style={{
          display: 'flex', alignItems: 'center', background: '#e6f4ff', color: '#155fa0',
          borderRadius: 8, padding: '8px 16px', boxShadow: '0 1px 4px #0001', fontSize: '1rem', width: '100%',
          borderLeft: '5px solid #3182ce', minHeight: 40
        }}>
          <svg style={{ marginRight: 8 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span>{info.message}</span>
        </div>
      ))}
    </div>
  );
}
