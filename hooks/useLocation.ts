import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect( () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      const fetechedLocation = await Location.getCurrentPositionAsync({});

      // console.log("wyyy ", fetechedLocation)
  
      setLocation(fetechedLocation);
    })();
  }, [])

  return [location];
}

export default useLocation;