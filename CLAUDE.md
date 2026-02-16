# Lightning Talk Slide Skill - Claude Code ルール

## プロジェクト概要

このリポジトリは、Claude Codeに指示するだけでLT（Lightning Talk）用のPowerPointスライドを自動生成するスキルです。

- **テンプレートライブラリ**: `scripts/template.js`（全7パターンのLTスライド生成関数）
- **出力先**: `/home/user/output/` ディレクトリ
- **ダウンロードフォルダ**: `downloads/pptx/`（PPTX）、`downloads/pdf/`（PDF）
- **プロフィール画像**: `img/profile.png`
- **使用ライブラリ**: pptxgenjs (Node.js)
- **スピーカー**: けいたろう

## デザインコンセプト

Mac風ウィンドウフレームデザインを採用した統一的なLTスライド。

### 共通フレーム要素（全スライド共通）

1. **茶色のフレーム枠**: ウィンドウの外枠（角丸）
2. **ダークタイトルバー**: Mac風の上部バー
3. **トラフィックライト**: 赤・黄・緑の3つのドット（左上）
4. **閉じるボタン**: ×（右上）
5. **グレーヘッダー**: スライドタイトル表示エリア
6. **Lightning Talk バッジ**: 黄色バッジ（右下）
7. **コピーライト**: ©けいたろう（下部中央）

## スライド作成の手順

### Phase 1: 構成設計（10分LT向け）

10分間のLTに最適な構成を設計します。目安は8〜12枚。

典型的な構成例:
1. **表紙**（1枚）- タイトル、スピーカー名
2. **自己紹介**（1枚）- プロフィール画像＋箇条書き
3. **導入**（1〜2枚）- 今日話すこと、背景
4. **本題**（3〜5枚）- コンテンツ、ポイント付き
5. **まとめ**（1枚）- リスト形式
6. **クロージング**（1枚）- ありがとうございました

### Phase 2: スクリプト作成

`scripts/template.js` をrequireして、Node.jsスクリプトを作成します。

```javascript
const t = require("/home/user/kurashi-to-notion-lt-skill/scripts/template.js");
const pptxgen = t.pptxgen;

var pres = new pptxgen();
pres.layout = t.config.layout;
pres.author = "けいたろう";
pres.title = "プレゼンタイトル";

// スライドを追加...

pres.writeFile({ fileName: "/home/user/output/プレゼン名.pptx" })
  .then(function() { console.log("生成完了"); })
  .catch(function(err) { console.error("エラー:", err); });
```

### Phase 3: 実行

```bash
node /home/user/output/generate.js
```

### Phase 4: PDF変換 + GitHubにプッシュ

```bash
# 1. PPTXをdownloads/pptxにコピー
cp /home/user/output/生成ファイル名.pptx /home/user/kurashi-to-notion-lt-skill/downloads/pptx/

# 2. PDF変換（ローカルで可能な場合）
libreoffice --headless --convert-to pdf \
  --outdir /home/user/kurashi-to-notion-lt-skill/downloads/pdf/ \
  /home/user/kurashi-to-notion-lt-skill/downloads/pptx/生成ファイル名.pptx

# 3. コミット＆プッシュ
cd /home/user/kurashi-to-notion-lt-skill
git add downloads/pptx/生成ファイル名.pptx
git add downloads/pdf/生成ファイル名.pdf 2>/dev/null || true
git commit -m "Add 生成ファイル名.pptx + PDF"
git push -u origin <現在のブランチ名>
```

## 利用可能な7パターン

| # | 関数名 | 用途 |
|---|--------|------|
| 1 | `addLTTitleSlide(pres, title, subtitle, author)` | 表紙 |
| 2 | `addLTProfileSlide(pres, name, items[], imagePath)` | 自己紹介 |
| 3 | `addLTContentSlide(pres, title, bodyText)` | コンテンツ |
| 4 | `addLTPointSlide(pres, title, bodyText, pointTitle, pointText)` | ポイント付き |
| 5 | `addLTImageSlide(pres, title, imagePath, caption)` | 画像 |
| 6 | `addLTListSlide(pres, title, items[])` | リスト |
| 7 | `addLTClosingSlide(pres, title, message, author)` | クロージング |

## 各パターンのデータ構造

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
], "img/profile.png");  // 画像パス（nullで省略可）
```

### パターン 3: コンテンツ

```javascript
t.addLTContentSlide(pres, "見出しタイトル", "本文テキスト\n改行もOK");
```

### パターン 4: ポイント付きコンテンツ

```javascript
t.addLTPointSlide(pres, "見出し",
  "本文テキスト",
  "ポイント",       // ポイントタイトル（省略で「ポイント」）
  "ポイントの説明文"
);
```

### パターン 5: 画像

```javascript
t.addLTImageSlide(pres, "見出し", "img/profile.png", "キャプション");
```

### パターン 6: リスト

```javascript
// オブジェクト形式（タイトル＋説明）
t.addLTListSlide(pres, "見出し", [
  { title: "項目名", description: "説明文" },
  { title: "項目名", description: "説明文" }
]);

// 文字列形式（タイトルのみ）
t.addLTListSlide(pres, "見出し", ["項目1", "項目2", "項目3"]);
```

### パターン 7: クロージング

```javascript
t.addLTClosingSlide(pres, "ありがとうございました", "ご質問はお気軽にどうぞ！", "けいたろう");
```

## カラーパレット

| 変数名 | HEX | 用途 |
|--------|-----|------|
| `FRAME_BROWN` | `#C4A882` | フレーム枠線 |
| `TITLE_BAR` | `#2D2D2D` | タイトルバー |
| `TRAFFIC_RED` | `#FF5F57` | トラフィックライト（赤） |
| `TRAFFIC_YELLOW` | `#FFBD2E` | トラフィックライト（黄） |
| `TRAFFIC_GREEN` | `#28C840` | トラフィックライト（緑） |
| `HEADER_GRAY` | `#EEEEEE` | ヘッダー背景 |
| `CONTENT_WHITE` | `#FFFFFF` | コンテンツ背景 |
| `TEXT_BLACK` | `#333333` | メインテキスト |
| `TEXT_DARK` | `#444444` | 本文テキスト |
| `TEXT_MEDIUM` | `#666666` | サブテキスト |
| `TEXT_LIGHT` | `#999999` | 補助テキスト |
| `BADGE_BG` | `#F5C518` | LTバッジ背景 |
| `POINT_BG` | `#FFF8E1` | ポイントボックス背景 |
| `POINT_BORDER` | `#F5C518` | ポイントボックス枠線 |

## デザインルール

- **フォント**: Noto Sans JP
- **レイアウト**: 16:9
- **フレーム**: Mac風ウィンドウ（茶色枠＋トラフィックライト）
- **バッジ**: 全スライド右下に「Lightning Talk」バッジ
- **コピーライト**: 全スライド下部中央に「©けいたろう」

## プロフィール画像

けいたろうのプロフィール画像は `img/profile.png` に配置してください。
自己紹介スライド（パターン2）と画像スライド（パターン5）で使用できます。

## 重要な注意事項

- スライド生成スクリプトは `/home/user/output/` に作成してください
- 生成されたPPTXファイルも `/home/user/output/` に出力してください
- `scripts/template.js` は編集しないでください（共有テンプレート）
- 10分LTに収まる構成にしてください（目安: 8〜12枚）
- **スライド生成後は必ず `downloads/pptx/` にコピーし、GitHubにプッシュしてください**（Phase 4）
