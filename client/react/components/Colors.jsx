import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/colors.css";

function Colors({ userData }) {
    const { isAuthenticated } = useAuth0();
    const userColors = userData.saved_colors;

    function handleCopyColor(currColor) {
        navigator.clipboard.writeText("#" + currColor);
        alert(`Copied #${currColor} to clipboard!`);
    }

    return (
        <section>
        <div className="colors" style={{display: userColors && userColors.length > 1 ? 'flex' : 'block', flexWrap: userColors && userColors.length > 1 ? 'wrap' : 'nowrap', justifyContent: userColors && userColors.length > 1 ? 'space-evenly' : 'center'}}>
            {isAuthenticated && userColors ? (
                userColors.map((color, idx) => (
                    <div className="color-container" key={idx}>
                        <div className="color" style={{ backgroundColor: "#" + color }}></div>
                        <button onClick={() => handleCopyColor(color)} className="hex-code" id={color}>
                            #{color}
                        </button>
                    </div>
                ))) : !userColors && (
                    <h5>No Saved Colors!</h5>
                )}
        </div>
        </section>
    );
}

export default Colors;