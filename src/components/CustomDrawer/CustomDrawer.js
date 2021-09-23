import React from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'
import { DrawerItemList } from '@react-navigation/drawer';

export default ({ ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Escada Clean</Text>
            <Text style={styles.email}>matheussenna2009@hotmail.com</Text>
            <DrawerItemList {...props} />
            <View style={styles.button_container}>
                <Button title="Sair" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        borderColor: '#AAA',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: '#3076F0',
        marginBottom: 5,
        fontSize: 24,
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Lato',
    },
    email: {
        textAlign: 'center',
        fontFamily: 'Lato',
        color: '#3076F0',
    },
    button_container: {
        paddingHorizontal: 20,
        textAlign: 'center',
        marginTop: 50
    }
})