import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Oee from '../formulario/';
import Resultado from '../result/';

const Stack = createNativeStackNavigator();



export default function Routes() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Overall Equipment Efficieny'>

        <Stack.Screen name='Overall Equipment Efficieny' component={Oee} 
        options={
          {headerStyle:{backgroundColor:'#4682B4'},
         headerTitleAlign:'center',/*  headerShown: false /* tira o heard  */
         }}/>
        <Stack.Screen name='Resultado' component={Resultado} 
        options={
         {title:'Voltar a Base do Calculo',headerStyle:{backgroundColor:'#4682B4'},
        headerTitleAlign:'center'
        }}
        />

      </Stack.Navigator>
    </NavigationContainer>


  );
};

