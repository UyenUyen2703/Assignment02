import React, { use, useEffect, useState, } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { Picker } from "@react-native-picker/picker"

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DoiTuong1Screen from './DoiTuongScreen/DoiTuong1Screen';
import DoiTuong2Screen from './DoiTuongScreen/DoiTuong2Screen';
import DoiTuong3Screen from './DoiTuongScreen/DoiTuong3Screen';
import DoiTuong4Screen from './DoiTuongScreen/DoiTuong4Screen';
import DoiTuong5Screen from './DoiTuongScreen/DoiTuong5Screen';
import DoiTuong6Screen from './DoiTuongScreen/DoiTuong6Screen';
import DoiTuong7Screen from './DoiTuongScreen/DoiTuong7Screen';
import DoiTuong8Screen from './DoiTuongScreen/DoiTuong8Screen';

const MainScreen = ({ navigation, }) => {
    const DefaultScreen = () => <View style={styles.screen}>
        <Text style={styles.titleText}>Hãy Chọn Đối Tượng Xét Tuyển</Text>
        <View style={styles.descriptionModel}>
            <Text style={styles.titleText}>Các Đối Tượng Xét Tuyển</Text>
            <View style={styles.text}>
                <Text>Đối tượng 1: </Text>
                <Text style={styles.textdescription}>Thí sinh CÓ kết quả thi Đánh giá Năng lực ĐHQG-HCM năm 2025</Text>
            </View>
            <View style={styles.text}>
                <Text>Đối tượng 2: </Text>
                <Text style={styles.textdescription}>Thí sinh KHÔNG CÓ kết quả thi Đánh giá Năng lực ĐHQG-HCM năm 2025</Text>
            </View>
            <View style={styles.text}>
                <Text>Đối tượng 3: </Text>
                <Text style={styles.textdescription}>Thí sinh tốt nghiệp chương trình THPT nước ngoài</Text>
            </View>
            <View style={styles.text}>
                <Text>Đối tượng 4: </Text>
                <Text style={styles.textdescription}>Thí sinh tốt nghiệp chương trình THPT Việt Nam, dùng Chứng chỉ tuyển sinh Quốc tế</Text>
            </View>
            <View style={styles.text}>
                <Text>Đối tượng 5: </Text>
                <Text style={styles.textdescription}>Thí sinh dự tính du học nước ngoài theo Chương trình Chuyển tiếp Quốc tế sang các trường đại học đối tác tại Úc, Mỹ, New Zealand</Text>
            </View>
            <View style={styles.text}>
                <Text>Đối tượng 6: </Text>
                <Text style={styles.textdescription}>Thí sinh tốt nghiệp chương trình THPT Việt Nam</Text>
            </View>
            <View style={styles.text}>
                <Text>Đối tượng 7: </Text>
                <Text style={styles.textdescription}>Thí sinh tốt nghiệp chương trình THPT nước ngoài</Text>
            </View>
            <View style={styles.text}>
                <Text>Đối tượng 8: </Text>
                <Text style={styles.textdescription}>Thí sinh dùng Chứng chỉ Tuyển sinh Quốc tế SAT I</Text>
            </View>
        </View>
    </View>

    const isDataComplete = (data) => {
        return Object.values(data).every(
            value => value !== null &&
                (typeof value !== 'object' || isDataComplete(value))
        );
    };

    const [keyboardOffset, setKeyboardOffset] = useState(0);

    useEffect(() => {
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

    const [Options, setOptions] = useState([
        { name: "Đối Tượng 1", id: "1" },
        { name: "Đối Tượng 2", id: "2" },
        { name: "Đối Tượng 3", id: "3" },
        { name: "Đối Tượng 4", id: "4" },
        { name: "Đối Tượng 5", id: "5" },
        { name: "Đối Tượng 6", id: "6" },
        { name: "Đối Tượng 7", id: "7" },
        { name: "Đối Tượng 8", id: "8" },
    ]);
    const [Choice, setChoice] = useState(null);

    const renderSelectedScreen = () => {
        switch (Choice) {
            case "1":
                return <DoiTuong1Screen
                    DATA_DiemHocLuc={DATA_DiemHocLuc}
                    setDATA_DiemHocLuc={setDATA_DiemHocLuc}
                />;
            case "2":
                return <DoiTuong2Screen
                    DATA_DiemHocLuc={DATA_DiemHocLuc}
                    setDATA_DiemHocLuc={setDATA_DiemHocLuc}
                />;
            case "3":
                return <DoiTuong3Screen
                    DATA_DiemHocLuc={DATA_DiemHocLuc}
                    setDATA_DiemHocLuc={setDATA_DiemHocLuc}
                />;
            case "4":
                return <DoiTuong4Screen
                    DATA_DiemHocLuc={DATA_DiemHocLuc}
                    setDATA_DiemHocLuc={setDATA_DiemHocLuc}
                />;
            case "5":
                return <DoiTuong5Screen
                    DATA_DiemHocLuc={DATA_DiemHocLuc}
                    setDATA_DiemHocLuc={setDATA_DiemHocLuc}
                />;
            case "6":
                return <DoiTuong6Screen
                    DATA_DiemHocLuc={DATA_DiemHocLuc}
                    setDATA_DiemHocLuc={setDATA_DiemHocLuc}
                />;
            case "7":
                return <DoiTuong7Screen
                    DATA_DiemHocLuc={DATA_DiemHocLuc}
                    setDATA_DiemHocLuc={setDATA_DiemHocLuc}
                />;
            case "8":
                return <DoiTuong8Screen
                    DATA_DiemHocLuc={DATA_DiemHocLuc}
                    setDATA_DiemHocLuc={setDATA_DiemHocLuc}
                />;
            default:
                return <DefaultScreen />;
        }
    };

    const [DATA_DiemHocLuc, setDATA_DiemHocLuc] = useState({
        doiTuong: null,
    });

    return (
        <View style={[styles.container, { paddingBottom: keyboardOffset }]}>

            <View style={styles.header}>
                {/* <TouchableOpacity style={styles.headerSideButton}>
                    <MaterialIcons name={'arrow-back'} size={25} color={'#fff7f7ff'} />
                </TouchableOpacity> */}
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
                {/* <View style={styles.headerSideButton} /> */}
            </View>

            <View style={styles.subHeader}>
                <Picker mode='dialog' selectedValue={Choice}
                    onValueChange={(itemValue, itemIndex) => {
                        setChoice(itemValue)
                    }}>
                    {Options.map((item) => (
                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                    ))}
                </Picker>
            </View>

            <View style={styles.body}>
                {renderSelectedScreen()}
            </View>
            {
                Choice != null ? <View style={styles.footer}>
                    <TouchableOpacity style={[styles.submitButton,
                        // !isDataComplete(DATA_DiemHocLuc) && styles.disabledSubmitButton
                    ]}
                        // disabled={!isDataComplete(DATA_DiemHocLuc)}

                        onPress={() => {
                            navigation.navigate('ExtraScoreScreen', { DATA_DiemHocLuc })
                        }}>
                        <Text style={styles.submitButtonText}>
                            Tiếp Theo
                        </Text>
                    </TouchableOpacity>
                </View>
                    : null
            }

        </View >
    )
};

export default MainScreen;

const styles = StyleSheet.create({
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

        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 10,

        height: 80,

        backgroundColor: '#142D65'
    },
    headerLogo: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },

    headerLogoImg: {
        alignItems: 'center',
        justifyContent: 'center',

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
        paddingTop: 10,
        backgroundColor: '#dbdfe8ff'
    },
    titleText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f62c65ff',
        marginBottom: 10,
    },
    descriptionModel: {
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: '#ffffff',
        shadowColor: '#000000ff',
        shadowOffset: { width: 4, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 15,
    },
    textdescription: {
        textAlign: 'left',
        fontSize: 14,
        color: '#000000',
        marginBottom: 5,
        lineHeight: 20,
        fontWeight: '500',
        width: '80%',
    },

    text: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
        backgroundColor: '#f0f0f0',
        shadowColor: '#000000ff',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
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
    disabledSubmitButton: {
        backgroundColor: '#73797dff',
    },
    submitButtonText: {
        textAlign: 'center',

        fontWeight: 'bold',

        color: '#ffffff',
    },
});