import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Modal, Pressable, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';

//Criar função que gera a lista de limpeza com parametro de quantos registros exibir na tela.

export default function Home({ navigation }) {
    // Futuro FlatList no lugar di Scroll: 
    // https://www.youtube.com/watch?v=TjkFGrjkXfc&ab_channel=Sujeitoprogramador
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [cleaning_records, setRegisters] = useState([]); // Initial empty array of apartments

    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItemKey] = useState({ key: "", apt: "" });

    const records_list = firestore().collection('cleaning_record');

    useEffect(() => {
        const subscriber = records_list
            .onSnapshot((querySnapshot) => {
                const records = [];

                querySnapshot.forEach(documentSnapshot => {
                    records.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setRegisters(records);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use

        return () => subscriber();
    }, []);


    if (loading) {
        return <ActivityIndicator />;
    }

    async function updateStatus(newStatus) {

        try {
            await records_list
                .doc(item.key)
                .update({
                    status: newStatus
                })

        } catch (e) {
            Alert.alert("Falha")
        }

    }


    return (
        <View style={styles.container}>

            <FlatList
                data={cleaning_records}
                renderItem={({ item }) => (
                    <View
                        style={styles.record}
                    >

                        <Text style={styles.apto}> {item.apartment} </Text>
                        <Text style={styles.date}> {item.date} </Text>
                        <Icon
                            name={(() => {
                                if (item.status == 'check') {
                                    return 'checkmark-circle'
                                } else if (item.status == 'pending') {
                                    return 'warning'
                                } else if (item.status == 'dismiss') {
                                    return 'close-circle'
                                } else {
                                    return 'ellipsis-horizontal'
                                }

                            })()}
                            type='ionicon'
                            color={(() => {
                                if (item.status == 'check') {
                                    return '#18C74F'
                                } else if (item.status == 'pending') {
                                    return '#E6D925'
                                } else if (item.status == 'dismiss') {
                                    return '#E81538'
                                } else {
                                    return '#0077cc'
                                }

                            })()
                            }
                            size={35}
                            onPress={() => { setModalVisible(true), setItemKey({ key: item.key, apt: item.apartment }) }}
                        />
                    </View>
                )}
            />
            <View style={styles.references}>
                <View style={styles.reference_items}>
                    <Icon
                        name='checkmark-circle'
                        type='ionicon'
                        color='#18C74F'
                        size={20}
                    ></Icon>
                    <Text style={styles.txtLegend}>Limpeza concluida;</Text>
                </View>
                <View style={styles.reference_items}>
                    <Icon
                        name='warning'
                        type='ionicon'
                        color='#E6D925'
                        size={20}
                    ></Icon>
                    <Text style={styles.txtLegend}>Pendente de confirmação;</Text>
                </View>
                <View style={styles.reference_items}>
                    <Icon
                        name='close-circle'
                        type='ionicon'
                        color='#E81538'
                        size={20}
                    ></Icon>
                    <Text style={styles.txtLegend}>Confirmação recusada.</Text>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onPress={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.txtStatus}> Status {item.apt} </Text>
                        <View style={styles.statusItemContainer}>
                            <Icon
                                style={styles.icon}
                                name='checkmark-circle'
                                type='ionicon'
                                color='#18C74F'
                                size={60}
                                onPress={() => { updateStatus('check'); setModalVisible(!modalVisible) }}
                            ></Icon>
                            <Icon
                                style={styles.icon}
                                name='close-circle'
                                type='ionicon'
                                color='#E81538'
                                size={60}
                                onPress={() => { updateStatus('dismiss'); setModalVisible(!modalVisible) }}
                            ></Icon>
                            <Icon
                                style={styles.icon}
                                name='ellipsis-horizontal'
                                type='ionicon'
                                color='#0077cc'
                                size={60}
                                padding={20}
                                onPress={() => { updateStatus(''); setModalVisible(!modalVisible) }}
                            ></Icon>
                        </View>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Voltar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0077cc'
    },
    record: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 25
    },
    apto: {
        fontSize: 24,
        color: '#3076F0'
    },
    date: {
        fontFamily: 'Lato',
        fontSize: 24,
        color: '#3076F0'
    },
    references: {
        alignItems: 'center',
    },
    reference_items: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtLegend: {
        marginLeft: 5,
        color: 'white',
        fontSize: 20
    },
    txtStatus: {
        fontSize: 24,
        color: '#3076F0',
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    statusItemContainer: {
        flexDirection: 'row',
        borderColor: '#0077cc',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 20,
        padding: 20
    }

})