# Meal Management App

食事内容、カロリー、食事区分、日時、メモを記録・編集・削除できる食事管理アプリです。

## 主な機能

- 食事記録の登録（Create）
- 食事一覧の取得・表示（Read）
- 食事記録の編集（Update）
- 食事記録の削除（Delete）

## 使用技術

### フロントエンド

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### バックエンド

- Node.js
- Hono
- Prisma
- PostgreSQL
- Zod

## ディレクトリ構成

```text
meal-management-app/
├─ frontend/                 # Next.jsフロントエンド
│  ├─ app/
│  │  ├─ components/        # 食事フォーム・一覧・編集モーダル
│  │  └─ page.tsx
│  ├─ lib/mealApi.ts        # バックエンドAPI呼び出し
│  └─ types/meal.ts         # TypeScript型定義
└─ backend/                  # Hono API
   ├─ prisma/
   │  ├─ migrations/        # DBマイグレーション
   │  └─ schema.prisma      # Prismaスキーマ
   └─ src/
      ├─ index.ts           # APIルート
      └─ lib/prisma.ts      # Prisma Client
```

## 前提条件

ローカル環境に次のソフトウェアが必要です。

- Node.js
- npm
- PostgreSQL

## セットアップ

### 1. PostgreSQLのデータベースを作成する

PostgreSQLで次のデータベースを作成します。

```sql
CREATE DATABASE meal_management;
```

### 2. バックエンドの環境変数を設定する

`backend/.env`を作成し、PostgreSQLの接続情報を設定します。

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/meal_management?schema=public"
```

`YOUR_PASSWORD`を実際のPostgreSQLパスワードに置き換えてください。

パスワードに`@`、`:`、`/`などが含まれる場合は、URLエンコードが必要です。

### 3. バックエンドをセットアップする

```powershell
cd backend
npm install
npx prisma migrate dev
npx prisma generate
```

### 4. フロントエンドの環境変数を設定する

`frontend/.env.local`を作成します。

```env
NEXT_PUBLIC_API_URL=http://localhost:8787
```

### 5. フロントエンドをセットアップする

```powershell
cd frontend
npm install
```

## 開発サーバーの起動

バックエンドとフロントエンドは、別々のターミナルで起動します。

### ターミナル1：バックエンド

```powershell
cd C:\programing_practice\meal-management-app\backend
npm run dev
```

バックエンドは `http://localhost:8787` で起動します。

### ターミナル2：フロントエンド

```powershell
cd C:\programing_practice\meal-management-app\frontend
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## API一覧

| メソッド | エンドポイント | 内容 |
|---|---|---|
| `POST` | `/api/meals` | 食事記録を登録 |
| `GET` | `/api/meals` | 食事記録の一覧を取得 |
| `GET` | `/api/meals/:id` | 指定した食事記録を取得 |
| `PATCH` | `/api/meals/:id` | 指定した食事記録を更新 |
| `DELETE` | `/api/meals/:id` | 指定した食事記録を削除 |
| `GET` | `/api/meals/daily-summary?date=YYYY-MM-DD` | 指定日の合計カロリーを取得 |

### 登録・更新データの例

```json
{
  "name": "鶏むね肉とご飯",
  "calories": 450,
  "mealType": "LUNCH",
  "eatenAt": "2026-08-17T12:00:00.000Z",
  "memo": "トレーニング後"
}
```

`mealType`には次のいずれかを指定します。

- `BREAKFAST`
- `LUNCH`
- `DINNER`
- `SNACK`

## Prisma Studio

データベースの内容はPrisma Studioで確認できます。

```powershell
cd backend
npx prisma studio
```

## ビルドとチェック

### バックエンド

```powershell
cd backend
npm run build
```

### フロントエンド

```powershell
cd frontend
npm run lint
npm run build
```

## トラブルシューティング

### PostgreSQLのパスワードを変更した場合

`backend/.env`の`DATABASE_URL`を更新したあと、バックエンドAPIを必ず再起動してください。環境変数はAPI起動時に読み込まれます。

### Prisma Studioにはデータがあるのに画面に表示されない場合

次の順番で確認します。

1. PostgreSQLが起動しているか
2. `backend/.env`の接続先DB名とパスワードが正しいか
3. バックエンドが `http://localhost:8787` で起動しているか
4. `http://localhost:8787/api/meals`でJSONが返るか
5. `frontend/.env.local`の`NEXT_PUBLIC_API_URL`が正しいか

### Next.jsでチャンク読み込みエラーが発生した場合

フロントエンドを停止し、生成キャッシュを削除して再起動します。

```powershell
cd frontend
Remove-Item .next -Recurse -Force
npm run dev
```

`.next`は自動生成されるキャッシュなので、削除してもソースコードには影響しません。
