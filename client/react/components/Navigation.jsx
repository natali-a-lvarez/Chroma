const { useState, useEffect } = require("react");
import { useAuth0 } from "@auth0/auth0-react";
import "./Navigation.css";
import logo from "../../assets/chroma-logo.png";
import { LogIn, LogOut } from "react-ionicons";

// Import log in and out auth0
import LoginButton from "./Login";
import LogoutButton from "./Logout";

function Navigation({
  handlePaletterGeneratorPage,
  handleColorPickerPage,
  handleSavesPage,
}) {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="navigation">
      <img className="logo" src={logo} alt="chroma logo" />
      <ul className="nav_links">
        <li>
          <p onClick={handlePaletterGeneratorPage}>Palette Generator</p>
        </li>
        <li>
          <p onClick={handleColorPickerPage}>Color Picker</p>
        </li>
        <li>{isAuthenticated && <p onClick={handleSavesPage}>Saves</p>}</li>
        <li>
          <a>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
