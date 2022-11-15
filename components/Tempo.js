//rafce
import React from 'react'
import moment from 'moment-timezone';
import Busca from './Busca'
moment.locale('pt-br');

import {
    Image, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput,
    View
} from 'react-native'

const Tempo = ({weatherData}) => {
  return (
    <ScrollView horizontal={false} style={styles.scrollView}>
        <TempoAtual data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}/>
        <TempoFuturo data={weatherData}/>
    </ScrollView>
  )
}

const TempoAtual = ({data}) => {
    if(data && data.weather){
        const imagemTempo = {uri: 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png'}
        return(
            <View>
                <View>
                    <Busca/>
                </View>
                <View style={styles.TempoAtualContainer}>
                    <Image source={imagemTempo} style={styles.imagemTempo}/>
                    <View style={styles.diaContainer}>
                        <Text style={styles.diaSemana}>Hoje</Text>
                        <Text style={styles.diaSemana}>{moment(data.dt * 1000).format('dddd')}</Text>
                        <Text style={styles.temperatura}>Dia {Math.round(data.temp.day)}&#176;C</Text>
                        <Text style={styles.temperatura}>Noite {Math.round(data.temp.night)}&#176;C</Text>
                    </View>
                </View>
            </View>
    
        )
    }else{
        return 
        <View>

        </View>
    }
}

const TempoFuturo = ({data}) => {
    return (
        <View>

            {
                data && data.length > 0 ? 

                data.map((data, idx) => (

                    idx !== 0 &&  <TempoFuturoItem key={idx} itemFuturo={data}/>
                ))

                :

                <View/>
            }
          
        </View>
    )

}

const TempoFuturoItem = ({itemFuturo}) => {
    const imagemTempoFuturo = {uri: 'http://openweathermap.org/img/wn/'+itemFuturo.weather[0].icon+'@2x.png'}
    return (
        <View style={styles.TempoFuturoContainer}>
            <Text style={styles.diaSemana}>{moment(itemFuturo.dt * 1000).format('dddd')}</Text>
            <Image source={imagemTempoFuturo} style={styles.imagemTempoFuturo}/>
            <Text style={styles.temperatura}>Dia {Math.round(itemFuturo.temp.day)}&#176;C</Text>
            <Text style={styles.temperatura}>Noite {Math.round(itemFuturo.temp.night)}&#176;C</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 0.4,
        backgroundColor: '#18181b99',
        padding: 30
    },

    imagemTempo: {
      width:150,
      height:150
    },

    imagemTempoFuturo: {
        width:100,
        height:100
      },

    TempoAtualContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000000033',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 1,
        padding: 20,
        margin: 5, 
        marginLeft: 10,
    },

    TempoFuturoContainer: {
        flex: 1,
        backgroundColor: '#000000033',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 1,
        padding: 20,
        margin: 5, 
        marginLeft: 10,
    },

    diaContainer: {
        paddingRight: 40
    },

    diaSemana: {
        fontSize: 20,
        color: 'white',
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign: "center",
        borderRadius: 50,
        fontWeight: "200",
        marginBottom: 15
    },

    temperatura: {
        fontSize: 18,
        color: "white",
        fontWeight: "100",
        textAlign: "center",
        justifyContent: "center",
        
    }


});

export default Tempo