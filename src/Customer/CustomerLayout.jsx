import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navebar/Navbar";
import Footer from "./footer/Footer";
// import { ImageGallery } from "./pages/surprice/Surprice";
import Vasan from "./surprice/Vasan";
import { ParallaxProvider } from "react-scroll-parallax";
import { useState } from "react";

const CustomerLayout = () => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);
  
  // Check if current route is 'surprice'
  const isSurpriceRoute = location.pathname.includes("Surprice");

  return (
    <div>
      <div className={`sticky top-0 !z-50`}>

      {/* <Navbar /> */}
      </div>
      <ParallaxProvider>
        {isSurpriceRoute ? <Vasan /> : <Outlet />}
      </ParallaxProvider>
      {/* Hide footer for surprise route */}
      {/* {!isSurpriceRoute && <Footer />} */}
    </div>
  );
};

export default CustomerLayout;