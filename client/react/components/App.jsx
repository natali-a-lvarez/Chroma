import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import Saves from "./Saves";
import Navigation from "./Navigation";
import PaletterGenerator from "./PaletteGenerator";
import ColorPicker from "./ColorPicker";

import axios from "axios";
import apiURL from "../api";

function App() {
  const [savesPage, setSavesPage] = useState(false);
  const [palettePage, setPalettePage] = useState(true);
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

  function handlePaletterGeneratorPage() {
    setColorPickerPage(false);
    setPalettePage(true);
    setSavesPage(false);
  }

  function handleColorPickerPage() {
    setColorPickerPage(true);
    setPalettePage(false);
    setSavesPage(false);
  }

  function handleSavesPage() {
    setColorPickerPage(false);
    setPalettePage(false);
    setSavesPage(true);
  }

  return (
    <main>
      <Navigation
        handlePaletterGeneratorPage={handlePaletterGeneratorPage}
        handleColorPickerPage={handleColorPickerPage}
        handleSavesPage={handleSavesPage}
      />

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
          userData={userData}
          setUserData={setUserData}
          fetchUser={fetchUser}
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
