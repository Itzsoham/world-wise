import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import baseData from "../data/cities.json";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        setCities(baseData.cities);
      } catch {
        alert("There is error in loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    try {
      setIsLoading(true);
      const city = baseData.cities.find((city) => city.id === Number(id));
      if (city) {
        setCurrentCity(city);
      } else {
        console.error("City not found");
      }
    } catch {
      alert("There is error in loading data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      // Check if the city already exists to prevent duplicates
      const cityExists = baseData.cities.some((city) => city.id === newCity.id);
      if (!cityExists) {
        baseData.cities.push(newCity);
        setCities((prevCities) => [...prevCities, newCity]);
      } else {
        alert("City already exists");
      }
    } catch {
      alert("There is error in creating city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const updatedCities = baseData.cities.filter(
        (city) => city.id !== Number(id)
      );
      baseData.cities = updatedCities; // Update the baseData as well
      setCities(updatedCities);
    } catch {
      alert("There is error in deleting city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
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
    throw new Error("CityContext was used outside of the CityProvider");
  return context;
}

export { CitiesProvider, useCities };
