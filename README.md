# Lost and Found サイト

## セットアップ手順

1. 依存インストール

```
npm install
```

2. DBマイグレーション & 初期データ投入

```
npx prisma migrate dev --name init
psql -h localhost -U lostandfound -d lostandfound -f prisma/seed.sql
```

3. 開発サーバー起動（Docker Compose）

```
docker-compose up --build
```

4. サイトにアクセス

- http://localhost:3000

## 機能
- 落とし物一覧・検索
- 落とし物登録
- 画像・説明・場所（プルダウン）
- Prisma + Next.js API
- モダンなUI
