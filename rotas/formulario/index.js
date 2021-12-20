
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, StatusBar, Alert, SafeAreaView, ScrollView, } from 'react-native';
import { Picker } from '@react-native-picker/picker';




export default function Oee({ navigation }) {

  const [parada, setParada] = useState('');
  const [tempoC, setTempoC] = useState('');
  const [pcBoa, setPcBoa] = useState('');
  const [pcRef, setPcRef] = useState('');
  const [pph, setPph] = useState('');
  const [hrsplanejadas, setHrsplanejada] = useState('');
  const [opaciti, setOpaciti] = useState(0);
  const [selecturno, setSelecturno] = useState('');


  // Parada planejada  //
  function H_trabalhadas(e) {
    return parseInt(((e * 60) * 60).toFixed(0));
  }

  const hrstrabalhadas = H_trabalhadas(hrsplanejadas.replace(',', '.'));

  function Calculo(turno) {

    /*
    LEGENDAS TEMPO DOS TURNOS
        'turno 1'   =  35280
        'turno 2'   =  33660
        'turno 3sg' =  21600 
        'turno 3sm' =  17460
        'turno 3sb' =  34020
    */

    // tratamento de erro //
    if (selecturno == '') {
      Alert.alert("Por Favor", "Selecione o Turno")
    }
    else if (parada == '' ||
      tempoC == '' || tempoC == 0 ||
      pcBoa == '' || pcBoa == 0 ||
      pcRef == '' || pph == ''
    ) {
      Alert.alert("Por Favor", "Preencha os Dados")
    }
    else if (hrsplanejadas == '' && opaciti == 1 ||
      parada == '' || tempoC == '' || tempoC == 0 ||
      pcBoa == '' || pcBoa == 0 || pcRef == '' || pph == '') {
      Alert.alert("Por Favor", "Preencha os Dados")
    }

    //else if (turno == '') {
    ///  Alert.alert("Por Favor","Selecione o Turno")
    // }

    else {

      let Parada = parada * 60;


      //DISPONIBILIDADE
      var dispo = ((parseInt(turno) - parseInt(Parada)) / parseInt(turno)) * 100

      //PERFORMANCE
      //string.indexOf(searchvalue, start)
      var perf = ((parseFloat(tempoC.replace(',', '.')) * (parseInt(pcBoa) + parseInt(pcRef))) / (turno - parseInt(Parada))) * 100

      //QUALIDADE
      var qual = (parseInt(pcBoa) / (parseInt(pcBoa) + parseInt(pcRef))) * 100

      //OEE
      var oee = ((dispo / 100) * ((perf > 100 ? perf = 100 : perf) / 100) * (qual / 100)) * 100

      //PPH  PÇ / (((35280/60)/60)* PPH)
      var pphr = pcBoa / (((turno / 60) / 60) * pph)

      // META PPH = 
      var meta = (((3600 / parseFloat(tempoC.replace(',', '.'))) / pph) * 85) / 100

      let Dispon = dispo.toFixed(1);
      let Perfor = perf.toFixed(1);
      let Qualid = qual.toFixed(1);
      let Oeer = oee.toFixed(1);
      let Pphr = pphr.toFixed(1) === "Infinity" ? '' : pphr.toFixed(1)
      let MetaPPH = meta.toFixed(1) === "Infinity" ? '' : meta.toFixed(1);

      navigation.navigate('Resultado', { Dispon, Perfor, Qualid, Oeer, Pphr, MetaPPH, turno })
    }

  }

  function Onclick() {
    opaciti == 1 && selecturno == "Parada Planejada" ? Calculo(hrstrabalhadas) : Calculo(selecturno);
  }

  

  return (


    <SafeAreaView style={styles.conteiner}>


      <ScrollView>
        <StatusBar backgroundColor='#F5F5F5' barStyle='dark-content' />

        <View style={styles.heard}><Text style={styles.htitle}>Calculo OEE</Text></View>

        <View >
          <View style={{ margin: 5, borderWidth: 1, borderRadius: 5, backgroundColor: '#DCDCDC' }}>
            <Picker
              selectedValue={selecturno}
              style={{ height: 50 }}
              onValueChange={(value) => { setSelecturno(value), value == "Parada Planejada" ? setOpaciti(1) : setOpaciti(0) }}
            >

              <Picker.Item label="Selecione Seu Turno" value='' style={styles.title} />
              <Picker.Item label="Turno 1" value="35280" style={styles.title} />
              <Picker.Item label="Turno 2" value="33660" style={styles.title} />
              <Picker.Item label="Turno 3 Segunda" value="21600" style={styles.title} />
              <Picker.Item label="Turno 3 Semana" value="17460" style={styles.title} />
              <Picker.Item label="Turno 3 Sabado" value="34020" style={styles.title} />
              <Picker.Item label="Parada Planejada" value="Parada Planejada" style={styles.title} />
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ opacity: opaciti }}>
            <View style={styles.viewInputHRs} >
              <Text style={styles.title}>Hrs. Trab... </Text>
              <TextInput style={styles.inputHTB}

                placeholder='H.TRAB' onChangeText={(text) => { setHrsplanejada(text) }}
                value={hrsplanejadas}
                keyboardType='numeric'

              />
            </View>
          </View>


          <View style={styles.viewInputPPH}>
            <Text style={styles.title}>PPH: </Text>
            <TextInput style={styles.inputPPH}

              placeholder='PPH' onChangeText={(text) => { setPph(text) }}
              value={pph}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.title}>Parada em Minuto : </Text>
          <TextInput style={styles.input}

            placeholder='Parada' onChangeText={(text) => { setParada(text) }}
            value={parada}
            keyboardType='numeric'
          />
        </View>

        <View style={styles.viewInput}>
          <Text style={styles.title}>Tempo de Ciclo :     </Text>
          <TextInput style={styles.input}
            placeholder='T.Ciclo' onChangeText={(text) => { setTempoC(text) }}
            value={tempoC} numberOfLines4
            keyboardType='numeric'
          />
        </View>

        <View style={styles.viewInput}>
          <Text style={styles.title}>Peças Boas Prod... :</Text>
          <TextInput style={styles.input}
            placeholder='Pç Boas Prod.' onChangeText={(text) => { setPcBoa(text) }}
            value={pcBoa}
            keyboardType='numeric'
          />
        </View>

        <View style={styles.viewInput}>
          <Text style={styles.title}>Peças Refugadas :   </Text>
          <TextInput style={styles.input}
            placeholder='Pç Ref.' onChangeText={(text) => { setPcRef(text) }}
            value={pcRef}
            keyboardType='numeric'
          />
        </View>


        <TouchableOpacity style={styles.bt} onPress={Onclick}>
          <Text style={styles.BtTextCal}>Calcular</Text>
        </TouchableOpacity>


      </ScrollView>

    </SafeAreaView>







  );

}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },

  heard: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

  },

  htitle: {
    fontSize: 30,
    fontWeight: 'bold',

  },

  viewInputHRs: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 2,
    elevation: 2,//elevaçao sombra na view no (android)
    shadowColor: "#000",//elevaçao sombra na view (ios)
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },// fim elevaçao sombra
  
  viewInputPPH: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 2,
    elevation: 2,//elevaçao sombra na view no (android)
    shadowColor: "#000",//elevaçao sombra na view (ios)
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },// fim elevaçao sombra
  
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 3,
    elevation: 2,//elevaçao sombra na view no (android)
    shadowColor: "#000",//elevaçao sombra na view (ios)
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },// fim elevaçao sombra
  
 title: {
    marginLeft: 7,
    fontSize: 18,
    fontWeight: 'bold',
  },

  inputHTB: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'column',
    width: 80,
    height: 40,
    marginHorizontal: '2.5%',
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 17,
    elevation: 2,//elevaçao sombra na view no (android)
    shadowColor: "#000",//elevaçao sombra na view (ios)
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },// fim elevaçao sombra

  inputPPH: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'column',
    width: 60,
    height: 40,
    marginHorizontal: '2.5%',
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 17,
    elevation: 2,//elevaçao sombra na view no (android)
    shadowColor: "#000",//elevaçao sombra na view (ios)
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },// fim elevaçao sombra

  input: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'column',
    width: 135,
    height: 40,
    marginHorizontal: '2.5%',
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 17,
    elevation: 2,//elevaçao sombra na view no (android)
    shadowColor: "#000",//elevaçao sombra na view (ios)
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },// fim elevaçao sombra

  bt: {
    backgroundColor: '#4682B4',
    height: 50,
    margin: 5,
    marginTop: 15,
    //padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 2.5,//elevaçao sombra na view no (android)
    shadowColor: "#000",//elevaçao sombra na view (ios)
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },// fim elevaçao sombra

  BtTextCal: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },

  image: {

    justifyContent: "center",
    width: '100%',
    height: '100%'
  },



})