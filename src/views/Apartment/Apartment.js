import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import {getApartments, deleteApt} from '../../services/firebaseData';

export default function Apartment({ navigation }) {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [apts, setApts] = useState([]); // Initial empty array of apartments

    useEffect(() => {
        const subscriber = getApartments(setApts, setLoading);
        return () => subscriber();

    }, []);


    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={apts}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.record}
                        onPress={() => navigation.navigate('AptForm', item)}
                    >
                        <Text style={styles.apto}>APTO {item.description}</Text>
                        <Icon
                            name='trash'
                            type='ionicon'
                            color='#E81538'
                            padding={11}
                            size={35}
                            onPress={() => deleteApt(item.key)}
                        />
                    </TouchableOpacity>
                )}
            />
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0077cc',
        flexDirection: 'column',
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
        fontSize: 25,
        color: '#3076F0'
    },
})