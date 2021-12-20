
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';



export default function Resultado(props) {



  return (
    <SafeAreaView style={styles.conteiner} >

      <View style={{marginHorizontal:5,marginVertical:10,backgroundColor:'#DCDCDC',borderRadius:5,elevation:3}}>
        <View style={{ marginTop: 5, alignItems: 'center' }}>
          <Text style={styles.title}>RESULTADO OEE</Text>
        </View>
        <View style={{ marginBottom:10, alignItems: 'center' }}>
          <Text style={styles.title}>Base do Calculo: {props.route.params.turno+'s'}</Text>
        </View>
      </View>
      <View style={styles.viewtext}>
        <Text style={styles.title}>Disponibilidade : </Text><Text style={styles.titleC}>{props.route.params.Dispon+'%'}</Text>
      </View>

      <View style={styles.viewtext}>
        <Text style={styles.title}>Performance : </Text><Text style={styles.titleC}>{props.route.params?.Perfor+'%'}</Text>
      </View>

      <View style={styles.viewtext}>
        <Text style={styles.title}>Qualidade : </Text><Text style={styles.titleC}>{props.route.params?.Qualid+'%'}</Text>
      </View>

      <View style={styles.viewtext}>
        <Text style={styles.title}>OEE : </Text><Text style={styles.titleC}>{props.route.params?.Oeer+'%'}</Text>
      </View>
     
      
      <View style={styles.viewtext}>
        <Text style={styles.title}>PPH : </Text><Text style={styles.titleC}>{props.route.params?.Pphr+'%'}</Text>
      </View>
      
     
      <View style={styles.viewtext2}>
        <Text style={styles.title2}>META DO PPH: </Text><Text style={styles.title2}>{props.route.params?.MetaPPH+'%'}</Text>
      </View>
     

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#F5F5F5',

  },
  viewtext: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    height: 40,
    marginHorizontal: 2,
    marginVertical: 5,
    elevation: 2,//elevaçao sombra na view no (android)
    shadowColor: "#000",//elevaçao sombra na view (ios)
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },// fim elevaçao sombra

viewtext2: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#DCDCDC',
  borderWidth: 1,
  borderRadius: 5,
  borderBottomWidth: 0,
  borderTopWidth: 0,
  height: 20,
  marginHorizontal: 2,
  marginVertical: 5,
  elevation: 2,//elevaçao sombra na view no (android)
    shadowColor: "#000",//elevaçao sombra na view (ios)
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },// fim elevaçao sombra
  
title2: {
  marginLeft: 7,
  fontSize: 10,
  fontWeight: 'bold',
  color: '#1C1C1C',

},
  title: {
    marginLeft: 7,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1C',

  },
  titleC: {
    marginLeft: 7,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  bt: {
    width: 200,
    height: 50,
    backgroundColor: '#00868B',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  }



});

