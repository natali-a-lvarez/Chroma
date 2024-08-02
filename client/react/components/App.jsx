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
  
  const { user, isAuthenticated } = useAuth0();

  // Fetch User from Database
  async function fetchUser(user) {
    try {
      const res = await axios.post(`${apiURL}/users/`, {
        email: user.email,
      });
      const data = res.data;
      // console.log(data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  useEffect(() => {
    // isAuthenticated &&
      fetchUser(user);
  }, []);


  return (
    <main>
      <Navigation
        setSavesPage={setSavesPage}
        setPalettePage={setPalettePage}
        setColorPickerPage={setColorPickerPage}
      />

      {savesPage && !palettePage && !colorPickerPage && <Saves userData={userData} setUserData={setUserData} fetchUser={fetchUser} />}
      {palettePage && !savesPage && !colorPickerPage && <PaletterGenerator userData={userData} setUserData={setUserData} fetchUser={fetchUser}/>}
      {colorPickerPage && !savesPage && !palettePage && <ColorPicker userData={userData} setUserData={setUserData} fetchUser={fetchUser} />}
    </main>
  );
}

export default App;
