import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, FlatList } from 'react-native';
import useWeather, {IForecastday} from '../../hooks/useWeather'
import useLocation from '../../hooks/useLocation'
import { ScrollView } from 'react-native-gesture-handler';

const WeeklyWeather = () => {
    const {isLoading, location} = useLocation();
    const {forecast, London} = useWeather(location);
    let image = forecast ? forecast.forecastday[0].day.condition.icon : London?.forecast.forecastday[0].day.condition.icon;
    let image1 = forecast ? forecast.forecastday[1].day.condition.icon : London?.forecast.forecastday[1].day.condition.icon;

    return (
        <View style={styles.container}>
            {isLoading || !forecast || !London ? <ActivityIndicator/> : 
                        (<ScrollView horizontal={true} >
                            <View style={styles.container__weekly_weather__day}>
                                <Image source={{uri: 'https:'+ image}} style={{ width: 60, height: 60 }} />
                                <Text style={styles.temperature}>{forecast ? forecast.forecastday[1].day.maxtemp_c : London?.forecast.forecastday[1].day.maxtemp_c}°</Text>
                                <Text style={styles.temperature}>{forecast ? forecast.forecastday[1].day.mintemp_c : London?.forecast.forecastday[1].day.mintemp_c}°</Text>
                            </View>
                            <View style={styles.container__weekly_weather__day}>
                                <Image source={{uri: 'https:'+ image1}} style={{ width: 60, height: 60 }} />
                                <Text style={styles.temperature}>{forecast ? forecast.forecastday[2].day.maxtemp_c : London?.forecast.forecastday[2].day.maxtemp_c}°</Text>
                                <Text style={styles.temperature}>{forecast ? forecast.forecastday[2].day.mintemp_c : London?.forecast.forecastday[2].day.mintemp_c}°</Text>
                            </View>
                        </ScrollView>
                        )
            }
                
            
        </View>
    )
}

export default WeeklyWeather

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        width: '100%',
        height: '20%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    container__weekly_weather__day: {
        width: '50%',
        backgroundColor: 'lightblue',
        marginEnd: 5,
        marginBottom: 0,
        padding: 10,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    sign: {
        fontSize: 20,
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
        fontSize: 15,
        color: 'white',
    }
  });