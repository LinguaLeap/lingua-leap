import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

function MainLayoutOutlet() {
    return (
        <div>
            <Header />

            <main><Outlet /></main>

            <Footer />
        </div>
    );
}

export default MainLayoutOutlet;
