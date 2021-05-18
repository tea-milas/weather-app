import React, {useState, useEffect} from 'react';
import { ILocation } from './useLocation';

interface IWeatherLocation {
    name: string,
    region: string,
    country: string,
    };
interface ICurrentWeather {
    temp_c: number, 
    temp_f: number,
    wind_mph: number,
    wind_kph: number,
    wind_degree: number,
    wind_dir: string,
    pressure_mb: number,
    pressure_in: number,
    precip_mm: number,
    precip_in: number,
    humidity: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
    vis_km: number,
    vis_miles: number,
    uv: number,
    gust_mph: number,
    gust_kph: number,
    condition: ICondition,
  };
  
  interface ICondition {
    text: string,
    icon: string,
  }

  interface ILondon {
    location: IWeatherLocation,
    current: ICurrentWeather,
    forecast: IForecast
  }

  interface IForecast {
    forecastday:[IForecastday,IForecastday,IForecastday],
  }

  export interface IForecastday {
    date: string,
    day: IDayWeather,
    astro: IAstro,
    hour: [IHour,IHour,IHour],
  }

  interface IHour {
    time: string,
    temp_c: number,
    temp_f: number,
    is_day: number,
    condition: ICondition,
    wind_mph: number,
    wind_kph: number,
    wind_degree: number,
    wind_dir: string,
    pressure_mb: number,
    pressure_in: number,
    precip_mm: number,
    precip_in: number,
    humidity: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
    windchill_c: number,
    windchill_f: number,
    will_it_rain: number,
    chance_of_rain: string,
    will_it_snow: number,
    chance_of_snow: string,
    vis_km: number,
    vis_miles: number,
    uv: number,
    gust_mph: number,
    gust_kph: number,
  }

  interface IAstro {
    sunrise: string,
    sunset: string,
    moonrise: string,
    moonset: string,
    moon_phase: string
  }

  interface IDayWeather {
    maxtemp_c: number,
    maxtemp_f: number,
    mintemp_c: number,
    mintemp_f: number,
    avgtemp_c: number,
    avgtemp_f: number,
    maxwind_mph: number,
    maxwind_kph: number,
    totalprecip_mm: number,
    totalprecip_in: number,
    avgvis_km: number,
    avgvis_miles: number,
    avghumidity: number,
    daily_will_it_rain: number,
    daily_chance_of_rain: string,
    daily_will_it_snow: number,
    daily_chance_of_snow: string,
    condition : ICondition
  }

const useWeather = (location?: ILocation) => {
    const [currentLocalWeather, setCurrentLocalWeather] = useState<ICurrentWeather>();
    const [localWeatherLocation,setLocalWeatherLocation] = useState<IWeatherLocation>();
    const [forecast,setForecast] = useState<IForecast>();
    const [London, setLondon] = useState<ILondon>();

    const APIKEY = "";
    
    const getWeather = () => {
        location ?
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${location.coords.latitude},${location.coords.longitude}&days=7&aqi=yes&alerts=yes`)
        .then(response => response.json())
        .then(response => { setCurrentLocalWeather(response.current); 
                            setLocalWeatherLocation(response.location);
                            setForecast(response.forecast);
                        })
                            :
        console.log('LOCATION IS UNDEFINED!')
    }

    const getLondonWeather = () => {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=London&days=7&aqi=yes&alerts=yes`)
        .then(response => response.json())
        .then(response => setLondon(response))
    }

    useEffect(() => {
        getLondonWeather();
        getWeather();
    }, [])
    
    
    return {currentLocalWeather, localWeatherLocation, London, forecast}
}

export default useWeather
