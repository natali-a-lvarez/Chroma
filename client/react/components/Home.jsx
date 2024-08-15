import React from "react";
import heroImg from "../../assets/hero-img.png";
import "./Home.css";

const Home = ({ handleColorPickerPage, handlePaletteGeneratorPage }) => {
  return (
    <div className="home-page">
      <div className="text-container">
        <h1>
          Your One-Stop <br /> Color Shop
        </h1>
        <p>
          Craft Perfect Palettes and Extract <br />
          Image Hues Effortlessly
        </p>
        <div className="home-btns-container">
          <button
            className="palette-gen-btn"
            onClick={handlePaletteGeneratorPage}
          >
            Palette Generator
          </button>
          <button className="color-picker-btn" onClick={handleColorPickerPage}>
            Color Picker
          </button>
        </div>
      </div>
      <img src={heroImg} />
    </div>
  );
};

export default Home;
