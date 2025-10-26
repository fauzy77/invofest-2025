import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Talkshow from "./pages/Talkshow";
import Seminar from "./pages/Seminar";
import Competition from "./pages/Competition";
import Navbar from "./components/custom/Navbar";
import Workshop from "./pages/Workshop";
import Poster from "./pages/Poster";
import WebdesignCompetition from "./pages/WebDesign";
import UiUx from "./pages/UiUx";
import LoginPage from "./pages/LoginPage";
import RegisterWorkshopPage from "./pages/RegisterWorkshopPage";
import RegisterUiUxPage from "./pages/RegisterUiUxPage";
import RegisterPosterPage from "./pages/RegisterPosterPage";
import RegisterWebPage from "./pages/RegisterWebPage";
import RegisterSeminarPage from "./pages/RegisterSeminarPage";
import RegisterTalkshowPage from "./pages/RegisterTalkshowPage";
import Footer from "./components/custom/Footer";
import BtnBackTop from "./components/custom/BtnBackTop";
import { Dashboard } from "./pages/Dashboard";
import { PenSeminar } from "./pages/dashboard/PSeminar";
import { HomeAdmin } from "./pages/dashboard/HomeAdmin";
import { PenTalkshow } from "./pages/dashboard/PTalkshow";
import { PenWorkshop } from "./pages/dashboard/PWorkshop";
import { PenComPoster } from "./pages/dashboard/competition/PCPoster";
import { PenComUiUx } from "./pages/dashboard/competition/PCUiux";
import { PenComWeb } from "./pages/dashboard/competition/PCWeb";
import "aos/dist/aos.css";

const App = () => {
  const location = useLocation();

  // Cek apakah halaman sekarang adalah dashboard
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <React.Fragment>
      {/* Navbar dan Footer hanya tampil jika bukan halaman Dashboard */}
      {!isDashboard && <Navbar />}

      <div className={!isDashboard ? "pt-28" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/talkshow" element={<Talkshow />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/competition/poster" element={<Poster />} />
          <Route path="/competition/web-design" element={<WebdesignCompetition />} />
          <Route path="/competition/ui-ux" element={<UiUx />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/login-admin" element={<LoginPage />} />
          <Route path="/workshop/register-workshop" element={<RegisterWorkshopPage />} />
          <Route path="/competition/ui-ux/register-ui-ux" element={<RegisterUiUxPage />} />
          <Route path="/competition/poster/register-poster" element={<RegisterPosterPage />} />
          <Route path="/competition/web-design/register-web-design" element={<RegisterWebPage />} />
          <Route path="/seminar/register-seminar" element={<RegisterSeminarPage />} />
          <Route path="/talkshow/register-talkshow" element={<RegisterTalkshowPage />} />

          <Route path="/dashboard" element={<Dashboard />}> 
            <Route index element={<HomeAdmin />} ></Route>
            <Route path="seminar" element={<PenSeminar/>} />
            <Route path="talkshow" element={<PenTalkshow/>} />
            <Route path="workshop" element={<PenWorkshop />} />
            <Route path="competition/poster" element={<PenComPoster />} />
            <Route path="competition/uiux" element={<PenComUiUx />} />
            <Route path="competition/web-design" element={<PenComWeb />} />
          </Route>
        </Routes>
      </div>

      {!isDashboard && (
        <>
          <Footer />
          <BtnBackTop />
        </>
      )}
    </React.Fragment>
  );
};

export default App;
