import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, View, TextInput} from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import DataHora from './components/DataHora';
import Tempo from './components/Tempo';
import Historico from './components/Historico';

const image1 = require('./assets/fundo1.png');
const image2 = require('./assets/fundo2.png');
const image3 = require('./assets/fundo3.png');

const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';

export default function App() {
  const [data, setData] = useState({});

  useEffect (() => {
    navigator.geolocation.getCurrentPosition((success) => {

      let {latitude, longitude} = success.coords;
      fetchDataFromApi (latitude, longitude)

    }, (err) => {
      if(err){
        //Se a localização estiver desativada, irá mostra São Paulo como default
        fetchDataFromApi("-23.5489", "-46.6388")
      }
    })
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
  
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}
    `).then(res => res.json()).then(data => {
  
        console.log(data)
        setData(data)
      })
  }

  const [index, setIndex] = React.useState(0);
  return (
    <View style={styles.container}>
    <Tab style={{backgroundColor: '#18181b99', width: '100%' }}
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 3,
      }}
    >
      <Tab.Item
        title="Agora"
        titleStyle={{fontSize: 18, color:'white', fontWeight: 'bold' }}
      />
      <Tab.Item
        title="Pesquisar"
        titleStyle={{ fontSize: 18, color:'white', fontWeight: 'bold' }}
      />
      <Tab.Item
        title="Histórico"
        titleStyle={{ fontSize: 18, color:'white', fontWeight: 'bold' }}
      />
    </Tab>
    <TabView style={styles.container} value={index} onChange={setIndex} animationType="spring">  
        
          <TabView.Item style={{width: '100%' }}>
          <ImageBackground source={image1} resizeMode="cover" style={styles.image}>
            <DataHora current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
          </ImageBackground>
        </TabView.Item>
        <TabView.Item style={{width: '100%' }}>
          <ImageBackground source={image2} resizeMode="cover" style={styles.image}>
            <Tempo weatherData={data.daily}/>
          </ImageBackground>
        </TabView.Item>
        <TabView.Item style={{opacity:"0.7", width: '100%' }}>
          <ImageBackground source={image3} resizeMode="cover" style={styles.image}>
            <Historico/>
          </ImageBackground>
        </TabView.Item>
    </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2.5,
  },
  image: {
    flex: 1,
  },
});
