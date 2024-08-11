import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner"; // Adjust the path as necessary

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  return (
    <div>
      <ul>
        {cities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>
    </div>
  );
}

export default CityList;
