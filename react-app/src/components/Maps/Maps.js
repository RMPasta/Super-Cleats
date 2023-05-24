import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function Maps({ apiKey }) {
    const containerStyle = {
        width: '400px',
        height: '400px',
      };

      const center = {
        lat: 38.9072,
        lng: 77.0369,
      };
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
      });

      return (
        <>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            />
          )}
        </>
      );
}

export default React.memo(Maps);
