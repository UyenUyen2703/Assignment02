import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Modal, Pressable, Keyboard, Platform, ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker"

import { useNavigation } from '@react-navigation/native';

import { styles } from './DoiTuongScreen/DoiTuongScreenStyleSheet';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ExtraScoreScreen = ({ params, route }) => {

    const DATA_DiemHocLuc = route.params?.DATA_DiemHocLuc;
    const apiAddress = 'http://192.168.1.190:5555/api';
    let coMonAnh = DATA_DiemHocLuc.danhSachMon?.includes("Anh");
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    useEffect(() => {
        console.log("\n\tExtraScoreScreen: DATA_DiemHocLuc: các trường dữ liệu lấy từ screen trước");
        console.log(DATA_DiemHocLuc);

        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                setKeyboardOffset(e.endCoordinates.height);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardOffset(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const [DATA_DiemCong, setDATA_DiemCong] = useState({
    })

    const handleUpdateDATA = (index, value) => {
        setDATA_DiemCong(prev => ({
            ...prev,
            [index]: value,
        }));
    }

    const navigation = useNavigation();

    const ChungChiChoice = ['IELTS', 'TOEFL', 'TOEIC'];

    const [CoDiemCong, setCoDiemCong] = useState(false);
    const [CoDiemUuTien, setCoDiemUuTien] = useState(false);
    const [CoChungChi, setCoChungChi] = useState(false);

    const [doiTuongUuTien, setDoiTuongUuTien] = useState(null);
    const [khuVucUuTien, setKhuVucUuTien] = useState(null);
    const [ChungChi, setChungChi] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);

    const handleChoiceSelect = (choice) => {
        handleUpdateDATA('chungChiAnh', choice)
        setChungChi(choice);
        setModalVisible(false);
    };
    // Dữ liệu đối tượng ưu tiên và khu vực ưu tiên lấy từ server
    const [duLieuDoiTuongTemp, setDuLieuDoiTuongTemp] = useState([]);
    const [duLieuKhuVucTemp, setDuLieuKhuVucTemp] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await fetch(`${apiAddress}/getDoiTuongUuTien`);
                const json1 = await res1.json();
                // console.log("Đối tượng ưu tiên:", json1);
                setDuLieuDoiTuongTemp(Array.isArray(json1) ? json1 : []);

                const res2 = await fetch(`${apiAddress}/getKhuVucUuTien`);
                const json2 = await res2.json();

                setDuLieuKhuVucTemp(json2.result);

            } catch (error) {
                // console.error("Lỗi khi gọi API:", error);
                setDuLieuDoiTuongTemp([]);
                setDuLieuKhuVucTemp([]);
            }
        }

        fetchData();
    }, []);


    useEffect(() => {
        setCoDiemUuTien(DATA_DiemCong.diemUuTien_DoiTuong != null || DATA_DiemCong.diemUuTien_KhuVuc != null);
        setCoChungChi(DATA_DiemCong.chungChiAnh != null);
        setDoiTuongUuTien(DATA_DiemCong.diemUuTien_DoiTuong);
        setKhuVucUuTien(DATA_DiemCong.diemUuTien_KhuVuc);
        setChungChi(DATA_DiemCong.chungChiAnh);
    }, []);

    return (

        <View style={[localsStyles.container, { paddingBottom: keyboardOffset, flex: 1 }]}>
            <View style={localsStyles.header}>
                <TouchableOpacity style={localsStyles.headerSideButton}
                    onPress={() => navigation.goBack()}>
                    <MaterialIcons name={'arrow-back'} size={25} color={'#ffffffff'} />
                </TouchableOpacity>
                <View style={localsStyles.headerLogo}>
                    <Image style={localsStyles.headerLogoImg}
                        source={{ uri: 'https://hcmut.edu.vn/img/logo.jpg?t=26899198' }} />
                    <View style={localsStyles.headerTitleContainer}>
                        <Text style={[localsStyles.headerTitleText, { fontSize: 11 }]}>
                            Trường Đại Học Bách Khoa
                        </Text>
                        <Text style={[localsStyles.headerTitleText, { fontWeight: 'bold', fontSize: 15 }]}>
                            Xét Tuyển Sinh Viên
                        </Text>
                    </View>
                </View>
                <View style={localsStyles.headerSideButton} />
            </View>

            <ScrollView>
                <View style={localsStyles.body}>
                    <View style={styles.inputField}>
                        <Text style={styles.inputFieldTitle}>Điểm Cộng (Nếu Có)</Text>
                        <TouchableOpacity style={[styles.inputFieldRow, { marginBottom: 12, }]}
                            onPress={() => {
                                setCoDiemCong(!CoDiemCong)
                                handleUpdateDATA('diemCongThanhTich', 0)
                            }}>
                            <View style={[styles.radioButton, CoDiemCong && styles.radioButtonSelected]} />
                            <Text style={[styles.radioText, CoDiemCong && styles.radioTextSelected]}>
                                Thí sinh CÓ điểm cộng thành tích
                            </Text>
                        </TouchableOpacity>

                        {
                            CoDiemCong == true ?
                                <View style={styles.inputFieldRow}>
                                    <Text style={styles.inputFieldInputLabel}>
                                        {'Điểm Cộng Thành Tích'}
                                    </Text>

                                    <TextInput style={styles.inputFieldInput}
                                        placeholder='00.00'
                                        placeholderTextColor={'#969696ff'}
                                        keyboardType="numeric"
                                        onChangeText={
                                            (text) => handleUpdateDATA('diemCongThanhTich', parseFloat(text))
                                        }
                                    />
                                </View>
                                : null
                        }

                    </View>

                    <View style={styles.inputField}>
                        <Text style={styles.inputFieldTitle}>Điểm Ưu Tiên (Nếu Có)</Text>
                        <TouchableOpacity style={[styles.inputFieldRow, { marginBottom: 12, }]}
                            onPress={() => {
                                setCoDiemUuTien(!CoDiemUuTien)
                                handleUpdateDATA('diemUuTien_DoiTuong', null)
                                handleUpdateDATA('diemUuTien_KhuVuc', null)
                            }}>
                            <View style={[styles.radioButton, CoDiemUuTien && styles.radioButtonSelected]} />
                            <Text style={[styles.radioText, CoDiemUuTien && styles.radioTextSelected]}>
                                Thí sinh CÓ điểm ưu tiên
                            </Text>
                        </TouchableOpacity>

                        {
                            !CoDiemUuTien ? null :
                                <View style={{ width: '100%' }}>
                                    <View style={[styles.inputFieldRow]}>
                                        <Text style={[styles.inputFieldInputLabel]}>
                                            Đối Tượng:
                                        </Text>
                                        <Picker
                                            selectedValue={doiTuongUuTien}
                                            onValueChange={(item) => {
                                                setDoiTuongUuTien(item)
                                                handleUpdateDATA("diemUuTien_DoiTuong", item)
                                            }}
                                            style={[styles.inputFieldInput, {
                                                height: 50,
                                                width: '100%',
                                                marginLeft: 0,
                                                flex: 2
                                            }]}
                                        >
                                            <Picker.Item label="-- Chọn đối tượng --" value={null} style={{ color: '#939393ff' }} />
                                            {duLieuDoiTuongTemp.map((item) => (
                                                <Picker.Item
                                                    key={item.id}
                                                    label={`${item.id}. ${item.ten} (${item.diem_cong} điểm)`}
                                                    value={item}
                                                />
                                            ))}
                                        </Picker>
                                    </View>

                                    <View style={styles.inputFieldRow}>
                                        <Text style={styles.inputFieldInputLabel}>
                                            Khu Vực:
                                        </Text>
                                        <Picker
                                            selectedValue={khuVucUuTien}
                                            onValueChange={(item) => {
                                                setKhuVucUuTien(item)
                                                handleUpdateDATA("diemUuTien_KhuVuc", item)
                                            }}
                                            style={[styles.inputFieldInput, {
                                                height: 50,
                                                width: '100%',
                                                marginLeft: 0,
                                                flex: 2
                                            }]}
                                        >
                                            <Picker.Item label="-- Chọn khu vực --" value={null} style={{ color: '#939393ff' }} />
                                            {duLieuKhuVucTemp.map((item, index) => {
                                                const diaChi = [item.tenTinh, item.tenHuyen, item.tenXa, item.tenQuan]
                                                    .filter(str => !!str && str.trim() !== '')
                                                    .join(', ');

                                                const diem = parseFloat(item.diemUuTien);
                                                return (
                                                    <Picker.Item
                                                        key={index}
                                                        label={`${diaChi} (${diem.toFixed(2)} điểm)`}
                                                        value={diem}
                                                    />
                                                );
                                            })}
                                        </Picker>
                                    </View>
                                </View>
                        }
                        {/* <Text>[CHƯA HOÀN THIỆN...]</Text> */}
                    </View>

                    {
                        !coMonAnh ? null :

                            <View style={styles.inputField}>
                                <Text style={styles.inputFieldTitle}>Chứng Chỉ Tiếng Anh (Nếu Có)</Text>
                                <TouchableOpacity style={[styles.inputFieldRow, { marginBottom: 12, }]}
                                    onPress={() => {
                                        setCoChungChi(!CoChungChi)
                                        setChungChi(null)
                                        handleUpdateDATA('chungChiAnh', null)
                                        handleUpdateDATA('diemCC_1', null)
                                        handleUpdateDATA('diemCC_2', null)
                                    }}
                                >
                                    <View style={[styles.radioButton, CoChungChi && styles.radioButtonSelected]} />
                                    <Text style={[styles.radioText, CoChungChi && styles.radioTextSelected]}>
                                        Thí sinh CÓ chứng chỉ tiếng anh
                                    </Text>
                                </TouchableOpacity>

                                {
                                    CoChungChi == true ?
                                        <View style={[styles.inputFieldRow]}>
                                            <Text style={[styles.inputFieldInputLabel, { flex: ChungChi == 'TOEIC' ? 3 : 2 }]}>
                                                Điểm Chứng Chỉ
                                            </Text>
                                            <TextInput style={[styles.inputFieldInput, { flex: 1 }]}
                                                placeholder='00.00'
                                                placeholderTextColor={'#969696ff'}
                                                keyboardType="numeric"
                                                onChangeText={
                                                    (text) => handleUpdateDATA('diemCC_1', parseFloat(text))
                                                }
                                            />
                                            {
                                                ChungChi == 'TOEIC' ? <TextInput style={[styles.inputFieldInput, { flex: 1 }]}
                                                    placeholder='00.00'
                                                    placeholderTextColor={'#969696ff'}
                                                    keyboardType="numeric"
                                                    onChangeText={
                                                        (text) => handleUpdateDATA('diemCC_2', parseFloat(text))
                                                    }
                                                /> : null
                                            }
                                            <TouchableOpacity style={[styles.inputFieldInput, { flex: 1 }]}
                                                onPress={
                                                    () => setModalVisible(true)
                                                }
                                            >
                                                <Text style={[styles.inputFieldPickerText, ChungChi != null && { color: '#000000' }]}>
                                                    {ChungChi != null ? ChungChi : '--'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        : null
                                }
                            </View>
                    }
                </View>
            </ScrollView>

            <View style={[localsStyles.footer]}>
                <TouchableOpacity style={localsStyles.submitButton}>
                    <Text style={localsStyles.submitButtonText}
                        onPress={
                            () => navigation.navigate('ResultScreen',
                                { DATA_DiemHocLuc, DATA_DiemCong })
                        }
                    >Tính Điểm Xét Tuyển</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <Pressable style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        {ChungChiChoice.map((choice, index) => (
                            <TouchableOpacity key={index}
                                style={styles.choiceButton}
                                onPress={() => handleChoiceSelect(choice)}>
                                <Text style={styles.choiceText}>{choice}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </View >

    )
};

export default ExtraScoreScreen;

const localsStyles = StyleSheet.create({
    //----------------------------------------------------//

    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#dbdfe8ff'
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