# Sincerely Slide Skill V2 - Claude Code ルール

## プロジェクト概要

このリポジトリは、ビジネスユーザーがClaude Codeに指示するだけでPowerPointスライドを自動生成するスキルです。

- **テンプレートライブラリ**: `scripts/template.js`（全22パターンのスライド生成関数）
- **出力先**: `/home/user/output/` ディレクトリ
- **ダウンロードフォルダ**: `downloads/pptx/`（PPTX）、`downloads/pdf/`（PDF）
- **使用ライブラリ**: pptxgenjs (Node.js)

## スライド作成の手順

ユーザーからスライド作成の指示を受けたら、以下の手順で進めてください。

### Phase 1: 設計（トヨマネ式7ステップ）

1. ユーザーの要望から「問い」を特定する
2. 「答え」（結論）を1文で定義する
3. 「理由」を3点以内に絞る
4. 各スライドを「上段（キーメッセージ）」と「下段（詳細）」の2階建て構造で設計する
5. スライド構成を決める: 表紙 → サマリー → セクション扉 → 本文 → まとめ
6. 各スライドに「タイトル（問い）」「キーメッセージ（答え）」「コンテンツ（根拠）」を設定
7. 最後にサマリーで結論を再提示

### Phase 2: スクリプト作成

`scripts/template.js` をrequireして、Node.jsスクリプトを作成します。

```javascript
const t = require("/home/user/sincerely-slide-skill-v2/scripts/template.js");
const pptxgen = t.pptxgen;

var pres = new pptxgen();
pres.layout = t.config.layout;
pres.author = "作成者名";
pres.title = "プレゼンタイトル";

// スライドを追加...

pres.writeFile({ fileName: "/home/user/output/プレゼン名.pptx" })
  .then(function() { console.log("生成完了: /home/user/output/プレゼン名.pptx"); })
  .catch(function(err) { console.error("エラー:", err); });
```

### Phase 3: 実行

```bash
node /home/user/output/generate.js
```

### Phase 4: PDF変換 + GitHubにプッシュ（ダウンロード用）

スライド生成が成功したら、以下の手順でPDF変換とGitHubへのプッシュを行ってください。
ユーザーはGitHub上からPPTXとPDFの両方をダウンロードできます。
プッシュ後、GitHub Actions が自動でメールとDiscordに通知します（PPTX + PDF 添付）。

#### フォルダ構成

```
downloads/
├── pptx/    ← PowerPointファイル
└── pdf/     ← PDFファイル
```

#### 手順

1. PPTXファイルを `downloads/pptx/` にコピーする
2. LibreOfficeでPDF変換を試みる（失敗してもGitHub Actions側で自動変換される）
3. git add → commit → push する

```bash
# 1. PPTXをdownloads/pptxにコピー
cp /home/user/output/生成ファイル名.pptx /home/user/sincerely-slide-skill-v2/downloads/pptx/

# 2. PDF変換（ローカルで可能な場合）
libreoffice --headless --convert-to pdf \
  --outdir /home/user/sincerely-slide-skill-v2/downloads/pdf/ \
  /home/user/sincerely-slide-skill-v2/downloads/pptx/生成ファイル名.pptx

# ※ PDF変換が失敗してもOK → GitHub Actions が自動変換＆コミットします

# 3. コミット＆プッシュ
cd /home/user/sincerely-slide-skill-v2
git add downloads/pptx/生成ファイル名.pptx
git add downloads/pdf/生成ファイル名.pdf 2>/dev/null || true
git commit -m "Add 生成ファイル名.pptx + PDF"
git push -u origin <現在のブランチ名>
```

#### 通知フロー（自動）

プッシュ後、GitHub Actions が以下を自動実行します:
- **PDF未生成の場合**: LibreOffice で PPTX → PDF 変換してコミット
- **Discord通知**: PPTX + PDF をファイル添付して Webhook 送信
- **メール通知**: PPTX + PDF をメール添付して SMTP 送信

#### ダウンロードURL

プッシュ後、ユーザーにGitHub上のダウンロードURLを案内してください:
- PPTX: `https://github.com/groundcobra009/sincerely-slide-skill-v2/blob/<ブランチ名>/downloads/pptx/ファイル名.pptx`
- PDF: `https://github.com/groundcobra009/sincerely-slide-skill-v2/blob/<ブランチ名>/downloads/pdf/ファイル名.pdf`

（「Download raw file」ボタンでダウンロード可能）

## 利用可能な22パターン

| # | 関数名 | 用途 |
|---|--------|------|
| 1 | `addTitleSlide(pres, title, subtitle, author)` | 表紙 |
| 2 | `addSummarySlide(pres, conclusion, reasons[])` | サマリー |
| 3 | `addSectionSlide(pres, number, title)` | セクション扉 |
| 4 | `addBodySlide(pres, title, keyMsg, body, source)` | 本文 |
| 5 | `addEnumerationSlide(pres, title, keyMsg, items[], source)` | 列挙型 |
| 6 | `addTwoColumnSlide(pres, title, keyMsg, col1, col2, source)` | 2カラム比較 |
| 7 | `addStatsSlide(pres, title, keyMsg, stats[], source)` | 統計数値 |
| 8 | `addConclusionSlide(pres, conclusion, nextSteps[])` | まとめ |
| 9 | `addImageSlide(pres, title, keyMsg, imagePath, source)` | 画像 |
| 10 | `addChartSlide(pres, chartType, chartData[], options)` | グラフ |
| 11 | `addFlowChartSlide(pres, title, keyMsg, items[], source)` | フロー（横型） |
| 11b | `addVerticalFlowSlide(pres, title, keyMsg, items[], source)` | フロー（縦型） |
| 12 | `addComparisonSlide(pres, title, keyMsg, compData, source)` | 比較対照 |
| 13 | `addMatrix4QuadrantSlide(pres, title, keyMsg, data, source)` | 4象限マトリックス |
| 14 | `addCycleDiagramSlide(pres, title, keyMsg, items[], source)` | サイクル図 |
| 15 | `addGanttChartSlide(pres, title, keyMsg, ganttData, source)` | ガントチャート |
| 16 | `addTableSlide(pres, title, keyMsg, tableData, source)` | テーブル |
| 17 | `addBackgroundSlide(pres, title, keyMsg, bgData, source)` | 背景型 |
| 18 | `addDivergenceSlide(pres, title, keyMsg, divData, source)` | 拡散型 |
| 19 | `addAscendingSlide(pres, title, keyMsg, steps[], source)` | 上昇型 |
| 20 | `addFlowTableSlide(pres, title, keyMsg, ftData, source)` | フロー表型 |
| 21 | `addFlowMatrixSlide(pres, title, keyMsg, fmData, source)` | フローマトリックス型 |
| 22 | `addMatrixTableSlide(pres, title, keyMsg, mtData, source)` | マトリックス型 |

## 各パターンのデータ構造（必須リファレンス）

スライド生成時は、必ず以下のデータ構造に従ってください。プロパティ名を間違えるとスライドが空欄になります。

### パターン 5: 列挙型

```javascript
t.addEnumerationSlide(pres, "タイトル", "キーメッセージ", [
  { title: "項目名", description: "説明文" },  // ※ desc ではなく description
  { title: "項目名", description: "説明文" }
], "出所");
```

### パターン 6: 2カラム比較

```javascript
// col1, col2 は別引数。1つのオブジェクトにまとめない
t.addTwoColumnSlide(pres, "タイトル", "キーメッセージ",
  { title: "左タイトル", points: ["項目1", "項目2"] },  // ※ items ではなく points
  { title: "右タイトル", points: ["項目1", "項目2"] },  // ※ items ではなく points
  "出所"
);
```

### パターン 7: 統計数値

```javascript
t.addStatsSlide(pres, "タイトル", "キーメッセージ", [
  { value: "150%", label: "ラベル", description: "補足説明" }
], "出所");
```

### パターン 10: グラフ

```javascript
t.addChartSlide(pres, "BAR", [  // "BAR", "LINE", "PIE", "DOUGHNUT"
  { name: "系列名", labels: ["Q1","Q2"], values: [100, 200] }
], {
  title: "タイトル",
  keyMessage: "キーメッセージ",
  explanation: { title: "説明タイトル", text: "説明文" },
  source: "出所"
});
```

### パターン 11: フロー（横型）

```javascript
t.addFlowChartSlide(pres, "タイトル", "キーメッセージ", [
  { text: "ステップ名", description: "説明文" }  // ※ title ではなく text
], "出所");
```

### パターン 11b: フロー（縦型）

```javascript
t.addVerticalFlowSlide(pres, "タイトル", "キーメッセージ", [
  { text: "ステップ名", description: "説明文" }  // ※ title ではなく text
], "出所");
```

### パターン 12: 比較対照

```javascript
t.addComparisonSlide(pres, "タイトル", "キーメッセージ", {
  col1: { title: "左タイトル", points: ["項目1", "項目2"] },
  col2: { title: "右タイトル", points: ["項目1", "項目2"] }
}, "出所");
```

### パターン 13: 4象限マトリックス

```javascript
t.addMatrix4QuadrantSlide(pres, "タイトル", "キーメッセージ", {
  axisLabels: { xHigh: "右", xLow: "左", yHigh: "上", yLow: "下" },
  quadrants: [
    { label: "左上", description: "説明" },
    { label: "右上", description: "説明" },
    { label: "左下", description: "説明" },
    { label: "右下", description: "説明" }
  ],
  points: [{ label: "点名", x: 60, y: 70 }]
}, "出所");
```

### パターン 14: サイクル図

```javascript
t.addCycleDiagramSlide(pres, "タイトル", "キーメッセージ", [
  { text: "ステップ1" }, { text: "ステップ2" }
], "出所");
```

### パターン 15: ガントチャート

```javascript
t.addGanttChartSlide(pres, "タイトル", "キーメッセージ", {
  headers: ["タスク", "1月", "2月", "3月"],
  rows: [{ task: "タスク名", start: 1, end: 2 }]
}, "出所");
```

### パターン 16: テーブル

```javascript
t.addTableSlide(pres, "タイトル", "キーメッセージ", {
  headers: ["列1", "列2", "列3"],
  rows: [["値1", "値2", "値3"]]
}, "出所");
```

### パターン 17: 背景型

```javascript
t.addBackgroundSlide(pres, "タイトル", "キーメッセージ", {
  category: "カテゴリ名",
  items: [{ label: "項目名", description: "説明" }]
}, "出所");
```

### パターン 18: 拡散型

```javascript
t.addDivergenceSlide(pres, "タイトル", "キーメッセージ", {
  source: "中心ラベル",
  targets: [{ label: "展開先", description: "説明" }]
}, "出所");
```

### パターン 19: 上昇型

```javascript
t.addAscendingSlide(pres, "タイトル", "キーメッセージ", [
  { label: "ステップ名", description: "説明" }
], "出所");
```

### パターン 20: フロー表型

```javascript
t.addFlowTableSlide(pres, "タイトル", "キーメッセージ", {
  phases: ["フェーズ1", "フェーズ2"],
  categories: [{ label: "行ラベル", cells: ["値1", "値2"] }]
}, "出所");
```

### パターン 21: フローマトリックス型

```javascript
t.addFlowMatrixSlide(pres, "タイトル", "キーメッセージ", {
  columns: ["列1", "列2"],
  rows: [{ label: "行ラベル", cells: ["値1", "値2"] }]
}, "出所");
```

### パターン 22: マトリックス型

```javascript
t.addMatrixTableSlide(pres, "タイトル", "キーメッセージ", {
  colLabels: ["列1", "列2"],
  rows: [{ label: "行ラベル", cells: ["値1", "値2"] }]
}, "出所");
```

## デザインルール

- **カラー**: ダークグリーン(#0D2623) + クリームイエロー(#E8DE9F) ベース
- **フォント**: Noto Sans JP
- **最小フォントサイズ**: 16pt（出所表記12ptは例外）
- **レイアウト**: 16:9、左右マージン0.6in
- **グラフ**: グリッドライン削除、データラベル直接配置（プレアテンティブ原則）

## 重要な注意事項

- スライド生成スクリプトは `/home/user/output/` に作成してください
- 生成されたPPTXファイルも `/home/user/output/` に出力してください
- `scripts/template.js` は編集しないでください（共有テンプレート）
- 各スライドには必ず「キーメッセージ」を入れてください（2階建て構造の上段）
- 結論ファーストの原則を守ってください
- **スライド生成後は必ず `downloads/pptx/` にコピーし、可能なら `downloads/pdf/` にもPDF変換してGitHubにプッシュしてください**（Phase 4）
- `downloads/pptx/` と `downloads/pdf/` フォルダはGitHub経由のダウンロード専用です
- プッシュ後、GitHub Actions が自動でメール（Gmail）とDiscord（Webhook）に通知します
- **スライド作成が完了したら、作業ブランチをメインブランチ（main）にマージしてください**（下記「マージルール」参照）

## マージルール

スライド作成が完了し、`downloads/` フォルダへのプッシュが終わったら、作業ブランチをメインブランチにマージしてください。

```bash
# 1. メインブランチに切り替え
git checkout main

# 2. 作業ブランチをマージ
git merge <作業ブランチ名>

# 3. メインブランチをプッシュ
git push -u origin main

# 4. 作業ブランチに戻る（必要に応じて）
git checkout <作業ブランチ名>
```

これにより、生成されたスライドが常にメインブランチでもダウンロード可能になります。
