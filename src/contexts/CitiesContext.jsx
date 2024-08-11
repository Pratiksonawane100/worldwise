import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        console.log("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCurrentCity(data);
      } catch (error) {
        console.error("There was an error loading data...", error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // setCurrentCity(data);
      // console.log(data);
      setCities((cities) => [...cities, data]);
    } catch {
      console.log("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteCity(id) {
    setIsLoading(true); // Start loading indicator
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete city");
      }

      // Filter out the deleted city from the local state
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.error("Error deleting city:", error);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesContext, CitiesProvider, useCities };
