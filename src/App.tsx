import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <React.StrictMode>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </React.StrictMode>
    );
}

export default App;
