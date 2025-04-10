import { useEffect } from 'react';

const useCityMap = (mapRef, city) => {
  useEffect(() => {
    if (!mapRef.current) return;

    const cityCoordinates = {
        Sofia: { lat: 42.697708, lng: 23.321867 },
        Plovdiv: { lat: 42.135407, lng: 24.745290 },
        Varna: { lat: 43.214050, lng: 27.914733 },
      };
  
      const map = new window.google.maps.Map(mapRef.current, {
        center: cityCoordinates[city],
        zoom: 15,
        mapId: '2a098a60838b9d49',
      });
  
      new window.google.maps.marker.AdvancedMarkerElement({
        position: cityCoordinates[city],
        map,
        title: `${city} Office`,
      });
    }, [mapRef, city]);
};

export default useCityMap;
