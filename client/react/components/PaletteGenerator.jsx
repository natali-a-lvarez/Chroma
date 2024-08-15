import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import apiURL from "../api";

import "../styles/PaletteGenerator.css";
import { CopyOutline } from "react-ionicons";

function PaletterGenerator({
  setUserData,
  setColorsView,
  setPalettesView,
  handleSavesPage,
}) {
  const { user, isAuthenticated } = useAuth0();
  const [palette, setPalette] = useState(null);
  const [showCopiedMessage, setShowCoppiedMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");

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

    return `${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const handleCopyColor = async (colorCode) => {
    setCopiedColor(colorCode);
    await navigator.clipboard.writeText(copiedColor);
    setShowCoppiedMessage(true);

    setTimeout(() => {
      setShowCoppiedMessage(false);
    }, 1500);
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
    } else {
      try {
        const res = await axios.post(`${apiURL}/users/save-palette`, {
          email: user.email,
          palette: palette.map((color) => rgbToHex(color)),
        });
        const data = res.data;
        setUserData(data);
        setColorsView(false);
        setPalettesView(true);
        handleSavesPage(true);
      } catch (error) {
        console.error("Error could not save palette.", error);
      }
    }
  };

  return (
    <div className="palette-gen_pg">
      <h1 className="heading">Palette Generator</h1>
      <button className="palette-gen_btn" onClick={handleGeneratePalette}>
        Generate
      </button>
      {palette && (
        <div className="palette-gen_palette-container">
          {palette.map((colorCode) => {
            return (
              <div
                onClick={() => handleCopyColor(rgbToHex(colorCode))}
                className="palette-gen_color-container"
              >
                <div
                  className="palette-gen_color"
                  style={{ backgroundColor: "#" + rgbToHex(colorCode) }}
                ></div>
                <p>
                  #{rgbToHex(colorCode)}
                  <span>
                    <CopyOutline
                      className="copy-icon"
                      color={"#fff"}
                      height="18px"
                      width="18px"
                    />
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}
      {showCopiedMessage && (
        <p className="palette-gen_copied-color" id="copied-message-button">
          Color copied to clipboard.
        </p>
      )}
      {palette && (
        <>
          <button
            onClick={handleSave}
            className={
              isAuthenticated
                ? "palette-gen_btn palette-gen_save-btn"
                : "palette-gen_btn palette-gen_save-btn disabled-btn"
            }
          >
            Save
          </button>
          {showLoginMessage && <p className="error-msg">Please log in.</p>}
        </>
      )}
    </div>
  );
}

export default PaletterGenerator;
