# Lightning Talk Slide Skill

**暮らしとNotionミートアップ公式テンプレート**に準拠したLT（Lightning Talk）スライドを自動生成するスキルです。

Claude Codeに「LTスライドを作って」と指示するだけで、Mac風ウィンドウフレームデザインのPowerPointスライドを自動生成します。

## 公式テンプレート

このスキルは以下の公式テンプレートに準拠しています：

[暮らしとNotionミートアップ LTテンプレート（Googleスライド）](https://docs.google.com/presentation/d/1wkZgkivteQQaPGU0nrBlk8yjcT6MJNY7nGjs2PhTnyQ/edit?usp=sharing)

## デザインの特徴

<img src="img/profile.png" alt="けいたろう プロフィール" width="200" />

**スピーカー: けいたろう**

### カラーパレット（公式テンプレート準拠）

| 変数名 | HEX | 用途 |
|--------|-----|------|
| `FRAME_BG` | `#C4A98D` | フレーム背景色（茶色/ゴールド） |
| `FRAME_BORDER` | `#000000` | フレーム外枠線（黒） |
| `TITLE_BAR` | `#000000` | タイトルバー背景（黒） |
| `TRAFFIC_RED` | `#E0776C` | トラフィックライト（赤） |
| `TRAFFIC_YELLOW` | `#E5E616` | トラフィックライト（黄） |
| `TRAFFIC_GREEN` | `#93D9B4` | トラフィックライト（緑） |
| `HEADER_GRAY` | `#F2F2F2` | ヘッダー背景 |
| `BADGE_BG` | `#F5C518` | Lightning Talkバッジ |
| `BADGE_BORDER` | `#000000` | バッジ枠線 |
| `TEXT_BLACK` | `#000000` | メインテキスト |
| `DIVIDER` | `#A5A5A5` | 区切り線 |
| `PLACEHOLDER_GRAY` | `#BFBFBF` | アイコンプレースホルダー |

## セットアップ

```bash
npm install
```

## 使い方

```javascript
const t = require("./scripts/template.js");
const pptxgen = t.pptxgen;

var pres = new pptxgen();
pres.layout = t.config.layout;

// 表紙（タイトル左側、アイコン右側）
t.addLTTitleSlide(pres, "タイトル", "サブタイトル", "けいたろう");

// 自己紹介（プロフィール画像＋箇条書き「・」）
t.addLTProfileSlide(pres, "けいたろう", [
  "エンジニア",
  "趣味: コーディング"
], "img/profile.png");

// コンテンツ
t.addLTContentSlide(pres, "見出し", "本文テキスト");

// クロージング
t.addLTClosingSlide(pres, "ありがとうございました", "ご質問はお気軽に！", "けいたろう");

// 出力
pres.writeFile({ fileName: "/home/user/output/my_lt.pptx" });
```

## 利用可能な7パターン

| # | パターン | 関数名 | 用途 |
|---|---------|--------|------|
| 1 | 表紙 | `addLTTitleSlide` | タイトル（左）+ アイコン（右） |
| 2 | 自己紹介 | `addLTProfileSlide` | プロフィール画像 + 箇条書き（・） |
| 3 | コンテンツ | `addLTContentSlide` | 見出し + 本文 |
| 4 | ポイント付き | `addLTPointSlide` | 本文 + ポイントボックス |
| 5 | 画像 | `addLTImageSlide` | 画像 + キャプション |
| 6 | リスト | `addLTListSlide` | 番号付きリスト |
| 7 | クロージング | `addLTClosingSlide` | まとめ + 挨拶 |

## 各パターンの使い方

### パターン 1: 表紙

公式テンプレート準拠: タイトルが左側、アイコンが右側に配置されます。

```javascript
t.addLTTitleSlide(pres, "タイトル", "サブタイトル", "けいたろう");
```

### パターン 2: 自己紹介

公式テンプレート準拠: 箇条書きは「・」（中黒）を使用します。

```javascript
t.addLTProfileSlide(pres, "けいたろう", [
  "エンジニア",
  "趣味: コーディング",
  "好きな技術: Node.js"
], "img/profile.png");  // 画像パス（省略可）
```

### パターン 3: コンテンツ

```javascript
t.addLTContentSlide(pres, "見出しタイトル", "本文テキスト");
```

### パターン 4: ポイント付きコンテンツ

```javascript
t.addLTPointSlide(pres, "見出し", "本文テキスト", "ポイント", "ポイントの説明文");
```

### パターン 5: 画像

```javascript
t.addLTImageSlide(pres, "見出し", "img/profile.png", "キャプション");
```

### パターン 6: リスト

```javascript
t.addLTListSlide(pres, "見出し", [
  { title: "項目名", description: "説明文" },
  { title: "項目名", description: "説明文" }
]);
// または文字列の配列:
t.addLTListSlide(pres, "見出し", ["項目1", "項目2", "項目3"]);
```

### パターン 7: クロージング

```javascript
t.addLTClosingSlide(pres, "ありがとうございました", "メッセージ", "けいたろう");
```

## プロフィール画像

スピーカーのプロフィール画像は `img/` ディレクトリに配置してください。

```
img/
└── profile.png   ← けいたろうのプロフィール画像
```

自己紹介スライドや画像スライドで使用されます。

## テスト

```bash
npm test
```

全7パターンのテストスライドが `/home/user/output/test_lt_patterns.pptx` に生成されます。

## ディレクトリ構成

```
kurashi-to-notion-lt-skill/
├── scripts/
│   ├── template.js       # テンプレートライブラリ（公式テンプレート準拠）
│   └── test.js           # 全パターン動作テスト
├── downloads/
│   ├── pptx/             # 生成されたPPTXファイル
│   └── pdf/              # 生成されたPDFファイル
├── img/                  # プロフィール画像など
├── .github/
│   └── workflows/
│       └── notify-pptx.yml  # Discord/メール通知ワークフロー
├── CLAUDE.md             # Claude Code用ルール
├── package.json
└── README.md
```

## GitHub Actions

`downloads/pptx/` にPPTXファイルをプッシュすると、自動的に以下が実行されます：

1. **PDF自動変換**: PPTXからPDFを自動生成
2. **Discord通知**: Webhookでファイル付き通知
3. **メール通知**: SMTP経由でファイル添付メール送信

## ライセンス

Copyright @ 2024 All Rights Reserved. AAAAAAA Inc.
