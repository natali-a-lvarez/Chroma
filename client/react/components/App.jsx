import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import Saves from "./Saves";
import Navigation from "./Navigation";
import PaletterGenerator from "./PaletteGenerator";
import ColorPicker from "./ColorPicker";

function App() {
  const [savesPage, setSavesPage] = useState(false);
  const [palettePage, setPalettePage] = useState(true);
  const [colorPickerPage, setColorPickerPage] = useState(false);
  return (
    <main>
      <Navigation
        setSavesPage={setSavesPage}
        setPalettePage={setPalettePage}
        setColorPickerPage={setColorPickerPage}
      />

      {savesPage && !palettePage && !colorPickerPage && <Saves />}
      {palettePage && !savesPage && !colorPickerPage && <PaletterGenerator />}
      {colorPickerPage && !savesPage && !palettePage && <ColorPicker />}
    </main>
  );
}

export default App;
