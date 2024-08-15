import { useState } from "react";
import "./ColorPicker.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Login";

// Icon imports
import { EyedropOutline } from "react-ionicons";
import { CopyOutline } from "react-ionicons";
import { Image } from "react-ionicons";

// fetching
import apiURL from "../api";
import axios from "axios";

const ColorPicker = ({
  userData,
  setUserData,
  fetchUser,
  handleSavesPage,
  setColorsView,
  setPalettesView,
}) => {
  const { user, isAuthenticated } = useAuth0();
  const [color, setColor] = useState(null);
  const [image, setImage] = useState(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showCopiedMessage, setShowCoppiedMessage] = useState(false);

  const openEyeDropper = async () => {
    let eyeDropper = new window.EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    setColor(sRGBHex);
  };

  const handleFileInput = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleCopyColor = async () => {
    await navigator.clipboard.writeText(color);
    if (color != "No color selected") {
      setShowCoppiedMessage(true);

      setTimeout(() => {
        setShowCoppiedMessage(false);
      }, 1000);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
    } else {
      try {
        const res = await axios.post(`${apiURL}/users/save-color`, {
          email: user.email,
          color: color.replace("#", ""),
        });
        const data = res.data;
        setUserData(data);
        setColorsView(true);
        setPalettesView(false);
        handleSavesPage(true);
      } catch (error) {
        console.error("Error could not save color.", error);
      }
    }
  };

  return (
    <div className="section">
      <h1 className="heading">Color Picker</h1>
      {/* Contains the whole color picker minus title */}
      <div className="color-picker-page-container">
        {/* left col only renders in an image is uploaded */}
        {image && (
          <div className="left-col">
            <div className="color-dropper-container">
              <p>Open color dropper:</p>
              <button className={"open-picker-btn"} onClick={openEyeDropper}>
                <EyedropOutline color={"#000"} />
              </button>
            </div>

            {/* Only renders in image and color are not null */}
            {color && (
              <div className="selected-color-container">
                <p>Selected Color:</p>
                <button
                  className="selected-color"
                  style={{ background: color }}
                  onClick={handleCopyColor}
                ></button>
                <p className="color-text-container" onClick={handleCopyColor}>
                  {color}
                  <span>
                    <CopyOutline color={"#000"} height="18px" width="18px" />
                  </span>
                  {showCopiedMessage && (
                    <p className="copied-color-msg">
                      Color copied to clipboard.
                    </p>
                  )}
                </p>
              </div>
            )}
            {/* button becomes disabled if you are not logged in*/}
            {color && (
              <button
                onClick={handleSave}
                className={
                  isAuthenticated ? "save-btn" : "save-btn disabled-btn"
                }
              >
                Save Color
              </button>
            )}
            {showLoginMessage && (
              <p className="error-msg">Please log in to save.</p>
            )}
          </div>
        )}

        <div className={image ? "right-col" : "right-col no-img_right-col"}>
          <div className="image-col-container">
            <input onChange={handleFileInput} type="file" accept="image/*" />
            <div
              className={
                image ? "img-container" : "img-container img-container-empty"
              }
            >
              {image ? (
                <>
                  <img src={image} alt="Working image" />
                </>
              ) : (
                <>
                  <Image
                    className="img-icon"
                    color={"#c7ada0"}
                    height="100px"
                    width="100px"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
