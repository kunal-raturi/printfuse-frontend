import React from "react";
import "../../styles/StoreSetting.css";
import { Container, Tab, Tabs } from "react-bootstrap";
import { MdOpenInNew } from "../../utils/Icon";
import UpdateDetails from "./UpdateDetails";

const StoreSetting = () => {
  return (
    <div>
      <div className="store-setting">
        <Container className="pb-5 px-lg-10">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0 fw-semibold py-4">Store Setting</h2>
            <a
              className="store-btn fw-semibold flex-center-align gap-1 d-flex justify-content-center align-items-center"
              href="/store-setting"
              target="_blanck"
            >
              <span className="d-none d-sm-block">Open Store</span>
              <MdOpenInNew />
            </a>
          </div>

          <div className="p-2 p-sm-3 store-tab-container">
            <Tabs
              defaultActiveKey="update-details"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="update-details" title="Update Details">
                <UpdateDetails />
              </Tab>
              <Tab eventKey="change-theme" title="Change Theme">
                Tab content for Profile
              </Tab>
              <Tab eventKey="social-media" title="Social Media">
                Tab content for Loooonger Tab
              </Tab>
              <Tab eventKey="add-coupon" title="Add Coupon">
                Tab content for Contact
              </Tab>
              <Tab eventKey="store-banner" title="Store Banner">
                Tab content for Contact
              </Tab>
              <Tab eventKey="return-details" title="Return Details">
                Tab content for Contact
              </Tab>
            </Tabs>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StoreSetting;
