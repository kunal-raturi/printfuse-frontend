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
  MdAccountCircle,
  FaShop,
  PiArrowsOutLineVerticalLight,
} from "../utils/Icon";
import "../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { Button } from "react-bootstrap";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showStore, setShowStore] = useState(false);

  const handleClick = () => {
    setShow((prevVal) => !prevVal);
  };

  const handleClickStore = () => {
    setShowStore((prevVal) => !prevVal);
  };

  return (
    <div className={`sidebar pt-lg-3 ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header d-grid gap-3 align-content-start px-2">
        <a
          href="/sidebar"
          style={{
            padding: "0rem 18%",
            borderRadius: "0px",
            border: "0px",
            height: "60px",
          }}
          className="d-flex align-items-center justify-content-center overflow-hidden w-100"
        >
          {isCollapsed ? (
            <div
              className="rounded-circle d-flex  align-items-center justify-content-center"
              style={{
                aspectRatio: "1/1",
                height: "60px",

                border: "1px solid lightgray",
              }}
            >
              <i
                className="bi bi-lightning-charge-fill  fs-2"
                style={{ color: "#12715b" }}
              ></i>
            </div>
          ) : (
            <img
              src="/asset/images/printfuseFullLogo.png"
              alt="printfuse-logo"
              className="img-fluid"
            />
          )}
        </a>
        <div className="toggle-btn mb-2" onClick={toggleSidebar}>
          {!isCollapsed ? (
            <IoMdArrowDropleft className="fs-4" />
          ) : (
            <IoMdArrowDropright className="fs-4" />
          )}
        </div>
      </div>
      <div className="invisible-scroll">
        <div
          onClick={handleClickStore}
          style={{
            padding: "15px",
            borderRadius: "0.25rem",
            color: " #12715b",
            transition: " 0.3",
            cursor: "pointer",
          }}
          className={`d-flex align-items-center  justify-content-center sankalp ${
            isCollapsed ? "" : "mx-2"
          }`}
        >
          <FaShop className="fs-5" />
          {!isCollapsed && (
            <>
              <span
                style={{ marginLeft: "15px" }}
                className="align-items-center d-flex justify-content-between w-100"
              >
                <h5
                  className="m-0 text-capitalize fw-semibold"
                  style={{ fontSize: "16px" }}
                >
                  Sankalp
                </h5>
                <PiArrowsOutLineVerticalLight className="fs-5" />
              </span>
            </>
          )}
        </div>
        {showStore && (
          <div
            className="store-menu d-grid"
            style={{
              left: isCollapsed ? "6%" : "13%",
            }}
          >
            <a
              className="d-flex gap-2 text-decoration-none store-header"
              href="/category"
            >
              <FaShop />
              <div className="d-grid align-content-start">
                <h5 className="m-0 text-capitalize">sankalp</h5>
                <span style={{ fontStyle: "7px" }}>Connected</span>
              </div>
            </a>
            <hr className="my-2" />
            <a className="text-decoration-none text-dark" href="/category">
              Manage my store
            </a>
            <a
              className="text-decoration-none  text-dark d-flex align-items-center justify-content-between"
              href="/category"
            >
              <span className=" text-dark">Add a new store</span>
              <i className="bi bi-plus-lg"></i>
            </a>
          </div>
        )}
        <div style={{ borderBottom: "1px solid #12715b" }}></div>
        <ul className={`menu-list mx-2 ${isCollapsed ? "collapsed" : ""}`}>
          <li>
            <IoHomeOutline className="fs-5 my-1" />
            {!isCollapsed && <span>Dashboard</span>}
          </li>
          <li onClick={() => navigate("/category")}>
            <i className="bi bi-diagram-3 fs-5"></i>

            {!isCollapsed && <span>Category</span>}
          </li>
          <li>
            <BsTag className="fs-5" />
            {!isCollapsed && <span>My Products</span>}
          </li>
          <li>
            <BsTruck className="fs-5" />
            {!isCollapsed && <span>Orders</span>}
          </li>
          <li>
            <MdCurrencyRupee className="fs-5" />
            {!isCollapsed && <span>Wallet</span>}
          </li>
          <li>
            <BsBagHeartFill className="fs-5" />

            {!isCollapsed && <span>Branding</span>}
          </li>
          <li onClick={() => navigate("/store-setting")}>
            <FiSettings className="fs-5" />
            {!isCollapsed && <span>Store Setting</span>}
          </li>
          <li>
            <BsBookmarkStar className="fs-5" />

            {!isCollapsed && <span>Subscription</span>}
          </li>
          <li>
            <HiOutlineQuestionMarkCircle className="fs-5" />
            {!isCollapsed && <span>Help Center</span>}
          </li>
        </ul>
        <div style={{ borderBottom: "1px solid #12715b" }}></div>

        <div className="d-flex align-items-center justify-content-center m-3">
          <Button
            className={`w-100  account-button d-flex align-items-center ${
              !isCollapsed ? "" : "justify-content-center"
            } ${show ? "active-sidebar" : ""}`}
            onClick={handleClick}
          >
            <MdAccountCircle className="fs-5" />
            {!isCollapsed && (
              <div
                style={{ marginLeft: "10px" }}
                className="d-flex align-items-center  justify-content-between w-100"
              >
                <span> Account</span> <FaAngleRight />
              </div>
            )}
          </Button>
        </div>
        {show && (
          <div
            className="account-menu d-grid"
            style={{
              left: isCollapsed ? "6%" : "13%",
            }}
          >
            <a className="text-decoration-none" href="/category">
              My account
            </a>
            <a className="text-decoration-none" href="/category">
              My files
            </a>
            <a className="text-decoration-none" href="/category">
              Settings
            </a>
            <hr className="my-2" />
            <a className="text-decoration-none " href="/category">
              Sign Out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
