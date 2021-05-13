import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import useDateTime from '../../hooks/useDateTime'
import useWeather from '../../hooks/useWeather'
import useLocation from '../../hooks/useLocation'

const DailyWeatherScreen = () => {
    const [dayOfTheMonth, dayOfTheWeek, hours, minutes] = useDateTime();
    const {isLoading, location} = useLocation();
    const {currentLocalWeather, localWeatherLocation, London} = useWeather(location);
    console.log('USER LOCATION:', localWeatherLocation?.name)
    let image = currentLocalWeather ? currentLocalWeather.condition.icon : London?.current.condition.icon;

    return (
        <View style={styles.container}>
            {console.log(isLoading)}
            <View style={styles.container_day}>
                <Text style={styles.date}>{dayOfTheWeek}, {dayOfTheMonth}</Text>
                <Text style={styles.time}>{hours}:{minutes}</Text>
            </View>
            { !isLoading && 
            <View style={styles.container_weather}>
                <View style={styles.weather_forecast}>
                <Image source={{uri: 'https:'+image,}} style={{ width: 60, height: 60 }}
        />
                    <Text style={styles.status}>{currentLocalWeather ? currentLocalWeather.condition.text : London?.current.condition.text}</Text>
                </View>
                
                <View style={styles.weather_info}>
                    <Text style={styles.temperature}>{currentLocalWeather ? currentLocalWeather.temp_c : London?.current.temp_c}°</Text>
                    <Text style={styles.location}>{localWeatherLocation ? localWeatherLocation.name : London?.location.name}</Text>
                </View>
            </View>}
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