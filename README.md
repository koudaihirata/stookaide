# 簡易仕様書

## アプリ名
STOOK Aide

## 対象OSおよびブラウザ(ver.含む)
Google Chrome

## 開発環境/言語
{<br/>
  "name": "stookaide",<br/>
  "version": "0.1.0",<br/>
  "private": true,<br/>
  "scripts": {<br/>
    "prepare": "panda codegen",<br/>
    "dev": "next dev",<br/>
    "build": "next build",<br/>
    "start": "next start",<br/>
    "lint": "next lint"<br/>
  },<br/>
  "dependencies": {<br/>
    "@emotion/react": "^11.11.4",<br/>
    "@emotion/styled": "^11.11.5",<br/>
    "@fortawesome/fontawesome-svg-core": "^6.5.2",<br/>
    "@fortawesome/free-brands-svg-icons": "^6.5.2",<br/>
    "@fortawesome/free-regular-svg-icons": "^6.5.2",<br/>
    "@fortawesome/free-solid-svg-icons": "^6.5.2",<br/>
    "@fortawesome/react-fontawesome": "latest",<br/>
    "@react-spring/web": "^9.7.3",<br/>
    "@types/react-router-dom": "^5.3.3",<br/>
    "axios": "^1.7.2",<br/>
    "dotenv": "^16.4.5",<br/>
    "next": "14.2.4",<br/>
    "promise-mysql": "^5.2.0",<br/>
    "react": "^18",<br/>
    "react-dom": "^18",<br/>
    "react-router-dom": "latest",<br/>
    "react-tinder-card": "^1.6.4",<br/>
    "sass": "^1.77.6",<br/>
    "styled-system": "^5.1.5",<br/>
    "ts-node": "^10.9.2"<br/>
  },<br/>
  "devDependencies": {<br/>
    "@pandacss/dev": "^0.41.0",<br/>
    "@types/node": "^20.14.10",<br/>
    "@types/react": "^18",<br/>
    "@types/react-dom": "^18",<br/>
    "eslint": "^8",<br/>
    "eslint-config-next": "14.2.4",<br/>
    "typescript": "^5.5.3",<br/>
    "@types/bun": "latest"<br/>
  },<br/>
  "module": "index.ts",<br/>
  "type": "module"<br/>
}<br/>

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
