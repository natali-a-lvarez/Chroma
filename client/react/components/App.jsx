import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navigation from "./Navigation";

// Import Components
import Saves from "./Saves";

function App() {
  return (
    <>
      <Navigation />
      <h1>Chroma</h1>

        <Saves />
    </>
  );
}

export default App;
