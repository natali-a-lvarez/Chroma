import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import LoginButton from "./Login";
import LogoutButton from "./Logout";

function App() {





    return (
        <div>
            <h1>Chroma</h1>
            <LoginButton />
            <LogoutButton />
        </div>
    );

}

export default App;