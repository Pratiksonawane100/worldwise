import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import "./City.css"; // Import the CSS file
// import { Spinner } from "react-bootstrap";

function City() {
  const { id } = useParams();
  const { getCity, currentCity } = useCities();

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  const { cityName, emoji, date, notes } = currentCity;
  return (
    <div className="city-container">
      <h2 className="city-header">City Information</h2>
      <p className="city-id">
        City ID: <span>{id}</span>
      </p>
      <p className="city-id">
        {cityName} :{" "}
        <span
          className={`fi fi-${emoji}`}
          role="img"
          aria-label={`${cityName} flng`}
        ></span>
      </p>
      <p className="city-date">
        Date Added: <span>{date}</span>
      </p>
      <p className="city-notes">
        Notes: <span>{notes}</span>
      </p>
      <p className="city-notes">Learn More : </p>
      <span> </span>
      <a href={`https://en.wikipedia.org/wiki/${cityName}`} target="blank">
        Cheak out {cityName} on Wikipedia
      </a>
    </div>
  );
}

export default City;
