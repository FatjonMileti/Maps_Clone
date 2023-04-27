import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

const Map = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");
  const [center, setCenter] = useState([51.505, -0.09]);
  const mapRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    axios
      .get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`)
      .then((response) => {
          console.log(response.data);
        setResults(response.data[0].display_name);
        if (response.data.length > 0) {
          setCenter([response.data[0].lat, response.data[0].lon]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(center);
    }
  }, [center]);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a location"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <MapContainer ref={mapRef} center={center} zoom={13} style={{ height: "80vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={center}>
            <Popup>{results}</Popup>
          </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;