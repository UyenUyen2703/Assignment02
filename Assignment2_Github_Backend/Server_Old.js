const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//------------------------------------------------------------------------------//

const database = 'Assignment2_Database'
const mysqlPassword = '123456'
const port = '5555'

//------------------------------------------------------------------------------//
//DATABASE CONNECTION

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: mysqlPassword,
  database: database,
});
db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});

//------------------------------------------------------------------------------//
// SUBJECT COMBINATIONS

const subjectCombinations = {
  "A00": ["Toán", "Vật Lý", "Hóa học"],
  "A01": ["Toán", "Vật lý", "Tiếng Anh"],
  "A02": ["Toán", "Vật lí", "Sinh học"],
  "A03": ["Toán", "Vật lí", "Lịch sử"],
  "A04": ["Toán", "Vật lí", "Địa lí"],
  "A05": ["Toán", "Hóa học", "Lịch sử"],
  "A06": ["Toán", "Hóa học", "Địa lí"],
  "A07": ["Toán", "Lịch sử", "Địa lí"],
  "B00": ["Toán", "Hóa học", "Sinh học"],
  "B01": ["Toán", "Sinh học", "Lịch sử"],
  "B02": ["Toán", "Sinh học", "Địa lí"],
  "B03": ["Toán", "Sinh học", "Ngữ văn"],
  "C00": ["Ngữ văn", "Lịch sử", "Địa lí"],
  "C01": ["Ngữ văn", "Toán", "Vật lí"],
  "C02": ["Ngữ văn", "Toán", "Hóa học"],
  "C03": ["Ngữ văn", "Toán", "Lịch sử"],
  "C04": ["Ngữ văn", "Toán", "Địa lí"],
  "C05": ["Ngữ văn", "Vật lí", "Hóa học"],
  "C06": ["Ngữ văn", "Vật lí", "Sinh học"],
  "C07": ["Ngữ văn", "Vật lí", "Lịch sử"],
  "C08": ["Ngữ văn", "Hóa học", "Sinh học"],
  "C09": ["Ngữ văn", "Vật lí", "Địa lí"],
  "C10": ["Ngữ văn", "Hóa học", "Lịch sử"],
  "C11": ["Ngữ văn", "Hóa học", "Địa lí"],
  "C12": ["Ngữ văn", "Sinh học", "Lịch sử"],
  "C13": ["Ngữ văn", "Sinh học", "Địa lí"],
  "D01": ["Ngữ văn", "Toán", "Tiếng Anh"],
  "D02": ["Ngữ văn", "Toán", "Tiếng Nga"],
  "D03": ["Ngữ văn", "Toán", "Tiếng Pháp"],
  "D04": ["Ngữ văn", "Toán", "Tiếng Trung"],
  "D05": ["Ngữ văn", "Toán", "Tiếng Đức"],
  "D06": ["Ngữ văn", "Toán", "Tiếng Nhật"],
  "D07": ["Toán", "Hóa học", "Tiếng Anh"],
  "D08": ["Toán", "Sinh học", "Tiếng Anh"],
  "D09": ["Toán", "Lịch sử", "Tiếng Anh"],
  "D10": ["Toán", "Địa lí", "Tiếng Anh"],
  "D11": ["Ngữ văn", "Vật lí", "Tiếng Anh"],
  "D12": ["Ngữ văn", "Hóa học", "Tiếng Anh"],
  "D13": ["Ngữ văn", "Sinh học", "Tiếng Anh"],
  "D14": ["Ngữ văn", "Lịch sử", "Tiếng Anh"],
  "D15": ["Ngữ văn", "Địa lí", "Tiếng Anh"],
  "D16": ["Toán", "Địa lí", "Tiếng Đức"],
  "D17": ["Toán", "Địa lí", "Tiếng Nga"],
  "D18": ["Toán", "Địa lí", "Tiếng Nhật"],
  "D19": ["Toán", "Địa lí", "Tiếng Pháp"],
  "D20": ["Toán", "Địa lí", "Tiếng Trung"],
  "D21": ["Toán", "Hóa học", "Tiếng Đức"],
  "D22": ["Toán", "Hóa học", "Tiếng Nga"],
  "D23": ["Toán", "Hóa học", "Tiếng Nhật"],
  "D24": ["Toán", "Hóa học", "Tiếng Pháp"],
  "D25": ["Toán", "Hóa học", "Tiếng Trung"],
  "D26": ["Toán", "Vật lí", "Tiếng Đức"],
  "D27": ["Toán", "Vật lí", "Tiếng Nga"],
  "D28": ["Toán", "Vật lí", "Tiếng Nhật"],
  "D29": ["Toán", "Vật lí", "Tiếng Pháp"],
  "D30": ["Toán", "Vật lí", "Tiếng Trung"],
  "D31": ["Toán", "Sinh học", "Tiếng Đức"],
  "D32": ["Toán", "Sinh học", "Tiếng Nga"],
  "D33": ["Toán", "Sinh học", "Tiếng Nhật"],
  "D34": ["Toán", "Sinh học", "Tiếng Pháp"],
  "D35": ["Toán", "Sinh học", "Tiếng Trung"],
  "D36": ["Toán", "Lịch sử", "Tiếng Đức"],
  "D37": ["Toán", "Lịch sử", "Tiếng Nga"],
  "D38": ["Toán", "Lịch sử", "Tiếng Nhật"],
  "D39": ["Toán", "Lịch sử", "Tiếng Pháp"],
  "D40": ["Toán", "Lịch sử", "Tiếng Trung"],
  "D41": ["Ngữ văn", "Địa lí", "Tiếng Đức"],
  "D42": ["Ngữ văn", "Địa lí", "Tiếng Nga"],
  "D43": ["Ngữ văn", "Địa lí", "Tiếng Nhật"],
  "D44": ["Ngữ văn", "Địa lí", "Tiếng Pháp"],
  "D45": ["Ngữ văn", "Địa lí", "Tiếng Trung"],
  "D46": ["Ngữ văn", "Hóa học", "Tiếng Đức"],
  "D47": ["Ngữ văn", "Hóa học", "Tiếng Nga"],
  "D48": ["Ngữ văn", "Hóa học", "Tiếng Nhật"],
  "D49": ["Ngữ văn", "Hóa học", "Tiếng Trung"],
  "D51": ["Ngữ văn", "Vật lí", "Tiếng Đức"],
  "D53": ["Ngữ văn", "Vật lí", "Tiếng Nhật"],
  "D54": ["Ngữ văn", "Vật lí", "Tiếng Pháp"],
  "D55": ["Ngữ văn", "Vật lí", "Tiếng Trung"],
  "D56": ["Ngữ văn", "Sinh học", "Tiếng Đức"],
  "D57": ["Ngữ văn", "Sinh học", "Tiếng Nga"],
  "D58": ["Ngữ văn", "Sinh học", "Tiếng Nhật"],
  "D59": ["Ngữ văn", "Sinh học", "Tiếng Pháp"],
  "D60": ["Ngữ văn", "Sinh học", "Tiếng Trung"],
  "D61": ["Ngữ văn", "Lịch sử", "Tiếng Đức"],
  "D62": ["Ngữ văn", "Lịch sử", "Tiếng Nga"],
  "D63": ["Ngữ văn", "Lịch sử", "Tiếng Nhật"],
  "D64": ["Ngữ văn", "Lịch sử", "Tiếng Pháp"],
  "D65": ["Ngữ văn", "Lịch sử", "Tiếng Trung"],
  "H00": ["Ngữ văn", "Năng khiếu vẽ NT 1", "Năng khiếu vẽ NT 2"],
  "H01": ["Toán", "Ngữ văn", "Vẽ MT"],
  "N00": ["Ngữ văn", "Năng khiếu Âm nhạc 1", "Năng khiếu âm nhạc 2"],
  "M00": ["Ngữ văn", "Toán", "Đọc diễn cảm, Hát"],
  "T00": ["Toán", "Sinh học", "Năng khiếu TDTT"],
  "V00": ["Toán", "Vật lí", "Vẽ Mỹ thuật"],
  "V01": ["Toán", "Ngữ văn", "Vẽ Mỹ thuật"],
  "S00": ["Ngữ văn", "NK SKĐA 1", "NK SKĐA 2"],
  "R00": ["Ngữ văn", "Lịch sử", "Năng khiếu báo chí"],
  "K00": ["Toán", "Vật lí", "Kĩ thuật nghề"]
};

//------------------------------------------------------------------------------//
// --- Hàm / API tính toán thông dụng ---

function TinhDiemTNTHPT(data) {
  return (data.diemThiMon1 + data.diemThiMon2 + data.diemThiMon3) / 3 * 10;
}

function TinhDiemTBTHPT(data) {
  const tbMon1 = (data.diemMon1Lop10 + data.diemMon1Lop11 + data.diemMon1Lop12) / 3;
  const tbMon2 = (data.diemMon2Lop10 + data.diemMon2Lop11 + data.diemMon2Lop12) / 3;
  const tbMon3 = (data.diemMon3Lop10 + data.diemMon3Lop11 + data.diemMon3Lop12) / 3;
  return (
    ((parseFloat(tbMon1) || 0) +
      (parseFloat(tbMon2) || 0) +
      (parseFloat(tbMon3) || 0)) /
    3
  );
}

function TinhDiemHocLuc(diemNangLuc, diemTNTHPT, diemTBTHPT) {
  return diemNangLuc * 0.7 + diemTNTHPT * 0.2 + diemTBTHPT * 0.1;
}

function TinhDiemCong(diemHocLuc, diemCongThanhTich) {
  const temp = diemHocLuc + diemCongThanhTich;
  if (temp < 100) {
    return diemCongThanhTich;
  } else {
    return 100 - diemHocLuc;
  }
}

function TinhDiemUuTien(diemHocLuc, diemCong, diemUuTien) {
  const temp = diemHocLuc + diemCong;
  if (temp < 75) {
    return diemUuTien;
  } else {
    return (100 - diemHocLuc - diemCong) / 25 * diemUuTien;
  }
}

function TinhDiemXetTuyen(diemHocLuc, diemCong, diemUuTien) {
  return diemHocLuc + diemCong + diemUuTien;
}

function CheckToHopMonCoTA(data) {
  if (data.toHopMon == 'A01') return true;
  if (data.toHopMon == 'D01') return true;
  if (data.toHopMon == 'D07') return true;
  if (data.toHopMon == 'D08') return true;

  return false;
}
function CheckChungChiTA(data) {
  let diemQuyDoi = 0;

  if (data.chungChiTA == 'IELTS') {
    if (data.diemCC_1 >= 5.0) diemQuyDoi = 8.0;
    else if (data.diemCC_1 >= 5.5) diemQuyDoi = 9.0;
    else if (data.diemCC_1 >= 6.0) diemQuyDoi = 10.0;
  }
  else if (data.chungChiTA == 'TOEFL iBT') {
    if (data.diemCC_1 >= 46) diemQuyDoi = 8.0;
    else if (data.diemCC_1 >= 48) diemQuyDoi = 8.2;
    else if (data.diemCC_1 >= 51) diemQuyDoi = 8.4;
    else if (data.diemCC_1 >= 54) diemQuyDoi = 8.6;
    else if (data.diemCC_1 >= 57) diemQuyDoi = 8.8;
    else if (data.diemCC_1 >= 60) diemQuyDoi = 9.0;
    else if (data.diemCC_1 >= 63) diemQuyDoi = 9.2;
    else if (data.diemCC_1 >= 67) diemQuyDoi = 9.4;
    else if (data.diemCC_1 >= 71) diemQuyDoi = 9.6;
    else if (data.diemCC_1 >= 75) diemQuyDoi = 9.8;
    else if (data.diemCC_1 >= 79) diemQuyDoi = 10.0;
  }
  else if (data.chungChiTA == 'TOEIC') {
    if (data.diemCC_1 >= 460 && data.diemCC_2 >= 200) diemQuyDoi = 8.0;
    else if (data.diemCC_1 >= 490 && data.diemCC_2 >= 200) diemQuyDoi = 8.2;
    else if (data.diemCC_1 >= 515 && data.diemCC_2 >= 230) diemQuyDoi = 8.4;
    else if (data.diemCC_1 >= 540 && data.diemCC_2 >= 230) diemQuyDoi = 8.6;
    else if (data.diemCC_1 >= 565 && data.diemCC_2 >= 230) diemQuyDoi = 8.8;
    else if (data.diemCC_1 >= 590 && data.diemCC_2 >= 230) diemQuyDoi = 9.0;
    else if (data.diemCC_1 >= 610 && data.diemCC_2 >= 240) diemQuyDoi = 9.2;
    else if (data.diemCC_1 >= 640 && data.diemCC_2 >= 250) diemQuyDoi = 9.4;
    else if (data.diemCC_1 >= 670 && data.diemCC_2 >= 260) diemQuyDoi = 9.6;
    else if (data.diemCC_1 >= 700 && data.diemCC_2 >= 270) diemQuyDoi = 9.8;
    else if (data.diemCC_1 >= 730 && data.diemCC_2 >= 280) diemQuyDoi = 10.0;
  }

  return diemQuyDoi;
}
function QuyDoiDiemChungChiTA(data) {
  if (!CheckToHopMonCoTA(data) || data.chungChiTA == null) return null;

  let diemTiengAnhQuyDoi = CheckChungChiTA(data);
  return diemTiengAnhQuyDoi;
}

app.post('/api/quyDoiDiemChungChiQuocTe', async (req, res) => {
  const data = req.body;
  console.log(data)
  try {
    let sql, params;
    if (data.chungChiQuocTe === 'A-Level') {
      sql = `SELECT converted_score 
             FROM International_Admissions_Certificate
             WHERE certificate_type = ? AND original_score = ? 
             LIMIT 1`;
      params = [data.chungChiQuocTe, data.diemChungChiQuocTe.trim().toUpperCase()];
    } else {
      sql = `SELECT converted_score 
             FROM International_Admissions_Certificate
             WHERE certificate_type = ? AND CAST(original_score AS UNSIGNED) <= ?
             ORDER BY CAST(original_score AS UNSIGNED) DESC 
             LIMIT 1`;
      params = [data.chungChiQuocTe, parseInt(data.diemChungChiQuocTe)];
    }

    db.query(sql, params, (err, results) => {
      if (err) {
        console.error('Truy vấn lỗi:', err);
        return res.status(500).json({ message: 'Lỗi server khi quy đổi điểm' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy điểm quy đổi' });
      }

      console.log(results[0].converted_score)

      return res.json({
        success: true,
        results: results[0].converted_score
      });
    });

  } catch (error) {
    console.error('Lỗi quy đổi điểm:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi quy đổi điểm',
      error: error.message
    });
  }
});

//------------------------------------------------------------------------------//
// ĐỐI TƯỢNG 1

function tinhDiemNangLuc(dgnl, toan) {
  return ((parseFloat(dgnl) || 0) + (parseFloat(toan) || 0)) / 15;
}
function tinhDiemTNTHPT(mon1, mon2, mon3) {
  return (
    (((parseFloat(mon1) || 0) +
      (parseFloat(mon2) || 0) +
      (parseFloat(mon3) || 0)) /
      3) *
    10
  );
}
function tinhDiemTBMon(lop10, lop11, lop12) {
  return (
    ((parseFloat(lop10) || 0) +
      (parseFloat(lop11) || 0) +
      (parseFloat(lop12) || 0)) /
    3
  );
}
function tinhDiemTHPT(tb1, tb2, tb3) {
  return (parseFloat(tb1) + parseFloat(tb2) + parseFloat(tb3)) / 3 * 10;
}
function tinhDiemHocLuc(nangLuc, TNTHPT, THPT) {
  return nangLuc * 0.7 + TNTHPT * 0.2 + THPT * 0.1;
}
function tinhDiemCong(diemHocLuc, diemCongThanhTich) {
  const temp = diemHocLuc + diemCongThanhTich;
  if (temp < 100) {
    return diemCongThanhTich;
  } else {
    return 100 - diemHocLuc;
  }
}
function tinhDiemUuTien(diemHocLuc, diemCong, diemUuTien) {
  const temp = diemHocLuc + diemCong;
  if (temp < 75) {
    return diemUuTien;
  } else {
    return (100 - diemHocLuc - diemCong) / 25 * diemUuTien;
  }
}
function tinhDiemXetTuyen(diemHocLuc, diemCong, diemUuTien) {
  return diemHocLuc + diemCong + diemUuTien;
}
app.post("/api/calculateDoiTuong1", (req, res) => {
  let data = req.body;
  console.log(data);
  try {
    //code quy doi diem chung chi tieng anh thanh diem THNTHPT va TBTHPT//
    let diemTiengAnhQuyDoi = QuyDoiDiemChungChiTA(data);
    if (diemTiengAnhQuyDoi != null && diemTiengAnhQuyDoi != 0) {

      data.diemThiMon3 = diemTiengAnhQuyDoi;
      data.diemMon3Lop10 = diemTiengAnhQuyDoi;
      data.diemMon3Lop11 = diemTiengAnhQuyDoi;
      data.diemMon3Lop12 = diemTiengAnhQuyDoi;
    }
    //-------//

    const diemNangLuc = tinhDiemNangLuc(data.diemDanhGiaNangLuc, data.diemToan);

    const diemTNTHPT = tinhDiemTNTHPT(
      data.diemThiMon1,
      data.diemThiMon2,
      data.diemThiMon3
    );
    const tbMon1 = tinhDiemTBMon(
      data.diemMon1Lop10,
      data.diemMon1Lop11,
      data.diemMon1Lop12
    );
    const tbMon2 = tinhDiemTBMon(
      data.diemMon2Lop10,
      data.diemMon2Lop11,
      data.diemMon2Lop12
    );
    const tbMon3 = tinhDiemTBMon(
      data.diemMon3Lop10,
      data.diemMon3Lop11,
      data.diemMon3Lop12
    );
    const diemThiTHPT = tinhDiemTHPT(tbMon1, tbMon2, tbMon3);
    const diemHocLuc = tinhDiemHocLuc(diemNangLuc, diemTNTHPT, diemThiTHPT);
    const diemCong = tinhDiemCong(diemHocLuc, parseFloat(data.diemCong));
    const diemUuTien = tinhDiemUuTien(diemHocLuc, diemCong, parseFloat(data.diemUuTien));
    const diemXetTuyen = tinhDiemXetTuyen(diemHocLuc, diemCong, diemUuTien);

    res.status(200).json({
      success: true,
      results: {
        diemHocLuc: diemHocLuc.toFixed(2),
        diemCong: diemCong.toFixed(2),
        diemUuTien: diemUuTien.toFixed(2),
        diemXetTuyen: diemXetTuyen.toFixed(2),
      }
    });

  } catch (error) {
    console.error("Error in calculation:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during calculation"
    });
    res.status(400).send("Dữ liệu không hợp lệ");
  }
});

//------------------------------------------------------------------------------//
// ĐỐI TƯỢNG 2

const calculateScore = (data) => {
  const { toHopMon, diemThiMon1, diemThiMon2, diemThiMon3,
    diemMon1Lop10, diemMon2Lop10, diemMon3Lop10,
    diemMon1Lop11, diemMon2Lop11, diemMon3Lop11,
    diemMon1Lop12, diemMon2Lop12, diemMon3Lop12,
    diemCong, diemUuTien } = data;

  // [Điểm TNTHPTquy đổi] = [Tổng điểm thi 3 môn TNTHPT trong tổ hợp] / 3 × 10
  const diemTNTHPTQuyDoi = (diemThiMon1 + diemThiMon2 + diemThiMon3) / 3 * 10;

  // [Điểm năng lực] = [Điểm TNTHPTquy đổi] × 0.75
  const diemNangLuc = diemTNTHPTQuyDoi * 0.75;

  // [Điểm học THPTquy đổi] = [Trung bình cộng điểm TB lớp 10, 11, 12] × 10
  const tb10 = (diemMon1Lop10 + diemMon2Lop10 + diemMon3Lop10) / 3;
  const tb11 = (diemMon1Lop11 + diemMon2Lop11 + diemMon3Lop11) / 3;
  const tb12 = (diemMon1Lop12 + diemMon2Lop12 + diemMon3Lop12) / 3;
  const diemHocTHPTQuyDoi = ((parseFloat(tb10) || 0) + (parseFloat(tb11) || 0) + (parseFloat(tb12) || 0)) / 3 * 10;

  // Điểm học lực = ([Điểm năng lực] + [Điểm học THPTquy đổi]) / 2
  const diemHocLuc = (diemNangLuc * 0.7) + (diemTNTHPTQuyDoi * 0.2) + (diemHocTHPTQuyDoi * 0.1);

  // Điểm cộng
  let diemCongThanhTich = parseFloat(diemCong) || 0;
  console.log('1' + diemCongThanhTich);

  let diemCongFinal = diemCongThanhTich;
  if (diemHocLuc + diemCongThanhTich >= 100) {
    diemCongFinal = 100 - diemHocLuc;
  }

  // Giới hạn điểm cộng tối đa 10
  diemCongFinal = Math.min(diemCongFinal, 10);

  // Điểm ưu tiên
  let diemUuTienFinal;
  const temp = diemHocLuc + diemCong;
  if (temp < 75) {
    diemUuTienFinal = diemUuTien;
  } else {
    diemUuTienFinal = (100 - diemHocLuc - diemCong) / 25 * diemUuTien;
  }

  // Điểm xét tuyển
  const diemXetTuyen = diemHocLuc + diemCongFinal + diemUuTienFinal;

  return {
    diemNangLuc: Number(diemNangLuc.toFixed(2)),
    diemHocTHPTQuyDoi: Number(diemHocTHPTQuyDoi.toFixed(2)),
    diemHocLuc: Number(diemHocLuc.toFixed(2)),
    diemCong: Number(diemCongFinal.toFixed(2)),
    diemUuTien: Number(diemUuTienFinal.toFixed(2)),
    diemXetTuyen: Number(Math.min(diemXetTuyen, 100).toFixed(2)), // Giới hạn tối đa 100
  };
};
app.post('/api/calculateDoiTuong2', (req, res) => {
  let data = req.body;
  console.log(data)
  try {
    //code quy doi diem chung chi tieng anh thanh diem THNTHPT va TBTHPT//
    let diemTiengAnhQuyDoi = QuyDoiDiemChungChiTA(data);
    if (diemTiengAnhQuyDoi != null && diemTiengAnhQuyDoi != 0) {

      data.diemThiMon3 = diemTiengAnhQuyDoi;
      data.diemMon3Lop10 = diemTiengAnhQuyDoi;
      data.diemMon3Lop11 = diemTiengAnhQuyDoi;
      data.diemMon3Lop12 = diemTiengAnhQuyDoi;
    }
    //-------//

    const result = calculateScore(data);
    console.log(result)
    res.status(200).json({
      success: true,
      results: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Dữ liệu đầu vào không hợp lệ',
      error: error.message,
    });
  }
});

//------------------------------------------------------------------------------//
// ĐỐI TƯỢNG 3

function TinhDiemHocLucDT3(data) {
  const diemTBTHPT = TinhDiemTBTHPT(data);
  let diemTNTHPT = diemTBTHPT;
  const diemHocLuc = diemTBTHPT;

  if (data.diemChungChiQuocTeQuyDoi != null) {
    diemTNTHPT = data.diemChungChiQuocTeQuyDoi
  }

  return TinhDiemHocLuc(diemHocLuc, diemTNTHPT, diemTBTHPT);
}
app.post('/api/calculateDoiTuong3', async (req, res) => {
  try {
    const data = req.body;
    console.log(data)

    //code quy doi diem chung chi tieng anh thanh diem THNTHPT va TBTHPT//
    let diemTiengAnhQuyDoi = QuyDoiDiemChungChiTA(data);
    if (diemTiengAnhQuyDoi != null && diemTiengAnhQuyDoi != 0) {

      data.diemThiMon3 = diemTiengAnhQuyDoi;
      data.diemMon3Lop10 = diemTiengAnhQuyDoi;
      data.diemMon3Lop11 = diemTiengAnhQuyDoi;
      data.diemMon3Lop12 = diemTiengAnhQuyDoi;
    }
    //-------//

    const diemHocLuc = TinhDiemHocLucDT3(data);
    const diemCong = TinhDiemCong(diemHocLuc, parseFloat(data.diemCong));
    const diemUuTien = TinhDiemUuTien(diemHocLuc, diemCong, parseFloat(data.diemUuTien));
    const diemXetTuyen = TinhDiemXetTuyen(diemHocLuc, diemCong, diemUuTien);

    const result = {
      diemHocLuc: diemHocLuc.toFixed(2),
      diemCong: diemCong.toFixed(2),
      diemUuTien: diemUuTien.toFixed(2),
      diemXetTuyen: diemXetTuyen.toFixed(2),
    }
    res.status(200).json({
      success: true,
      results: result,
    });
  } catch (error) {
    console.error("Lỗi server:", error);
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
});

//------------------------------------------------------------------------------//
// ĐỐI TƯỢNG 4

function TinhDiemHocLucDT4(data) {
  const diemTNTHPT = TinhDiemTNTHPT(data);
  const diemTBTHPT = TinhDiemTBTHPT(data);
  return TinhDiemHocLuc(data.diemChungChiQuocTeQuyDoi, diemTNTHPT, diemTBTHPT);
}
app.post('/api/calculateDoiTuong4', (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    //code quy doi diem chung chi tieng anh thanh diem THNTHPT va TBTHPT//
    let diemTiengAnhQuyDoi = QuyDoiDiemChungChiTA(data);
    if (diemTiengAnhQuyDoi != null && diemTiengAnhQuyDoi != 0) {

      data.diemThiMon3 = diemTiengAnhQuyDoi;
      data.diemMon3Lop10 = diemTiengAnhQuyDoi;
      data.diemMon3Lop11 = diemTiengAnhQuyDoi;
      data.diemMon3Lop12 = diemTiengAnhQuyDoi;
    }
    //-------//

    const diemHocLuc = TinhDiemHocLucDT4(data);
    const diemCong = TinhDiemCong(diemHocLuc, parseFloat(data.diemCong));
    const diemUuTien = TinhDiemUuTien(diemHocLuc, diemCong, parseFloat(data.diemUuTien));
    const diemXetTuyen = TinhDiemXetTuyen(diemHocLuc, diemCong, diemUuTien);

    const result = {
      diemHocLuc: diemHocLuc.toFixed(2),
      diemCong: diemCong.toFixed(2),
      diemUuTien: diemUuTien.toFixed(2),
      diemXetTuyen: diemXetTuyen.toFixed(2)
    };

    res.status(200).json({
      success: true,
      results: result,
    });
  } catch (error) {
    console.error("Lỗi tính toán:", error);
    return res.status(500).json({
      message: "Lỗi tính toán",
      error: error.message,
    });
  }
});

//------------------------------------------------------------------------------//
// ĐỐI TƯỢNG 5

function TinhDiemHocLucDT5(data) {
  const diemNangLuc = TinhDiemNangLuc(data);
  let diemTNTHPT = TinhDiemTNTHPTDT5(data);
  const diemTBTHPT = TinhDiemTBTHPT(data);

  if (diemTNTHPT == null) diemTNTHPT = diemTBTHPT;

  console.log('diem nang luc' + diemNangLuc);
  console.log('diem TNTHPT' + diemTNTHPT);
  console.log('diem TBTHPT' + diemTBTHPT);

  return TinhDiemHocLuc(diemNangLuc, diemTNTHPT, diemTBTHPT);
}
function TinhDiemNangLuc(data) {
  let diemCCTAQuyDoi = QuyDoiCCTA(data.CCTA, data.diemCCTA);
  return data.diemPhongVan * 0.5 + data.diemBaiLuan * 0.3 + diemCCTAQuyDoi * 0.2;
}
function QuyDoiCCTA(CCTA, diemCCTA) {
  let diemQuyDoi = 0;
  if (CCTA == 'IELTS') {
    if (diemCCTA >= 6.5) diemQuyDoi = 80;
    if (diemCCTA >= 7.0) diemQuyDoi = 90;
    if (diemCCTA >= 7.5) diemQuyDoi = 100;

    return diemQuyDoi;
  }

  if (diemCCTA >= 93) diemQuyDoi = 80;
  if (diemCCTA >= 101) diemQuyDoi = 90;
  if (diemCCTA >= 110) diemQuyDoi = 100;

  return diemQuyDoi;
}
function TinhDiemTNTHPTDT5(data) {
  if (data.diemThiMon1 != null && data.diemThiMon2 != null && data.diemThiMon3 != null) {
    return (data.diemThiMon1 + data.diemThiMon2 + data.diemThiMon3) / 3 * 10;
  } else if (data.diemChungChiQuocTeQuyDoi != null) {
    return data.diemChungChiQuocTeQuyDoi;
  }
  return null;
}
app.post('/api/calculateDoiTuong5', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    //code quy doi diem chung chi tieng anh thanh diem THNTHPT va TBTHPT//
    let diemTiengAnhQuyDoi = QuyDoiDiemChungChiTA(data);
    if (diemTiengAnhQuyDoi != null && diemTiengAnhQuyDoi != 0) {

      data.diemThiMon3 = diemTiengAnhQuyDoi;
      data.diemMon3Lop10 = diemTiengAnhQuyDoi;
      data.diemMon3Lop11 = diemTiengAnhQuyDoi;
      data.diemMon3Lop12 = diemTiengAnhQuyDoi;
    }
    //-------//

    const diemHocLuc = TinhDiemHocLucDT5(data);
    const diemCong = TinhDiemCong(diemHocLuc, parseFloat(data.diemCong));
    const diemUuTien = TinhDiemUuTien(diemHocLuc, diemCong, parseFloat(data.diemUuTien));
    const diemXetTuyen = TinhDiemXetTuyen(diemHocLuc, diemCong, diemUuTien);

    console.log('Diem Hoc Luc' + diemHocLuc);
    console.log('Diem Cong' + diemCong);
    console.log('Diem Uu Tien' + diemUuTien);
    console.log('Diem Xet Tuyen' + diemXetTuyen);
    //kết quả trả về
    const result = {
      diemHocLuc: diemHocLuc.toFixed(2),
      diemCong: diemCong.toFixed(2),
      diemUuTien: diemUuTien.toFixed(2),
      diemXetTuyen: diemXetTuyen.toFixed(2)
    }
    res.status(200).json({
      success: true,
      results: result,
    });
  } catch (error) {
    console.error("Lỗi server:", error);
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
});

//------------------------------------------------------------------------------//
// ĐỐI TƯỢNG 6

const parse = (value) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};
app.post('/api/calculateDoiTuong6', async (req, res) => {
  try {
    const { selectedToHop, grades, examScores, diemCong, diemUT } = req.body;
    console.log(req.body)

    const subjects = selectedToHop;

    if (!subjects) {
      return res.status(400).json({ message: "Tổ hợp không hợp lệ" });
    }

    let totalHocBa = 0;

    subjects.forEach((subj) => {
      ["10", "11", "12"].forEach((year) => {
        let diem = parse(grades[year]?.[subj]);
        if (subj === "Anh") diem = 10;
        totalHocBa += diem;
      });
    });
    const hocTHPTQuyDoi = (totalHocBa / (3 * subjects.length)) * 10;

    let totalExam = 0;
    subjects.forEach((subj) => {
      let diem = parse(examScores[subj]);
      if (subj === "Tiếng Anh") diem = 10;
      totalExam += diem;
    });
    const TNTHPTQuyDoi = (totalExam / 3) * 10;

    const diemHocLuc = hocTHPTQuyDoi * 0.2 + TNTHPTQuyDoi * 0.8;

    console.log("Điểm học lực:", diemHocLuc);
    console.log("Tổ hợp:", selectedToHop);
    // Điểm cộng
    let diemCongThanhTich = parseFloat(diemCong) || 0;
    let diemCongFinal = diemCongThanhTich;
    if (diemHocLuc + diemCongThanhTich >= 100) {
      diemCongFinal = 100 - diemHocLuc;
    }
    // Giới hạn điểm cộng tối đa 10
    diemCongFinal = Math.min(diemCongFinal, 10);

    // Điểm ưu tiên
    let diemUuTienQuyDoi = parseFloat(diemUT) / 3 * 10 || 0;
    diemUuTienQuyDoi = Math.min(diemUuTienQuyDoi, 9.17); // Giới hạn tối đa 9.17
    let diemUuTien;
    if (diemHocLuc + diemCongFinal < 75) {
      diemUuTien = diemUuTienQuyDoi;
    } else {
      diemUuTien = ((100 - diemHocLuc - diemCongFinal) / 25) * diemUuTienQuyDoi;
      diemUuTien = Math.round(diemUuTien * 100) / 100; // Làm tròn đến 0.01
    }
    console.log("Điểm ưu tiên:", diemUuTien);
    console.log("Điểm cộng:", diemCongFinal);

    // Điểm xét tuyển
    const diemXetTuyen = diemHocLuc + diemCongFinal + diemUuTien;
    console.log("Điểm xét tuyển:", diemXetTuyen);

    // Giới hạn điểm xét tuyển tối đa 100
    const diemXetTuyenFinal = Math.min(diemXetTuyen, 100);
    // Truy vấn các ngành đủ điểm
    // const [rows] = await db.execute(
    //   "SELECT * FROM diem_chuan WHERE to_hop_mon LIKE ? AND diem_chuan <= ?",
    //   [`%${selectedToHop}%`, diemHocLuc]
    // );

    // const nganhTrungTuyen = rows.map(row => ({
    //   ...row,
    //   to_hop: row.to_hop_mon || "Không rõ",
    //   diem_chuan: +parseFloat(row.diem_chuan || 0).toFixed(1)
    // }));

    // console.log("Số ngành tìm được:", rows.length);

    const result = {
      // hocTHPTQuyDoi: +hocTHPTQuyDoi.toFixed(2),
      // TNTHPTQuyDoi: +TNTHPTQuyDoi.toFixed(2),
      diemHocLuc: +diemHocLuc.toFixed(2),
      // nganhTrungTuyen: nganhTrungTuyen,
      diemCong: +diemCongFinal.toFixed(2),
      diemUuTien: +diemUuTien.toFixed(2),
      diemXetTuyen: +diemXetTuyenFinal.toFixed(2)
    }

    res.status(200).json({
      success: true,
      results: result,
    });
  } catch (error) {
    console.error("Lỗi server:", error);
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
});

//------------------------------------------------------------------------------//

// Helper functions for DoiTuong7 enhanced priority calculation
function calculateDiemUuTienQuyDoiDT7(data) {
  const khuVucBonus = parseFloat(data.khuVucBonus) || 0;
  const doiTuongBonus = parseFloat(data.doiTuongBonus) || 0;
  const totalUuTien = Math.min(khuVucBonus + doiTuongBonus, 2.75); // Cap at maximum 3 points
  const result = (totalUuTien / 3) * 10;
  return Math.min(result, 9.17); // Cap at maximum 9.17 points
}

function calculateDiemCongDT7(diemHocLuc, diemCongThanhTich) {
  const congThanhTich = parseFloat(diemCongThanhTich) || 0;
  const totalPoints = diemHocLuc + congThanhTich;

  let diemCong = 0;

  if (totalPoints < 100) {
    // Điểm cộng = [Điểm cộng thành tích]
    diemCong = congThanhTich;
  } else {
    // Điểm cộng = 100 - [Điểm học lực]
    diemCong = 100 - diemHocLuc;
  }

  // Apply limits: minimum 0, maximum 10 for điểm cộng
  return Math.min(Math.max(diemCong, 0), 10);
}

function calculateDiemUuTienDT7(diemHocLuc, diemCong, data) {
  const totalHocLucCong = diemHocLuc + diemCong;
  const diemUuTienQuyDoi = calculateDiemUuTienQuyDoiDT7(data);

  if (totalHocLucCong < 75) {
    // Điểm ưu tiên = [Điểm ưu tiên quy đổi]
    return diemUuTienQuyDoi;
  } else {
    // Điểm ưu tiên = (100 - [Điểm học lực] - [Điểm cộng])/25 × [Điểm ưu tiên quy đổi]
    const factor = Math.max(0, (100 - totalHocLucCong) / 25);
    return factor * diemUuTienQuyDoi;
  }
}



// Get current subjects for the selected combination
const getCurrentSubjects = (selectedCombination) => {
  return subjectCombinations[selectedCombination] || ['Toán', 'Vật Lý', 'Hóa học']; // Default to A00
};

// Helper function for DoiTuong7 - Calculate academic score for international THPT graduates
async function TinhDiemHocLucDT7(data) {
  try {
    // Get the subjects for the selected combination
    const subjects = getCurrentSubjects(data.selectedCombination);
    console.log(`DoiTuong7 subjects for ${data.selectedCombination}:`, subjects);

    // [Điểm học THPTquy đổi] = [Trung bình cộng điểm TB lớp 10, 11, 12 các môn trong tổ hợp] × 10
    let totalGradePoints = 0;
    let totalSubjects = 0;

    // Calculate average for each grade level using named subjects
    ['10', '11', '12'].forEach(grade => {
      if (data.grades && data.grades[grade]) {
        let gradeSum = 0;
        let subjectCount = 0;

        subjects.forEach(subject => {
          let gradeValue = parseFloat(data.grades[grade][subject]);

          // Auto-10 for English subjects in DoiTuong7 (similar to DoiTuong6)
          if (subject === "Tiếng Anh" || subject === "Tiếng Nga" || subject === "Tiếng Pháp" ||
            subject === "Tiếng Trung" || subject === "Tiếng Đức" || subject === "Tiếng Nhật") {
            gradeValue = 10;
            console.log(`Auto-10 applied for ${subject} in grade ${grade}`);
          }

          if (!isNaN(gradeValue)) {
            // Cap grades at maximum 10
            gradeValue = Math.min(gradeValue, 10);
            gradeSum += gradeValue;
            subjectCount++;
          }
        });

        if (subjectCount > 0) {
          totalGradePoints += gradeSum / subjectCount;
          totalSubjects++;
        }
      }
    });

    const diemTBTHPT = totalSubjects > 0 ? totalGradePoints / totalSubjects : 0;

    const diemHocTHPTQuyDoi = diemTBTHPT * 10;

    // [Điểm TNTHPTquy đổi] - International certificate converted to ATAR scale
    let diemTNTHPTQuyDoi = 0;

    if (data.certificateType && data.certificateScore) {
      // Use international certificate conversion with database lookup
      const conversionResult = await gradeConversionService.convertGrade(data.certificateType, data.certificateScore);
      if (conversionResult.atar) {
        diemTNTHPTQuyDoi = conversionResult.atar;
        console.log(`International certificate conversion: ${data.certificateType} ${data.certificateScore} -> ATAR ${diemTNTHPTQuyDoi} (${conversionResult.method})`);
      }
    }
    // else if (data.examScores) {
    //   // Fallback: use Vietnamese THPT exam scores if no international certificate
    //   diemTNTHPTQuyDoi = (
    //     (parseFloat(data.examScores.mon1) || 0) +
    //     (parseFloat(data.examScores.mon2) || 0) +
    //     (parseFloat(data.examScores.mon3) || 0)
    //   ) / 3 * 10;
    //   console.log(`Using Vietnamese exam scores as fallback: ${diemTNTHPTQuyDoi}`);
    // }

    // DoiTuong7 formula: [Điểm học lực] = [Điểm học THPTquy đổi] × 80% + [Điểm TNTHPTquy đổi] × 20%
    const diemHocLuc = (diemHocTHPTQuyDoi * 0.8) + (diemTNTHPTQuyDoi * 0.2);

    console.log(`DoiTuong7 calculation:`);
    console.log(`- Điểm học THPT quy đổi: ${diemHocTHPTQuyDoi} (80%)`);
    console.log(`- Điểm TNTHPT quy đổi: ${diemTNTHPTQuyDoi} (20%)`);
    console.log(`- Điểm học lực final: ${diemHocLuc}`);

    return parseFloat(diemHocLuc.toFixed(2));
  } catch (error) {
    console.error('Error in TinhDiemHocLucDT7:', error);
    throw error;
  }
}

// ĐỐI TƯỢNG 7 - Thí sinh tốt nghiệp chương trình THPT nước ngoài
app.post('/api/calculateDoiTuong7', async (req, res) => {
  try {
    const data = req.body;
    console.log('DoiTuong7 input data:', data);

    // Validate input data
    if (!data.grades) {
      return res.status(400).json({
        success: false,
        message: "Thiếu dữ liệu điểm học bạ THPT",
        error: "Missing high school grade data"
      });
    }

    // Validate subject combination
    if (!data.selectedCombination) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin tổ hợp môn",
        error: "Missing subject combination"
      });
    }

    // For DoiTuong7, international certificate is required
    if (!data.certificateType || !data.certificateScore) {
      return res.status(400).json({
        success: false,
        message: "Cần có chứng chỉ quốc tế cho đối tượng 7",
        error: "Missing international certificate for DoiTuong7"
      });
    }

    // Validate diemCong range (0-10)
    if (data.diemCong !== undefined && data.diemCong !== null) {
      const diemCongValue = parseFloat(data.diemCong);
      if (!isNaN(diemCongValue) && (diemCongValue < 0 || diemCongValue > 10)) {
        return res.status(400).json({
          success: false,
          message: "Điểm cộng phải trong khoảng 0-10",
          error: "DiemCong must be between 0 and 10"
        });
      }
    }

    // Calculate academic score (now async due to database lookup)
    const diemHocLuc = await TinhDiemHocLucDT7(data);

    // Calculate additional scores using enhanced DoiTuong7 functions
    const diemCong = calculateDiemCongDT7(diemHocLuc, data.diemCong);
    const diemUuTien = calculateDiemUuTienDT7(diemHocLuc, diemCong, data);
    const diemXetTuyen = TinhDiemXetTuyen(diemHocLuc, diemCong, diemUuTien);

    // Debug logging for enhanced calculations
    console.log('DoiTuong7 enhanced calculations:');
    console.log(`- Selected combination: ${data.selectedCombination}`);
    console.log(`- Subjects: ${getCurrentSubjects(data.selectedCombination).join(', ')}`);
    console.log(`- Điểm ưu tiên quy đổi: ${calculateDiemUuTienQuyDoiDT7(data).toFixed(2)}`);
    console.log(`- Khu vực bonus: ${data.khuVucBonus || 0}`);
    console.log(`- Đối tượng bonus: ${data.doiTuongBonus || 0}`);
    console.log(`- Enhanced điểm cộng: ${diemCong.toFixed(2)}`);
    console.log(`- Enhanced điểm ưu tiên: ${diemUuTien.toFixed(2)}`);

    // Prepare result
    const result = {
      selectedCombination: data.selectedCombination,
      subjects: getCurrentSubjects(data.selectedCombination),
      diemHocLuc: parseFloat(diemHocLuc.toFixed(2)),
      diemCong: parseFloat(diemCong.toFixed(2)),
      diemUuTien: parseFloat(diemUuTien.toFixed(2)),
      diemXetTuyen: parseFloat(diemXetTuyen.toFixed(2))
    };

    console.log('DoiTuong7 calculation result:', result);

    res.status(200).json({
      success: true,
      results: result,
      formula: "DoiTuong7: [Điểm học THPTquy đổi] × 80% + [Điểm TNTHPTquy đổi] × 20%",
      note: "Dành cho thí sinh tốt nghiệp chương trình THPT nước ngoài"
    });
  } catch (error) {
    console.error("Lỗi server DoiTuong7:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server khi tính điểm DoiTuong7",
      error: error.message,
    });
  }
});

//------------------------------------------------------------------------------//
// INTERNATIONAL CERTIFICATE CONVERSION API
//------------------------------------------------------------------------------//

// Certificate type ranges based on database
const CERTIFICATE_RANGES = {
  'SAT': { min: 1120, max: 1600, step: 10 },
  'ACT': { min: 21, max: 36, step: 1 },
  'IB': { min: 26, max: 45, step: 1 },
  'A-LEVEL': { min: 8, max: 25, step: 0.5 },
  'FRENCH_BACC': { min: 11.4, max: 20, step: 0.1 },
  'BC': { min: 4.8, max: 7, step: 0.2 },
  'OSSD': { min: 74, max: 100, step: 1 }
};

// Grade conversion service with database integration
class GradeConversionService {
  constructor() {
    this.connection = db; // Use existing MySQL connection
  }

  async findExactMatch(certificateType, score) {
    let query = '';
    let params = [];

    console.log(`Searching for ${certificateType} with score ${score}`);

    switch (certificateType.toUpperCase()) {
      case 'SAT':
        query = `SELECT uts_atar FROM uts_international_equivalents 
                        WHERE ((sat_i_min <= ? AND sat_i_max >= ?) OR 
                               (sat_i_min IS NULL AND sat_i_max = ?) OR
                               (sat_i_min = ? AND sat_i_max IS NULL))
                        AND (sat_i_min IS NOT NULL OR sat_i_max IS NOT NULL)
                        ORDER BY uts_atar DESC LIMIT 1`;
        params = [score, score, score, score];
        break;
      case 'ACT':
        query = `SELECT uts_atar FROM uts_international_equivalents 
                        WHERE act = ? AND act IS NOT NULL
                        ORDER BY uts_atar DESC LIMIT 1`;
        params = [score];
        break;
      case 'IB':
        query = `SELECT uts_atar FROM uts_international_equivalents 
                        WHERE ((ib_min <= ? AND ib_max >= ?) OR 
                               (ib_min IS NULL AND ib_max = ?) OR
                               (ib_min = ? AND ib_max IS NULL) OR
                               ib_predicted = ?)
                        AND (ib_min IS NOT NULL OR ib_max IS NOT NULL OR ib_predicted IS NOT NULL)
                        ORDER BY uts_atar DESC LIMIT 1`;
        params = [score, score, score, score, score];
        break;
      case 'A-LEVEL':
        query = `SELECT uts_atar FROM uts_international_equivalents 
                        WHERE ((gce_a_leveL_min <= ? AND gce_a_leveL_max >= ?) OR 
                               (gce_a_leveL_min IS NULL AND gce_a_leveL_max = ?) OR
                               (gce_a_leveL_min = ? AND gce_a_leveL_max IS NULL))
                        AND (gce_a_leveL_min IS NOT NULL OR gce_a_leveL_max IS NOT NULL)
                        ORDER BY uts_atar DESC LIMIT 1`;
        params = [score, score, score, score];
        break;
      case 'FRENCH_BACC':
        query = `SELECT uts_atar FROM uts_international_equivalents 
                        WHERE ((french_baccalaureat_min <= ? AND french_baccalaureat_max >= ?) OR 
                               (french_baccalaureat_min IS NULL AND french_baccalaureat_max = ?) OR
                               (french_baccalaureat_min = ? AND french_baccalaureat_max IS NULL))
                        AND (french_baccalaureat_min IS NOT NULL OR french_baccalaureat_max IS NOT NULL)
                        ORDER BY uts_atar DESC LIMIT 1`;
        params = [score, score, score, score];
        break;
      case 'BC':
        query = `SELECT uts_atar FROM uts_international_equivalents 
                        WHERE bc = ? AND bc IS NOT NULL
                        ORDER BY uts_atar DESC LIMIT 1`;
        params = [score];
        break;
      case 'OSSD':
        query = `SELECT uts_atar FROM uts_international_equivalents 
                        WHERE ossd = ? AND ossd IS NOT NULL
                        ORDER BY uts_atar DESC LIMIT 1`;
        params = [score];
        break;
      default:
        return null;
    }

    try {
      console.log('Executing query:', query);
      console.log('With parameters:', params);

      return new Promise((resolve, reject) => {
        this.connection.query(query, params, (err, results) => {
          if (err) {
            console.error('Database query error:', err);
            console.error('Query was:', query);
            console.error('Parameters were:', params);
            resolve(null);
          } else {
            console.log('Query result:', results);
            resolve(results.length > 0 ? results[0].uts_atar : null);
          }
        });
      });
    } catch (error) {
      console.error('Database query error:', error);
      console.error('Query was:', query);
      console.error('Parameters were:', params);
      return null;
    }
  }

  // Algorithm-based conversion as fallback
  convertUsingAlgorithm(certificateType, score) {
    switch (certificateType.toUpperCase()) {
      case 'SAT':
        return GradeConverter.satToAtar(score);
      case 'ACT':
        return GradeConverter.actToAtar(score);
      case 'IB':
        return GradeConverter.ibToAtar(score);
      case 'A-LEVEL':
        return GradeConverter.aLevelToAtar(score);
      case 'FRENCH_BACC':
        // Simple linear mapping for French Baccalaureat (11.4-20 -> 30-99.95)
        return 30 + ((score - 11.4) / (20 - 11.4)) * (99.95 - 30);
      case 'BC':
        // Simple linear mapping for BC (4.8-7 -> 30-99.95)  
        return 30 + ((score - 4.8) / (7 - 4.8)) * (99.95 - 30);
      case 'OSSD':
        // Simple linear mapping for OSSD (74-100 -> 30-99.95)
        return 30 + ((score - 74) / (100 - 74)) * (99.95 - 30);
      default:
        return null;
    }
  }

  async convertGrade(certificateType, score) {
    console.log(`Converting ${certificateType} score ${score} to ATAR`);

    const numericScore = parseFloat(score);
    if (isNaN(numericScore)) {
      return { error: 'Score must be a valid number', atar: null };
    }

    // Validate certificate score range
    const range = CERTIFICATE_RANGES[certificateType.toUpperCase()];
    if (!range) {
      return { error: 'Unsupported certificate type', atar: null };
    }

    if (numericScore < range.min || numericScore > range.max) {
      return {
        error: `Score must be between ${range.min} and ${range.max} for ${certificateType}`,
        atar: null
      };
    }

    // First try to find exact match in database
    const exactMatch = await this.findExactMatch(certificateType, numericScore);

    if (exactMatch !== null) {
      console.log(`Found exact match in database: ${exactMatch}`);
      return {
        atar: parseFloat(parseFloat(exactMatch).toFixed(2)),
        method: 'database_exact',
        source: 'UTS International Equivalents Database'
      };
    }

    console.log('No exact match found in database, using algorithm');

    // If no exact match, use algorithm
    const algorithmResult = this.convertUsingAlgorithm(certificateType, numericScore);

    if (algorithmResult !== null) {
      console.log(`Algorithm result: ${algorithmResult}`);
      return {
        atar: parseFloat(algorithmResult.toFixed(2)),
        method: 'algorithm_estimation',
        source: 'Conversion Algorithm'
      };
    }

    console.log('Conversion failed');
    return {
      error: 'Unable to convert grade',
      atar: null,
      method: 'failed'
    };
  }
}

// Initialize the grade conversion service
const gradeConversionService = new GradeConversionService();

// Grade conversion algorithms (kept for fallback)
const GradeConverter = {
  // SAT to ATAR conversion algorithm
  satToAtar: (satScore) => {
    if (satScore >= 1590) return 99.95;
    if (satScore >= 1500) return 95 + (satScore - 1500) / 90 * 4.95;
    if (satScore >= 1400) return 85 + (satScore - 1400) / 100 * 10;
    if (satScore >= 1300) return 75 + (satScore - 1300) / 100 * 10;
    if (satScore >= 1200) return 65 + (satScore - 1200) / 100 * 10;
    if (satScore >= 1100) return 55 + (satScore - 1100) / 100 * 10;
    return Math.max(30, 55 * (satScore / 1100));
  },

  // ACT to ATAR conversion algorithm
  actToAtar: (actScore) => {
    if (actScore >= 36) return 99.95;
    if (actScore >= 30) return 90 + (actScore - 30) / 6 * 9.95;
    if (actScore >= 25) return 80 + (actScore - 25) / 5 * 10;
    if (actScore >= 20) return 65 + (actScore - 20) / 5 * 15;
    return Math.max(30, 65 * (actScore / 20));
  },

  // IB to ATAR conversion algorithm
  ibToAtar: (ibScore) => {
    if (ibScore >= 45) return 99.95;
    if (ibScore >= 40) return 95 + (ibScore - 40) / 5 * 4.95;
    if (ibScore >= 35) return 85 + (ibScore - 35) / 5 * 10;
    if (ibScore >= 30) return 75 + (ibScore - 30) / 5 * 10;
    if (ibScore >= 25) return 60 + (ibScore - 25) / 5 * 15;
    return Math.max(30, 60 * (ibScore / 25));
  },

  // A-Level to ATAR conversion algorithm
  aLevelToAtar: (aLevelScore) => {
    if (aLevelScore >= 25) return 99.95;
    if (aLevelScore >= 20) return 95 + (aLevelScore - 20) / 5 * 4.95;
    if (aLevelScore >= 15) return 85 + (aLevelScore - 15) / 5 * 10;
    if (aLevelScore >= 10) return 70 + (aLevelScore - 10) / 5 * 15;
    return Math.max(30, 70 * (aLevelScore / 10));
  },

  // Legacy convert grade method (now redirects to service)
  convertGrade: async (certificateType, score) => {
    return await gradeConversionService.convertGrade(certificateType, score);
  }
};

// Convert international certificate grade to Vietnamese scale
app.post('/api/convert-grade', async (req, res) => {
  try {
    const { certificateType, score } = req.body;

    if (!certificateType || score === undefined || score === null) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: certificateType and score'
      });
    }

    const result = await gradeConversionService.convertGrade(certificateType, score);

    if (result.error) {
      return res.status(400).json({
        success: false,
        error: result.error
      });
    }

    res.json({
      success: true,
      input: {
        certificateType,
        score: parseFloat(score)
      },
      result
    });

  } catch (error) {
    console.error('Grade conversion error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get certificate ranges endpoint
app.get('/api/certificate-ranges', (req, res) => {
  res.json({
    success: true,
    certificateRanges: CERTIFICATE_RANGES
  });
});

// Test grade conversion endpoint
app.get('/api/test-conversion/:type/:score', async (req, res) => {
  try {
    const { type, score } = req.params;
    const result = await gradeConversionService.convertGrade(type, score);

    res.json({
      success: !result.error,
      input: { certificateType: type, score: parseFloat(score) },
      result: result,
      message: result.error || `Successfully converted ${type} score ${score} to ATAR ${result.atar} using ${result.method}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Test conversion failed',
      details: error.message
    });
  }
});

// Test database connection endpoint
app.get('/api/test-db-conversion', async (req, res) => {
  try {
    // Test with some sample conversions
    const testCases = [
      { type: 'IB', score: 35 },
      { type: 'SAT', score: 1400 },
      { type: 'ACT', score: 30 }
    ];

    const results = [];
    for (const testCase of testCases) {
      const result = await gradeConversionService.convertGrade(testCase.type, testCase.score);
      results.push({
        input: testCase,
        output: result
      });
    }

    res.json({
      success: true,
      testResults: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database conversion test failed',
      details: error.message
    });
  }
});

//------------------------------------------------------------------------------//

// Helper function for DoiTuong8 - Calculate academic score for SAT I international students
async function TinhDiemHocLucDT8(data) {
  try {
    // Get the subjects for the selected combination
    const subjects = getCurrentSubjects(data.selectedCombination);
    console.log(`DoiTuong8 subjects for ${data.selectedCombination}:`, subjects);

    // [Điểm học THPTquy đổi] = [Trung bình cộng điểm TB lớp 10, 11, 12 các môn trong tổ hợp] × 10
    let totalGradePoints = 0;
    let totalSubjects = 0;

    // Calculate average for each grade level using named subjects
    ['10', '11', '12'].forEach(grade => {
      if (data.grades && data.grades[grade]) {
        let gradeSum = 0;
        let subjectCount = 0;

        subjects.forEach(subject => {
          let gradeValue = parseFloat(data.grades[grade][subject]);

          // Auto-10 for English subjects in DoiTuong8 (same as DoiTuong7)
          if (subject === "Tiếng Anh") {
            gradeValue = 10;
            console.log(`Auto-10 applied for ${subject} in grade ${grade}`);
          }

          if (!isNaN(gradeValue)) {
            // Cap grades at maximum 10
            gradeValue = Math.min(gradeValue, 10);
            gradeSum += gradeValue;
            subjectCount++;
          }
        });

        if (subjectCount > 0) {
          totalGradePoints += gradeSum / subjectCount;
          totalSubjects++;
        }
      }
    });

    const diemTBTHPT = totalSubjects > 0 ? totalGradePoints / totalSubjects : 0;
    const diemHocTHPTQuyDoi = diemTBTHPT * 10;

    // [Điểm Chứng chỉ tuyển sinh quốc tế] - SAT I converted to ATAR scale
    let diemChungChiQuocTe = 0;

    if (data.certificateType && data.certificateScore) {
      // Validate that it's SAT certificate for DoiTuong8
      if (data.certificateType.toUpperCase() !== 'SAT') {
        throw new Error('DoiTuong8 chỉ dành cho chứng chỉ SAT I');
      }

      // Validate SAT score minimum requirement (1120+) and maximum (1600)
      const satScore = parseFloat(data.certificateScore);
      if (satScore < 1120) {
        throw new Error('Điểm SAT I phải từ 1120 trở lên cho DoiTuong8');
      }
      if (satScore > 1600) {
        throw new Error('Điểm SAT I không được vượt quá 1600 cho DoiTuong8');
      }

      // Use international certificate conversion with database lookup
      const conversionResult = await gradeConversionService.convertGrade(data.certificateType, data.certificateScore);
      if (conversionResult.atar) {
        diemChungChiQuocTe = conversionResult.atar;
        console.log(`SAT I conversion: ${data.certificateType} ${data.certificateScore} -> ATAR ${diemChungChiQuocTe} (${conversionResult.method})`);
      }
    } else {
      throw new Error('DoiTuong8 yêu cầu chứng chỉ SAT I');
    }

    // DoiTuong8 formula: [Điểm học lực] = [Điểm Chứng chỉ tuyển sinh quốc tế] × 70% + [Điểm THPTquy đổi] × 30%
    const diemHocLuc = (diemChungChiQuocTe * 0.7) + (diemHocTHPTQuyDoi * 0.3);

    console.log(`DoiTuong8 calculation:`);
    console.log(`- Điểm chứng chỉ quốc tế (SAT I): ${diemChungChiQuocTe} (70%)`);
    console.log(`- Điểm học THPT quy đổi: ${diemHocTHPTQuyDoi} (30%)`);
    console.log(`- Điểm học lực final: ${diemHocLuc}`);

    return parseFloat(diemHocLuc.toFixed(2));
  } catch (error) {
    console.error('Error in TinhDiemHocLucDT8:', error);
    throw error;
  }
}

// ĐỐI TƯỢNG 8 - Thí sinh dùng Chứng chỉ Tuyển sinh Quốc tế SAT I
app.post('/api/calculateDoiTuong8', async (req, res) => {
  try {
    const data = req.body;
    console.log('DoiTuong8 input data:', data);

    // Validate input data
    if (!data.grades) {
      return res.status(400).json({
        success: false,
        message: "Thiếu dữ liệu điểm học bạ THPT",
        error: "Missing high school grade data"
      });
    }

    // Validate subject combination
    if (!data.selectedCombination) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin tổ hợp môn",
        error: "Missing subject combination"
      });
    }

    // For DoiTuong8, SAT I certificate is required
    if (!data.certificateType || !data.certificateScore) {
      return res.status(400).json({
        success: false,
        message: "Cần có chứng chỉ SAT I cho đối tượng 8",
        error: "Missing SAT I certificate for DoiTuong8"
      });
    }

    // Validate SAT certificate type
    if (data.certificateType.toUpperCase() !== 'SAT') {
      return res.status(400).json({
        success: false,
        message: "Đối tượng 8 chỉ dành cho chứng chỉ SAT I",
        error: "DoiTuong8 is only for SAT I certificates"
      });
    }

    // Validate SAT score minimum (1120+) and maximum (1600)
    const satScore = parseFloat(data.certificateScore);
    if (satScore < 1120) {
      return res.status(400).json({
        success: false,
        message: "Điểm SAT I phải từ 1120 trở lên",
        error: "SAT I score must be 1120 or higher"
      });
    }
    if (satScore > 1600) {
      return res.status(400).json({
        success: false,
        message: "Điểm SAT I không được vượt quá 1600",
        error: "SAT I score cannot exceed 1600"
      });
    }

    // Validate diemCong range (0-10)
    if (data.diemCong !== undefined && data.diemCong !== null) {
      const diemCongValue = parseFloat(data.diemCong);
      if (!isNaN(diemCongValue) && (diemCongValue < 0 || diemCongValue > 10)) {
        return res.status(400).json({
          success: false,
          message: "Điểm cộng phải trong khoảng 0-10",
          error: "DiemCong must be between 0 and 10"
        });
      }
    }

    // Calculate academic score (async due to database lookup)
    const diemHocLuc = await TinhDiemHocLucDT8(data);

    // Calculate additional scores using enhanced DoiTuong7 functions (same logic)
    const diemCong = calculateDiemCongDT7(diemHocLuc, data.diemCong);
    const diemUuTien = calculateDiemUuTienDT7(diemHocLuc, diemCong, data);
    const diemXetTuyen = TinhDiemXetTuyen(diemHocLuc, diemCong, diemUuTien);

    // Debug logging for enhanced calculations
    console.log('DoiTuong8 enhanced calculations:');
    console.log(`- Selected combination: ${data.selectedCombination}`);
    console.log(`- Subjects: ${getCurrentSubjects(data.selectedCombination).join(', ')}`);
    console.log(`- SAT I Score: ${data.certificateScore} (minimum 1120)`);
    console.log(`- Điểm ưu tiên quy đổi: ${calculateDiemUuTienQuyDoiDT7(data).toFixed(2)}`);
    console.log(`- Khu vực bonus: ${data.khuVucBonus || 0}`);
    console.log(`- Đối tượng bonus: ${data.doiTuongBonus || 0}`);
    console.log(`- Enhanced điểm cộng: ${diemCong.toFixed(2)}`);
    console.log(`- Enhanced điểm ưu tiên: ${diemUuTien.toFixed(2)}`);

    // Prepare result
    const result = {
      selectedCombination: data.selectedCombination,
      subjects: getCurrentSubjects(data.selectedCombination),
      certificateType: 'SAT I',
      certificateScore: satScore,
      diemHocLuc: parseFloat(diemHocLuc.toFixed(2)),
      diemCong: parseFloat(diemCong.toFixed(2)),
      diemUuTien: parseFloat(diemUuTien.toFixed(2)),
      diemXetTuyen: parseFloat(diemXetTuyen.toFixed(2))
    };

    console.log('DoiTuong8 calculation result:', result);

    res.status(200).json({
      success: true,
      results: result,
      formula: "DoiTuong8: [Điểm Chứng chỉ tuyển sinh quốc tế] × 70% + [Điểm THPTquy đổi] × 30%",
      note: "Dành cho thí sinh dùng Chứng chỉ Tuyển sinh Quốc tế SAT I (từ 1120 điểm trở lên)",
      requirements: [
        "Thí sinh tốt nghiệp THPT",
        "Có điểm thi SAT I từ 1120 điểm trở lên (còn hiệu lực)",
        "Được Khoa chuyên môn của trường UTS đồng ý xét duyệt"
      ]
    });
  } catch (error) {
    console.error("Lỗi server DoiTuong8:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server khi tính điểm DoiTuong8",
      error: error.message,
    });
  }
});

//------------------------------------------------------------------------------//
// SERVER

const server = app.listen({ port }, function () {
  const { address, port } = server.address();
  console.log("App listening at http://%s:%s", address, port);
});

//------------------------------------------------------------------------------//



