import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './DoiTuongScreenStyleSheet';

import toHopMonData from './ToHopMon.json';
// import nganhXetTuyenData from './NganhXetTuyen.json';

const DoiTuong4Screen = ({ DATA_DiemHocLuc, setDATA_DiemHocLuc }) => {
    const [chuongTrinhHoc, setChuongTrinhHoc] = useState(0);
    const [nganh, setNganh] = useState(0);
    const [toHopXetTuyen, setToHopXetTuyen] = useState(0);

    const chuongTrinhList = toHopMonData[chuongTrinhHoc] || {};
    const nganhList = chuongTrinhList.nganh || [];
    const selectedNganh = nganhList[nganh] || {};
    const toHopXetTuyenList = selectedNganh.toHopXetTuyen ? selectedNganh.toHopXetTuyen : [];
    const selectToHop = toHopXetTuyenList?.[toHopXetTuyen] || { monChinh: [], monTuChon: [] };

    // Truyền luôn tổ hợp môn vào DATA_DiemHocLuc mỗi khi tổ hợp thay đổi
    useEffect(() => {
        setDATA_DiemHocLuc(prev => ({
            ...prev,
            monChinh: selectToHop.monChinh || [],
            monTuChon: selectToHop.monTuChon || [],
        }));
    }, [chuongTrinhHoc, nganh, toHopXetTuyen]);

    const handleUpdateDATA = (index, value) => {
        let parsed = parseFloat(value);
        setDATA_DiemHocLuc(prev => ({
            ...prev,
            [index]: isNaN(parsed) ? null : parsed,
            monChinh: selectToHop.monChinh || [],
            monTuChon: selectToHop.monTuChon || [],
        }));
    };
    useEffect(() => {
        setDATA_DiemHocLuc(prev => ({
            ...prev,
            doiTuong: 6
        }));
    }, []);

    useEffect(() => {
        setDATA_DiemHocLuc(prev => ({
            ...prev,
            nganhInfo: {
                maNganh: selectedNganh.maNganh || '',
                tenNganh: selectedNganh.tenNganh || '',
                monChinh: selectToHop.monChinh || [],
                monTuChon: selectToHop.monTuChon || [],
            }
        }));
    }, [chuongTrinhHoc, nganh, toHopXetTuyen]);

    const monBatBuoc = selectToHop.monChinh || [];
    const monTuChon = selectToHop.monTuChon || [];
    const tatCaMon = [...new Set([...monBatBuoc, ...monTuChon])];

    const [ChungChi, setChungChi] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);

    const ChungChiChoice = [
        { label: 'SAT', value: 'SAT' },
        { label: 'ACT', value: 'ACT' },
        { label: 'IB', value: 'IB' },
        { label: 'A-Level', value: 'A-Level' }
    ];
    const handleChoiceSelect = (choice) => {
        setChungChi(choice);
        setModalVisible(false);
    };

    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Thí Sinh Tốt Nghiệp THPT Việt Nam</Text>
                </View>

                <View style={styles.body}>
                    {/* Chương trình học */}
                    <Text style={styles.inputFieldTitle}>Chương Trình Học</Text>
                    <Picker
                        selectedValue={chuongTrinhHoc}
                        onValueChange={(item) => {
                            setChuongTrinhHoc(item);
                            setNganh(0);
                            setToHopXetTuyen(0);
                        }}
                        style={{ width: '100%', height: 50 }}
                    >
                        <Picker.Item label="-- Chọn chương trình học --" value={0} />
                        {toHopMonData.map((item, idx) => (
                            <Picker.Item key={idx} label={item.chuongtrinh} value={idx} />
                        ))}
                    </Picker>
                    <View style={styles.inputField}>
                        <Text style={styles.inputFieldTitle}>Chứng chỉ quốc tế</Text>
                        <Picker
                            selectedValue={ChungChi || ''} // nếu null thì set rỗng để Picker vẫn hiển thị
                            onValueChange={(val) => {
                                setChungChi(val);
                                setDATA_DiemHocLuc(prev => ({
                                    ...prev,
                                    certificate_type: val // gửi lên API
                                }));
                            }}
                            style={{ width: '100%', height: 50 }}
                        >
                            <Picker.Item label="-- Chọn chứng chỉ --" value="" />
                            {ChungChiChoice.map((cc, idx) => (
                                <Picker.Item key={idx} label={cc.label} value={cc.value} />
                            ))}
                        </Picker>
                        <View style={styles.inputField}>
                            <Text style={{ marginTop: 10 }}>Điểm gốc (Original Score)</Text>
                            <TextInput
                                style={[styles.inputFieldInput, { width: '100%' }]}
                                placeholder="Nhập điểm gốc"
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    setDATA_DiemHocLuc(prev => ({
                                        ...prev,
                                        original_score: text // lưu dạng chuỗi vì DB original_score là VARCHAR
                                    }));
                                }}
                            />
                        </View>


                    </View>


                    {/* Ngành xét tuyển */}
                    <Text style={styles.inputFieldTitle}>Ngành Xét Tuyển</Text>
                    <Picker
                        selectedValue={nganh}
                        onValueChange={(item) => {
                            setNganh(item);
                            setToHopXetTuyen(0);
                        }}
                        style={[styles.inputFieldInput, { height: 50, width: '100%' }]}
                        dropdownIconColor="#333"
                    >
                        <Picker.Item label="-- Chọn mã ngành --" value={0} />
                        {nganhList.map((item, idx) => (
                            <Picker.Item key={`nganh-${item.maNganh}-${idx}`} label={`${item.maNganh} - ${item.tenNganh}`} value={idx} />
                        ))}
                    </Picker>

                    {/* Tổ hợp môn xét tuyển */}
                    <Text style={styles.inputFieldTitle}>Tổ Hợp Môn Xét Tuyển</Text>
                    <Picker
                        selectedValue={toHopXetTuyen}
                        onValueChange={(item) => setToHopXetTuyen(item)}
                        style={[styles.inputFieldInput, { height: 50, width: '100%' }]}
                        dropdownIconColor="#333"
                    >
                        <Picker.Item label="-- Chọn tổ hợp môn --" value={null} />
                        {toHopXetTuyenList.map((item, idx) => (
                            <Picker.Item key={`tohop-${chuongTrinhHoc}-${nganh}-${idx}`} label={item.monChinh.join(' + ')} value={idx} />
                        ))}
                    </Picker>

                    {/* Nhập điểm môn bắt buộc */}
                    <View style={{ width: '100%', marginTop: 15 }}>
                        {monBatBuoc.map((mon, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ width: 120 }}>Môn {mon} *</Text>
                                <TextInput
                                    style={[styles.inputFieldInput, { flex: 1 }]}
                                    placeholder="Nhập điểm"
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleUpdateDATA(`diemThi_${mon}`, text)}
                                />
                            </View>
                        ))}
                    </View>

                    {/* Nhập điểm môn tự chọn */}
                    <View style={{ width: '100%', marginTop: 15 }}>
                        {monTuChon.map((mon, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ width: 120 }}>Môn {mon}</Text>
                                <TextInput
                                    style={[styles.inputFieldInput, { flex: 1 }]}
                                    placeholder="Nhập điểm"
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleUpdateDATA(`diemThi_${mon}_TC`, parseFloat(text))}
                                />
                            </View>
                        ))}
                    </View>

                    {/* Điểm học bạ */}
                    {tatCaMon.length > 0 && (
                        <View style={styles.inputField}>
                            <View style={styles.inputFieldRow}>
                                <Text style={[styles.inputFieldTitle, { flex: 3 }]}>Điểm Học THPT</Text>
                                {[10, 11, 12].map((lop) => (
                                    <Text key={`label-lop-${lop}`} style={[styles.inputFieldTableLabel, { flex: 1 }]}>Lớp {lop}</Text>
                                ))}
                            </View>
                            {tatCaMon.map((mon) => (
                                <View key={`diemTHPT-${mon}`} style={styles.inputFieldRow}>
                                    <Text style={[styles.inputFieldInputLabel, { flex: 3 }]}>Môn {mon}</Text>
                                    {[10, 11, 12].map((lop) => (
                                        <TextInput
                                            key={`diem_${mon}_${lop}`}
                                            style={[styles.inputFieldInput, { flex: 1 }]}
                                            placeholder="00.00"
                                            placeholderTextColor="#969696"
                                            keyboardType="numeric"
                                            onChangeText={(text) => handleUpdateDATA(`diemTB_${mon}_${lop}`, text)}
                                        />
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default DoiTuong4Screen;