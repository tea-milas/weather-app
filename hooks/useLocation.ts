import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';

export interface Ilocation {
  coords: Icoords
}

interface Icoords {
  latitude: number;
  longitude: number;
}


const useLocation = () => {
  const [location, setLocation] = useState<Ilocation>();
 

  const getLocation = async() => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      const lastKnownLocation = await Location.getLastKnownPositionAsync();
      if (lastKnownLocation) {
        setLocation(lastKnownLocation);
      } else {
        const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low});
        setLocation(currentLocation);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return [location];
}

export default useLocation;