import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Package from "./Pages/Package.jsx";
import LoadingPage from "./Component/LoadingPage/LoadingPage.jsx";
import { usePageLoad } from "./Hooks/PageLoad";
import Background from "./Component/Background/Background.jsx";

function App() {
  const { isLoading, finishLoading } = usePageLoad();

  return (
    <>
      {isLoading ? (
        <LoadingPage onFinished={finishLoading} />
      ) : (
        <>
        {/* <Background /> */}
          <Navbar />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/package" element={<Package />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App;