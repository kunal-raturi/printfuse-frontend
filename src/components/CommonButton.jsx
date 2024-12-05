import React from "react";
import { Button } from "react-bootstrap";
import { MdKeyboardDoubleArrowRight } from "../utils/Icon";
import "../styles/CommonButton.css";

const CommonButton = ({ type, onClick }) => {
  return (
    <Button type={type} onClick={onClick} className="common-button active-btn">
      <span className="button__text">Save</span>
      <span className="button__icon">
        <MdKeyboardDoubleArrowRight />
      </span>
    </Button>
  );
};

export default CommonButton;
