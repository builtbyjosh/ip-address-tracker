import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconMarker from "../images/icon-location.svg";

const Map = ({ mapData, mapRef }) => {
  const { lat, lng } = mapData.location;
  const customIcon = new L.Icon({
    iconUrl: iconMarker,
  });
  return (
    <div className="z-0">
      <MapContainer
        center={mapData ? [lat, lng] : [0, 0]}
        zoom={mapData ? 16 : 2}
        ref={mapRef}
        style={{ height: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={mapData ? [lat, lng] : [0, 0]} icon={customIcon} />
      </MapContainer>
    </div>
  );
};

export default Map;
