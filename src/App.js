import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import patternDesktop from "./images/pattern-bg-desktop.png";
// import mobileDesktop from "./images/pattern-bg-mobile.png";

import InfoBar from "./components/InfoBar";
import Map from "./components/Map";
import IpForm from "./components/IpForm";

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
      setMapData(response.data);
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
    if (mapData && mapRef.current) {
      let { lat, lng } = mapData.location;
      mapRef.current.flyTo([lat, lng], 16);
    }
  }, [mapData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App relative">
      <img src={patternDesktop} alt="Pattern Desktop" className="w-full" />

      <div className="fixed top-0 left-0 w-full h-full flex  justify-center z-50">
        <div className="mt-5 ">
          <p className="text-white text-2xl font-bold">IP Address Tracker</p>

          <IpForm mapData={mapData} setipAddress={setipAddress} />
          <InfoBar mapData={mapData} />
        </div>
      </div>
      <Map mapData={mapData} mapRef={mapRef} />
    </div>
  );
}

export default App;
