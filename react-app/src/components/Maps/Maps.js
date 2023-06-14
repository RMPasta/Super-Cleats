import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const center = {
  lat: 52.633308139790195,
  lng: -1.1470759809370266,
};

function Maps({ apiKey }) {
  const tickets = useSelector((state) => state.ticket.tickets);
  const [hoveredMarkerName, setHoveredMarkerName] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(8);
  const [mapCenter, setMapCenter] = useState(center);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [typeId, setTypeId] = useState("roadmap");

  const containerStyle = {
    width: "100%",
    height: "92vh",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const handleMarkerClick = (location) => {
    setZoomLevel(18);
    setMapCenter(location);
    setTypeId("satellite");
  };

  function handleZoomChanged() {
    setZoomLevel(this.getZoom());
    if (this.getZoom() >= 10) {
      setTypeId("roadmap");
    }
  }

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          mapTypeId={typeId}
          center={mapCenter}
          zoom={zoomLevel}
          onZoomChanged={handleZoomChanged}
        >
          {tickets.map((ticket, index) => {
            const lat = ticket.location.split(",")[0];
            const lng = ticket.location.split(",")[1];
            const location = { lat: parseFloat(lat), lng: parseFloat(lng) };
            const currentLocation = {
              lat: parseFloat(lat) + (zoomLevel > 9 ? 0.03 : 0.15),
              lng: parseFloat(lng) + 0,
            };
            return (
              <Marker
                key={index}
                position={location}
                onMouseOver={() => {
                  setHoveredMarkerName(ticket.stadium);
                  setCurrentLocation(currentLocation);
                }}
                onMouseOut={() => {
                  setHoveredMarkerName(null);
                  setCurrentLocation(null);
                }}
                onClick={() => handleMarkerClick(location)}
              />
            );
          })}
          {hoveredMarkerName && currentLocation && (
            <InfoWindow
              position={currentLocation}
              anchor={{ x: 200, y: 0 }} // Adjust the x and y values according to your needs
              onCloseClick={() => setHoveredMarkerName(null)}
              onClick={() => handleMarkerClick(currentLocation)}
            >
              <div>{hoveredMarkerName}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}

export default React.memo(Maps);
