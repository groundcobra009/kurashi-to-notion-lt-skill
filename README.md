# Lightning Talk Slide Skill

Mac風ウィンドウフレームデザインのLT（Lightning Talk）スライド自動生成スキル。

Claude Codeに指示するだけで、10分間のLTに最適化されたスライドを自動生成します。

## デザイン

<img src="img/profile.png" alt="けいたろう プロフィール" width="200" />

**スピーカー: けいたろう**

### カラーパレット

| 変数名 | HEX | 用途 |
|--------|-----|------|
| `FRAME_BROWN` | `#C4A882` | ウィンドウフレーム枠線 |
| `TITLE_BAR` | `#2D2D2D` | タイトルバー背景 |
| `TRAFFIC_RED` | `#FF5F57` | トラフィックライト（赤） |
| `TRAFFIC_YELLOW` | `#FFBD2E` | トラフィックライト（黄） |
| `TRAFFIC_GREEN` | `#28C840` | トラフィックライト（緑） |
| `HEADER_GRAY` | `#EEEEEE` | ヘッダー背景 |
| `BADGE_BG` | `#F5C518` | Lightning Talkバッジ |
| `TEXT_BLACK` | `#333333` | メインテキスト |

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

// 表紙
t.addLTTitleSlide(pres, "タイトル", "サブタイトル", "けいたろう");

// 自己紹介（プロフィール画像付き）
t.addLTProfileSlide(pres, "けいたろう", [
  "エンジニア",
  "趣味: コーディング"
], "img/profile.png");

// コンテンツ
t.addLTContentSlide(pres, "見出し", "本文テキスト");

// 出力
pres.writeFile({ fileName: "/home/user/output/my_lt.pptx" });
```

## 利用可能な7パターン

| # | パターン | 関数名 | 用途 |
|---|---------|--------|------|
| 1 | 表紙 | `addLTTitleSlide` | LTの冒頭タイトル |
| 2 | 自己紹介 | `addLTProfileSlide` | プロフィール画像＋箇条書き |
| 3 | コンテンツ | `addLTContentSlide` | 見出し＋本文 |
| 4 | ポイント付き | `addLTPointSlide` | 本文＋ハイライトボックス |
| 5 | 画像 | `addLTImageSlide` | 画像表示スライド |
| 6 | リスト | `addLTListSlide` | 番号付き箇条書き |
| 7 | クロージング | `addLTClosingSlide` | 締めくくり |

## 各パターンの使い方

### パターン 1: 表紙

```javascript
t.addLTTitleSlide(pres, "タイトル", "サブタイトル", "けいたろう");
```

### パターン 2: 自己紹介

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

## フォルダ構成

```
├── img/              ← プロフィール画像
├── scripts/
│   ├── template.js   ← LTテンプレート（7パターン）
│   └── test.js       ← 動作テスト
├── downloads/
│   ├── pptx/         ← ダウンロード用PPTX
│   └── pdf/          ← ダウンロード用PDF
├── CLAUDE.md         ← Claude Code用指示書
├── README.md
└── package.json
```
