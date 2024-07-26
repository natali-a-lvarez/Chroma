const { useState, useEffect } = require("react");
import { useAuth0 } from "@auth0/auth0-react";
import "./Navigation.css";
import logo from "../../assets/chroma-logo.png";
import { LogIn, LogOut } from "react-ionicons";

// Import log in and out auth0
import LoginButton from "./Login";
import LogoutButton from "./Logout";

function Navigation() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="navigation">
      <img className="logo" src={logo} alt="chroma logo" />
      <ul className="nav_links">
        <li>
          <a>Palette Generator</a>
        </li>
        <li>
          <a>Color Picker</a>
        </li>
        <li>
          <a>Saved</a>
        </li>
        <li>
          <a>
            {isAuthenticated ? (
              <LogoutButton />
            ) : (
              //   <LogOut color={"#fff"} height="30px" width="30px" />

              <LoginButton />

              //   <LogIn color={"#fff"} height="30px" width="30px" />
            )}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
