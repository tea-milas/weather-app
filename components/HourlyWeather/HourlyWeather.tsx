import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, FlatList } from 'react-native';
import useWeather, {IForecastday} from '../../hooks/useWeather'
import useLocation from '../../hooks/useLocation'
import { ScrollView } from 'react-native-gesture-handler';
import useDateTime from '../../hooks/useDateTime';

const WeeklyWeather = () => {
    const [hours] = useDateTime();
    const {isLoading, location} = useLocation();
    const {forecast, London} = useWeather(location);
    
    const timeOfTheDay = (str: string) => {
        let time = str.substr(str.length-5);
        return time;
    }

    return (
        <View style={styles.container}>
            {isLoading || !forecast || !London ? <ActivityIndicator/> : 
                        (<ScrollView horizontal={true} >
                            {forecast ? forecast.forecastday[0].hour.map(h => (<View style={styles.container__weekly_weather__day} key={h.time}>
                                <Text style={styles.time}>{timeOfTheDay(h.time)}</Text>
                                <Image source={{uri: 'https:'+ h.condition.icon}} style={{ width: 40, height: 40 }} />
                                <Text style={styles.text}>{h.temp_c}°</Text>
                            </View>) ) :
                                London.forecast.forecastday[0].hour.map(h => (<View style={styles.container__weekly_weather__day} key={h.time}>
                                        <Text style={styles.time}>{timeOfTheDay(h.time)}</Text>
                                        <Image source={{uri: 'https:'+ h.condition.icon}} style={{ width: 60, height: 60 }} />
                                        <Text style={styles.text}>{h.temp_c}°</Text>
                                    </View>) )
                            }
                        </ScrollView>
                        )
            }
                
            
        </View>
    )
}

export default WeeklyWeather

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 0,
        width: '100%',
        height: '23%',
    },
    container__weekly_weather__day: {
        width: 100,
        backgroundColor: 'lightblue',
        marginEnd: 5,
        marginBottom: 0,
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        marginLeft: 8,
        fontSize: 15,
        color: 'white',
    },
    time: {
        marginBottom: 10,
        marginTop: 10,
    }
  });