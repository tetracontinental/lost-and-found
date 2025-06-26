# Lost and Found サイト

## セットアップ手順

1. 依存インストール

```
npm install
```

2. MongoDBの起動（Docker Compose）

```
docker-compose up --build
```

3. サイトにアクセス

- http://localhost:3000

## 機能
- 落とし物一覧・検索
- 落とし物登録
- 画像・説明・場所（プルダウン）
- MongoDB + Next.js API
- モダンなUI
- お知らせ（informationsコレクションで管理、管理画面やmongo shellで追加可能）

## お知らせ（Information）管理について
- `src/pages/api/informations.js` でAPI化
- `src/lib/information.js` でMongoDB操作
- `src/components/InformationBanner.js` で表示
- MongoDBの `informations` コレクションに下記のようなドキュメントを追加すると、トップページに反映されます

例:
```
{
  message: "落とし物の受け渡しは平日9:00〜17:00です",
  type: "info",
  createdAt: new Date()
}
```
