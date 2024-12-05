import React from "react";
import "../../styles/StoreSetting.css";
import { Container, Tab, Tabs } from "react-bootstrap";
import { MdOpenInNew } from "../../utils/Icon";
import UpdateDetails from "./UpdateDetails";
import ChangeTheme from "./ChangeTheme";
import SocialMedia from "./SocialMedia";
import AddCoupon from "./AddCoupon";
import StoreBanner from "./StoreBanner";
import ReturnDetails from "./ReturnDetails";

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
              <Tab
                eventKey="update-details"
                title="Update Details"
                className="p-2 p-sm-3"
              >
                <UpdateDetails />
              </Tab>
              <Tab
                eventKey="change-theme"
                title="Change Theme"
                className="p-2 p-sm-3"
              >
                <ChangeTheme />
              </Tab>
              <Tab
                eventKey="social-media"
                title="Social Media"
                className="p-2 p-sm-3"
              >
                <SocialMedia />
              </Tab>
              <Tab
                eventKey="add-coupon"
                title="Add Coupon"
                className="p-2 p-sm-3"
              >
                <AddCoupon />
              </Tab>
              <Tab
                eventKey="store-banner"
                title="Store Banner"
                className="p-2 p-sm-3"
              >
                <StoreBanner />
              </Tab>
              <Tab
                eventKey="return-details"
                title="Return Details"
                className="p-2 p-sm-3"
              >
                <ReturnDetails />
              </Tab>
            </Tabs>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StoreSetting;
