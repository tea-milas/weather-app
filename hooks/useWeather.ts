import React, {useState, useEffect} from 'react';
import useLocation from './useLocation';

const useWeather = (latitude : number,longitude: number) => {
    const [currentLocalWeather, setCurrentLocalWeather] = useState({})

    
    
    
    const getCurrentLocalWeather = () => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${latitude},${longitude}`)
        .then(response => response.json())
        .then(response => setCurrentLocalWeather(response))
    }
    
        useEffect(() => {
           
            getCurrentLocalWeather();
            
        }, [])
    

    return [currentLocalWeather]
}

export default useWeather
