import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/colors.css";

function Colors({ userData }) {
    const { isAuthenticated } = useAuth0();
    const userColors = userData.saved_colors;

    function handleCopyColor(currColor) {
        navigator.clipboard.writeText("#" + currColor);
        // Show the message once the color is copied
        const message = document.getElementById("message");
        message.style.display = "block";

        // Change the background color of the message button to the copied color
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
        <>
        <div className="saved-colors" id={userColors && userColors.length >= 5 ? "five-saved-colors" : "less-five-saved-colors"}>
            {isAuthenticated && userColors ? (
                userColors.map((color, idx) => (
                    <div className="saved-color-container" key={idx}>
                        <div className="saved-color" style={{ backgroundColor: "#" + color }}></div>
                        <button onClick={() => handleCopyColor(color)} className="hex-code" id={color}>
                            #{color}
                        </button>
                    </div>
                ))) : !userColors && (
                    <h5>No Saved Colors!</h5>
                )}
        </div>

        <div id="message" style={{display: 'none'}}>
            <button id="message-button">Color copied to the clipboard!</button>
        </div>
        </>
    );
}

export default Colors;