import React, {useState, useEffect} from 'react';
import useLocation from './useLocation';

interface IlocalWeatherLocation {
    name: string,
    region: string,
    country: string,
    };
interface IlocalWather {
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
    condition: Icondition,
  };
  
  interface Icondition {
    text: string,
    icon: string,
  }

  interface Ilondon {
      location: IlocalWeatherLocation,
      current: IlocalWather,
  }

const useWeather = () => {
    const [currentLocalWeather, setCurrentLocalWeather] = useState<IlocalWather>();
    const [localWeatherLocation,setLocalWeatherLocation] = useState<IlocalWeatherLocation>();
    const [London, setLondon] = useState<Ilondon>();
    const location = useLocation();

    
    
    const getCurrentLocalWeather = () => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${location.coords.latitude},${location.coords.longitude}`)
        .then(response => response.json())
        .then(response => { setCurrentLocalWeather(response.current); 
                            setLocalWeatherLocation(response.location)})
    }

    const getLondonWeather = () => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=London`)
        .then(response => response.json())
        .then(response => setLondon(response))
    }

    useEffect(() => {
        getLondonWeather();
    }, [])
    
    
    return [currentLocalWeather,getCurrentLocalWeather, London]
}

export default useWeather
