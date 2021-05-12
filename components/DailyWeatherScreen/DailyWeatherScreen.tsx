import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DailyWeatherScreen = () => {
    const [dayOfTheWeek, setDayOfTheWeek] = useState("");
    const [daysOfTheMonth, setDayOfTheMonth] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const getTime = () => {
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
        setHours(d.getHours());
        setMinutes(d.getMinutes());
    }

    useEffect(() => {
        getTime();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.day}>
                <Text style={styles.date}>{dayOfTheWeek}, {daysOfTheMonth}</Text>
                <Text style={styles.time}>{hours}:{minutes}</Text>
            </View>
            <View style={styles.weather}>
                <Text>London 19°</Text>
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
    day: {
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
    },
    time: {
      fontSize: 50,
      fontWeight: 'bold',
    },
    weather: {
        width: '90%',
        height: '20%',
        marginTop: '10%',
        backgroundColor: '#969B35'
    }
  });