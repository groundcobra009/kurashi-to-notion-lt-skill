// =============================================================================
// Lightning Talk Slide Skill - 全パターン動作テスト
// =============================================================================

var t = require("./template.js");
var pptxgen = t.pptxgen;

var pres = new pptxgen();
pres.layout = t.config.layout;
pres.author = t.config.author;
pres.title = "LTテンプレート動作テスト";

// パターン 1: 表紙
t.addLTTitleSlide(pres, "Lightning Talk テスト", "LTテンプレート動作確認", "けいたろう");

// パターン 2: 自己紹介（画像なし）
t.addLTProfileSlide(pres, "けいたろう", [
  "エンジニア",
  "趣味: コーディング",
  "好きな技術: Node.js / React",
  "Twitter: @keitaro"
], null);

// パターン 3: コンテンツスライド
t.addLTContentSlide(pres, "今日話すこと",
  "このLTでは、Lightning Talkテンプレートの\n全パターンをテストします。\n\nMac風ウィンドウフレームデザインで\n統一されたスライドを自動生成できます。"
);

// パターン 4: ポイント付きコンテンツ
t.addLTPointSlide(pres, "テンプレートの特徴",
  "Mac風のウィンドウフレームデザインを採用。\nトラフィックライト、ヘッダーバー、\nLightning Talkバッジが全スライド共通です。",
  "ポイント",
  "7つのスライドパターンで\n10分間のLTに最適な構成を実現。"
);

// パターン 5: 画像スライド（画像パスなし）
t.addLTImageSlide(pres, "けいたろうのプロフィール", null, "プロフィール画像（img/profile.png を配置してください）");

// パターン 6: リストスライド
t.addLTListSlide(pres, "まとめ - 3つのポイント", [
  { title: "Mac風デザイン", description: "ウィンドウフレーム＋トラフィックライト" },
  { title: "LT最適化", description: "10分間で話せる7パターン構成" },
  { title: "自動生成", description: "Node.jsで簡単にスライド作成" }
]);

// パターン 7: クロージング
t.addLTClosingSlide(pres, "ありがとうございました", "ご質問はお気軽にどうぞ！", "けいたろう");

// 出力
pres.writeFile({ fileName: "/home/user/output/test_lt_patterns.pptx" })
  .then(function() {
    console.log("テスト完了: 全7パターンのLTスライドを生成しました");
    console.log("出力先: /home/user/output/test_lt_patterns.pptx");
  })
  .catch(function(err) {
    console.error("エラー:", err);
    process.exit(1);
  });
