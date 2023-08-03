import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import iconArrow from "./images/icon-arrow.svg";
import iconMarker from "./images/icon-location.svg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function App() {
  const [ipAddress, setipAddress] = useState();
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIpAddress = async (ipAddress) => {
    const API_KEY = process.env.REACT_APP_GEO_API_KEY;
    let API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;
    if (ipAddress) {
      API_URL += `&ipAddress=${ipAddress}`;
    }
    try {
      const response = await axios.get(API_URL);
      console.log(response);
      const { city, region, postalCode, timezone, lat, lng } =
        response.data.location;
      const ipDataObj = {
        ip: response.data.ip,
        city: city,
        state: region,
        postalCode: postalCode,
        timezone: timezone,
        isp: response.data.isp,
        lat: lat,
        lng: lng,
      };
      setMapData(ipDataObj);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchIpAddress();
      setLoading(false);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    fetchIpAddress(ipAddress);
  }, [ipAddress]);

  const mapRef = useRef(null);
  useEffect(() => {
    // Update the map's center when mapData changes
    if (mapData && mapRef.current) {
      let { lat, lng } = mapData;
      mapRef.current.flyTo([lat, lng], 16); // Fly to the new location with zoom level 16
    }
  }, [mapData]);

  const customIcon = new L.Icon({
    iconUrl: iconMarker,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIpAddress = e.target.elements.search.value;
    setipAddress(newIpAddress);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <p>IP ADDRESS TRACKER</p>
      <form onSubmit={handleSubmit}>
        <div className="relative mx-auto w-1/2 my-5">
          <input
            type="search"
            name="search"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-xl border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            defaultValue={mapData.ip}
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <img src={iconArrow} alt="Arrow Icon" className="w-4 h-4" />
          </button>
        </div>
      </form>
      <div className="justify-center inline-flex">
        <div className="flex flex-row center border rounded-xl p-6">
          <div className="flex flex-col items-center px-4">
            <p className="text-gray-500">IP ADDRESS</p>
            <p>{mapData.ip}</p>
          </div>
          <div className="border-l"></div>
          <div className="flex flex-col items-center px-4">
            <p className="text-gray-500">LOCATION</p>
            <p>{`${mapData.city}, ${mapData.state}`}</p>
            <p>{mapData.postalCode}</p>
          </div>
          <div className="border-l"></div>
          <div className="flex flex-col items-center px-4">
            <p className="text-gray-500">TIMEZONE</p>
            <p>UTC {mapData.timezone}</p>
          </div>
          <div className="border-l"></div>
          <div className="flex flex-col items-center px-4">
            <p className="text-gray-500">ISP</p>
            <p>{mapData.isp}</p>
          </div>
        </div>
      </div>

      <MapContainer
        center={mapData ? [mapData.lat, mapData.lng] : [0, 0]}
        zoom={mapData ? 16 : 2}
        ref={mapRef}
        style={{ height: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={mapData ? [mapData.lat, mapData.lng] : [0, 0]}
          icon={customIcon}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
