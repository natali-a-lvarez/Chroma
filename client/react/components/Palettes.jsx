import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/palettes.css";


function Palettes({ userData }) {
    const { isAuthenticated } = useAuth0();
    const userPalettes = userData.saved_palettes;

    function handleCopyColor(currColor) {
        navigator.clipboard.writeText("#" + currColor);
        // Show the message once the color is copied
        const message = document.getElementById("message");
        message.style.display = "block";
        const messageButton = document.getElementById("message-button");
        messageButton.style.backgroundColor = "#" + currColor;
        // Change the text color based on the brightness of the color
        const color = currColor;
        const r = parseInt(color.substr(0, 2), 16);
        const g = parseInt(color.substr(2, 2), 16);
        const b = parseInt(color.substr(4, 2), 16);
        const brightness = Math.sqrt((r * r * .299) + (g * g * .587) + (b * b * .114));
        if (brightness > 130) {
            messageButton.style.color = "black";
        } else {
            messageButton.style.color = "white";
        }
        // Hide the message after 1.5 seconds
        setTimeout(() => {
            message.style.display = "none";
        }, 1500);
    }

    return (
        <section>
            <div className="palettes" id= {userPalettes && userPalettes.length > 1 ? "two-plus-palettes" : "single-palette"}>
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
          </div><br/>
          <div id="message" style={{display: 'none'}}>
            <button id="message-button">Color copied to the clipboard!</button>
        </div>


        </section>
    );

}


export default Palettes;