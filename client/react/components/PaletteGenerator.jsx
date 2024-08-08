import { useState } from "react";
import axios from "axios";
import "../styles/palettes.css";

function PaletterGenerator() {
  const [palette, setPalette] = useState([]);

  // const handleSave = async () => {
  //   if (!isAuthenticated) {
  //     setShowLoginMessage(true);
  //   } else {
  //     try {
  //       const res = await axios.post(`${apiURL}/users/save-palette`, {
  //         email: user.email,
  //         palette: color.replace("#", ""),
  //       });
  //       const data = res.data;
  //       setUserData(data);
  //       setColorsView(true);
  //       setPalettesView(false);
  //       handleSavesPage(true);
  //     } catch (error) {
  //       console.error("Error could not save color.", error);
  //     }
  //   }
  // };

  const handleGeneratePalette = async () => {
    try {
      const url = "http://colormind.io/api/";
      const data = {
        model: "default",
        input: ["N", "N", "N", "N", "N"],
      };
      const response = await axios.post(url, JSON.stringify(data));
      const palette = response.data.result;
      setPalette(palette);
    } catch (error) {
      console.error("Error could generate palette.", error);
    }
  };

  const rgbToHex = (colorCode) => {
    const [r, g, b] = colorCode;
    const toHex = (value) => {
      const hex = value.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  return (
    <>
      <h1>Palette Generator</h1>
      <button onClick={handleGeneratePalette}>Generate</button>
      {palette.map((colorCode) => {
        return (
          <div>
            <p>color</p>
            <span
              className="color"
              style={{ backgroundColor: rgbToHex(colorCode) }}
            ></span>
          </div>
        );
      })}
    </>
  );
}

export default PaletterGenerator;
