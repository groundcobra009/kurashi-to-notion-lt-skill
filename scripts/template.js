// =============================================================================
// Lightning Talk Slide Skill - Template
// Mac風ウィンドウフレーム + LTバッジデザイン
// =============================================================================

var pptxgen = require("pptxgenjs");

// =============================================================================
// カラー定義（LTデザイン）
// =============================================================================

var COLORS = {
  // フレーム
  FRAME_BROWN: "C4A882",
  TITLE_BAR: "2D2D2D",
  TRAFFIC_RED: "FF5F57",
  TRAFFIC_YELLOW: "FFBD2E",
  TRAFFIC_GREEN: "28C840",
  // コンテンツ
  HEADER_GRAY: "EEEEEE",
  CONTENT_WHITE: "FFFFFF",
  // テキスト
  TEXT_BLACK: "333333",
  TEXT_DARK: "444444",
  TEXT_MEDIUM: "666666",
  TEXT_LIGHT: "999999",
  // バッジ
  BADGE_BG: "F5C518",
  BADGE_TEXT: "333333",
  // アクセント
  ACCENT_BLUE: "4A90D9",
  ACCENT_LIGHT: "E8F0FE",
  POINT_BG: "FFF8E1",
  POINT_BORDER: "F5C518"
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

var FACE = "Noto Sans JP";

var config = {
  layout: "LAYOUT_16x9",
  author: "けいたろう",
  copyright: "けいたろう"
};

// =============================================================================
// フレームレイアウト定数
// =============================================================================

var FRAME = {
  // 外枠
  outerX: 0.25,
  outerY: 0.15,
  outerW: 9.5,
  outerH: 5.33,
  radius: 0.15,
  // タイトルバー
  barH: 0.38,
  // トラフィックライト
  dotY: 0.34,
  dotR: 0.09,
  dot1X: 0.55,
  dot2X: 0.80,
  dot3X: 1.05,
  // 閉じるボタン
  closeX: 9.45,
  // ヘッダー
  headerX: 0.33,
  headerY: 0.61,
  headerW: 9.34,
  headerH: 0.50,
  // コンテンツ
  contentX: 0.33,
  contentY: 1.15,
  contentW: 9.34,
  contentH: 3.73,
  // バッジ
  badgeX: 8.05,
  badgeY: 4.58,
  badgeW: 1.55,
  badgeH: 0.28,
  // コピーライト
  copyrightY: 4.93,
  copyrightH: 0.25
};

// =============================================================================
// ヘルパー関数
// =============================================================================

/**
 * Mac風ウィンドウフレームを描画する共通関数
 */
function drawFrame(slide, headerTitle) {
  // 背景を白にクリア
  slide.addShape("rect", {
    x: 0, y: 0, w: 10, h: 5.63,
    fill: { color: COLORS.CONTENT_WHITE }
  });

  // 外枠（茶色のフレーム）
  slide.addShape("rect", {
    x: FRAME.outerX, y: FRAME.outerY, w: FRAME.outerW, h: FRAME.outerH,
    rectRadius: FRAME.radius,
    line: { color: COLORS.FRAME_BROWN, width: 2.5 },
    fill: { color: COLORS.CONTENT_WHITE }
  });

  // タイトルバー（ダーク）
  slide.addShape("rect", {
    x: FRAME.outerX, y: FRAME.outerY, w: FRAME.outerW, h: FRAME.barH,
    rectRadius: FRAME.radius,
    fill: { color: COLORS.TITLE_BAR }
  });
  // タイトルバー下部の角を埋める
  slide.addShape("rect", {
    x: FRAME.outerX, y: FRAME.outerY + FRAME.barH - 0.1, w: FRAME.outerW, h: 0.1,
    fill: { color: COLORS.TITLE_BAR }
  });

  // トラフィックライト
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

  // 閉じるボタン（×）
  slide.addText("\u00D7", {
    x: FRAME.closeX - 0.25, y: FRAME.outerY, w: 0.5, h: FRAME.barH,
    fontSize: FONT.H2, fontFace: "Arial", color: COLORS.TEXT_LIGHT,
    align: "center", valign: "middle"
  });

  // ヘッダーエリア（グレー）
  if (headerTitle) {
    slide.addShape("rect", {
      x: FRAME.headerX, y: FRAME.headerY, w: FRAME.headerW, h: FRAME.headerH,
      fill: { color: COLORS.HEADER_GRAY }
    });
    slide.addText(headerTitle, {
      x: FRAME.headerX + 0.2, y: FRAME.headerY, w: FRAME.headerW - 0.4, h: FRAME.headerH,
      fontSize: FONT.H2, fontFace: FACE, color: COLORS.TEXT_BLACK,
      bold: true, valign: "middle"
    });
  }

  // Lightning Talk バッジ
  slide.addShape("rect", {
    x: FRAME.badgeX, y: FRAME.badgeY, w: FRAME.badgeW, h: FRAME.badgeH,
    rectRadius: 0.04,
    fill: { color: COLORS.BADGE_BG }
  });
  slide.addText("Lightning Talk", {
    x: FRAME.badgeX, y: FRAME.badgeY, w: FRAME.badgeW, h: FRAME.badgeH,
    fontSize: FONT.BADGE, fontFace: FACE, color: COLORS.BADGE_TEXT,
    bold: true, align: "center", valign: "middle"
  });

  // コピーライト
  slide.addText("\u00A9 " + config.copyright, {
    x: FRAME.outerX, y: FRAME.copyrightY,
    w: FRAME.outerW, h: FRAME.copyrightH,
    fontSize: FONT.COPYRIGHT, fontFace: FACE, color: COLORS.TEXT_LIGHT,
    align: "center", valign: "middle"
  });
}

// =============================================================================
// パターン 1: 表紙スライド（タイトル）
// =============================================================================

function addLTTitleSlide(pres, title, subtitle, author) {
  var slide = pres.addSlide();
  drawFrame(slide, null);

  // メインコンテンツエリア（ヘッダーなし、全面使う）
  var cX = FRAME.contentX;
  var cY = FRAME.headerY;
  var cW = FRAME.contentW;
  var cH = FRAME.contentH + FRAME.headerH + 0.04;

  // タイトルテキスト（中央上部）
  slide.addText(title, {
    x: cX + 0.5, y: cY + 0.4, w: cW - 1.0, h: 1.4,
    fontSize: FONT.TITLE, fontFace: FACE, color: COLORS.TEXT_BLACK,
    bold: true, align: "center", valign: "middle",
    lineSpacingMultiple: 1.3
  });

  // アイコンサークル（プレースホルダー）
  var circleSize = 1.0;
  var circleX = (10 - circleSize) / 2;
  var circleY = cY + 1.9;
  slide.addShape("ellipse", {
    x: circleX, y: circleY, w: circleSize, h: circleSize,
    fill: { color: COLORS.HEADER_GRAY },
    line: { color: COLORS.FRAME_BROWN, width: 1.5 }
  });
  slide.addText("\uD83D\uDC64", {
    x: circleX, y: circleY, w: circleSize, h: circleSize,
    fontSize: 32, align: "center", valign: "middle"
  });

  // サブタイトル
  if (subtitle) {
    slide.addText(subtitle, {
      x: cX + 0.5, y: circleY + circleSize + 0.15, w: cW - 1.0, h: 0.5,
      fontSize: FONT.BODY, fontFace: FACE, color: COLORS.TEXT_MEDIUM,
      align: "center", valign: "middle"
    });
  }

  // 著者名
  var authorName = author || config.author;
  slide.addText(authorName, {
    x: cX + 0.5, y: circleY + circleSize + 0.6, w: cW - 1.0, h: 0.45,
    fontSize: FONT.H2, fontFace: FACE, color: COLORS.TEXT_BLACK,
    bold: true, align: "center", valign: "middle"
  });

  return slide;
}

// =============================================================================
// パターン 2: 自己紹介スライド
// =============================================================================

function addLTProfileSlide(pres, name, items, imagePath) {
  var slide = pres.addSlide();
  drawFrame(slide, "\u81EA\u5DF1\u7D39\u4ECB");

  var cX = FRAME.contentX;
  var cY = FRAME.contentY + 0.1;
  var cW = FRAME.contentW;

  // プロフィール画像（円形）- 左側
  var imgSize = 1.6;
  var imgX = cX + 0.5;
  var imgY = cY + 0.2;

  if (imagePath) {
    // 背景の丸を描画
    slide.addShape("ellipse", {
      x: imgX, y: imgY, w: imgSize, h: imgSize,
      fill: { color: COLORS.HEADER_GRAY },
      line: { color: COLORS.FRAME_BROWN, width: 1.5 }
    });
    // 画像を配置（四角形だが円の中に収まるように）
    slide.addImage({
      path: imagePath,
      x: imgX + 0.05, y: imgY + 0.05,
      w: imgSize - 0.1, h: imgSize - 0.1,
      rounding: true
    });
  } else {
    slide.addShape("ellipse", {
      x: imgX, y: imgY, w: imgSize, h: imgSize,
      fill: { color: COLORS.HEADER_GRAY },
      line: { color: COLORS.FRAME_BROWN, width: 1.5 }
    });
    slide.addText("\uD83D\uDC64", {
      x: imgX, y: imgY, w: imgSize, h: imgSize,
      fontSize: 48, align: "center", valign: "middle"
    });
  }

  // 名前
  slide.addText(name || config.author, {
    x: imgX - 0.2, y: imgY + imgSize + 0.15, w: imgSize + 0.4, h: 0.45,
    fontSize: FONT.H2, fontFace: FACE, color: COLORS.TEXT_BLACK,
    bold: true, align: "center", valign: "middle"
  });

  // プロフィール項目（右側）
  var listX = imgX + imgSize + 0.8;
  var listY = cY + 0.2;
  var listW = cW - imgSize - 1.8;

  if (items && items.length > 0) {
    var itemH = Math.min(0.55, 3.2 / items.length);
    for (var i = 0; i < items.length; i++) {
      var y = listY + i * itemH;
      var bulletText = "\u25B6  " + items[i];
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
  // LTパターン
  addLTTitleSlide: addLTTitleSlide,
  addLTProfileSlide: addLTProfileSlide,
  addLTContentSlide: addLTContentSlide,
  addLTPointSlide: addLTPointSlide,
  addLTImageSlide: addLTImageSlide,
  addLTListSlide: addLTListSlide,
  addLTClosingSlide: addLTClosingSlide
};
