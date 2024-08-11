import "./CountryItem.css"; // Assuming the CSS file path is correct

function CountryItem({ country }) {
  return (
    <li className="country-item">
      <span className={`fi fi-${country.emoji} country-flag`}></span>
      <span className="country-name">{country.country}</span>
    </li>
  );
}

export default CountryItem;
