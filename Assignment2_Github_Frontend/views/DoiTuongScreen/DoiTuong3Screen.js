import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Picker } from "@react-native-picker/picker"

import { styles } from './DoiTuongScreenStyleSheet';

import toHopMonData from './ToHopMon.json';
import nganhXetTuyenData from './NganhXetTuyen.json';

const DoiTuong3Screen = ({ DATA_DiemHocLuc, setDATA_DiemHocLuc }) => {

    const handleUpdateDATA = (index, value) => {
        setDATA_DiemHocLuc(prev => ({
            ...prev,
            [index]: value,
        }));
    };
 
    useEffect(() => {
        setDATA_DiemHocLuc(null)
        handleUpdateDATA('doiTuong', 3)
    }, []);

    const nganhXetTuyen = nganhXetTuyenData;
    const toHopMon = toHopMonData;

    const [nganh, setNganh] = useState(null);

    let monBatBuoc_List = [];
    let monTuChon_List = [];
    let monTatCa_List = [];

    function layDanhSachMon(nganh) {
        if (!nganh) return [];
        const toHopMon_List = nganh.toHopMon.split(' - ');
        const temp_mon_List = toHopMon_List.flatMap(id =>
            toHopMon[id] || []
        );
        const mon_List = [...new Set(temp_mon_List)];
        monTatCa_List = mon_List;
        monBatBuoc_List = mon_List.slice(0, 2);
        monTuChon_List = mon_List.slice(2);

        return mon_List;
    }


    const [TotNghiepTHPTChoice, setTotNghiepTHPTChoice] = useState(false);

    const [ChungChi, setChungChi] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);

    const ChungChiChoice = ['SAT', 'ACT', 'IB', 'A-LEVEL'];

    const handleChoiceSelect = (choice) => {
        setChungChi(choice);
        setModalVisible(false);
    };

    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {'Thí Sinh Tốt Nghiệp\nChương Trình THPT Nước Ngoài'}
                    </Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.inputField}>
                        <Text style={styles.inputFieldTitle}>Ngành Xét Tuyển</Text>

                        <Picker
                            selectedValue={nganh}
                            onValueChange={(item) => {
                                handleUpdateDATA("danhSachMon", layDanhSachMon(item))
                                handleUpdateDATA("danhSachToHopMon", item.toHopMon)
                                setNganh(item)
                            }}
                            style={[styles.inputFieldInput, {
                                height: 50,
                                width: '100%',
                                marginLeft: 0,
                            }]}
                            dropdownIconColor="#333"
                        >
                            <Picker.Item label="-- Chọn mã ngành --" value={null} />

                            {nganhXetTuyen.map((item) => (
                                <Picker.Item
                                    key={item.id}
                                    label={`${item.id} - ${item.nganh}`}
                                    value={item}
                                />
                            ))}

                        </Picker>

                        {nganh && (
                            <View style={{ width: '100%', marginTop: 15 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Tổ hợp môn xét tuyển:</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17}}>{nganh.toHopMon}</Text>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Các môn khả dụng:</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15}}>{layDanhSachMon(nganh).join(" - ")}</Text>
                                </View>
                            </View>
                        )}
                    </View>

                    {
                        nganh == null ? null :
                            <View style = {{width: '100%'}}>
                                <View style={styles.inputField}>
                                    <Text style={styles.inputFieldTitle}>Điểm Năng Lực</Text>
                                    <View style={styles.staticField}>
                                        <Text style={styles.staticFieldText}>
                                            {'= [ Điểm Học THPT ]'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.inputField}>
                                    <Text style={styles.inputFieldTitle}>Điểm Tốt Nghiệp THPT</Text>
                                    <TouchableOpacity style={[styles.inputFieldRow, { marginBottom: 12, }]}
                                        onPress={() => {
                                            setTotNghiepTHPTChoice(!TotNghiepTHPTChoice), setChungChi(null)
                                            handleUpdateDATA('chungChiQuocTe', null)
                                            handleUpdateDATA('diemChungChiQuocTe', null)
                                        }}>
                                        <View style={[styles.radioButton, TotNghiepTHPTChoice && styles.radioButtonSelected]} />
                                        <Text style={[styles.radioText, TotNghiepTHPTChoice && styles.radioTextSelected]}>
                                            Thí sinh CÓ chứng chỉ tuyển sinh quốc tế
                                        </Text>
                                    </TouchableOpacity>
                                    {TotNghiepTHPTChoice ?
                                        <View style={[styles.inputFieldRow]}>
                                            <Text style={[styles.inputFieldInputLabel, { flex: 2 }]}>Điểm Chứng Chỉ</Text>
                                            <TextInput style={[styles.inputFieldInput, { flex: 1 }]}
                                                placeholder='00.00'
                                                placeholderTextColor={'#969696ff'}
                                                keyboardType="numeric"
                                                onChangeText={(text) => {
                                                    handleUpdateDATA('diemChungChiQuocTe', parseFloat(text));
                                                }}
                                            />
                                            <TouchableOpacity style={[styles.inputFieldInput, { flex: 1 }]} onPress={() => { setModalVisible(true) }}>
                                                <Text style={[styles.inputFieldPickerText, ChungChi != null && { color: '#000000' }]}>
                                                    {ChungChi != null ? ChungChi : '--'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={styles.staticField}>
                                            <Text style={styles.staticFieldText}>{'= [Điểm Học THPT]'}</Text>
                                        </View>
                                    }
                                </View>

                                <View style={styles.inputField}>
                                    <View style={styles.inputFieldRow}>
                                        <Text style={[styles.inputFieldTitle, { flex: 3, marginBottom: 5 }]}>Điểm Học THPT</Text>
                                        {[10, 11, 12].map((Mon, index) => (
                                            <Text key={`Lop-${index}`} style={[styles.inputFieldTableLabel, { flex: 1 }]}>{Mon}</Text>
                                        ))}
                                    </View>

                                    {monTatCa_List.map((mon) => (
                                        <View key={`diemTBLop-${mon}`} style={styles.inputFieldRow}>
                                            <Text style={[styles.inputFieldInputLabel, { flex: 3 }]}>
                                                Điểm TB {mon}
                                            </Text>
                                            {
                                                [10, 11, 12].map((lop) => (
                                                    <TextInput
                                                        key={`diemMon_${mon}_${lop}`}
                                                        style={[styles.inputFieldInput, { flex: 1 }]}
                                                        placeholder="00.00"
                                                        placeholderTextColor="#969696"
                                                        keyboardType="numeric"
                                                        onChangeText={(text) => handleUpdateDATA(`diemTB_${mon}_${lop}`, parseFloat(text))}
                                                    />
                                                ))
                                            }
                                        </View>
                                    ))}

                                </View>
                            </View>
                    }
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
                                    onPress={() => { handleChoiceSelect(choice), handleUpdateDATA('chungChiQuocTe', choice) }}>
                                    <Text style={styles.choiceText}>{choice}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>
            </View>
        </ScrollView>
    )
};

export default DoiTuong3Screen;