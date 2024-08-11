import { useCities } from "../contexts/CitiesContext";

import CountryItem from "./CountryItem";
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
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.city).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <CountryItem country={country} key={country.id} />
        ))}
      </ul>
    </div>
  );
}

export default CityList;
