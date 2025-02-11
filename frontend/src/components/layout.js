import { Outlet } from "react-router-dom";
import Navbar from "../components/Pages/navbar/Navbar.js";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This will render child routes inside the layout */}
    </>
  );
};

export default Layout;
