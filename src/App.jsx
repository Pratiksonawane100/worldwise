import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import CountryList from "./components/CountryList";
import CityList from "./components/CityList";
import City from "./components/City";
import "flag-icons/css/flag-icons.min.css";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./contexts/FakeAuthContext";

const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import { Spinner } from "react-bootstrap";

// const BASE_URL = "http://localhost:9000";

function App() {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(function () {
  //   async function fetchCities() {
  //     setIsLoading(true);
  //     try {
  //       const res = await fetch(`${BASE_URL}/cities`);
  //       const data = await res.json();
  //       setCities(data);
  //     } catch {
  //       alert("There was an error loading data...");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchCities();
  // }, []);

  return (
    <AuthProvider>
      <CitiesProvider>
        <Suspense fallback={<Spinner />}>
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/product" element={<Product />} />
                <Route path="/app" element={<AppLayout />}>
                  <Route index element={<Navigate to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </Router>
        </Suspense>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
