import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext"; // Update import path accordingly
import styles from "./Mapp.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const [mapPosition, setPosition] = useState([51.505, -0.09]); // Default position
  const navigate = useNavigate();
  const { user } = useAuth(); // Access the logged-in user's info

  // const [searchParams] = useSearchParams();
  // const maplat = searchParams.get("lat");
  // const maplng = searchParams.get("lng");
  const [maplat, maplng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeoLocation();
  const { cities } = useCities();

  useEffect(() => {
    if (maplat && maplng) {
      setPosition([maplat, maplng]);
    }
  }, [maplat, maplng]);

  useEffect(
    function () {
      if (geolocationPosition)
        setPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        navigate(`form?lat=${lat}&lng=${lng}`);
      },
    });
    return null;
  };

  return (
    <div className={styles.mapContainer}>
      <button
        className={styles.positionButton}
        type="button"
        onClick={getPosition}
      >
        {isLoadingPosition ? "Loading..." : "Use Your Position"}
      </button>

      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>
                <span
                  className={`fi fi-${city.emoji}`}
                  role="img"
                  aria-label={`${city.cityName} flng`}
                ></span>{" "}
                <span>{city.cityName}</span>
              </span>
            </Popup>
          </Marker>
        ))}
        {geolocationPosition && (
          <Marker position={[geolocationPosition.lat, geolocationPosition.lng]}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
        <MapClickHandler />
      </MapContainer>
      {/* Display the username */}
      {user && (
        <div className={styles.usernameDisplay}>Welcome, {user.email}!</div>
      )}
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form`),
  });
}

export default Map;
