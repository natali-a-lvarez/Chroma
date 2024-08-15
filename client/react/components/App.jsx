import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import Saves from "./Saves";
import Navigation from "./Navigation";
import PaletterGenerator from "./PaletteGenerator";
import ColorPicker from "./ColorPicker";
import Home from "./Home";

import axios from "axios";
import apiURL from "../api";

function App() {
  const [homePage, setHomePage] = useState(true);
  const [savesPage, setSavesPage] = useState(false);
  const [palettePage, setPalettePage] = useState(false);
  const [colorPickerPage, setColorPickerPage] = useState(false);
  const [userData, setUserData] = useState([]);

  const [palettesView, setPalettesView] = useState(true);
  const [colorsView, setColorsView] = useState(false);

  const { user, isAuthenticated } = useAuth0();

  // Fetch User from Database
  async function fetchUser(user) {
    try {
      if (isAuthenticated) {
        const res = await axios.post(`${apiURL}/users/`, {
          email: user.email,
        });
        const data = res.data;
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  useEffect(() => {
    fetchUser(user);
  }, []);

  function handleHomePage() {
    setColorPickerPage(false);
    setPalettePage(false);
    setSavesPage(false);
    setHomePage(true);
  }

  function handlePaletteGeneratorPage() {
    setColorPickerPage(false);
    setPalettePage(true);
    setSavesPage(false);
    setHomePage(false);
  }

  function handleColorPickerPage() {
    setColorPickerPage(true);
    setPalettePage(false);
    setSavesPage(false);
    setHomePage(false);
  }

  function handleSavesPage() {
    setColorPickerPage(false);
    setPalettePage(false);
    setSavesPage(true);
    setHomePage(false);
  }

  return (
    <main>
      <Navigation
        handleHomePage={handleHomePage}
        handlePaletteGeneratorPage={handlePaletteGeneratorPage}
        handleColorPickerPage={handleColorPickerPage}
        handleSavesPage={handleSavesPage}
        homePage={homePage}
        palettePage={palettePage}
        colorPickerPage={colorPickerPage}
        savesPage={savesPage}
      />

      {homePage && !savesPage && !palettePage && !colorPickerPage && (
        <Home
          handleColorPickerPage={handleColorPickerPage}
          handlePaletteGeneratorPage={handlePaletteGeneratorPage}
        />
      )}

      {savesPage && !palettePage && !colorPickerPage && (
        <Saves
          userData={userData}
          setUserData={setUserData}
          fetchUser={fetchUser}
          colorsView={colorsView}
          setColorsView={setColorsView}
          palettesView={palettesView}
          setPalettesView={setPalettesView}
        />
      )}
      {palettePage && !savesPage && !colorPickerPage && (
        <PaletterGenerator
          setUserData={setUserData}
          setColorsView={setColorsView}
          setPalettesView={setPalettesView}
          handleSavesPage={handleSavesPage}
        />
      )}
      {colorPickerPage && !savesPage && !palettePage && (
        <ColorPicker
          userData={userData}
          setUserData={setUserData}
          fetchUser={fetchUser}
          handleSavesPage={handleSavesPage}
          setColorsView={setColorsView}
          setPalettesView={setPalettesView}
        />
      )}
    </main>
  );
}

export default App;
