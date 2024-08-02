import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Palettes from "./Palettes";
import Colors from "./Colors";

import "../styles/saves.css";
import apiURL from "../api";
import axios from "axios";

function Saves() {
  const { user, isAuthenticated } = useAuth0();

  const [palettesView, setPalettesView] = useState(true);
  const [colorsView, setColorsView] = useState(false);
  const [userData, setUserData] = useState([]);

  // Fetch User from Database
  async function fetchUser(user) {
    try {
      const res = await axios.post(`${apiURL}/users/`, {
        email: user.email,
      });
      const data = res.data;
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  useEffect(() => {
    fetchUser(user);
  }, [userData]);

  function togglePalettesView() {
    setPalettesView(true);
    setColorsView(false);
    {
      isAuthenticated && fetchUser(user);
    }
  }

  function toggleColorsView() {
    setPalettesView(false);
    setColorsView(true);
  }

  useEffect(() => {
    isAuthenticated && palettesView && console.log(user.email);
    fetchUser(user);
  }, [isAuthenticated]);

  return (
    <section>
      <div className="saves-flex">
        <button
          className={palettesView ? "active" : ""}
          onClick={togglePalettesView}
        >
          Saved Palettes
        </button>
        <button
          className={colorsView ? "active" : ""}
          onClick={toggleColorsView}
        >
          Saved Colors
        </button>
      </div>

      {/* Toggle Saved Palettes and Colors Display based on view (palettes/colors) */}
      {palettesView ? (
        <Palettes userData={userData} />
      ) : (
        colorsView && (
          <>
            <Colors userData={userData} />
          </>
        )
      )}
    </section>
  );
}

export default Saves;
