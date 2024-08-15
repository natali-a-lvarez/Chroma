const { useState, useEffect } = require("react");
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Navigation.css";
import logo from "../../assets/chroma-logo.png";
import { LogIn, LogOut } from "react-ionicons";

// Import log in and out auth0
import LoginButton from "./Login";
import LogoutButton from "./Logout";

function Navigation({
  handleHomePage,
  handlePaletteGeneratorPage,
  handleColorPickerPage,
  handleSavesPage,
  homePage,
  palettePage,
  colorPickerPage,
  savesPage,
}) {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="navigation">
      <img className="logo" src={logo} alt="chroma logo" />
      <ul className="nav_links">
        <li>
          <p
            className={homePage ? "active-nav-link" : ""}
            onClick={handleHomePage}
          >
            Home
          </p>
        </li>
        <li>
          <p
            className={palettePage ? "active-nav-link" : ""}
            onClick={handlePaletteGeneratorPage}
          >
            Palette Generator
          </p>
        </li>
        <li>
          <p
            className={colorPickerPage ? "active-nav-link" : ""}
            onClick={handleColorPickerPage}
          >
            Color Picker
          </p>
        </li>
        <li>
          {isAuthenticated && (
            <p
              className={savesPage ? "active-nav-link" : ""}
              onClick={handleSavesPage}
            >
              Saves
            </p>
          )}
        </li>
        <li>
          <a>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
