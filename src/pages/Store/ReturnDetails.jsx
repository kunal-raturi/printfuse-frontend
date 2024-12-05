import React from "react";
import { Form } from "react-bootstrap";

const ReturnDetails = () => {
  return (
    <div className="d-grid gap-2">
      <div className="d-grid gap-2 px-2">
        <div className="d-flex justify-content-between">
          <h4 className="fw-semibold m-0">Customer Returns on Snapstore</h4>
          <Form.Check
            type="switch"
            id="custom-switch"
            className="status-switch"
            aria-label="Toggle status"
          />
        </div>
        <p>
          Do you want to allow your customers to create return requests directly
          from the Snapstore? If a customer initiates a return request, the
          order will be shipped back to your shop address and will be available
          for re-shipping in the Returns &gt; RTO section.
        </p>
      </div>
    </div>
  );
};

export default ReturnDetails;
