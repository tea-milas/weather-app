import * as React from 'react';
import { StyleSheet } from 'react-native';
import DailyWeatherScreen from '../components/CurrentWeather/CurrentWeather';
import HourlyWeather from '../components/HourlyWeather/HourlyWeather';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <DailyWeatherScreen />
      <HourlyWeather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'beige',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
