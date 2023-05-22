import { Outlet } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";

function FrontLayout() {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export default FrontLayout;
