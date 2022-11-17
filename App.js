import { useState } from 'react'
import { SafeAreaView, StatusBar, ImageBackground, StyleSheet, Text, Platform } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'

import { CurrentWeather } from './src/components/CurrentWeather';
import { SearchWeather } from './src/components/SearchWeather';
import { Historico } from './src/components/Historico'; 

import image1 from './src/assets/fundo1.png';
import image2 from './src/assets/fundo2.png';
import image3 from './src/assets/fundo3.png';

export default function App() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Tab style={{ backgroundColor: '#18181b99', width: '100%' }}
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
        >
          <Tab.Item
            title="Agora"
            titleStyle={styles.tab}
          />
          <Tab.Item
            title="Pesquisar"
            titleStyle={styles.tab}
          />
          <Tab.Item
            title="Histórico"
            titleStyle={styles.tab}
          />
        </Tab>

        <TabView style={styles.container} value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ width: '100%' }}>
            <ImageBackground source={image1} resizeMode="cover" style={styles.image}>
              <CurrentWeather />
            </ImageBackground>
          </TabView.Item>
          
          <TabView.Item style={{ width: '100%' }}>
            <ImageBackground source={image2} resizeMode="cover" style={styles.image}>
            <SearchWeather />
          </ImageBackground>

          </TabView.Item>
          <TabView.Item style={{ opacity: 0.7, width: '100%' }}>
            <Text>1</Text>
            <ImageBackground source={image3} resizeMode="cover" style={styles.image}>
              <Historico/>
            </ImageBackground>
          </TabView.Item>
        </TabView>
      </SafeAreaView>

      <ExpoStatusBar backgroundColor="#18181b99" /> 
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  image: {
    flex: 1,
  },
  tab: {
    fontSize: 17, 
    color: 'white', 
    fontWeight: 'bold',
  }
});
