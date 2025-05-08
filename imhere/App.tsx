import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from './src/screens/home';
import { Events } from './src/screens/events'; // Nova tela para listar eventos

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'rgb(82, 78, 78)' }, // Cor do cabeçalho
        headerTintColor: 'white', // Cor do texto do cabeçalho
        drawerStyle: {
          backgroundColor: 'rgb(82, 78, 78)', // Fundo do Drawer
        },
        drawerActiveTintColor: 'white', // Cor do texto do item ativo
        drawerInactiveTintColor: 'rgb(0, 0, 0)', // Cor do texto do item inativo
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Events" component={Events} />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}



