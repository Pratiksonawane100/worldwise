import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Form.css"; // Ensure the path is correct
import { useCities } from "../contexts/CitiesContext";
import { useSearchParams } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { createCity, isLoading: isCreatingCity } = useCities();
  const [formData, setFormData] = useState({
    city: "",
    notes: "",
    destination: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [country, setCountry] = useState("");
  const [countryFlag, setCountryFlag] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for form submission

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.city || !startDate) return;

    // Set submitting state to true
    setIsSubmitting(true);

    const newCity = {
      cityName: formData.city,
      country,
      date: startDate,
      notes: formData.notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    setIsSubmitting(false); // Reset submitting state
    navigate("/app/cities");
    console.log(newCity);
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchCityData() {
      if (lat && lng) {
        try {
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
          );
          const data = await res.json();
          setCountry(data.countryName || "Unknown");
          setCountryFlag(
            data.countryCode
              ? `https://flagcdn.com/16x12/${data.countryCode.toLowerCase()}.png`
              : ""
          );
          if (!data.city) {
            setCityError(true);
          } else {
            setFormData((prevData) => ({ ...prevData, city: data.city }));
            setCityError(false);
          }
        } catch (err) {
          console.error("Error fetching city data:", err);
          setCityError(true);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding)
    return <div className="loading-overlay">Loading...</div>;

  if (cityError) {
    return <p className="error-message">Please select a valid city.</p>;
  }

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit}
        className={`form ${isCreatingCity || isSubmitting ? "loading" : ""}`}
      >
        {isSubmitting && <div className="loading-overlay">Loading...</div>}

        <div className="form-group">
          <label htmlFor="city">City Name:</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              style={{ marginRight: "8px" }}
            />
            {countryFlag && <img src={countryFlag} alt={country} />}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="destination">When did you go to?</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes about your trip:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-add" disabled={isSubmitting}>
            ➕ Add
          </button>
          <button type="button" onClick={handleBack} className="btn-back">
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
