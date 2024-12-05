import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { publicRoutes } from "./Routes";
import Toast from "./components/Toaster";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import "./styles/App.css";
import { useNavigate } from "react-router-dom";
import AutoScrollToTop from "./components/AutoScrollToTop";

function App() {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const location = useLocation();

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };
  // --------------------------------------------------------------
  //made tis to condtionally render side bar according to width of screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // ----------------------------------------------------------------
  const noSidebarTopbarRoutes = ["/signin", "/signup"];
  const shouldRenderSidebarAndTopBar = !noSidebarTopbarRoutes.includes(
    location.pathname
  );

  // made this to constanstly check if the token is present at localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }} className="d-lg-flex">
      {shouldRenderSidebarAndTopBar && isSidebarVisible && (
        <div style={{}}>
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={handleSidebarToggle}
          />
        </div>
      )}

      <div
        className="right-side-container"
        style={{
          marginLeft: shouldRenderSidebarAndTopBar
            ? isSidebarVisible
              ? isSidebarCollapsed
                ? "80px"
                : "13%"
              : "0"
            : "0",
          maxWidth: shouldRenderSidebarAndTopBar
            ? isSidebarVisible
              ? isSidebarCollapsed
                ? "calc(100% - 80px)"
                : "87%"
              : "100%"
            : "100%",
          minHeight: "100vh",
          width: "100%",
          transition: "all 0.3s ease",
        }}
      >
        {shouldRenderSidebarAndTopBar && <TopBar />}
        <AutoScrollToTop />
        <Toast />
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={route.component}
              key={idx}
              exact={true}
            />
          ))}
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
