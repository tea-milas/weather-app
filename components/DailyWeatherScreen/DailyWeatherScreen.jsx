import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useWeather from '../../hooks/useWeather';

const DailyWeatherScreen = () => {
    const [currentLocalWeather] = useWeather();

    const [dayOfTheWeek, setDayOfTheWeek] = useState('');
    const [daysOfTheMonth, setDayOfTheMonth] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState('');

    const getTime = () => {
        const d = new Date();
        setHours(d.getHours());

        if (d.getMinutes() < 10) {
            setMinutes(`0${d.getMinutes()}`);
        } else {
            setMinutes(`${d.getMinutes()}`)
        }
        
        setTimeout(getTime, 30000);
    }

    const getDate = () => {
        const d = new Date();
        switch (d.getDay()) {
            case 0:
                setDayOfTheWeek("Sunday");
              break;
            case 1:
                setDayOfTheWeek("Monday");
              break;
            case 2:
                setDayOfTheWeek("Tuesday");
              break;
            case 3:
                setDayOfTheWeek("Wednesday");
              break;
            case 4:
                setDayOfTheWeek("Thursday");
              break;
            case 5:
                setDayOfTheWeek("Friday");
              break;
            case 6:
                setDayOfTheWeek("Saturday");
        }

        setDayOfTheMonth(d.getDate());
    }

    useEffect(() => {
        getTime();
        getDate();
    }, [30000])
    

    return (
        <View style={styles.container}>
            <View style={styles.container_day}>
                <Text style={styles.date}>{dayOfTheWeek}, {daysOfTheMonth}</Text>
                <Text style={styles.time}>{hours}:{minutes}</Text>
            </View>
            <View style={styles.container_weather}>
                <View style={styles.weather_forecast}>
                    <Text style={styles.sign}>{currentLocalWeather.current.condition.icon}</Text>
                    <Text style={styles.status}>{currentLocalWeather.current.condition.text}</Text>
                </View>
                
                <View style={styles.weather_info}>
                    <Text style={styles.temperature}>{currentLocalWeather.current.temp_c}°</Text>
                    <Text style={styles.location}>{currentLocalWeather.location.name}</Text>
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