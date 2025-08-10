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
// console.log('-------',toHopMonData);

function tinhDiemCong(diemHocLuc, diemCongThanhTich) {
    if ((diemHocLuc + diemCongThanhTich) < 100) {
        return diemCongThanhTich;
    } else {
        return 100 - diemHocLuc;
    }
}

function tinhDiemUuTien(diemHocLuc, diemCong, diemUuTien_KhuVuc, diemUuTien_DoiTuong) {
    // Quy đổi điểm ưu tiên
    const diemUuTienQuyDoi = ((diemUuTien_KhuVuc || 0) + (diemUuTien_DoiTuong || 0)) / 3 * 10;

    if ((diemHocLuc + diemCong) < 75) {
        return diemUuTienQuyDoi;
    } else {
        return ((100 - diemHocLuc - diemCong) / 25) * diemUuTienQuyDoi;
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
    // console.log(data)
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
        let diemTHPT = 999.9999;
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
                diemTHPT: diemTHPT.toFixed(3),
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
        let diemTHPT = 999.9999;
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
                diemTHPT: diemTHPT.toFixed(3),
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
        let diemTHPT = 999.9999;
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
                diemTHPT: diemTHPT.toFixed(3),
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
        let diemTHPT = 999.9999;
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
                diemTHPT: diemTHPT.toFixed(3),
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
        let data = req.body;
        console.log('\n\tDATA truyền đến từ frontend/ResultScreen/TinhDiemDoiTuong()--------');
        console.log(data);

        const monChinh = data.nganhInfo.monChinh || [];
        const monTuChon = data.nganhInfo.monTuChon || [];

        // ===== TÍNH ĐIỂM TNTHPT =====
        let diemThiMonChinh1 = parseFloat(data[`diemThi_${monChinh[0]}`]) || 0;
        let diemThiMonChinh2 = parseFloat(data[`diemThi_${monChinh[1]}`]) || 0;


        // Chọn môn tự chọn có điểm thi cao nhất (chỉ lấy môn có nhập điểm)
        let diemThiMonTuChon = 0;
        const avNames = ["anh", "av", "english", "anh văn", "tiếng anh"];
        monTuChon.forEach(monTC => {
            let diemTC;
            if (avNames.includes(monTC.toLowerCase())) {
                diemTC = 10; // Quy đổi Anh văn thành 10
            } else {
                if (data[`diemThi_${monTC}_TC`] === null || data[`diemThi_${monTC}_TC`] === undefined) {
                    return; // bỏ qua nếu không nhập
                }
                diemTC = parseFloat(data[`diemThi_${monTC}_TC`]) || 0;
            }
            if (diemTC > diemThiMonTuChon) diemThiMonTuChon = diemTC;
        });

        // ===== TÍNH ĐIỂM TNTHPT =====
        let diemTNTHPT = ((diemThiMonChinh1 + diemThiMonChinh2 + diemThiMonTuChon) / 3) * 10;

        // Tính trung bình 3 năm cho môn
        const avg3Years = (mon) => {
            let tong = 0;
            let count = 0;
            for (let nam = 10; nam <= 12; nam++) {
                let diem = parseFloat(data[`diemTB_${mon}_${nam}`]);
                if (data[`diemTB_${mon}_${nam}`] != null && !isNaN(diem)) {
                    tong += diem;
                    count++;
                }
            }
            return count > 0 ? (tong / count) : 0;
        };

        let avgMonChinh1 = avg3Years(monChinh[0]);
        let avgMonChinh2 = avg3Years(monChinh[1]);

        // Lấy điểm lớp 12 từng môn để kiểm tra
        const diemLop12MonChinh1 = parseFloat(data[`diemTB_${monChinh[0]}_12`]) || 0;
        const diemLop12MonChinh2 = parseFloat(data[`diemTB_${monChinh[1]}_12`]) || 0;

        // Tương tự môn tự chọn lấy điểm lớp 12 cao nhất
        let diemLop12MonTuChon = 0;
        monTuChon.forEach(monTC => {
            let diem = parseFloat(data[`diemTB_${monTC}_12`]) || 0;
            if (diem > diemLop12MonTuChon) diemLop12MonTuChon = diem;
        });

        let diemTBLop12TrungBinh = (diemLop12MonChinh1 + diemLop12MonChinh2 + diemLop12MonTuChon) / 3;

        // Kiểm tra điều kiện điểm TB lớp 12 >= 8.0
        if (diemTBLop12TrungBinh < 8.0) {
            return res.status(400).json({
                success: false,
                message: "Điểm trung bình lớp 12 của bạn không đủ điều kiện xét tuyển."
            });
        }

        let diemTHPT = 0;
        monTuChon.forEach(monTC => {
            let avgTC;
            if (avNames.includes(monTC.toLowerCase())) {
                avgTC = 10; // Quy đổi Anh văn thành 10
            } else {
                if (data[`diemTB_${monTC}_10`] === null || data[`diemTB_${monTC}_10`] === undefined) {
                    return; // bỏ qua nếu không nhập
                }
                avgTC = avg3Years(monTC);
            }

            let tong3Mon = avgMonChinh1 + avgMonChinh2 + avgTC;
            let diemTBToHop = tong3Mon / 3 * 10;

            if (diemTBToHop > diemTHPT) {
                diemTHPT = diemTBToHop;
            }
        });
        // ===== HÀM TÍNH ĐIỂM CỘNG =====
        function tinhDiemCong(diemHocLuc, diemCongThanhTich) {
            if ((diemHocLuc + diemCongThanhTich) < 100) {
                return diemCongThanhTich;
            } else {
                return 100 - diemHocLuc;
            }
        }

        // ===== HÀM TÍNH ĐIỂM ƯU TIÊN =====
        function tinhDiemUuTien(diemHocLuc, diemCong, diemUuTien_KV, diemUuTien_DT) {
            const diemUuTienQuyDoi = ((diemUuTien_KV || 0) + (diemUuTien_DT || 0)) / 3 * 10;
            if ((diemHocLuc + diemCong) < 75) {
                return diemUuTienQuyDoi;
            } else {
                return ((100 - diemHocLuc - diemCong) / 25) * diemUuTienQuyDoi;
            }
        }
        let diemHocLuc = diemTHPT * 0.2 + diemTNTHPT * 0.8;

        // ===== TÍNH CỘNG & ƯU TIÊN =====
        let diemCongThanhTich = parseFloat(data.diemCongThanhTich) || 0;
        let diemCong = tinhDiemCong(diemHocLuc, diemCongThanhTich);

        let diemUuTien = tinhDiemUuTien(
            diemHocLuc,
            diemCong,
            parseFloat(data.diemUuTien_KhuVuc) || 0,
            parseFloat(data.diemUuTien_DoiTuong) || 0
        );
        // ===== CÁC ĐIỂM KHÁC =====
        let diemXetTuyen = diemHocLuc + diemUuTien + diemCong;

        res.status(200).json({
            success: true,
            results: {
                diemTNTHPT: diemTNTHPT.toFixed(2),
                diemTHPT: diemTHPT.toFixed(2),
                diemHocLuc: diemHocLuc.toFixed(2),
                diemCong: diemCong.toFixed(2),
                diemUuTien: diemUuTien.toFixed(2),
                diemXetTuyen: diemXetTuyen.toFixed(2),
            }
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
        let diemTHPT = 999.9999;
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
                diemTHPT: diemTHPT.toFixed(3),
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
        let diemTHPT = 999.9999;
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
                diemTHPT: diemTHPT.toFixed(3),
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
