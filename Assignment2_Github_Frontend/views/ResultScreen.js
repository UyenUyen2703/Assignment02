import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import axios from "axios";

const ResultScreen = ({ params, route }) => {

    //ĐỊA CHỈ IP ------------------------------------//
    const apiAddress = 'http://192.168.1.190:5555/api';
    //-----------------------------------------------//

    const DATA_DiemHocLuc = route.params?.DATA_DiemHocLuc;
    const DATA_DiemCong = route.params?.DATA_DiemCong;
    const Data_DoiTuong = Object.assign({}, DATA_DiemHocLuc, DATA_DiemCong);

    const [diemNangLuc, setDiemNangLuc] = useState(null);
    const [diemTNTHPT, setDiemTNTHPT] = useState(null);
    const [diemTBTHPT, setDiemTBTHPT] = useState(null);
    const [diemHocLuc, setDiemHocLuc] = useState(null);
    const [diemUuTien, setDiemUuTien] = useState(null);
    const [diemCong, setDiemCong] = useState(null);
    const [diemXetTuyen, setDiemXetTuyen] = useState(null);

    const doiTuong = DATA_DiemHocLuc['doiTuong'];

    const navigation = useNavigation();

    //-----------------------------------------------//

    useEffect(() => {
        console.log("\n\tResultScreen: DATA_DiemHocLuc: các trường dữ liệu lấy từ MainScreen/DoiTuongScreen");
        console.log(DATA_DiemHocLuc)

        console.log("\n\tResultScreen: DATA_DiemCong: các trường dữ liệu lấy từ ExtraScoreScreen");
        console.log(DATA_DiemCong)

        console.log("\n\tResultScreen: DATA_DoiTuong: tập hợp dữ liệu từ DATA_DiemHocLuc & tDATA_DiemCong");
        console.log(Data_DoiTuong)

        GoiAPITinhDiemXetTuyen()
    }, []);

    //-----------------------------------------------//
    const TinhDiemDoiTuong1 = async () => {
        try {
            const response = await axios.post(`${apiAddress}/tinhDiemDoiTuong_1`, Data_DoiTuong);

            if (response.data.success) {
                console.log('\n\tResultScreen: Kết quả trả về từ API');
                console.log(response.data.results);

                setDiemNangLuc(response.data.results['diemNangLuc']);
                setDiemTNTHPT(response.data.results['diemTNTHPT']);
                setDiemTBTHPT(response.data.results['diemTBTHPT']);
                setDiemHocLuc(response.data.results['diemHocLuc']);
                setDiemCong(response.data.results['diemCong']);
                setDiemUuTien(response.data.results['diemUuTien']);
                setDiemXetTuyen(response.data.results['diemXetTuyen']);
            } else {
                alert("Không nhận được điểm học lực");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Lỗi khi gửi dữ liệu");
        }
    }

    //-----------------------------------------------//

    const TinhDiemDoiTuong2 = async () => {
        try {
            const response = await axios.post(`${apiAddress}/tinhDiemDoiTuong_2`, Data_DoiTuong);

            if (response.data.success) {
                console.log('\n\tResultScreen: Kết quả trả về từ API');
                console.log(response.data.results);

                setDiemNangLuc(response.data.results['diemNangLuc']);
                setDiemTNTHPT(response.data.results['diemTNTHPT']);
                setDiemTBTHPT(response.data.results['diemTBTHPT']);
                setDiemHocLuc(response.data.results['diemHocLuc']);
                setDiemCong(response.data.results['diemCong']);
                setDiemUuTien(response.data.results['diemUuTien']);
                setDiemXetTuyen(response.data.results['diemXetTuyen']);
            } else {
                alert("Không nhận được điểm học lực");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu: ", error);
            alert("Lỗi khi gửi dữ liệu 2");
        }
    }

    //-----------------------------------------------//

    const TinhDiemDoiTuong3 = async () => {
        try {

            const response = await axios.post(`${apiAddress}/tinhDiemDoiTuong_3`, Data_DoiTuong);

            if (response.data.success) {
                console.log('\n\tResultScreen: Kết quả trả về từ API');
                console.log(response.data.results);

                setDiemNangLuc(response.data.results['diemNangLuc']);
                setDiemTNTHPT(response.data.results['diemTNTHPT']);
                setDiemTBTHPT(response.data.results['diemTBTHPT']);
                setDiemHocLuc(response.data.results['diemHocLuc']);
                setDiemCong(response.data.results['diemCong']);
                setDiemUuTien(response.data.results['diemUuTien']);
                setDiemXetTuyen(response.data.results['diemXetTuyen']);
            } else {
                alert("Không nhận được điểm học lực");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu: ", error);
            alert("Lỗi khi gửi dữ liệu 2");
        }
    }

    //-----------------------------------------------//

    const TinhDiemDoiTuong4 = async () => {
        try {
            const response = await axios.post(`${apiAddress}/tinhDiemDoiTuong_4`, Data_DoiTuong);

            if (response.data.success) {
                console.log('\n\tResultScreen: Kết quả trả về từ API');
                console.log(response.data.results);

                setDiemNangLuc(response.data.results['diemNangLuc']);
                setDiemTNTHPT(response.data.results['diemTNTHPT']);
                setDiemTBTHPT(response.data.results['diemTBTHPT']);
                setDiemHocLuc(response.data.results['diemHocLuc']);
                setDiemCong(response.data.results['diemCong']);
                setDiemUuTien(response.data.results['diemUuTien']);
                setDiemXetTuyen(response.data.results['diemXetTuyen']);
            } else {
                alert("Không nhận được điểm học lực");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu: ", error);
            alert("Lỗi khi gửi dữ liệu 2");
        }
    }

    //-----------------------------------------------//

    const TinhDiemDoiTuong5 = async () => {
        try {
            const response = await axios.post(`${apiAddress}/tinhDiemDoiTuong_5`, Data_DoiTuong);

            if (response.data.success) {
                console.log('\n\tResultScreen: Kết quả trả về từ API');
                console.log(response.data.results);

                setDiemNangLuc(response.data.results['diemNangLuc']);
                setDiemTNTHPT(response.data.results['diemTNTHPT']);
                setDiemTBTHPT(response.data.results['diemTBTHPT']);
                setDiemHocLuc(response.data.results['diemHocLuc']);
                setDiemCong(response.data.results['diemCong']);
                setDiemUuTien(response.data.results['diemUuTien']);
                setDiemXetTuyen(response.data.results['diemXetTuyen']);
            } else {
                alert("Không nhận được điểm học lực");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu: ", error);
            alert("Lỗi khi gửi dữ liệu 2");
        }
    }

    //-----------------------------------------------//

    const TinhDiemDoiTuong6 = async () => {
        try {
            const response = await axios.post(`${apiAddress}/tinhDiemDoiTuong_6`, Data_DoiTuong);

            if (response.data.success) {
                console.log('\n\tResultScreen: Kết quả trả về từ API');
                console.log(response.data.results);

                // setDiemNangLuc(response.data.results['diemNangLuc']);
                setDiemTNTHPT(response.data.results['diemTNTHPT']);
                console.log('\n\tResultScreen: DiemTNTHPT:', response.data.results['diemTNTHPT']);
                setDiemTBTHPT(response.data.results['diemTBTHPT']);
                setDiemHocLuc(response.data.results['diemHocLuc']);
                setDiemCong(response.data.results['diemCong']);
                setDiemUuTien(response.data.results['diemUuTien']);
                setDiemXetTuyen(response.data.results['diemXetTuyen']);
            } else {
                alert("Không nhận được điểm học lực");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu: ", error);
            alert("Lỗi khi gửi dữ liệu 2");
        }
    }

    //-----------------------------------------------//

    const TinhDiemDoiTuong7 = async () => {
        try {
            const response = await axios.post(`${apiAddress}/tinhDiemDoiTuong_7`, Data_DoiTuong);

            if (response.data.success) {
                console.log('\n\tResultScreen: Kết quả trả về từ API');
                console.log(response.data.results);

                setDiemNangLuc(response.data.results['diemNangLuc']);
                setDiemTNTHPT(response.data.results['diemTNTHPT']);
                setDiemTBTHPT(response.data.results['diemTBTHPT']);
                setDiemHocLuc(response.data.results['diemHocLuc']);
                setDiemCong(response.data.results['diemCong']);
                setDiemUuTien(response.data.results['diemUuTien']);
                setDiemXetTuyen(response.data.results['diemXetTuyen']);
            } else {
                alert("Không thể tính điểm cho đối tượng 7");
            }
        } catch (error) {
            console.error("Lỗi khi tính điểm DoiTuong7:", error);
            const errorMsg = error.response?.data?.message || "Lỗi khi gửi dữ liệu đối tượng 7";
            alert(errorMsg);
        }
    }

    //-----------------------------------------------//

    const TinhDiemDoiTuong8 = async () => {
        try {
            const response = await axios.post(`${apiAddress}/tinhDiemDoiTuong_8`, Data_DoiTuong);

            if (response.data.success) {
                console.log('\n\tResultScreen: Kết quả trả về từ API');
                console.log(response.data.results);

                setDiemNangLuc(response.data.results['diemNangLuc']);
                setDiemTNTHPT(response.data.results['diemTNTHPT']);
                setDiemTBTHPT(response.data.results['diemTBTHPT']);
                setDiemHocLuc(response.data.results['diemHocLuc']);
                setDiemCong(response.data.results['diemCong']);
                setDiemUuTien(response.data.results['diemUuTien']);
                setDiemXetTuyen(response.data.results['diemXetTuyen']);
            } else {
                alert("Không thể tính điểm cho đối tượng 8 (SAT I)");
            }
        } catch (error) {
            console.error("Lỗi khi tính điểm DoiTuong8:", error);
            const errorMsg = error.response?.data?.message || "Lỗi khi gửi dữ liệu đối tượng 8";
            alert(errorMsg);
        }
    }

    //-----------------------------------------------//

    const GoiAPITinhDiemXetTuyen = () => {
        console.log('\n\t=== DEBUG: GoiAPITinhDiemXetTuyen ===');

        switch (doiTuong) {
            case 1:
                console.log('Calling TinhDiemDoiTuong1');
                TinhDiemDoiTuong1();
                break;
            case 2:
                console.log('Calling TinhDiemDoiTuong2');
                TinhDiemDoiTuong2();
                break;
            case 3:
                console.log('Calling TinhDiemDoiTuong3');
                TinhDiemDoiTuong3();
                break;
            case 4:
                console.log('Calling TinhDiemDoiTuong4');
                TinhDiemDoiTuong4();
                break;
            case 5:
                console.log('Calling TinhDiemDoiTuong5');
                TinhDiemDoiTuong5();
                break;
            case 6:
                console.log('Calling TinhDiemDoiTuong6');
                TinhDiemDoiTuong6();
                break;
            case 7:
                console.log('Calling TinhDiemDoiTuong7');
                TinhDiemDoiTuong7();
                break;
            case 8:
                console.log('Calling TinhDiemDoiTuong8');
                TinhDiemDoiTuong8();
                break;
            default:
                break;
        }
    }

    //-----------------------------------------------//

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerSideButton}
                    onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back'} size={25} color={'#fff7f7ff'} />
                </TouchableOpacity>
                <View style={styles.headerLogo}>
                    <Image style={styles.headerLogoImg}
                        source={{ uri: 'https://hcmut.edu.vn/img/logo.jpg?t=26899198' }} />
                    <View style={styles.headerTitleContainer}>
                        <Text style={[styles.headerTitleText, { fontSize: 11 }]}>
                            Trường Đại Học Bách Khoa
                        </Text>
                        <Text style={[styles.headerTitleText, { fontWeight: 'bold', fontSize: 15 }]}>
                            Xét Tuyển Sinh Viên
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerSideButton}
                    onPress={() => navigation.navigate('MainScreen')}>
                    <MaterialIcons name={'home'} size={25} color={'#fff7f7ff'} />
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <View style={styles.resultField}>
                    <View style={styles.resultFieldRow}>
                        <Text style={styles.resultFieldText}>Điểm Học Lực:</Text>
                        <Text style={styles.resultFieldText}>{diemHocLuc}</Text>
                    </View>

                    <View style={{ width: '100%', paddingLeft: 20, marginVertical: 10 }}>
                        <View style={styles.resultFieldRow}>
                            <Text style={styles.resultFieldText}>Điểm Năng Lực:</Text>
                            <Text style={styles.resultFieldText}>{diemNangLuc}</Text>
                        </View>
                        <View style={styles.resultFieldRow}>
                            <Text style={styles.resultFieldText}>Điểm Tốt Nghiệp THPT:</Text>
                            <Text style={styles.resultFieldText}>{diemTNTHPT}</Text>
                        </View>
                        <View style={styles.resultFieldRow}>
                            <Text style={styles.resultFieldText}>Điểm Học THPT:</Text>
                            <Text style={styles.resultFieldText}>{diemTBTHPT}</Text>
                        </View>
                    </View>

                    <View style={styles.resultFieldRow}>
                        <Text style={styles.resultFieldText}>Điểm Cộng:</Text>
                        <Text style={styles.resultFieldText}>{diemCong}</Text>
                    </View>
                    <View style={styles.resultFieldRow}>
                        <Text style={styles.resultFieldText}>Điểm Ưu Tiên:</Text>
                        <Text style={styles.resultFieldText}>{diemUuTien}</Text>
                    </View>
                </View>
                <View style={styles.resultField}>
                    <View style={[styles.resultFieldRow, styles.resultFieldRowFinal]}>
                        <Text style={styles.resultFieldTextFinal}>ĐIỂM XÉT TUYỂN:</Text>
                        <Text style={[styles.resultFieldTextFinal, { color: '#f62c65ff' }]}>{diemXetTuyen}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

export default ResultScreen;

const styles = StyleSheet.create({
    //----------------------------------------------------//

    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#7ba5ffff'
    },

    //----------------------------------------------------//

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        height: 80,

        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 10,

        backgroundColor: '#142D65'
    },
    headerLogo: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerLogoImg: {
        height: 40,
        width: 40,
    },
    headerTitleContainer: {
        marginLeft: 16
    },
    headerTitleText: {
        color: '#ffffff'
    },
    headerSideButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        padding: 10,
    },

    //----------------------------------------------------//

    subHeader: {
        flex: 1,

        paddingHorizontal: 5,

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 15,

        backgroundColor: '#ffffffff',
    },

    //----------------------------------------------------//

    body: {
        flex: 12,
        alignItems: 'center',
        justifyContent: 'flex-start',

        paddingTop: 25,
        paddingHorizontal: 20,

        backgroundColor: '#dbdfe8ff'
    },
    titleText: {
        textAlign: 'center',

        fontSize: 16,
        fontWeight: 'bold',

        color: '#f62c65ff'
    },
    resultField: {
        flexDirection: 'collumn',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

        marginBottom: 5,
        marginTop: 15,
        paddingBottom: 20,
        padding: 20,

        borderRadius: 4,

        width: '100%',

        backgroundColor: '#ffffff'
    },
    resultFieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginBottom: 10,

        width: '100%'
    },
    resultFieldRowFinal: {
        paddingBottom: 8,
        marginBottom: 5,

        borderBottomColor: '#dbdfe8ff',
        borderBottomWidth: 1,
    },
    resultFieldText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    resultFieldTextFinal: {
        fontSize: 22,
        fontWeight: 'bold'
    },

    //----------------------------------------------------//

    footer: {
        alignItems: 'flex-start',
        justifyContent: 'center',

        height: 80,
        width: '100%',

        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,

        backgroundColor: '#ffffff',

        shadowColor: '#000000ff',
        shadowOffset: { width: 4, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 15,
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',

        paddingVertical: 10,
        paddingHorizontal: 25,

        borderRadius: 6,

        width: '100%',

        backgroundColor: '#1488DB',
    },
    submitButtonText: {
        textAlign: 'center',

        fontWeight: 'bold',

        color: '#ffffff',
    },
});