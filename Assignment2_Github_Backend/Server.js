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
const mysqlPassword = '02072003'
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
// --- Hàm / API tính toán thông dụng ---
const toHopMonData = require('./ToHopMon.json');
const doiTuongUuTienData = require('./DoiTuongUuTien.json');
console.log(toHopMonData);

function TinhDiemCong(data) {
    const temp = data.diemHocLuc + data.diemCongThanhTich;
    if (temp < 100) {
        return data.diemCongThanhTich;
    } else {
        return 100 - data.diemHocLuc;
    }
}
function TinhDiemUuTien(data, diemUuTien) {
    const temp = data.diemHocLuc + data.diemCong;
    if (temp < 75) {
        return diemUuTien;
    } else {
        return (100 - data.diemHocLuc - data.diemCong) / 25 * diemUuTien;
    }
}
function XetDiemUuTien(data) {

    // CODE --

    return 0.5;
}
function CheckCCTA(data) {
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
    if (!data.danhSachMon.includes("Anh") || !data.includes("chungChiTA")) return null;

    let diemQuyDoi = CheckCCTA(data)

    return diemQuyDoi;
}
function QuyDoiDiemChungChiQuocTe() {

    //CODE --

    return 10;
}
function QuyDoiDiemChungChiQuocTe_UTS() {

    //CODE --

    return 10;
}

//------------------------------------------------------------------------------//
//API get Đối tượng ưu tiên
app.get('/api/getDoiTuongUuTien', (req, res) => {
    try {
        // Extract all đối tượng from both UT1 and UT2 categories
        const doiTuongList = [];

        // Add objects from UT1 (priority level 1 - 2.0 points)
        if (doiTuongUuTienData.UT1 && doiTuongUuTienData.UT1.doi_tuong) {
            doiTuongUuTienData.UT1.doi_tuong.forEach(item => {
                doiTuongList.push({
                    id: item.id,
                    ten: item.ten,
                    mo_ta: item.mo_ta,
                    diem_cong: doiTuongUuTienData.UT1.diem_cong,
                    loai_uu_tien: 'UT1'
                });
            });
        }

        // Add objects from UT2 (priority level 2 - 1.0 points)
        if (doiTuongUuTienData.UT2 && doiTuongUuTienData.UT2.doi_tuong) {
            doiTuongUuTienData.UT2.doi_tuong.forEach(item => {
                doiTuongList.push({
                    id: item.id,
                    ten: item.ten,
                    mo_ta: item.mo_ta,
                    diem_cong: doiTuongUuTienData.UT2.diem_cong,
                    loai_uu_tien: 'UT2'
                });
            });
        }

        res.json(doiTuongList);
    } catch (err) {
        console.error('Error fetching Doi Tuong Uu Tien:', err);
        res.status(500).json({ success: false, message: 'Error fetching data' });
    }
});
//------------------------------------------------------------------------------//
//API Get Khu vực ưu tiên
app.get('/api/getKhuVucUuTien', (req, res) => {
    const sql = "SELECT * FROM KhuVucUuTien";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching Khu Vuc Uu Tien:', err);
            return res.status(500).json({ success: false, message: 'Error fetching data' });
        }
        res.json({ success: true, result: results });
    });
});

//------------------------------------------------------------------------------//
// API QUY ĐỔI ĐIỂM CHỨNG CHỈ TIẾNG ANH
app.post('/api/quyDoiDiemChungChiQuocTe', async (req, res) => {
    const data = req.body;
    console.log(data)
    try {

        //CODE --

        return res.json({
            success: true,
            results: 999.9999
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

app.post('/api/quyDoiDiemChungChiQuocTe_UTS', async (req, res) => {
    const data = req.body;
    console.log(data)
    try {

        //CODE --

        return res.json({
            success: true,
            results: 999.9999
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
//  ĐÓI TƯỢNG 1

app.post("/api/tinhDiemDoiTuong_1", (req, res) => {

    let data = req.body;
    console.log('\n\tDATA truyền đến từ frontend/ResultScreen/TinhDiemDoiTuong()');
    console.log(data);
    try {
        let diemNangLuc = 999.9999;
        let diemTNTHPT = 999.9999;
        let diemTBTHPT = 999.9999;
        let diemHocLuc = 999.9999;
        let diemCong = 999.9999;
        let diemUuTien = 999.9999;
        let diemXetTuyen = 999.9999;


        // CODE TÍNH TOÁN


        res.status(200).json({
            success: true,
            results: {
                //KẾT QUẢ TRẢ VỀ
                diemNangLuc: diemNangLuc.toFixed(3),
                diemTNTHPT: diemTNTHPT.toFixed(3),
                diemTBTHPT: diemTBTHPT.toFixed(3),
                diemHocLuc: diemHocLuc.toFixed(3),
                diemCong: diemCong.toFixed(3),
                diemUuTien: diemUuTien.toFixed(3),
                diemXetTuyen: diemXetTuyen.toFixed(3),
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
//  ĐÓI TƯỢNG 2

app.post("/api/tinhDiemDoiTuong_2", (req, res) => {

    let data = req.body;
    console.log('\n\tDATA truyền đến từ frontend/ResultScreen/TinhDiemDoiTuong()');
    console.log(data);
    try {
        let diemNangLuc = 999.9999;
        let diemTNTHPT = 999.9999;
        let diemTBTHPT = 999.9999;
        let diemHocLuc = 999.9999;
        let diemCong = 999.9999;
        let diemUuTien = 999.9999;
        let diemXetTuyen = 999.9999;


        // CODE TÍNH TOÁN


        res.status(200).json({
            success: true,
            results: {
                //KẾT QUẢ TRẢ VỀ
                diemNangLuc: diemNangLuc.toFixed(3),
                diemTNTHPT: diemTNTHPT.toFixed(3),
                diemTBTHPT: diemTBTHPT.toFixed(3),
                diemHocLuc: diemHocLuc.toFixed(3),
                diemCong: diemCong.toFixed(3),
                diemUuTien: diemUuTien.toFixed(3),
                diemXetTuyen: diemXetTuyen.toFixed(3),
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
//  ĐÓI TƯỢNG 3

app.post("/api/tinhDiemDoiTuong_3", (req, res) => {

    let data = req.body;
    console.log('\n\tDATA truyền đến từ frontend/ResultScreen/TinhDiemDoiTuong()');
    console.log(data);
    try {
        let diemNangLuc = 999.9999;
        let diemTNTHPT = 999.9999;
        let diemTBTHPT = 999.9999;
        let diemHocLuc = 999.9999;
        let diemCong = 999.9999;
        let diemUuTien = 999.9999;
        let diemXetTuyen = 999.9999;


        // CODE TÍNH TOÁN


        res.status(200).json({
            success: true,
            results: {
                //KẾT QUẢ TRẢ VỀ
                diemNangLuc: diemNangLuc.toFixed(3),
                diemTNTHPT: diemTNTHPT.toFixed(3),
                diemTBTHPT: diemTBTHPT.toFixed(3),
                diemHocLuc: diemHocLuc.toFixed(3),
                diemCong: diemCong.toFixed(3),
                diemUuTien: diemUuTien.toFixed(3),
                diemXetTuyen: diemXetTuyen.toFixed(3),
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
//  ĐÓI TƯỢNG 4

app.post("/api/tinhDiemDoiTuong_4", (req, res) => {

    let data = req.body;
    console.log('\n\tDATA truyền đến từ frontend/ResultScreen/TinhDiemDoiTuong()');
    console.log(data);
    try {
        let diemNangLuc = 999.9999;
        let diemTNTHPT = 999.9999;
        let diemTBTHPT = 999.9999;
        let diemHocLuc = 999.9999;
        let diemCong = 999.9999;
        let diemUuTien = 999.9999;
        let diemXetTuyen = 999.9999;


        // CODE TÍNH TOÁN


        res.status(200).json({
            success: true,
            results: {
                //KẾT QUẢ TRẢ VỀ
                diemNangLuc: diemNangLuc.toFixed(3),
                diemTNTHPT: diemTNTHPT.toFixed(3),
                diemTBTHPT: diemTBTHPT.toFixed(3),
                diemHocLuc: diemHocLuc.toFixed(3),
                diemCong: diemCong.toFixed(3),
                diemUuTien: diemUuTien.toFixed(3),
                diemXetTuyen: diemXetTuyen.toFixed(3),
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
//  ĐÓI TƯỢNG 5

app.post("/api/tinhDiemDoiTuong_5", (req, res) => {

    let data = req.body;
    console.log('\n\tDATA truyền đến từ frontend');
    console.log(data);

    try {
        const {
            diemPhongVan, // Array of interview scores
            diemBaiLuan, // Essay score
            chungChiTA, // 'IELTS' or 'TOEFL'
            diemChungChiTA, // English certificate score
            loaiChuongTrinhTHPT, // 'vietnam', 'nuocngoai_co_cc', or 'nuocngoai_khong_cc'
            diemTohopTHPT, // Sum of 3 scores for 'vietnam' program
            diemChungChiQuocTe, // Score for 'nuocngoai_co_cc' program
            diemTB3Nam // Average of 3 years of high school scores
        } = data;

        // --- Validate input ---
        if (!diemPhongVan || !diemBaiLuan || !chungChiTA || !diemChungChiTA || !loaiChuongTrinhTHPT || !diemTB3Nam) {
            return res.status(400).json({ success: false, message: "Dữ liệu đầu vào không đủ." });
        }

        // --- 1. Tính [Điểm năng lực] ---

        // a. Điểm phỏng vấn (trung bình cộng)
        const diemPhongVanTB = diemPhongVan.reduce((a, b) => a + b, 0) / diemPhongVan.length;


        // b. Điểm CCTA quy đổi
        let diemCCTAquyDoi = 0;
        const diemTA = parseFloat(diemChungChiTA);
        if (chungChiTA === 'IELTS') {
            if (diemTA >= 7.5) diemCCTAquyDoi = 100;
            else if (diemTA >= 7.0) diemCCTAquyDoi = 90;
            else if (diemTA >= 6.5) diemCCTAquyDoi = 80;
            else diemCCTAquyDoi = 0; // Includes IELTS 6.0
        } else if (chungChiTA === 'TOEFL') {
            if (diemTA >= 110) diemCCTAquyDoi = 100;
            else if (diemTA >= 101) diemCCTAquyDoi = 90;
            else if (diemTA >= 93) diemCCTAquyDoi = 80;
            else if (diemTA >= 79) diemCCTAquyDoi = 0;
        }

        // c. Tính điểm năng lực
        const diemNangLuc = (diemPhongVanTB * 0.5) + (parseFloat(diemBaiLuan) * 0.3) + (diemCCTAquyDoi * 0.2);

        // --- 2. Tính [Điểm học THPT quy đổi] ---
        const diemHocTHPTQuyDoi = parseFloat(diemTB3Nam) * 10;


        // --- 3. Tính [Điểm TNTHPT quy đổi] ---
        let diemTNTHPTQuyDoi = 0;
        switch (loaiChuongTrinhTHPT) {
            case 'vietnam':
                if (!diemTohopTHPT) return res.status(400).json({ success: false, message: "Thiếu điểm tổ hợp THPT." });
                diemTNTHPTQuyDoi = (parseFloat(diemTohopTHPT) / 3) * 10;
                break;
            case 'nuocngoai_co_cc':
                if (!diemChungChiQuocTe) return res.status(400).json({ success: false, message: "Thiếu điểm chứng chỉ quốc tế." });
                // Giả sử điểm chứng chỉ quốc tế đã được quy đổi về thang 100
                diemTNTHPTQuyDoi = parseFloat(diemChungChiQuocTe);
                break;
            case 'nuocngoai_khong_cc':
                diemTNTHPTQuyDoi = diemHocTHPTQuyDoi;
                break;
            default:
                return res.status(400).json({ success: false, message: "Loại chương trình THPT không hợp lệ." });
        }

        // --- 4. Tính Điểm học lực (kết quả cuối cùng) ---
        const diemHocLuc = (diemNangLuc * 0.7) + (diemTNTHPTQuyDoi * 0.2) + (diemHocTHPTQuyDoi * 0.1);

        res.status(200).json({
            success: true,
            results: {
                diemHocLuc: diemHocLuc.toFixed(2),
                diemNangLuc: diemNangLuc.toFixed(2),
                diemTNTHPTQuyDoi: diemTNTHPTQuyDoi.toFixed(2),
                diemHocTHPTQuyDoi: diemHocTHPTQuyDoi.toFixed(2),
            }
        });

    } catch (error) {
        console.error("Error in calculation for DoiTuong_5:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi hệ thống trong quá trình tính toán."
        });
    }
});

//------------------------------------------------------------------------------//
//  ĐÓI TƯỢNG 6

app.post('/api/tinhDiemDoiTuong_6', (req, res) => {
    try {
        const data = req.body;

        // Ví dụ data có:
        // data.diemThiTN, data.diemHocBa, data.DATA_DiemHocLuc, data.diemCong, data.diemUuTien, data.diemTotNghiep,...

        if (!data.diemThiTN || !data.diemHocBa || !data.DATA_DiemHocLuc) {
            return res.status(400).json({ message: "Thiếu dữ liệu bắt buộc" });
        }

        const { DATA_DiemHocLuc, diemCong = 0, diemUuTien = 0, diemTotNghiep = [] } = data;
        const diemThiTN = data.diemThiTN;
        const diemHocBa = data.diemHocBa;

        // Lấy môn bắt buộc và tự chọn từ DATA_DiemHocLuc
        const monBatBuoc = DATA_DiemHocLuc.batBuoc || [];
        const monTuChon = DATA_DiemHocLuc.tuChon || [];

        // Kiểm tra đủ môn
        if (monBatBuoc.length < 2) {
            return res.status(400).json({ message: "Cần ít nhất 2 môn bắt buộc" });
        }
        if (monTuChon.length < 1) {
            return res.status(400).json({ message: "Cần ít nhất 1 môn tự chọn" });
        }

        // Tính điểm TN THPT
        const diemTN_thi_arr = monTuChon.map(mon => {
            const combo = [...monBatBuoc, mon];
            const tb = combo.reduce((sum, m) => sum + parseFloat(m.diem || 0), 0) / combo.length;
            return tb;
        });

        const diemTN_max = diemTN_thi_arr.length > 0 ? Math.max(...diemTN_thi_arr) : 0;

        // Tính điểm học bạ
        const toHopHocBa = diemHocBa.toHop || [];
        const monDaNhap = toHopHocBa.filter(m => !isNaN(parseFloat(m.diem)));

        if (monDaNhap.length < 3) {
            return res.status(400).json({ message: "Cần ít nhất 3 môn (2 bắt buộc + 1 tự chọn)" });
        }

        let diemTHPT_thi = [];
        for (let i = 0; i < monDaNhap.length; i++) {
            for (let j = i + 1; j < monDaNhap.length; j++) {
                for (let k = j + 1; k < monDaNhap.length; k++) {
                    const combo = [monDaNhap[i], monDaNhap[j], monDaNhap[k]];
                    const batBuocCount = combo.filter(m => m.batBuoc).length;
                    const tuChonCount = combo.filter(m => !m.batBuoc).length;

                    if (batBuocCount >= 2 && tuChonCount >= 1) {
                        const tb = combo.reduce((sum, m) => sum + parseFloat(m.diem), 0) / combo.length;
                        diemTHPT_thi.push(tb);
                    }
                }
            }
        }

        const diemTHPT_max = diemTHPT_thi.length > 0 ? Math.max(...diemTHPT_thi) : 0;

        // Tính điểm TN (điểm tốt nghiệp)
        let diemTN = 0;
        const monTN_DaNhap = diemTotNghiep.filter(m => m.diem !== null && m.diem !== "" && !isNaN(parseFloat(m.diem)));

        if (monTN_DaNhap.length > 0) {
            diemTN = monTN_DaNhap.reduce((sum, m) => sum + parseFloat(m.diem), 0) / monTN_DaNhap.length;
        }

        res.json({
            success: true,
            diemTNTHPT: diemTN_max.toFixed(3),
            diemTHPT: diemTHPT_max.toFixed(3),
            diemXetTuyen: (diemTHPT_max + diemTN_max).toFixed(3),
            diemCong: diemCong.toFixed(3),
            diemUuTien: diemUuTien.toFixed(3),
            diemThiTN: diemTN.toFixed(3),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi xử lý", error: err.message });
    }
});


//------------------------------------------------------------------------------//
//  ĐÓI TƯỢNG 7

app.post("/api/tinhDiemDoiTuong_7", (req, res) => {

    let data = req.body;
    console.log('\n\tDATA truyền đến từ frontend/ResultScreen/TinhDiemDoiTuong()');
    console.log(data);
    try {
        let diemNangLuc = 999.9999;
        let diemTNTHPT = 999.9999;
        let diemTBTHPT = 999.9999;
        let diemHocLuc = 999.9999;
        let diemCong = 999.9999;
        let diemUuTien = 999.9999;
        let diemXetTuyen = 999.9999;


        // CODE TÍNH TOÁN


        res.status(200).json({
            success: true,
            results: {
                //KẾT QUẢ TRẢ VỀ
                diemNangLuc: diemNangLuc.toFixed(3),
                diemTNTHPT: diemTNTHPT.toFixed(3),
                diemTBTHPT: diemTBTHPT.toFixed(3),
                diemHocLuc: diemHocLuc.toFixed(3),
                diemCong: diemCong.toFixed(3),
                diemUuTien: diemUuTien.toFixed(3),
                diemXetTuyen: diemXetTuyen.toFixed(3),
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
//  ĐÓI TƯỢNG 8

app.post("/api/tinhDiemDoiTuong_8", (req, res) => {

    let data = req.body;
    console.log('\n\tDATA truyền đến từ frontend/ResultScreen/TinhDiemDoiTuong()');
    console.log(data);
    try {
        let diemNangLuc = 999.9999;
        let diemTNTHPT = 999.9999;
        let diemTBTHPT = 999.9999;
        let diemHocLuc = 999.9999;
        let diemCong = 999.9999;
        let diemUuTien = 999.9999;
        let diemXetTuyen = 999.9999;


        // CODE TÍNH TOÁN


        res.status(200).json({
            success: true,
            results: {
                //KẾT QUẢ TRẢ VỀ
                diemNangLuc: diemNangLuc.toFixed(3),
                diemTNTHPT: diemTNTHPT.toFixed(3),
                diemTBTHPT: diemTBTHPT.toFixed(3),
                diemHocLuc: diemHocLuc.toFixed(3),
                diemCong: diemCong.toFixed(3),
                diemUuTien: diemUuTien.toFixed(3),
                diemXetTuyen: diemXetTuyen.toFixed(3),
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
// SERVER

const server = app.listen({ port }, function () {
    const { address, port } = server.address();
    console.log("App listening at http://%s:%s", address, port);
});

//------------------------------------------------------------------------------//
