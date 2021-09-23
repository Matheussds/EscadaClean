import React, { useState } from 'react'
import { Alert, View, TextInput, Text, StyleSheet, Share, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';

export default function AptForm({ route, navigation }) {


    const aptRoute = route.params

    const [description, setDescription] = useState(aptRoute ? aptRoute.description : '');
    const [user, setUser] = useState(aptRoute ? aptRoute.user : '');
    const [password, setPassword] = useState(aptRoute ? aptRoute.password : '');

    const apts = firestore().collection('apartments');


    function gerarCredenciais() {
        const aptUser = 'aleatório'
        const aptPassword = 'aleatório'
        setUser(aptUser);
        setPassword(aptPassword);
    }

    async function addApto() {
        try {
            await apts.add({
                description: description,
                user: user,
                password: password,
            })

        } catch (e) {
            Alert.alert("Falha")
        }

    }

    async function updateApto(keyApto) {
        try {
            await apts
                .doc(keyApto)
                .update({
                    description: description,
                    user: user,
                    password: password,
                })

        } catch (e) {
            Alert.alert("Falha")
        }

    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Olá, suas credenciais do Escada Clean são:\n\n' + 'Usuário: ' + user
                    + '\n' + 'Senha: ' + password + '\n\n'
                    + 'Aproveite e Baixe o App: \n'
                    + 'https://play.google.com/store/apps/details?id=com.appsinnova.android.keepclean'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("compartilhado com o tipo de atividade de: " + result.activityType);
                } else {
                    console.log("compartilhado");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("descartado");
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={style.container}>
            <TextInput
                style={style.input}
                keyboardType="numeric"
                value={description}
                onChangeText={setDescription}
                placeholder="Número do Apto"
            />
            <View>
                <Text style={style.credencial}>Login: {user}</Text>
                <Text style={style.credencial}>Senha: {password}</Text>
                <TouchableOpacity
                    style={style.buttonShare}
                    onPress={onShare}
                >
                    <Text style={style.txtButton}>Compatilhar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={style.button}
                onPress={() => { gerarCredenciais(); }}
            >
                <Text style={style.txtButton}>Gerar usúario e senha</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={style.button}
                onPress={() => { aptRoute ? updateApto(aptRoute.key) : addApto(); navigation.goBack() }}
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