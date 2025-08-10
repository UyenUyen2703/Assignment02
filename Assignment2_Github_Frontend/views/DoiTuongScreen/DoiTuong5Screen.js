import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DoiTuong5Screen = () => {
    // State for inputs
    const [diemPhongVan, setDiemPhongVan] = useState(''); // Comma-separated string
    const [diemBaiLuan, setDiemBaiLuan] = useState('');
    const [chungChiTA, setChungChiTA] = useState('IELTS');
    const [diemChungChiTA, setDiemChungChiTA] = useState('');
    const [loaiChuongTrinhTHPT, setLoaiChuongTrinhTHPT] = useState('vietnam');
    const [diemTohopTHPT, setDiemTohopTHPT] = useState('');
    const [diemChungChiQuocTe, setDiemChungChiQuocTe] = useState('');
    const [diemTB3Nam, setDiemTB3Nam] = useState('');

    // State for results
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        // Reset previous results
        setResult(null);
        setError(null);

        // --- Input Validation ---
        if (!diemPhongVan.trim() || !diemBaiLuan.trim() || !diemChungChiTA.trim() || !diemTB3Nam.trim()) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ các trường thông tin bắt buộc.");
            return;
        }

        const diemPhongVanArray = diemPhongVan.split(',').map(item => parseFloat(item.trim())).filter(val => !isNaN(val));
        if (diemPhongVanArray.length === 0) {
            Alert.alert("Lỗi", "Điểm phỏng vấn không hợp lệ. Vui lòng nhập các số, phân cách bằng dấu phẩy.");
            return;
        }

        const body = {
            diemPhongVan: diemPhongVanArray,
            diemBaiLuan: parseFloat(diemBaiLuan),
            chungChiTA,
            diemChungChiTA: parseFloat(diemChungChiTA),
            loaiChuongTrinhTHPT,
            diemTB3Nam: parseFloat(diemTB3Nam),
            // Conditionally add scores based on program type
            ...(loaiChuongTrinhTHPT === 'vietnam' && { diemTohopTHPT: parseFloat(diemTohopTHPT) }),
            ...(loaiChuongTrinhTHPT === 'nuocngoai_co_cc' && { diemChungChiQuocTe: parseFloat(diemChungChiQuocTe) }),
        };

        // --- API Call ---
        try {
            // !!! IMPORTANT: Replace with your actual backend IP address !!!
            const response = await fetch('http://192.168.20.245:5555/api/tinhDiemDoiTuong_5', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setResult(data.results);
            } else {
                setError(data.message || 'Có lỗi xảy ra từ server.');
                Alert.alert("Lỗi Server", data.message || 'Không thể tính toán. Vui lòng kiểm tra lại dữ liệu.');
            }
        } catch (e) {
            console.error(e);
            setError('Không thể kết nối tới server. Vui lòng kiểm tra lại địa chỉ IP và đảm bảo server đang chạy.');
            Alert.alert("Lỗi Kết Nối", 'Không thể kết nối tới server. Vui lòng kiểm tra lại địa chỉ IP và đảm bảo server đang chạy.');
        }
    };

    const renderConditionalInputs = () => {
        switch (loaiChuongTrinhTHPT) {
            case 'vietnam':
                return (
                    <View>
                        <Text style={styles.label}>Tổng điểm 3 môn tổ hợp TN THPT</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={diemTohopTHPT}
                            onChangeText={setDiemTohopTHPT}
                            placeholder="Ví dụ: 24.5"
                        />
                    </View>
                );
            case 'nuocngoai_co_cc':
                return (
                    <View>
                        <Text style={styles.label}>Điểm chứng chỉ quốc tế (thang 100)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={diemChungChiQuocTe}
                            onChangeText={setDiemChungChiQuocTe}
                            placeholder="Ví dụ: 85"
                        />
                    </View>
                );
            case 'nuocngoai_khong_cc':
                return (
                    <Text style={styles.infoText}>Điểm TN THPT sẽ được tính bằng Điểm học THPT quy đổi.</Text>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Tính điểm xét tuyển - Đối tượng 5</Text>

            <Text style={styles.label}>Điểm phỏng vấn (cách nhau bằng dấu phẩy)</Text>
            <TextInput
                style={styles.input}
                value={diemPhongVan}
                onChangeText={setDiemPhongVan}
                placeholder="Ví dụ: 80, 85, 90"
            />

            <Text style={styles.label}>Điểm bài luận</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={diemBaiLuan}
                onChangeText={setDiemBaiLuan}
                placeholder="Ví dụ: 88"
            />

            <Text style={styles.label}>Loại chứng chỉ Tiếng Anh</Text>
            <RNPickerSelect
                onValueChange={(value) => setChungChiTA(value)}
                items={[
                    { label: 'IELTS', value: 'IELTS' },
                    { label: 'TOEFL', value: 'TOEFL' },
                ]}
                style={pickerSelectStyles}
                value={chungChiTA}
                placeholder={{}}
            />

            <Text style={styles.label}>Điểm chứng chỉ Tiếng Anh</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={diemChungChiTA}
                onChangeText={setDiemChungChiTA}
                placeholder={chungChiTA === 'IELTS' ? "Ví dụ: 7.0" : "Ví dụ: 105"}
            />

            <Text style={styles.label}>Điểm trung bình 3 năm THPT (theo tổ hợp)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={diemTB3Nam}
                onChangeText={setDiemTB3Nam}
                placeholder="Ví dụ: 8.5"
            />

            <Text style={styles.label}>Loại chương trình THPT</Text>
            <RNPickerSelect
                onValueChange={(value) => setLoaiChuongTrinhTHPT(value)}
                items={[
                    { label: 'THPT Việt Nam', value: 'vietnam' },
                    { label: 'THPT Nước ngoài (có chứng chỉ quốc tế)', value: 'nuocngoai_co_cc' },
                    { label: 'THPT Nước ngoài (không có chứng chỉ)', value: 'nuocngoai_khong_cc' },
                ]}
                style={pickerSelectStyles}
                value={loaiChuongTrinhTHPT}
                placeholder={{}}
            />

            {renderConditionalInputs()}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Tính Điểm</Text>
            </TouchableOpacity>

            {result && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Kết quả tính điểm</Text>
                    <Text style={styles.resultText}>Điểm học lực (kết quả cuối cùng): <Text style={styles.resultValue}>{result.diemHocLuc}</Text></Text>
                    <Text style={styles.resultInfo}>Chi tiết:</Text>
                    <Text style={styles.resultInfo}>- Điểm năng lực: {result.diemNangLuc}</Text>
                    <Text style={styles.resultInfo}>- Điểm TNTHPT (quy đổi): {result.diemTNTHPTQuyDoi}</Text>
                    <Text style={styles.resultInfo}>- Điểm học THPT (quy đổi): {result.diemHocTHPTQuyDoi}</Text>
                </View>
            )}

            {error && (
                 <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f8fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 15,
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 10,
    },
    resultContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e9f7ef',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d0e9dd',
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e4620',
        marginBottom: 10,
    },
    resultText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    resultValue: {
        fontWeight: 'bold',
        color: '#28a745',
    },
    resultInfo: {
        fontSize: 16,
        color: '#444',
        marginLeft: 10,
        lineHeight: 24,
    },
    errorContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f8d7da',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#f5c6cb',
    },
    errorText: {
        color: '#721c24',
        fontSize: 16,
        textAlign: 'center',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        ...styles.input,
    },
    inputAndroid: {
        ...styles.input,
    },
});

export default DoiTuong5Screen;
