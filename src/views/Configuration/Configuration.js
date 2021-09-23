import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'

// A configuração de data não pode ser antes da data atual.

export default function Configuration() {
    return (
        <View style={style.container}>
            <TextInput
                style={style.input}
                keyboardType="numeric"
                placeholder="Apto inicial"
            />
            <TextInput
                style={style.input}
                placeholder="Data de inicio"
            />
            <TextInput
                style={style.input}
                keyboardType="numeric"
                placeholder="Intervalo fechado"
            />

            <TouchableOpacity
                style={style.button}

            >
                <Text style={style.txtButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 12
    },
    input: {
        height: 50,
        borderColor: '#0077cc',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        color: '#3076F0',
        fontSize: 20,
        paddingLeft: 10
    },
    credencial: {
        fontSize: 25,
        color: '#3076F0'
    },
    button: {
        alignItems: "center",
        backgroundColor: '#3076F0',
        padding: 10,
        marginBottom: 15
    },
    buttonShare: {
        alignItems: "center",
        backgroundColor: '#3076F0',
        padding: 10,
        marginBottom: 15,
        width: '50%'
    },
    txtButton: {
        fontSize: 20,
        color: '#FFF'
    }
})