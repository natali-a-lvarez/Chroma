import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Palettes from "./Palettes";

import "../styles/saves.css";
import apiURL from "../api" 
import axios from "axios";


function Saves() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  const [palettesView, setPalettesView] = useState(true);
  const [colorsView, setColorsView] = useState(false);
  const [userData, setUserData] = useState([]);

  function togglePalettesView() {
    setPalettesView(true);
    setColorsView(false);
    {isAuthenticated && fetchUser(user)}
  }

  function toggleColorsView() {
    setPalettesView(false);
    setColorsView(true);
  }

     // Fetch User from Database
     async function fetchUser(user) {
        try {
            const res = await axios.post(`${apiURL}/users/`, {
                email: user.email
            });
            const data = res.data;
            console.log(data);
            setUserData(data);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    }

    useEffect(() => {
        isAuthenticated && palettesView &&
        console.log(user.email)    
        fetchUser(user);
    }, [isAuthenticated]);


  return (
    <section>
      <div className="saves-flex">
        <button onClick={togglePalettesView}>Saved Palettes</button>
        <button onClick={toggleColorsView}>Saved Colors</button>
      </div>

      {/* Toggle Saved Palettes and Colors Display based on view (palettes/colors) */}
      {palettesView ? (
        <Palettes userData={userData}/>
      ) : (
        colorsView && (
          <>
            <h4>Saved Colors</h4>
            {/* Conditional: If user has colors saved show results, else display "No saved colors" */}
            {/* Map out saved colors to divs */}
          </>
        )
      )}
    </section>
  );
}

export default Saves;
