<<<<<<< HEAD
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
    const [typeId, setTypeId] = useState("roadmap");

      const containerStyle = {
        width: '100%',
        height: '100vh',
      };

=======
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
>>>>>>> 1254be9 (add maps backend route and components)
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
      });

<<<<<<< HEAD
      const handleMarkerClick = (location) => {
        setZoomLevel(18); // Adjust the desired zoom level here
        setMapCenter(location)
        setTypeId("satellite")
      };

      function handleZoomChanged(){
        setZoomLevel(this.getZoom())
        if (this.getZoom() >= 10) {
          setTypeId("roadmap")
        }
      }


      return (
        <>
          {isLoaded && (
    <GoogleMap
    mapContainerStyle={containerStyle}
    mapTypeId={typeId}
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
=======
      return (
        <>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            />
>>>>>>> 1254be9 (add maps backend route and components)
          )}
        </>
      );
}

export default React.memo(Maps);
