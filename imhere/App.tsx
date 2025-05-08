import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from './src/screens/home';
import { Events } from './src/screens/events'; // Nova tela para listar eventos

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Eventos" component={Events} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}



