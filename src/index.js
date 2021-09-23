import 'react-native-gesture-handler';

import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './views/Home/Home';
import Configuration from './views/Configuration/Configuration';
import Apartment from './views/Apartment/Apartment';
import AptForm from './views/Apartment/AptForm';
import CustomDrawer from './components/CustomDrawer/CustomDrawer'
import { Icon } from 'react-native-elements'


function StackNav() {
    return (
        <Stack.Navigator initialRouteName="Inicial" screenOptions={{ headerTintColor: '#3076F0' }}>
            <Stack.Screen name="Inicial" component={DrawerNav} options={{ headerShown: false }} />
            <Stack.Screen name="AptForm" component={AptForm} options={{ title: 'Apartamento' }} />
        </Stack.Navigator>
    )
}

function DrawerNav() {
    return (
        <Drawer.Navigator screenOptions={{ headerTintColor: '#3076F0' }}
            drawerContent={CustomDrawer} >
            <Drawer.Screen name="Home" component={Home} options={{
                drawerLabel: 'Inicio',
                title: 'Registro de Limpeza'
            }} />
            <Drawer.Screen name="Configuração" component={Configuration} />
            <Drawer.Screen name="Apartamentos" component={Apartment} options={({ navigation }) => {

                return {
                    headerRight: () => (
                        <Icon
                            iconStyle={{ marginRight: 10 }}
                            name='add-outline'
                            type='ionicon'
                            color='#18C74F'
                            size={40}
                            onPress={() => navigation.navigate('AptForm')}
                            title="Info"
                            color="#0077cc"
                        />
                    )
                }
            }}
            />
        </Drawer.Navigator >
    )

}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



export default function App() {

    return (
        <NavigationContainer>
            <StackNav />
        </NavigationContainer>
    );
}