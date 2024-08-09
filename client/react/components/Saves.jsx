import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Palettes from "./Palettes";
import Colors from "./Colors";

import "../styles/saves.css";
import apiURL from "../api";
import axios from "axios";

function Saves({
  userData,
  setUserData,
  fetchUser,
  colorsView,
  setColorsView,
  palettesView,
  setPalettesView,
}) {
  const { user, isAuthenticated } = useAuth0();

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


  // Delete Palette
  async function deletePalette(user, palette) {
    try {
      if (isAuthenticated) {
        const res = await axios.post(`${apiURL}/users/delete-palette`, {
          email: user.email,
          palette: palette
        });
        const data = res.data;
        console.log(data);
        fetchUser(user);
      }
    } catch (error) {
        console.error("Error deleting palette", error);
      }
    }


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
        <Palettes userData={userData} deletePalette={deletePalette}/>
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
