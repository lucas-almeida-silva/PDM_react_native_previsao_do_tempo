//rafce
import React, { useEffect, useMemo, useState } from 'react'
import { Text, View } from 'react-native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import * as Location from 'expo-location';

import { ItemInfo } from './ItemInfo';
import { styles } from './styles';

import { api } from '../../lib/api';

export const CurrentWeather = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);

  const hourFormatted = useMemo(() => {
    return format(currentDate, 'KK:mm aaa');
  }, [currentDate]);

  const dateFormatted = useMemo(() => {
    return format(currentDate, 'EEEE, dd MMM', {
      locale: ptBR,
    });
  }, [currentDate]);

  const sunriseFormatted = useMemo(() => {
    return weather 
      ? format(new Date(weather.sys.sunrise * 1000), 'hh:mm aaa')
      : '00:00'
  }, [weather]);

  const sunsetFormatted = useMemo(() => {
    return weather 
      ? format(new Date(weather.sys.sunset * 1000), 'hh:mm aaa')
      : '00:00';
  }, [weather]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 30); // 30 seconds

    return () => {
      clearInterval(interval);
    }
  }, [])

  useEffect(() => {
    const handleGetCoords = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('Você deve permitir o acesso a localização para exibirmos as informações de clima!');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setCoords(coords);
    }

    handleGetCoords();
  }, []);

  useEffect(() => {
    if (coords) {
      const { latitude, longitude } = coords;

      api.get(`/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`)
        .then(response => {
          setWeather(response.data);
        });
    }
  }, [coords, currentDate]);

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.hour}>{hourFormatted}</Text>
      <Text style={styles.date}>{dateFormatted}</Text>

      <View style={styles.infoContainer}>
        <ItemInfo
          title="Temperatura Local"
          value={Math.round(weather?.main?.temp ?? 0)}
          unit="ºC"
        />

        <ItemInfo
          title="Humidade do ar"
          value={weather?.main?.humidity ?? 0}
          unit="%"
        />

        <ItemInfo
          title="Nascer do Sol"
          value={sunriseFormatted}
          unit=""
        />

        <ItemInfo
          title="Por do Sol"
          value={sunsetFormatted} 
          unit="" 
        />
      </View>

      <Text style={styles.locale}>{weather?.name}</Text>
    </View>
    </View>
  );
}