import Header from "../components/common/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/common/Footer";

function MainLayoutOutlet() {
    const location = useLocation();
    const isMessagesOrCommunityPage =
        location.pathname === "/messages" || location.pathname === "/community";

    return (
        <div className="flex flex-col min-h-screen bg-light dark:bg-sky-blue-750">
            <Header />

            <main className="flex flex-1">
                <Outlet />
            </main>

            {isMessagesOrCommunityPage ? null : <Footer />}
        </div>
    );
}

export default MainLayoutOutlet;
