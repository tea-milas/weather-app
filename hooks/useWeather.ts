import React, {useState, useEffect} from 'react';
import { ILocation } from './useLocation';

interface ILocalWeatherLocation {
    name: string,
    region: string,
    country: string,
    };
interface ILocalWeather {
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
      location: ILocalWeatherLocation,
      current: ILocalWeather,
  }

const useWeather = (location?: ILocation) => {
    const [currentLocalWeather, setCurrentLocalWeather] = useState<ILocalWeather>();
    const [localWeatherLocation,setLocalWeatherLocation] = useState<ILocalWeatherLocation>();
    const [London, setLondon] = useState<ILondon>();

    const APIKEY = ;
    
    const getCurrentLocalWeather = () => {
        location ?
        fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${location.coords.latitude},${location.coords.longitude}`)
        .then(response => response.json())
        .then(response => { setCurrentLocalWeather(response.current); 
                            setLocalWeatherLocation(response.location)})
                            :
        console.log('LOCATION IS UNDEFINED!')
    }

    const getLondonWeather = () => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=London`)
        .then(response => response.json())
        .then(response => setLondon(response))
    }

    useEffect(() => {
        getLondonWeather();
        getCurrentLocalWeather();
    }, [])
    
    
    return {currentLocalWeather, localWeatherLocation, London}
}

export default useWeather
