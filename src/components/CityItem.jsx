import { useCities } from "../contexts/CitiesContext";
import "./CityItem.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { emoji, cityName, date, id, position } = city;
  const { currentCity, deleteCity } = useCities(); // Call the function

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className="city-item"
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span
          className={`fi fi-${emoji}`}
          role="img"
          aria-label={`${cityName} flng`}
        ></span>
        <h3>{cityName}</h3>
        <time>({formatDate(date)})</time>
        <button onClick={handleClick}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
