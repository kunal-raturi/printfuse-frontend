import React, { useState } from "react";
import {
  IoHomeOutline,
  BsBagHeartFill,
  BsBookmarkStar,
  BsTag,
  BsTruck,
  MdCurrencyRupee,
  IoMdArrowDropleft,
  IoMdArrowDropright,
  FiSettings,
  HiOutlineQuestionMarkCircle,
  PiTreeStructureBold,
  MdAccountCircle,
  FaShop,
} from "../utils/Icon";
import "../styles/TopBar.css";
import { useNavigate } from "react-router-dom";
import { Accordion, Form } from "react-bootstrap";
import { triggerToast } from "./Toaster";
import axios from "axios";
import { API_BASE_URL } from "../Constant/apiContant";

const TopBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false); // for store menu
  const [showMenu, setShowMenu] = useState(false); // for main menu
  const [activeKey, setActiveKey] = useState(null); // track active Accordion

  // Toggle store menu visibility
  const handleClick = () => {
    setShow((prevVal) => !prevVal);
  };

  // Toggle main menu visibility
  const handleMenu = () => {
    setShowMenu((prevVal) => !prevVal);
  };

  // Handle Accordion toggle, independent of menu state
  const handleAccordionToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
    // Toggle active key for Accordion
  };

  const handleSignOut = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      triggerToast("error", "Token not found. Unable to sign out.");
      return;
    }

    try {
      await axios.get(`${API_BASE_URL}auth/signout`, {
        headers: { token: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("storeCode");
      localStorage.removeItem("storeId");
      sessionStorage.clear();

      triggerToast("success", "SignOut successfully");
      setTimeout(() => navigate("/signin"), 1000);
    } catch (error) {
      console.error("Error during signout:", error);
      triggerToast("error", "Error while signing out");
    }
  };

  return (
    <div className="d-flex d-lg-none top-bar sticky-top">
      <a className="image-container" href="/category">
        <img src="/asset/images/printfuseFullLogo.png" alt="printfuse logo" />
      </a>
      <div className="d-flex align-items-center gap-2 gap-sm-3">
        {/* Store Menu */}
        <div
          className="thunder-div"
          style={{ backgroundColor: show ? "#12715b" : "white" }}
          onClick={handleClick}
        >
          <i
            className="bi bi-lightning-charge-fill thunder-icon"
            style={{ color: show ? "white" : "black" }}
          ></i>
          {show && (
            <div className="store-menu d-grid">
              <a className="d-flex gap-2 store-display-part" href="/category">
                <FaShop />
                <div className="d-grid align-content-start">
                  <h5 className="m-0 text-capitalize">sankalp</h5>
                  <span className="fs-12">Connected</span>
                </div>
              </a>
              <hr className="my-2" />
              <a className="text-decoration-none" href="/category">
                Manage my store
              </a>
              <a
                className="text-decoration-none d-flex align-items-center justify-content-between"
                href="/category"
              >
                <span>Add a new store</span>
                <i className="bi bi-plus-lg"></i>
              </a>
            </div>
          )}
        </div>

        {/* Main Menu */}
        <div className="list-div" onClick={handleMenu}>
          <span>
            <i className="bi bi-list" style={{ fontSize: "25px" }}></i>
          </span>
          {showMenu && (
            <div>
              <ul className="topbar-menu-list mx-2">
                <li>
                  <IoHomeOutline className="my-1" />
                  <span>Dashboard</span>
                </li>
                <li onClick={() => navigate("/category")}>
                  <i className="bi bi-diagram-3 fs-5 "></i>

                  <span>Category</span>
                </li>
                <li>
                  <BsTag />
                  <span>My Products</span>
                </li>
                <li>
                  <BsTruck />
                  <span>Orders</span>
                </li>
                <li>
                  <MdCurrencyRupee />
                  <span>Wallet</span>
                </li>
                <li>
                  <BsBagHeartFill />
                  <span>Branding</span>
                </li>
                <li onClick={() => navigate("/store-setting")}>
                  <FiSettings />
                  <span>Store Setting</span>
                </li>
                <li>
                  <BsBookmarkStar />
                  <span>Subscription</span>
                </li>
                <li>
                  <HiOutlineQuestionMarkCircle />
                  <span>Help Center</span>
                </li>
                {/* Accordion */}
                <Accordion flush activeKey={activeKey}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header
                      className="p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccordionToggle("0");
                      }}
                    >
                      <MdAccountCircle />
                      <span style={{ marginLeft: "10px" }}> Account</span>
                    </Accordion.Header>
                    <Accordion.Body className="py-2 d-grid">
                      <a
                        className="text-decoration-none text-dark"
                        href="/category"
                      >
                        My account
                      </a>
                      <a
                        className="text-decoration-none text-dark"
                        href="/category"
                      >
                        My files
                      </a>
                      <a
                        className="text-decoration-none text-dark"
                        href="/category"
                      >
                        Settings
                      </a>
                      <hr className="my-2" />
                      <div
                        className="text-decoration-none text-dark"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
