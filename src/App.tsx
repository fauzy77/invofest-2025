import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Talkshow from "./pages/Talkshow";
import Seminar from "./pages/Seminar";
import Competition from "./pages/Competition";
import Navbar from "./components/custom/Navbar";
import Workshop from "./pages/Workshop";
import Poster from "./pages/Poster";
import WebdesignCompetition from "./pages/WebDesign";
import UiUx from "./pages/UiUx";
import Footer from "./components/custom/Footer";
import BtnBackTop from "./components/custom/BtnBackTop";
import "aos/dist/aos.css";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/talkshow" element={<Talkshow />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/competition/poster" element={<Poster />} />
          <Route path="/competition/web-design" element={<WebdesignCompetition />} />
          <Route path="/competition/ui-ux" element={<UiUx />} />
          <Route path="/workshop" element={<Workshop />} />
        </Routes>
      </div>
      <BtnBackTop />
      <Footer />
    </React.Fragment>
  );
};

export default App;
