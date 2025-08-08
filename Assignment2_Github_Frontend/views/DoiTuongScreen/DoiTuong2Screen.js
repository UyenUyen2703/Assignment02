import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, } from 'react-native';
import { Picker } from "@react-native-picker/picker"

import { styles } from './DoiTuongScreenStyleSheet';

import toHopMonData from './ToHopMon.json';
import nganhXetTuyenData from './NganhXetTuyen.json';

const DoiTuong2Screen = ({ DATA_DiemHocLuc, setDATA_DiemHocLuc }) => {

    const handleUpdateDATA = (index, value) => {
        setDATA_DiemHocLuc(prev => ({
            ...prev,
            [index]: value,
        }));
    };

    useEffect(() => {
        setDATA_DiemHocLuc(null)
        handleUpdateDATA('doiTuong', 2)
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

    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {'Thí sinh KHÔNG CÓ kết quả thi\nĐánh giá Năng lực ĐHQG-HCM năm 2025'}
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
                                            {'= [ Điểm Tốt Nghiệp THPT ] x 0.75'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.inputField}>
                                    <Text style={styles.inputFieldTitle}>Điểm Tốt Nghiệp THPT</Text>
                                    {monBatBuoc_List?.map((Mon, index) => (
                                        <View key={`Mon-${index}`} style={styles.inputFieldRow}>
                                            <Text style={[styles.inputFieldInputLabel, { flex: 1 }]}>Điểm Thi {Mon} *</Text>
                                            <TextInput
                                                style={[styles.inputFieldInput, { flex: 1 }]}
                                                placeholder="00.00"
                                                placeholderTextColor="#969696"
                                                keyboardType="numeric"
                                                onChangeText={(text) => handleUpdateDATA(`diemThi_${Mon}`, parseFloat(text))}
                                            />
                                        </View>
                                    ))}
                                    {monTuChon_List?.map((Mon, index) => (
                                        <View key={`Mon-${index}`} style={styles.inputFieldRow}>
                                            <Text style={[styles.inputFieldInputLabel, { flex: 1 }]}>Điểm Thi {Mon}</Text>
                                            <TextInput
                                                style={[styles.inputFieldInput, { flex: 1 }]}
                                                placeholder="00.00"
                                                placeholderTextColor="#969696"
                                                keyboardType="numeric"
                                                onChangeText={(text) => handleUpdateDATA(`diemThi_${Mon}_TC`, parseFloat(text))}
                                            />
                                        </View>
                                    ))}
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
            </View>
        </ScrollView>
    )
};

export default DoiTuong2Screen;