import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

function MainLayoutOutlet() {
  return (
    <div className="flex flex-col bg-bg bg-cover min-h-screen">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayoutOutlet;
