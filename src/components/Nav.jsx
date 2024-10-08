import { NavLink } from "react-router-dom";
import styles from "./Nav.Module.css";
function Nav() {
  return (
    <nav className={styles}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        {/* <li>
          <NavLink to="/app">App</NavLink>
        </li> */}
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
