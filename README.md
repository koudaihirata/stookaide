# 簡易仕様書

## アプリ名
STOOK Aide

## 対象OSおよびブラウザ(ver.含む)
Google Chrome

## 開発環境/言語
```json
{
  "name": "stookaide",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "prepare": "panda codegen",
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "@fortawesome/fontawesome-svg-core": "^6.5.2",
    "@fortawesome/free-brands-svg-icons": "^6.5.2",
    "@fortawesome/free-regular-svg-icons": "^6.5.2",
    "@fortawesome/free-solid-svg-icons": "^6.5.2",
    "@fortawesome/react-fontawesome": "latest",
    "@react-spring/web": "^9.7.3",
    "@types/react-router-dom": "^5.3.3",
    "axios": "^1.7.2",
    "dotenv": "^16.4.5",
    "next": "14.2.4",
    "promise-mysql": "^5.2.0",
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "latest",
    "react-tinder-card": "^1.6.4",
    "sass": "^1.77.6",
    "styled-system": "^5.1.5",
    "ts-node": "^10.9.2"
  },
  "devDependencies": {
    "@pandacss/dev": "^0.41.0",
    "@types/node": "^20.14.10",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.4",
    "typescript": "^5.5.3",
    "@types/bun": "latest"
  },
  "module": "index.ts",
  "type": "module"
}

## 機能概要(機能一覧)
・食材を撮影、検出機能<br/>
　　余った食材をカメラで撮影して検出した食材を使ったレシピを提供する<br/>
・レシピ検索機能<br/>
　　Rakutenレシピ APIを使用してのキーワードの食材を入れるだけでレシピを検索できる<br/>
・余り物ランキング機能<br/>
　　カメラで読み取ったものは余っている物なので次からはその食材を少し少なく買ってもらうために読み取った数が多いものを表示する<br/>
・買う時におすすめ食材提案機能（未完成）<br/>
　　よく余る物に合う食材をchatGPT APIを使用して提案する<br/>

## フレームワーク(ver.含む)
next.js 14.2.4

## テーブル定義(ER図)などの設計ドキュメント
1. stook_users テーブル
ユーザー情報を格納するテーブルです。
カラム名	データ型	NULL許可	キー	デフォルト値	説明
id	INT	NO	PRIMARY KEY	AUTO_INCREMENT	ユーザーID
username	VARCHAR(50)	YES			ユーザー名
email	VARCHAR(100)	NO	UNIQUE		メールアドレス
password	VARCHAR(255)	NO			パスワード
postal_code	VARCHAR(10)	NO			郵便番号
date_of_birth	DATE	YES			生年月日
gender	ENUM('男', '女', 'その他')	YES			性別
favorite_recipe	JSON	YES			好きなレシピ情報
profile_image	BLOB	YES			プロフィール画像
created_at	TIMESTAMP	NO		CURRENT_TIMESTAMP	アカウント作成日時
