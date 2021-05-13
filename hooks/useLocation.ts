import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';

export interface ILocation {
  coords: ICoords
}

interface ICoords {
  latitude: number;
  longitude: number;
}


const useLocation = () => {
  const [location, setLocation] = useState<ILocation>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      (async() => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
          }
          const lastKnownLocation = await Location.getLastKnownPositionAsync();
          if (lastKnownLocation) {
            setLocation(lastKnownLocation);
            setIsLoading(false);
          } else {
            const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low});
            setLocation(currentLocation);
            setIsLoading(false);
          }
          
        } catch (error) {
          console.log(error);
        }
      })()
    }, 10000 );
  
    return () => clearInterval(interval);
    
  }, []);

  return {location, isLoading};
}

export default useLocation;