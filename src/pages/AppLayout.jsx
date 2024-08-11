import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 765);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 765);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles["app-layout"]}>
      <button className={styles["menu-btn"]} onClick={toggleSidebar}>
        ☰
      </button>
      <div
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles["sidebar-visible"] : ""
        } ${isMobile ? styles["sidebar-mobile"] : ""}`}
      >
        <Sidebar />
      </div>
      <div
        className={`${styles.map} ${
          isSidebarOpen && isMobile ? styles["map-shifted"] : ""
        }`}
      >
        <Map />
      </div>
    </div>
  );
}

export default AppLayout;
