import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
// Replace with your logo file path
import styles from "./Sidebar.module.css"; // Import CSS module

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        {/* <img src={logo} alt="Logo" className={styles.logoImg} /> */}
        <h1>Worldwise</h1>
      </div>
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
      </footer>
    </div>
  );
}

export default Sidebar;
