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
//  ĐÓI TƯỢNG 6

app.post("/api/tinhDiemDoiTuong_6", (req, res) => {

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
