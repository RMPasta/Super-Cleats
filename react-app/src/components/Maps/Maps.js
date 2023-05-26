import React from 'react';
import { useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function Maps({ apiKey }) {
    const tickets = useSelector((state) => state.ticket.tickets);

      const containerStyle = {
        width: '100%',
        height: '100vh',
      };

      const center = {
        lat: 52.633308139790195,
        lng: -1.1470759809370266,
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
              zoom={8}>
                {tickets.map((ticket, index) => {
                  const lat = ticket.location.split(",")[0];
                  const lng = ticket.location.split(",")[1];
                  const location = {lat: parseFloat(lat), lng: parseFloat(lng)}
                  return <Marker key={index} position={location}/>
              })}
            </GoogleMap>
          )}
        </>
      );
}

export default React.memo(Maps);
