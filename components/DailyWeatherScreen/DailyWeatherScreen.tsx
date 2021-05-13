import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useDateTime from '../../hooks/useDateTime'
import useLocation from '../../hooks/useLocation'
import useWeather from '../../hooks/useWeather'

const DailyWeatherScreen = () => {
    const [dayOfTheMonth, dayOfTheWeek, hours, minutes] = useDateTime();
    const [currentLocalWeather, userLocation] = useLocation();
    const London = useWeather();
    console.log('weatheeeerrr', currentLocalWeather)
    console.log('location', userLocation);
    console.log('london', London);

    return (
        <View style={styles.container}>
            <View style={styles.container_day}>
                <Text style={styles.date}>{dayOfTheWeek}, {dayOfTheMonth}</Text>
                <Text style={styles.time}>{hours}:{minutes}</Text>
            </View>
            <View style={styles.container_weather}>
                <View style={styles.weather_forecast}>
                    <Text style={styles.sign}>SUN</Text>
                    <Text style={styles.status}>SUNNY</Text>
                </View>
                
                <View style={styles.weather_info}>
                    <Text style={styles.temperature}>16°</Text>
                    <Text style={styles.location}>{userLocation ? userLocation.name : London}</Text>
                </View>
            </View>
        </View>
    )
}

export default DailyWeatherScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    container_day: {
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    date: {
      display:'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 20,
      fontSize: 20,
      color: 'white',
    },
    time: {
      fontSize: 50,
      fontWeight: 'bold',
      color: 'white',
    },
    container_weather: {
        marginTop: '10%',
        borderRadius: 10,
        width: '90%',
        height: '40%',
        backgroundColor: '#969B35',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    weather_forecast: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    sign: {
        fontSize: 70,
    },
    status: {
        color: 'white',
    },
    weather_info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    location: {
        color: 'white',
    },
    temperature: {
        fontSize: 60,
        color: 'white',
    }
  });