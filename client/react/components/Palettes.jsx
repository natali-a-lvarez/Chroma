import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/palettes.css";


function Palettes({ userData }) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const userPalettes = userData.saved_palettes;

    function handleCopyColor(currColor) {
        navigator.clipboard.writeText(currColor);
        alert(`Copied #${currColor} to clipboard!`);
    }


    return (
        <section>
            <div className="palettes" style={{display: userPalettes && userPalettes.length > 1 ? 'grid' : 'block', gridTemplateColumns: userPalettes && userPalettes.length > 1 ? 'repeat(2, 1fr)' : 'none', justifyContent: userPalettes && userPalettes.length > 1 ? 'space-evenly' : 'center'}}>
            {isAuthenticated && userPalettes ? (
                userPalettes.map((palette, idx) => (
                    <div className="palette" key={idx}>
                        {palette.map((color, index) => (
                            <div className="color-container" key={index}>
                                <div className="color" style={{ backgroundColor: "#" + color }}></div>
                                    <button onClick={() => handleCopyColor(color)} className="hex-code" id={color}>
                                        #{color}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))
                ) : !userPalettes && (
                    <h5>No Saved Palettes!</h5>
                )}
          </div>

        </section>
    );

}


export default Palettes;