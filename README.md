# Sincerely Slide Skill V2

トヨマネ式メソッド + Cynthialyデザインシステム + ルバート図解パターンによるPowerPointスライド自動生成スキル。

Claude Codeに指示するだけで、全22パターンの高品質ビジネススライドを自動生成します。

## セットアップ

```bash
npm install
```

## 使い方

`scripts/template.js` をrequireしてスクリプトを作成・実行します。

```javascript
const t = require("./scripts/template.js");
const pptxgen = t.pptxgen;

var pres = new pptxgen();
pres.layout = t.config.layout;

t.addTitleSlide(pres, "タイトル", "サブタイトル", "作成者");
// ... スライドを追加 ...

pres.writeFile({ fileName: "output/presentation.pptx" });
```

## 利用可能な22パターン

| # | パターン | 用途 |
|---|---------|------|
| 1 | 表紙 | プレゼンの冒頭 |
| 2 | サマリー | 結論と理由の提示 |
| 3 | セクション扉 | 章の区切り |
| 4 | 本文 | テキスト中心の説明 |
| 5 | 列挙型 | 番号付きリスト |
| 6 | 2カラム比較 | 左右2列の比較 |
| 7 | 統計数値 | KPI・数値の強調 |
| 8 | まとめ | 結論とNext Steps |
| 9 | 画像 | 画像の表示 |
| 10 | グラフ | 棒・円・折れ線グラフ |
| 11 | フロー（横型） | 横方向のプロセスフロー |
| 11b | フロー（縦型） | 縦方向のプロセスフロー |
| 12 | 比較対照 | 2要素の詳細比較 |
| 13 | 4象限マトリックス | 2軸4領域の分類 |
| 14 | サイクル図 | 循環プロセス |
| 15 | ガントチャート | スケジュール・工程表 |
| 16 | テーブル | データ一覧・比較表 |
| 17 | 背景型 | カテゴリ＋項目リスト |
| 18 | 拡散型 | 1→多の分岐構造 |
| 19 | 上昇型 | 段階的な成長・ステップ |
| 20 | フロー表型 | フロー矢印＋マトリックス表 |
| 21 | フローマトリックス型 | フロー矢印＋行列マトリックス |
| 22 | マトリックス型 | 行ラベル×列ラベルの表 |

## 環境変数（GitHub Secrets）

スライドを `downloads/` にプッシュすると、GitHub Actionsで自動通知が実行されます。

### 現在の設定

個人プロジェクトのため、メールの宛先・送信元などはワークフロー内にハードコーディングしています。

| 項目 | 値 | 設定場所 |
|------|-----|----------|
| SMTPサーバー | `smtp.gmail.com` | ワークフロー内に直接記載 |
| SMTPポート | `587`（TLS） | ワークフロー内に直接記載 |
| 認証ユーザー | `nakashima.keitarou@gmail.com` | ワークフロー内に直接記載 |
| 送信元 | `nakashima.keitarou@gmail.com` | ワークフロー内に直接記載 |
| 送信先 | `nakashima.keitarou@gmail.com` | ワークフロー内に直接記載 |
| 認証パスワード | （非公開） | GitHub Secrets（`MAIL_PASSWORD`） |

### GitHub Secretsに設定が必要な変数

リポジトリの **Settings > Secrets and variables > Actions** で設定してください。

| 変数名 | 必須 | 説明 |
|--------|------|------|
| `MAIL_PASSWORD` | 任意 | Googleアプリパスワード。未設定の場合メール送信はスキップされます。 |
| `DISCORD_WEBHOOK_URL` | 任意 | DiscordチャンネルのWebhook URL。未設定の場合Discord通知はスキップされます。 |

### MAIL_PASSWORD の取得方法（Googleアプリパスワード）

1. [Googleアカウント](https://myaccount.google.com/) にログイン
2. **セキュリティ** > **2段階認証プロセス** を有効化（まだの場合）
3. **2段階認証プロセス** のページ下部にある **アプリ パスワード** をクリック
4. アプリ名に「GitHub Actions」など任意の名前を入力して **作成**
5. 表示された16文字のパスワードをコピー
6. GitHubリポジトリの **Settings > Secrets and variables > Actions > New repository secret** で:
   - Name: `MAIL_PASSWORD`
   - Secret: コピーした16文字のパスワード

> **注意**: 通常のGmailパスワードではSMTP認証が失敗します。必ずアプリパスワードを使用してください。

## デザインルール（カラー・フォント・レイアウト）

### カラーパレット

| 変数名 | HEX | 用途 |
|--------|-----|------|
| `DARK_GREEN` | `#0D2623` | メインカラー。タイトルバー、ヘッダー背景、テキスト（暗）|
| `CREAM_YELLOW` | `#E8DE9F` | アクセントカラー。番号バッジ、右カラムヘッダー、矢印 |
| `LIGHT_GRAY` | `#F3F3F3` | コンテンツ背景、カードベース |
| `TEXT_DARK` | `#0D2623` | 見出し・強調テキスト |
| `TEXT_MEDIUM` | `#434343` | 本文テキスト |
| `TEXT_LIGHT` | `#595959` | 補助テキスト、比較対照左ヘッダー |
| `WHITE` | `#FFFFFF` | 白テキスト（暗背景上）|
| `HIGHLIGHT_YELLOW` | `#FFFF00` | ハイライト |

### グラフ用カラーパレット（8色）

`#0D2623`, `#E8DE9F`, `#5B8A72`, `#D4A574`, `#7BA3C9`, `#C9917B`, `#8FC9A9`, `#C9C97B`

### フォント

| 項目 | 値 |
|------|-----|
| フォントファミリー | Noto Sans JP |
| XL | 40pt |
| L | 32pt |
| MP | 24pt |
| M | 20pt |
| SP | 18pt |
| S（標準） | 16pt（最小フォントサイズ）|
| XS（出所表記のみ） | 12pt |
| SEC（セクション番号） | 80pt |

### レイアウト

| 項目 | 値 |
|------|-----|
| アスペクト比 | 16:9 |
| 左右マージン | 0.6in |
| コンテンツ幅 | 8.8in |

## テスト

```bash
npm test
```

全22パターンのテストスライドが `output/test_all_patterns.pptx` に生成されます。
