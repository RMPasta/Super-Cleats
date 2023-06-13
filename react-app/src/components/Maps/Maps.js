import React, { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const center = {
  lat: 52.633308139790195,
  lng: -1.1470759809370266,
};

function Maps({ apiKey }) {
    const tickets = useSelector((state) => state.ticket.tickets);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(8);
    const [mapCenter, setMapCenter] = useState(center);

      const containerStyle = {
        width: '100%',
        height: '100vh',
      };

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
      });

      const handleMarkerClick = (location) => {
        setZoomLevel(18); // Adjust the desired zoom level here
        setMapCenter(location)
      };

      function handleZoomChanged(){
        setZoomLevel(this.getZoom())
      }

      return (
        <>
          {isLoaded && (
    <GoogleMap
    mapContainerStyle={containerStyle}
    center={mapCenter}
    zoom={zoomLevel} // Use the zoomLevel state variable
    onZoomChanged={handleZoomChanged}
  >
    {tickets.map((ticket, index) => {
      const lat = ticket.location.split(',')[0];
      const lng = ticket.location.split(',')[1];
      const location = { lat: parseFloat(lat), lng: parseFloat(lng) };
      return (
        <Marker
          key={index}
          position={location}
          onMouseOver={() => setHoveredMarker(ticket)}
          onMouseOut={() => setHoveredMarker(null)}
          onClick={() => handleMarkerClick(location)}
        />
      );
    })}
  </GoogleMap>
          )}
        </>
      );
}

export default React.memo(Maps);
