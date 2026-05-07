// ============================================================
//  CODE.GS - ỦY BAN KIỂM TRA ĐẢNG ỦY THANH KHÊ
//  v2 - Sheet thống kê theo danh sách chi bộ (ngang)
// ============================================================

// ===== CẤU HÌNH =====
const ROOT_FOLDER_NAME       = "BÁO CÁO KIỂM TRA GIÁM SÁT";
const STATS_SPREADSHEET_NAME = "THỐNG KÊ BÁO CÁO KTGS";
const STATS_SHEET_NAME       = "THỐNG KÊ NỘP BÁO CÁO";

// Danh sách chi bộ (đồng bộ với chibo.js)
const DS_CHI_BO = [
  "1 TÂN NINH B","2 TÂN NINH B","3 TÂN NINH B","1 TÂN NINH A","2 TÂN NINH A",
  "3 TÂN NINH A","4 TÂN NINH 4","1 CHÍNH TRẠCH","2 CHÍNH TRẠCH","1 TÂN AN B",
  "2 TÂN AN B","3 TÂN AN B","4 TÂN AN B","5 TÂN AN B","6 TÂN AN B",
  "7 TÂN AN B","8 TÂN AN B","TÂN AN A1","TÂN AN A2","TÂN AN A3",
  "TÂN AN A4","TÂN SINH A1","TÂN SINH A2","TÂN SINH B1","TÂN SINH B2",
  "TÂN SINH B3","NÚI CÙNG 1","NÚI CÙNG 2","NÚI CÙNG 3","XUÂN HÒA B1",
  "XUÂN HÒA B2","XUÂN HÒA B3","XUÂN HÒA B4","BÀU SEN 1","BÀU SEN 2",
  "BÀU SEN 3","XUÂN HÒA 1","XUÂN HÒA 2","XUÂN HÒA A1","THANH XUÂN",
  "THANH PHONG 2","THANH PHONG 3","THANH HUY 1","THANH HUY 2","THANH TÂN 1",
  "THANH TÂN 2","THANH MINH 1","THANH MINH 2","THANH HÒA","THANH MINH",
  "THANH HÀ","THANH THỦY","1 XUÂN HÒA","2 XUÂN HÒA","3 XUÂN HÒA",
  "4 XUÂN HÒA","5 XUÂN HÒA","1 XUÂN HÒA A","2 XUÂN HÒA A","3 XUÂN HÒA A",
  "4 XUÂN HÒA A","5 XUÂN HÒA A","6 XUÂN HÒA A","7 XUÂN HÒA A","1 THANH KHÊ",
  "2 THANH KHÊ","3 THANH KHÊ","4 THANH KHÊ","1 PHẦN LĂNG","2 PHẦN LĂNG",
  "3 PHẦN LĂNG","4 PHẦN LĂNG","5 PHẦN LĂNG","KHU DÂN CƯ 372","TÂN TRUNG 1",
  "TÂN TRUNG 2","HÀ ĐÔNG 1","HÀ ĐÔNG 2","HÀ ĐÔNG 3","XUÂN ĐÁN 1",
  "XUÂN ĐÁN 2","XUÂN ĐÁN 3","XUÂN ĐÁN 4","XUÂN ĐÁN 5","XUÂN ĐÁN 6",
  "THUẬN AN 1","THUẬN AN 2","THUẬN AN 3","THUẬN AN 4","THUẬN AN 5",
  "THUẬN AN 6","TÂN CHÁNH 1","TÂN CHÁNH 2","TÂN CHÁNH 3","1 TAM THUẬN",
  "2 TAM THUẬN","3 TAM THUẬN","4 TAM THUẬN","5 TAM THUẬN","6 TAM THUẬN",
  "7 TAM THUẬN","8 TAM THUẬN","9 TAM THUẬN","10 TAM THUẬN","11 TAM THUẬN",
  "12 TAM THUẬN","13 TAM THUẬN","14 TAM THUẬN","15 TAM THUẬN","16 TAM THUẬN",
  "17 TAM THUẬN","1 THANH KHÊ TÂY","2 THANH KHÊ TÂY","4A THANH KHÊ TÂY",
  "4B THANH KHÊ TÂY","5 THANH KHÊ TÂY","6 THANH KHÊ TÂY","7 THANH KHÊ TÂY",
  "8 THANH KHÊ TÂY","9 THANH KHÊ TÂY","10 THANH KHÊ TÂY","11 THANH KHÊ TÂY",
  "12 THANH KHÊ TÂY","13 THANH KHÊ TÂY","14 THANH KHÊ TÂY","15 THANH KHÊ TÂY",
  "16 THANH KHÊ TÂY","17 THANH KHÊ TÂY","TRUNG NGHĨA 2","TRUNG NGHĨA 5",
  "HÒA PHÚ 4","HÒA PHÚ 4A","HÒA PHÚ 5","HÒA PHÚ 5A","HÒA PHÚ 5B",
  "TAM GIÁC 1","TAM GIÁC 2","TAM GIÁC 3A","TAM GIÁC 3B","TRUNG BÌNH A1",
  "TRUNG BÌNH A2","TRUNG BÌNH A3","TRUNG BÌNH B1","TRUNG BÌNH B2",
  "TRUNG LẬP A1","TRUNG LẬP A2","TRUNG LẬP A3","TRUNG LẬP A4","TRUNG LẬP B1",
  "TRUNG LẬP B2","TRUNG LẬP B3","TRUNG LẬP B4","TRUNG LẬP B5","TRUNG LẬP B6",
  "TRUNG LẬP B7","VĨNH AN A1","VĨNH AN A2","VĨNH AN B1","VĨNH AN B2",
  "VĨNH AN B3","TRUNG HÒA A1","TRUNG HÒA A2","TRUNG HÒA A3","TRUNG HÒA B1",
  "TRUNG HÒA B2","TRUNG HÒA B3","TÂN LẬP A1","TÂN LẬP A2","TÂN LẬP A3",
  "TÂN LẬP B1","TÂN LẬP B2","TÂN LẬP B3","TÂN LẬP B4","TÂN LẬP B5"
];

// ============================================================
//  CẤU TRÚC SHEET (cột cố định):
//
//  Hàng 1 (tiêu đề nhóm): STT | TÊN CHI BỘ | [nhóm Mẫu01 - 12 tháng] | [nhóm Mẫu02 - 4 loại]
//  Hàng 2 (tiêu đề cột) : ... | ... | T1 T2 ... T12            | 6T-đầu 6T-cuối Năm Nhiệm kỳ
//  Hàng 3..N (dữ liệu)  : Mỗi chi bộ 1 dòng → ô trống = chưa nộp, ô có ngày giờ = đã nộp
//  Hàng N+2 (thống kê)  : TỔNG ĐÃ NỘP (đếm ô không trống mỗi cột)
//
//  Cột index (1-based):
//    1  = STT
//    2  = TÊN CHI BỘ
//    3..14  = Mẫu 01CB tháng 1..12
//    15..18 = Mẫu 02CB: 6T đầu | 6T cuối | Năm | Nhiệm kỳ
//  Tổng: 18 cột
// ============================================================

const COL_STT    = 1;
const COL_CHIBO  = 2;
const COL_M1_T1  = 3;   // Mẫu01 tháng 1 → cột 3..14
const COL_M2_6D  = 15;  // Mẫu02: 6T đầu
const COL_M2_6C  = 16;  // Mẫu02: 6T cuối
const COL_M2_NAM = 17;  // Mẫu02: Năm
const COL_M2_NK  = 18;  // Mẫu02: Nhiệm kỳ
const TOTAL_COLS = 18;

const ROW_HEADER1 = 1;  // Nhóm tiêu đề
const ROW_HEADER2 = 2;  // Tiêu đề cột
const ROW_DATA    = 3;  // Bắt đầu dữ liệu chi bộ

// ===== ENTRY POINT =====
function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const result = processReport(params);
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: "Lỗi: " + err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== XỬ LÝ BÁO CÁO =====
function processReport(params) {
  const { loaiMau, chibo, thoigian, loaiBaoCao, fileBase64, fileName } = params;
  const nam = params.nam || new Date().getFullYear();

  if (!chibo)      throw new Error("Thiếu tên chi bộ");
  if (!fileBase64) throw new Error("Thiếu dữ liệu file");
  if (!fileName)   throw new Error("Thiếu tên file");

  // 1. Lưu file .docx lên Drive
  const rootFolder = getOrCreateFolder(ROOT_FOLDER_NAME, DriveApp.getRootFolder());
  const yearFolder = getOrCreateFolder(String(nam), rootFolder);
  const typeName   = loaiMau === "Mau01" ? "MẪU 01CB - Hằng tháng" : "MẪU 02CB - Định kỳ";
  const typeFolder = getOrCreateFolder(typeName, yearFolder);

  const docBytes = Utilities.base64Decode(fileBase64);
  const blob     = Utilities.newBlob(docBytes, MimeType.MICROSOFT_WORD, fileName);
  const existing = typeFolder.getFilesByName(fileName);
  while (existing.hasNext()) existing.next().setTrashed(true);
  const savedFile = typeFolder.createFile(blob);

  // 2. Cập nhật sheet thống kê
  const ss    = getOrCreateStatsSpreadsheet(rootFolder, nam);
  const sheet = getOrCreateTrackingSheet(ss, nam);

  markSubmission(sheet, chibo, loaiMau, loaiBaoCao || thoigian, savedFile.getUrl());
  refreshSummaryRow(sheet);

  return {
    success  : true,
    message  : `✅ Báo cáo chi bộ "${chibo}" đã lưu thành công!`,
    fileUrl  : savedFile.getUrl(),
    sheetUrl : ss.getUrl()
  };
}

// ===== LẤY / TẠO THƯ MỤC =====
function getOrCreateFolder(name, parent) {
  const iter = parent.getFoldersByName(name);
  if (iter.hasNext()) return iter.next();
  return parent.createFolder(name);
}

// ===== LẤY / TẠO SPREADSHEET =====
function getOrCreateStatsSpreadsheet(rootFolder, nam) {
  const iter = rootFolder.getFilesByName(STATS_SPREADSHEET_NAME);
  if (iter.hasNext()) return SpreadsheetApp.open(iter.next());

  const ss     = SpreadsheetApp.create(STATS_SPREADSHEET_NAME);
  const ssFile = DriveApp.getFileById(ss.getId());
  rootFolder.addFile(ssFile);
  DriveApp.getRootFolder().removeFile(ssFile);
  return ss;
}

// ===== LẤY / TẠO SHEET THEO NĂM =====
function getOrCreateTrackingSheet(ss, nam) {
  const sheetName = `${STATS_SHEET_NAME} ${nam}`;

  let sheet = ss.getSheetByName(sheetName);
  if (sheet) return sheet;

  // Tạo mới — chèn làm sheet đầu tiên
  sheet = ss.insertSheet(sheetName, 0);
  buildSheetStructure(sheet, nam);
  return sheet;
}

// ===== XÂY DỰNG CẤU TRÚC SHEET =====
function buildSheetStructure(sheet, nam) {
  const numChi = DS_CHI_BO.length;
  const summaryRow = ROW_DATA + numChi + 1; // 1 hàng trống cách

  // --- Hàng 1: nhóm tiêu đề ---
  sheet.getRange(ROW_HEADER1, COL_STT).setValue("STT");
  sheet.getRange(ROW_HEADER1, COL_CHIBO).setValue("TÊN CHI BỘ");
  sheet.getRange(ROW_HEADER1, COL_M1_T1, 1, 12).merge()
       .setValue(`MẪU 01CB - BÁO CÁO HẰNG THÁNG (${nam})`);
  sheet.getRange(ROW_HEADER1, COL_M2_6D, 1, 4).merge()
       .setValue(`MẪU 02CB - BÁO CÁO ĐỊNH KỲ (${nam})`);

  // --- Hàng 2: tiêu đề từng cột ---
  const thangHeaders = ["T.1","T.2","T.3","T.4","T.5","T.6","T.7","T.8","T.9","T.10","T.11","T.12"];
  const m02Headers   = ["6 THÁNG ĐẦU","6 THÁNG CUỐI","NĂM","NHIỆM KỲ"];

  sheet.getRange(ROW_HEADER2, COL_STT).setValue("STT");
  sheet.getRange(ROW_HEADER2, COL_CHIBO).setValue("TÊN CHI BỘ");
  thangHeaders.forEach((h, i) => sheet.getRange(ROW_HEADER2, COL_M1_T1 + i).setValue(h));
  m02Headers.forEach((h, i)   => sheet.getRange(ROW_HEADER2, COL_M2_6D + i).setValue(h));

  // --- Hàng dữ liệu: điền toàn bộ danh sách chi bộ ---
  DS_CHI_BO.forEach((cb, i) => {
    const row = ROW_DATA + i;
    sheet.getRange(row, COL_STT).setValue(i + 1);
    sheet.getRange(row, COL_CHIBO).setValue(cb);
  });

  // --- Hàng thống kê ---
  const sumR = summaryRow;
  sheet.getRange(sumR, COL_CHIBO).setValue("TỔNG ĐÃ NỘP");

  // Công thức COUNTA cho từng cột báo cáo
  for (let c = COL_M1_T1; c <= TOTAL_COLS; c++) {
    const colLetter = columnToLetter(c);
    sheet.getRange(sumR, c).setFormula(
      `=COUNTA(${colLetter}${ROW_DATA}:${colLetter}${ROW_DATA + numChi - 1})`
    );
  }

  // --- Định dạng ---
  applyFormatting(sheet, nam, numChi, summaryRow);
}

// ===== ĐÁNH DẤU CHI BỘ ĐÃ NỘP =====
function markSubmission(sheet, chibo, loaiMau, loaiBaoCao, fileUrl) {
  // Tìm hàng chi bộ
  const numChi   = DS_CHI_BO.length;
  const lastDataRow = ROW_DATA + numChi - 1;
  const chiBoRange  = sheet.getRange(ROW_DATA, COL_CHIBO, numChi, 1).getValues();

  let targetRow = -1;
  for (let i = 0; i < chiBoRange.length; i++) {
    if (String(chiBoRange[i][0]).trim().toUpperCase() === chibo.trim().toUpperCase()) {
      targetRow = ROW_DATA + i;
      break;
    }
  }
  if (targetRow === -1) throw new Error(`Không tìm thấy chi bộ "${chibo}" trong danh sách`);

  // Xác định cột
  const col = getReportColumn(loaiMau, loaiBaoCao);
  if (!col) throw new Error("Không xác định được cột báo cáo: " + loaiBaoCao);

  // Ghi ngày giờ nộp + link
  const now = new Date();
  const tz  = Session.getScriptTimeZone();
  const stampText = Utilities.formatDate(now, tz, "dd/MM HH:mm");

  // Dùng setRichTextValue để vừa có text vừa có link
  const richText = SpreadsheetApp.newRichTextValue()
    .setText(stampText)
    .setLinkUrl(0, stampText.length, fileUrl)
    .build();
  sheet.getRange(targetRow, col).setRichTextValue(richText);

  // Tô màu xanh lá = đã nộp
  sheet.getRange(targetRow, col)
    .setBackground("#c6efce")
    .setFontColor("#276221")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");
}

// ===== XÁC ĐỊNH CỘT THEO LOẠI BÁO CÁO =====
function getReportColumn(loaiMau, loaiBaoCao) {
  if (loaiMau === "Mau01") {
    // loaiBaoCao = "Tháng 5 Năm 2026" → lấy số tháng
    const m = loaiBaoCao.match(/[Tt]háng\s*(\d+)/);
    if (m) {
      const thang = parseInt(m[1]);
      if (thang >= 1 && thang <= 12) return COL_M1_T1 + thang - 1;
    }
    return null;
  }
  if (loaiMau === "Mau02") {
    const s = loaiBaoCao.toLowerCase();
    if (s.includes("đầu") || s.includes("dau") || s.includes("6thangdau")) return COL_M2_6D;
    if (s.includes("cuối") || s.includes("cuoi") || s.includes("6thangcuoi")) return COL_M2_6C;
    if (s.includes("nhiệm") || s.includes("nhiem") || s.includes("nhiemky")) return COL_M2_NK;
    if (s.includes("năm") || s.includes("nam")) return COL_M2_NAM;
    return null;
  }
  return null;
}

// ===== CẬP NHẬT HÀNG THỐNG KÊ (refresh vị trí) =====
function refreshSummaryRow(sheet) {
  // Đảm bảo hàng thống kê vẫn có công thức đúng (đã set khi tạo, chỉ kiểm tra)
  const numChi    = DS_CHI_BO.length;
  const summaryRow = ROW_DATA + numChi + 1;
  const chiBoVal  = sheet.getRange(summaryRow, COL_CHIBO).getValue();
  if (!chiBoVal) {
    // Re-write nếu bị trống (vd. dòng bị xóa nhầm)
    sheet.getRange(summaryRow, COL_CHIBO).setValue("TỔNG ĐÃ NỘP");
    for (let c = COL_M1_T1; c <= TOTAL_COLS; c++) {
      const colLetter = columnToLetter(c);
      sheet.getRange(summaryRow, c).setFormula(
        `=COUNTA(${colLetter}${ROW_DATA}:${colLetter}${ROW_DATA + numChi - 1})`
      );
    }
  }
}

// ===== ĐỊNH DẠNG TOÀN SHEET =====
function applyFormatting(sheet, nam, numChi, summaryRow) {
  const totalDataRows = numChi;

  // Hàng 1: nhóm tiêu đề
  const h1Range = sheet.getRange(ROW_HEADER1, 1, 1, TOTAL_COLS);
  h1Range.setBackground("#1a365d").setFontColor("#ffffff")
         .setFontWeight("bold").setHorizontalAlignment("center")
         .setVerticalAlignment("middle").setFontSize(11);
  sheet.setRowHeight(ROW_HEADER1, 36);

  // Hàng 2: tiêu đề cột
  const h2Range = sheet.getRange(ROW_HEADER2, 1, 1, TOTAL_COLS);
  h2Range.setBackground("#2b6cb0").setFontColor("#ffffff")
         .setFontWeight("bold").setHorizontalAlignment("center")
         .setWrap(true);
  sheet.setRowHeight(ROW_HEADER2, 48);

  // Cột Mau01 header nền xanh nhạt hơn
  sheet.getRange(ROW_HEADER1, COL_M1_T1, 2, 12).setBackground("#1e4d8c");
  // Cột Mau02 header nền xanh đậm hơn
  sheet.getRange(ROW_HEADER1, COL_M2_6D, 2, 4).setBackground("#7b1fa2");
  sheet.getRange(ROW_HEADER2, COL_M2_6D, 1, 4).setBackground("#9c27b0");

  // Màu xen kẽ cho các dòng dữ liệu
  for (let i = 0; i < totalDataRows; i++) {
    const row   = ROW_DATA + i;
    const color = i % 2 === 0 ? "#f8fafc" : "#ffffff";
    sheet.getRange(row, 1, 1, TOTAL_COLS).setBackground(color);
    // Cột STT và tên chi bộ in đậm
    sheet.getRange(row, COL_STT).setHorizontalAlignment("center");
    sheet.getRange(row, COL_CHIBO).setFontWeight("bold");
  }

  // Hàng thống kê
  const sumRange = sheet.getRange(summaryRow, 1, 1, TOTAL_COLS);
  sumRange.setBackground("#fff9c4").setFontWeight("bold")
          .setHorizontalAlignment("center").setFontSize(11);
  sheet.getRange(summaryRow, COL_CHIBO)
       .setBackground("#f9a825").setFontColor("#000000")
       .setHorizontalAlignment("left");

  // Đường viền toàn bảng
  const fullRange = sheet.getRange(ROW_HEADER1, 1, summaryRow - ROW_HEADER1 + 1, TOTAL_COLS);
  fullRange.setBorder(true, true, true, true, true, true, "#cccccc",
                      SpreadsheetApp.BorderStyle.SOLID);

  // Độ rộng cột
  sheet.setColumnWidth(COL_STT,   45);
  sheet.setColumnWidth(COL_CHIBO, 190);
  for (let c = COL_M1_T1; c <= 14; c++) sheet.setColumnWidth(c, 78);
  for (let c = COL_M2_6D; c <= 18; c++) sheet.setColumnWidth(c, 105);

  sheet.setFrozenRows(2);
  sheet.setFrozenColumns(2);
}

// ===== TIỆN ÍCH: chuyển số cột → chữ cái (A, B, ... AA, ...) =====
function columnToLetter(col) {
  let letter = "";
  while (col > 0) {
    const mod = (col - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    col = Math.floor((col - 1) / 26);
  }
  return letter;
}

// ===== TEST THỦ CÔNG =====
function testSetup() {
  const rootFolder = getOrCreateFolder(ROOT_FOLDER_NAME, DriveApp.getRootFolder());
  const ss   = getOrCreateStatsSpreadsheet(rootFolder, new Date().getFullYear());
  const sheet = getOrCreateTrackingSheet(ss, new Date().getFullYear());
  Logger.log("Sheet: " + sheet.getName());
  Logger.log("URL: " + ss.getUrl());
  Logger.log("✅ Thiết lập thành công! Tổng chi bộ: " + DS_CHI_BO.length);
}

// ===== TEST GHI MẪU =====
function testMarkSubmission() {
  const rootFolder = getOrCreateFolder(ROOT_FOLDER_NAME, DriveApp.getRootFolder());
  const ss    = getOrCreateStatsSpreadsheet(rootFolder, new Date().getFullYear());
  const sheet = getOrCreateTrackingSheet(ss, new Date().getFullYear());
  markSubmission(sheet, "1 TÂN NINH B", "Mau01", "Tháng 5 Năm 2026", "https://drive.google.com/test");
  markSubmission(sheet, "XUÂN ĐÁN 3",  "Mau02", "6 tháng đầu năm 2026", "https://drive.google.com/test2");
  refreshSummaryRow(sheet);
  Logger.log("✅ Ghi mẫu thành công!");
}
