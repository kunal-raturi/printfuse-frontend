import React from "react";
import { Button } from "react-bootstrap";

const CommonButton = () => {
  return (
    <div className="d-flex justify-content-center pt-3 pt-md-4">
      <Button
        type="button"
        className="next-button text-decoration-none fw-bold d-grid p-0"
        style={{
          border: "0px",
          background: "transparent",
          pointerEvents: "auto",
          opacity: 1,
        }}
        variant="primary"
      >
        <Button type="button" className="button active-btn">
          <span className="button__text">Save</span>
          <span className="button__icon"></span>
        </Button>
      </Button>
    </div>
  );
};

export default CommonButton;
