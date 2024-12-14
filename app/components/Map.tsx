'use client';
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";  // Ensure Leaflet styles are imported

// Import marker images directly
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for missing icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapProps {
  center?: [number, number];  // Latitude and Longitude
}

const Map: React.FC<MapProps> = ({ center = [5.6037, -0.1870] }) => {  // Default center is Accra, Ghana
  return (
    <MapContainer
      center={center}  // Use the center prop
      zoom={10}        // Adjust zoom level
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center as L.LatLngExpression} />
    </MapContainer>
  );
};

export default Map;
