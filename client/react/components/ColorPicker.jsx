import { useState } from "react";
import "./ColorPicker.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Login";

// Icon imports
import { EyedropOutline } from "react-ionicons";
import { CopyOutline } from "react-ionicons";
import { Image } from "react-ionicons";

const ColorPicker = () => {
  const { user, isAuthenticated } = useAuth0();
  const [color, setColor] = useState(null);
  const [image, setImage] = useState(null);

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
      alert(`Copied ${color} to clipboard!`);
    }
  };

  return (
    <div className="section">
      <h1 className="heading">Color Picker</h1>
      <div className="color-picker-container">
        {image && (
          <div className="left-col">
            <div className="form-section">
              <button className={"open-picker-btn"} onClick={openEyeDropper}>
                Open color dropper
              </button>
            </div>

            {color && (
              <div className="selected-color-container">
                <button
                  className="selected-color"
                  style={{ background: color }}
                  onClick={handleCopyColor}
                ></button>
                <p className="color-text-container" onClick={handleCopyColor}>
                  {color}
                  <span>
                    <CopyOutline color={"#ffffff"} height="18px" width="18px" />
                  </span>
                </p>
              </div>
            )}
            {color && isAuthenticated && (
              <>
                <button className="save-btn">Save Color</button>
              </>
            )}
            {color && !isAuthenticated && (
              <div className="login-container">
                <LoginButton className="login-btn" />
                <p>Log in to save</p>
              </div>
            )}
          </div>
        )}

        <div className="right-col">
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
