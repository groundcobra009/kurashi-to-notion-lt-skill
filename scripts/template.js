// =============================================================================
// Lightning Talk Slide Skill - Template
// 暮らしとNotionミートアップ 公式テンプレート準拠
// Mac風ウィンドウフレーム + LTバッジデザイン
// =============================================================================

var pptxgen = require("pptxgenjs");

// =============================================================================
// カラー定義（暮らしとNotionミートアップ公式テンプレート準拠）
// =============================================================================

var COLORS = {
  // フレーム（公式テンプレートから抽出）
  FRAME_BG: "C4A98D",        // フレーム背景色（茶色/ゴールド）
  FRAME_BORDER: "000000",    // フレーム外枠線（黒）
  TITLE_BAR: "000000",       // タイトルバー（黒）※公式テンプレートは黒系
  // トラフィックライト（公式テンプレート画像から抽出）
  TRAFFIC_RED: "E0776C",     // トラフィックライト（赤）
  TRAFFIC_YELLOW: "E5E616",  // トラフィックライト（黄）
  TRAFFIC_GREEN: "93D9B4",   // トラフィックライト（緑）
  // コンテンツ
  HEADER_GRAY: "F2F2F2",     // ヘッダー背景（公式テンプレート準拠）
  CONTENT_WHITE: "FFFFFF",   // コンテンツ背景
  // テキスト
  TEXT_BLACK: "000000",       // メインテキスト（公式は黒）
  TEXT_DARK: "333333",        // 本文テキスト
  TEXT_MEDIUM: "666666",      // サブテキスト
  TEXT_LIGHT: "999999",       // 補助テキスト
  // バッジ
  BADGE_BG: "F5C518",        // LTバッジ背景（黄色）
  BADGE_TEXT: "000000",       // LTバッジテキスト（黒）
  BADGE_BORDER: "000000",    // LTバッジ枠線（黒）
  // アクセント
  ACCENT_BLUE: "4A90D9",
  ACCENT_LIGHT: "E8F0FE",
  POINT_BG: "FFF8E1",
  POINT_BORDER: "F5C518",
  // 区切り線
  DIVIDER: "A5A5A5",         // ヘッダーとコンテンツの区切り線
  // アイコンプレースホルダー
  PLACEHOLDER_GRAY: "BFBFBF" // グレーの円（アイコンプレースホルダー）
};

var FONT = {
  TITLE: 36,
  H1: 28,
  H2: 22,
  BODY: 18,
  SMALL: 14,
  XS: 11,
  BADGE: 12,
  COPYRIGHT: 9
};

var FACE = "Arial";

var config = {
  layout: "LAYOUT_16x9",
  author: "けいたろう",
  copyright: "Copyright @ 2024 All Rights Reserved. AAAAAAA Inc.",
  eventName: "暮らしとNotionミートアップ"
};

// =============================================================================
// フレームレイアウト定数（公式テンプレート準拠）
// =============================================================================

var FRAME = {
  // 外枠（公式テンプレートの座標から算出）
  outerX: 0.24,
  outerY: 0.18,
  outerW: 9.52,
  outerH: 5.25,
  radius: 0.06,
  borderWidth: 1.5,
  // タイトルバー
  barH: 0.30,
  // トラフィックライト
  dotY: 0.33,
  dotR: 0.07,
  dot1X: 0.50,
  dot2X: 0.72,
  dot3X: 0.94,
  // 閉じるボタン
  closeX: 9.45,
  // ヘッダー
  headerX: 0.24,
  headerY: 0.48,
  headerW: 9.52,
  headerH: 0.55,
  // 区切り線
  dividerY: 1.03,
  // コンテンツ
  contentX: 0.24,
  contentY: 1.08,
  contentW: 9.52,
  contentH: 3.75,
  // バッジ
  badgeX: 8.20,
  badgeY: 4.55,
  badgeW: 1.45,
  badgeH: 0.28,
  // コピーライト
  copyrightY: 4.95,
  copyrightH: 0.25
};

// =============================================================================
// ヘルパー関数
// =============================================================================

/**
 * 暮らしとNotionミートアップ公式テンプレート準拠のフレームを描画する共通関数
 * - 茶色/ゴールドの背景フレーム
 * - 黒い太枠線
 * - ダークタイトルバー + トラフィックライト
 * - ヘッダーエリア + 区切り線
 * - コピーライト表記
 */
function drawFrame(slide, headerTitle) {
  // 背景をフレーム色（茶色/ゴールド）で塗りつぶし
  slide.addShape("rect", {
    x: 0, y: 0, w: 10, h: 5.63,
    fill: { color: COLORS.FRAME_BG }
  });

  // メインウィンドウ（白い角丸矩形 + 黒い太枠線）
  slide.addShape("rect", {
    x: FRAME.outerX, y: FRAME.outerY, w: FRAME.outerW, h: FRAME.outerH,
    rectRadius: FRAME.radius,
    fill: { color: COLORS.CONTENT_WHITE },
    line: { color: COLORS.FRAME_BORDER, width: FRAME.borderWidth },
    shadow: { type: "outer", blur: 3, offset: 2, angle: 135, color: "000000", opacity: 0.3 }
  });

  // タイトルバー（黒）
  slide.addShape("rect", {
    x: FRAME.outerX, y: FRAME.outerY, w: FRAME.outerW, h: FRAME.barH,
    rectRadius: FRAME.radius,
    fill: { color: COLORS.TITLE_BAR },
    line: { color: COLORS.FRAME_BORDER, width: FRAME.borderWidth }
  });
  // タイトルバー下部の角を埋める
  slide.addShape("rect", {
    x: FRAME.outerX, y: FRAME.outerY + FRAME.barH - 0.08, w: FRAME.outerW, h: 0.08,
    fill: { color: COLORS.TITLE_BAR }
  });

  // トラフィックライト（公式テンプレートの色）
  slide.addShape("ellipse", {
    x: FRAME.dot1X - FRAME.dotR, y: FRAME.dotY - FRAME.dotR,
    w: FRAME.dotR * 2, h: FRAME.dotR * 2,
    fill: { color: COLORS.TRAFFIC_RED }
  });
  slide.addShape("ellipse", {
    x: FRAME.dot2X - FRAME.dotR, y: FRAME.dotY - FRAME.dotR,
    w: FRAME.dotR * 2, h: FRAME.dotR * 2,
    fill: { color: COLORS.TRAFFIC_YELLOW }
  });
  slide.addShape("ellipse", {
    x: FRAME.dot3X - FRAME.dotR, y: FRAME.dotY - FRAME.dotR,
    w: FRAME.dotR * 2, h: FRAME.dotR * 2,
    fill: { color: COLORS.TRAFFIC_GREEN }
  });

  // 閉じるボタン（×）- ヘッダー付きスライドのみ
  if (headerTitle) {
    slide.addText("\u00D7", {
      x: FRAME.closeX - 0.25, y: FRAME.outerY, w: 0.5, h: FRAME.barH,
      fontSize: FONT.H2, fontFace: "Arial", color: COLORS.TEXT_LIGHT,
      align: "center", valign: "middle"
    });
  }

  // ヘッダーエリア（ライトグレー）+ 区切り線
  if (headerTitle) {
    // ヘッダー背景
    slide.addShape("rect", {
      x: FRAME.headerX, y: FRAME.headerY, w: FRAME.headerW, h: FRAME.headerH,
      fill: { color: COLORS.HEADER_GRAY }
    });
    // ヘッダーテキスト
    slide.addText(headerTitle, {
      x: FRAME.headerX + 0.3, y: FRAME.headerY, w: FRAME.headerW - 0.6, h: FRAME.headerH,
      fontSize: FONT.H1, fontFace: FACE, color: COLORS.TEXT_BLACK,
      bold: true, valign: "middle"
    });
    // 区切り線（ヘッダーとコンテンツの間）
    slide.addShape("line", {
      x: FRAME.headerX, y: FRAME.dividerY,
      w: FRAME.headerW, h: 0,
      line: { color: COLORS.DIVIDER, width: 1.0 }
    });
  }

  // コピーライト
  slide.addText(config.copyright, {
    x: 0, y: FRAME.copyrightY,
    w: 10, h: FRAME.copyrightH,
    fontSize: FONT.COPYRIGHT, fontFace: FACE, color: COLORS.TEXT_MEDIUM,
    align: "center", valign: "middle"
  });
}

/**
 * Lightning Talk バッジを描画する
 * 公式テンプレート準拠: 黄色背景 + 黒枠 + イタリック体
 */
function drawBadge(slide) {
  // バッジ背景
  slide.addShape("rect", {
    x: FRAME.badgeX, y: FRAME.badgeY, w: FRAME.badgeW, h: FRAME.badgeH,
    rectRadius: 0.02,
    fill: { color: COLORS.BADGE_BG },
    line: { color: COLORS.BADGE_BORDER, width: 1.0 }
  });
  // バッジテキスト（イタリック体）
  slide.addText("Lightning Talk", {
    x: FRAME.badgeX, y: FRAME.badgeY, w: FRAME.badgeW, h: FRAME.badgeH,
    fontSize: FONT.BADGE, fontFace: FACE, color: COLORS.BADGE_TEXT,
    bold: true, italic: true, align: "center", valign: "middle"
  });
}

// =============================================================================
// パターン 1: 表紙スライド（タイトル）
// 公式テンプレート準拠: タイトル左側、アイコン右側
// =============================================================================

function addLTTitleSlide(pres, title, subtitle, author) {
  var slide = pres.addSlide();
  drawFrame(slide, null);

  // メインコンテンツエリア（ヘッダーなし、全面使う）
  var cX = FRAME.contentX;
  var cY = FRAME.headerY;
  var cW = FRAME.contentW;
  var cH = FRAME.contentH + FRAME.headerH + 0.04;

  // タイトルテキスト（左側、上部）
  slide.addText(title, {
    x: cX + 0.5, y: cY + 0.6, w: cW * 0.55, h: 1.4,
    fontSize: FONT.TITLE, fontFace: FACE, color: COLORS.TEXT_BLACK,
    bold: true, align: "left", valign: "middle",
    lineSpacingMultiple: 1.3
  });

  // アイコンサークル（右側、プレースホルダー）
  var circleSize = 2.2;
  var circleX = cX + cW * 0.6;
  var circleY = cY + 0.5;
  slide.addShape("ellipse", {
    x: circleX, y: circleY, w: circleSize, h: circleSize,
    fill: { color: COLORS.PLACEHOLDER_GRAY }
  });
  slide.addText("\u30A2\u30A4\u30B3\u30F3\u3092\u5165\u308C\u3066\n\u304F\u3060\u3055\u3044", {
    x: circleX, y: circleY, w: circleSize, h: circleSize,
    fontSize: FONT.BODY, fontFace: FACE, color: COLORS.TEXT_DARK,
    align: "center", valign: "middle", lineSpacingMultiple: 1.3
  });

  // 著者名（左下）
  var authorName = author || config.author;
  slide.addText("\uFF1C" + authorName + "\uFF1E\u3055\u3093", {
    x: cX + 0.5, y: cY + 2.5, w: cW * 0.55, h: 0.6,
    fontSize: FONT.H1, fontFace: FACE, color: COLORS.TEXT_BLACK,
    bold: false, align: "left", valign: "middle"
  });

  // Lightning Talk バッジ
  drawBadge(slide);

  return slide;
}

// =============================================================================
// パターン 2: 自己紹介スライド
// 公式テンプレート準拠: 左にアイコン円、右に箇条書き（・）
// =============================================================================

function addLTProfileSlide(pres, name, items, imagePath) {
  var slide = pres.addSlide();
  drawFrame(slide, "\u81EA\u5DF1\u7D39\u4ECB");

  var cX = FRAME.contentX;
  var cY = FRAME.contentY + 0.15;
  var cW = FRAME.contentW;

  // プロフィール画像（円形）- 左側
  var imgSize = 2.2;
  var imgX = cX + 0.5;
  var imgY = cY + 0.2;

  if (imagePath) {
    // 背景の丸を描画
    slide.addShape("ellipse", {
      x: imgX, y: imgY, w: imgSize, h: imgSize,
      fill: { color: COLORS.PLACEHOLDER_GRAY }
    });
    // 画像を配置
    slide.addImage({
      path: imagePath,
      x: imgX + 0.05, y: imgY + 0.05,
      w: imgSize - 0.1, h: imgSize - 0.1,
      rounding: true
    });
  } else {
    slide.addShape("ellipse", {
      x: imgX, y: imgY, w: imgSize, h: imgSize,
      fill: { color: COLORS.PLACEHOLDER_GRAY }
    });
    slide.addText("\u30A2\u30A4\u30B3\u30F3\u3092\u5165\u308C\u3066\n\u304F\u3060\u3055\u3044", {
      x: imgX, y: imgY, w: imgSize, h: imgSize,
      fontSize: FONT.SMALL, fontFace: FACE, color: COLORS.TEXT_DARK,
      align: "center", valign: "middle", lineSpacingMultiple: 1.3
    });
  }

  // 名前（左下）
  slide.addText(name || config.author, {
    x: imgX - 0.2, y: imgY + imgSize + 0.15, w: imgSize + 0.4, h: 0.45,
    fontSize: FONT.H2, fontFace: FACE, color: COLORS.TEXT_BLACK,
    bold: true, align: "center", valign: "middle"
  });

  // プロフィール項目（右側）- 公式テンプレート準拠: ・（中黒）で箇条書き
  var listX = imgX + imgSize + 1.0;
  var listY = cY + 0.3;
  var listW = cW - imgSize - 2.0;

  if (items && items.length > 0) {
    var itemH = Math.min(0.55, 3.0 / items.length);
    for (var i = 0; i < items.length; i++) {
      var y = listY + i * itemH;
      var bulletText = "\u30FB" + items[i];
      slide.addText(bulletText, {
        x: listX, y: y, w: listW, h: itemH,
        fontSize: FONT.BODY, fontFace: FACE, color: COLORS.TEXT_DARK,
        valign: "middle", lineSpacingMultiple: 1.2
      });
    }
  }

  return slide;
}

// =============================================================================
// パターン 3: コンテンツスライド（見出し + 本文）
// =============================================================================

function addLTContentSlide(pres, title, bodyText) {
  var slide = pres.addSlide();
  drawFrame(slide, title);

  var cX = FRAME.contentX;
  var cY = FRAME.contentY + 0.15;
  var cW = FRAME.contentW;
  var cH = FRAME.contentH - 0.3;

  // 本文テキスト
  slide.addText(bodyText, {
    x: cX + 0.3, y: cY, w: cW - 0.6, h: cH,
    fontSize: FONT.BODY, fontFace: FACE, color: COLORS.TEXT_DARK,
    valign: "top", lineSpacingMultiple: 1.6
  });

  return slide;
}

// =============================================================================
// パターン 4: ポイント付きコンテンツスライド
// =============================================================================

function addLTPointSlide(pres, title, bodyText, pointTitle, pointText) {
  var slide = pres.addSlide();
  drawFrame(slide, title);

  var cX = FRAME.contentX;
  var cY = FRAME.contentY + 0.15;
  var cW = FRAME.contentW;

  // 本文テキスト（上部）
  slide.addText(bodyText, {
    x: cX + 0.3, y: cY, w: cW - 0.6, h: 1.8,
    fontSize: FONT.BODY, fontFace: FACE, color: COLORS.TEXT_DARK,
    valign: "top", lineSpacingMultiple: 1.5
  });

  // ポイントボックス
  var pointY = cY + 2.0;
  var pointH = 1.5;

  // ポイント背景
  slide.addShape("rect", {
    x: cX + 0.3, y: pointY, w: cW - 0.6, h: pointH,
    rectRadius: 0.08,
    fill: { color: COLORS.POINT_BG },
    line: { color: COLORS.POINT_BORDER, width: 1.5 }
  });

  // ポイントタイトル
  var ptTitle = pointTitle || "\u30DD\u30A4\u30F3\u30C8";
  slide.addText(ptTitle, {
    x: cX + 0.6, y: pointY + 0.1, w: cW - 1.2, h: 0.4,
    fontSize: FONT.H2, fontFace: FACE, color: COLORS.BADGE_TEXT,
    bold: true, valign: "middle"
  });

  // ポイント本文
  if (pointText) {
    slide.addText(pointText, {
      x: cX + 0.6, y: pointY + 0.5, w: cW - 1.2, h: pointH - 0.65,
      fontSize: FONT.BODY, fontFace: FACE, color: COLORS.TEXT_DARK,
      valign: "top", lineSpacingMultiple: 1.4
    });
  }

  return slide;
}

// =============================================================================
// パターン 5: 画像スライド（プロフィール画像など）
// =============================================================================

function addLTImageSlide(pres, title, imagePath, caption) {
  var slide = pres.addSlide();
  drawFrame(slide, title);

  var cX = FRAME.contentX;
  var cY = FRAME.contentY + 0.1;
  var cW = FRAME.contentW;
  var cH = FRAME.contentH - 0.2;

  if (imagePath) {
    slide.addImage({
      path: imagePath,
      x: cX + 0.5, y: cY, w: cW - 1.0, h: cH - 0.5,
      sizing: { type: "contain", w: cW - 1.0, h: cH - 0.5 }
    });
  }

  if (caption) {
    slide.addText(caption, {
      x: cX + 0.3, y: cY + cH - 0.5, w: cW - 0.6, h: 0.4,
      fontSize: FONT.SMALL, fontFace: FACE, color: COLORS.TEXT_MEDIUM,
      align: "center", valign: "middle"
    });
  }

  return slide;
}

// =============================================================================
// パターン 6: リストスライド（箇条書き）
// =============================================================================

function addLTListSlide(pres, title, items) {
  var slide = pres.addSlide();
  drawFrame(slide, title);

  var cX = FRAME.contentX;
  var cY = FRAME.contentY + 0.2;
  var cW = FRAME.contentW;

  if (items && items.length > 0) {
    var itemH = Math.min(0.6, 3.4 / items.length);
    for (var i = 0; i < items.length; i++) {
      var y = cY + i * itemH;
      var itemTitle = typeof items[i] === "string" ? items[i] : items[i].title;
      var itemDesc = typeof items[i] === "string" ? "" : (items[i].description || "");

      // 番号バッジ
      slide.addShape("ellipse", {
        x: cX + 0.3, y: y + 0.05, w: 0.4, h: 0.4,
        fill: { color: COLORS.BADGE_BG }
      });
      slide.addText(String(i + 1), {
        x: cX + 0.3, y: y + 0.05, w: 0.4, h: 0.4,
        fontSize: FONT.SMALL, fontFace: FACE, color: COLORS.BADGE_TEXT,
        bold: true, align: "center", valign: "middle"
      });

      // テキスト
      if (itemDesc) {
        slide.addText(itemTitle, {
          x: cX + 0.9, y: y, w: cW - 1.4, h: itemH * 0.55,
          fontSize: FONT.BODY, fontFace: FACE, color: COLORS.TEXT_BLACK,
          bold: true, valign: "bottom"
        });
        slide.addText(itemDesc, {
          x: cX + 0.9, y: y + itemH * 0.5, w: cW - 1.4, h: itemH * 0.5,
          fontSize: FONT.SMALL, fontFace: FACE, color: COLORS.TEXT_MEDIUM,
          valign: "top"
        });
      } else {
        slide.addText(itemTitle, {
          x: cX + 0.9, y: y, w: cW - 1.4, h: itemH,
          fontSize: FONT.BODY, fontFace: FACE, color: COLORS.TEXT_BLACK,
          bold: true, valign: "middle"
        });
      }
    }
  }

  return slide;
}

// =============================================================================
// パターン 7: まとめスライド（クロージング）
// =============================================================================

function addLTClosingSlide(pres, title, message, author) {
  var slide = pres.addSlide();
  drawFrame(slide, null);

  var cX = FRAME.contentX;
  var cY = FRAME.headerY;
  var cW = FRAME.contentW;
  var cH = FRAME.contentH + FRAME.headerH + 0.04;

  // タイトル（例: "ありがとうございました"）
  slide.addText(title || "\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3057\u305F", {
    x: cX + 0.5, y: cY + 0.6, w: cW - 1.0, h: 1.2,
    fontSize: FONT.TITLE, fontFace: FACE, color: COLORS.TEXT_BLACK,
    bold: true, align: "center", valign: "middle"
  });

  // メッセージ
  if (message) {
    slide.addText(message, {
      x: cX + 0.5, y: cY + 1.9, w: cW - 1.0, h: 1.0,
      fontSize: FONT.BODY, fontFace: FACE, color: COLORS.TEXT_MEDIUM,
      align: "center", valign: "middle", lineSpacingMultiple: 1.4
    });
  }

  // 著者名
  var authorName = author || config.author;
  slide.addText(authorName, {
    x: cX + 0.5, y: cY + 3.0, w: cW - 1.0, h: 0.5,
    fontSize: FONT.H2, fontFace: FACE, color: COLORS.TEXT_BLACK,
    bold: true, align: "center", valign: "middle"
  });

  // Lightning Talk バッジ
  drawBadge(slide);

  return slide;
}

// =============================================================================
// エクスポート
// =============================================================================

module.exports = {
  pptxgen: pptxgen,
  config: config,
  COLORS: COLORS,
  FONT: FONT,
  FACE: FACE,
  FRAME: FRAME,
  // ヘルパー
  drawFrame: drawFrame,
  drawBadge: drawBadge,
  // LTパターン
  addLTTitleSlide: addLTTitleSlide,
  addLTProfileSlide: addLTProfileSlide,
  addLTContentSlide: addLTContentSlide,
  addLTPointSlide: addLTPointSlide,
  addLTImageSlide: addLTImageSlide,
  addLTListSlide: addLTListSlide,
  addLTClosingSlide: addLTClosingSlide
};
