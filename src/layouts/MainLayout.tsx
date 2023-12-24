import { LayoutType } from "../types/types";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Layout = ({ children }: LayoutType) => {
  return (
    <div>
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
