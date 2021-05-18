import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import useDateTime from '../../hooks/useDateTime'
import useWeather from '../../hooks/useWeather'
import useLocation from '../../hooks/useLocation'
import { ScrollView } from 'react-native-gesture-handler';

const DailyWeatherScreen = () => {
    const [dayOfTheMonth, dayOfTheWeek, hours, minutes] = useDateTime();
    const {isLoading, location} = useLocation();
    const {currentLocalWeather, localWeatherLocation, London, forecast} = useWeather(location);
    const [isOpenInfo,setIsOpenInfo] = useState(false)

    console.log('USER LOCATION:', localWeatherLocation?.name)
    let image = currentLocalWeather ? currentLocalWeather.condition.icon : London?.current.condition.icon;

    return (
        <View style={styles.container}>
            <View style={styles.container_day}>
                <Text style={styles.date}>{dayOfTheWeek}, {dayOfTheMonth}</Text>
                <Text style={styles.time}>{hours}:{minutes}</Text>
            </View>
            { !isLoading && <ScrollView style={styles.container_scroll}>
                <TouchableOpacity style={styles.container_weather} onPress={()=> setIsOpenInfo(!isOpenInfo)}>
                <View style={styles.weather_current}>
                    <View style={styles.weather_current_forecast}>
                        <Image source={{uri: 'https:'+image,}} style={{ width: 60, height: 60 }}/>
                        <Text style={styles.status}>{currentLocalWeather ? currentLocalWeather.condition.text : London?.current.condition.text}</Text>
                    </View>
                    
                    <View style={styles.weather_info}>
                        <Text style={styles.temperature}>{currentLocalWeather ? currentLocalWeather.temp_c : London?.current.temp_c}°</Text>
                        <Text style={styles.location}>{localWeatherLocation ? localWeatherLocation.name : London?.location.name}</Text>
                    </View>
                </View>
            { isOpenInfo && 
                <View style={styles.weather_info_extended}>
                    <View style={styles.weather_info_extended_section}>
                        <Text style={styles.info_extra_left_title}>SUNRISE</Text>
                        <Text style={styles.info_extra_right_title}>SUNSET</Text>
                        <View style={styles.separator} />
                        <Text style={styles.info_extra_left}>{forecast ? forecast.forecastday[0].astro.sunrise :  London?.forecast.forecastday[0].astro.sunrise}</Text>
                        <Text style={styles.info_extra_right}>{forecast ? forecast.forecastday[0].astro.sunset :  London?.forecast.forecastday[0].astro.sunset}</Text>

                        <Text style={styles.info_extra_left_title}>MOONRISE</Text>
                        <Text style={styles.info_extra_right_title}>MOONSET</Text>
                        <View style={styles.separator} />
                        <Text style={styles.info_extra_left}>{forecast ? forecast.forecastday[0].astro.moonrise :  London?.forecast.forecastday[0].astro.moonrise}</Text>
                        <Text style={styles.info_extra_right}>{forecast ? forecast.forecastday[0].astro.moonset :  London?.forecast.forecastday[0].astro.moonset}</Text>

                        <Text style={styles.info_extra_left_title}>MAX TEMP</Text>
                        <Text style={styles.info_extra_right_title}>MIN TEMP</Text>
                        <View style={styles.separator} />
                        <Text style={styles.info_extra_left}>{forecast ? forecast.forecastday[0].day.maxtemp_c :  London?.forecast.forecastday[0].day.maxtemp_c }°</Text>
                        <Text style={styles.info_extra_right}>{forecast ? forecast.forecastday[0].day.mintemp_c  :  London?.forecast.forecastday[0].day.mintemp_c}°</Text>

                        <Text style={styles.info_extra_left_title}>WIND</Text>
                        <Text style={styles.info_extra_right_title}>FEELS LIKE</Text>
                        <View style={styles.separator} />
                        <Text style={styles.info_extra_left}>{currentLocalWeather ? currentLocalWeather.wind_dir :  London?.current.wind_dir} {currentLocalWeather ? currentLocalWeather.wind_kph : London?.current.wind_kph}km/h</Text>
                        <Text style={styles.info_extra_right}> {currentLocalWeather ? currentLocalWeather.feelslike_c :  London?.current.feelslike_c}°</Text>

                        <Text style={styles.info_extra_left_title}>PRECIPATION</Text>
                        <Text style={styles.info_extra_right_title}>HUMIDITY</Text>
                        <View style={styles.separator} />
                        <Text style={styles.info_extra_left}>{currentLocalWeather ? currentLocalWeather.precip_mm :  London?.current.precip_mm}mm</Text>
                        <Text style={styles.info_extra_right}>{currentLocalWeather ? currentLocalWeather.humidity : London?.current.humidity}%</Text>
                        <Text style={styles.info_extra_left_title}>UV INDEX:  {currentLocalWeather ? currentLocalWeather.uv : London?.current.uv}</Text>
                    </View>
                
                    
                </View>
            }
            </TouchableOpacity>
            </ScrollView>}
        </View>
    )
}

export default DailyWeatherScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '75%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    container_day: {
        marginTop: 10,
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
      marginTop: 7,
      fontSize: 20,
      color: 'rgba(150, 155, 53, 1)',
    },
    time: {
      fontSize: 50,
      fontWeight: 'bold',
      color: 'rgba(150, 155, 53, 1)',
    },
    container_scroll: {
        marginTop: '10%',
        borderRadius: 10,
        width: '90%',
        minHeight: '30%',
       
    },
    container_weather: {
        borderRadius: 10,
        backgroundColor: 'rgba(150, 155, 53, 0.8)',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    weather_current: {
        padding: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    weather_current_forecast: {
        width: '50%',
        marginRight: 10,
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
        width: '50%',
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
    },
    weather_info_extended: {
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(150, 155, 53, 1)',
        display: 'flex',
        flexDirection: 'column',
    },
    weather_info_extended_section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    info_extra_left_title: {
        marginVertical: 5,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '50%',
        fontSize: 15,
        color: 'white',
    },
    info_extra_left: {
        textAlign: 'left',
        width: '50%',
        fontSize: 15,
        color: 'white',
        marginBottom: 6,
    },
    info_extra_right_title: {
        marginVertical: 5,
        textAlign: 'right',
        width: '50%',
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    info_extra_right: {
        textAlign: 'right',
        width: '50%',
        fontSize: 15,
        color: 'white',
        marginBottom: 6,
    },
    separator: {
        marginTop: 3,
        marginBottom: 5,
        height: 1,
        width: '100%',
        backgroundColor: 'white'
      },
  });