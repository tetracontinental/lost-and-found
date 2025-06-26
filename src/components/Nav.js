import Link from 'next/link';

export default function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: 24 }}>
      <Link href="/">
        <span style={{ color: '#3182ce', fontWeight: 'bold', fontSize: 18 }}>一覧</span>
      </Link>
      <Link href="/add">
        <span style={{ color: '#3182ce', fontWeight: 'bold', fontSize: 18 }}>登録</span>
      </Link>
    </nav>
  );
}
