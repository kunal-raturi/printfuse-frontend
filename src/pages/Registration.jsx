import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FiAtSign, PiStarFourFill, IoDiamondOutline } from "../utils/Icon";
import "../styles/Login.css";

const Registration = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
    // if (formData[name] === "") {
    //   setError({
    //     ...error,
    //     [name]: `*${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
    //   });
    // }
    // if (formData[name] === "") {
    //   setTouched({ ...touched, [name]: `*${name} is required` });
    // }
  };

  return (
    <Container fluid className="d-grid align-items-center">
      <Row className="min-vh-100">
        <Col xs={12} md={6} className="p-0 d-grid">
          <div
            className="p-4 p-md-5 align-content-between align-content-md-end d-grid"
            style={{ minHeight: "300px" }}
          >
            <div className="guy-using-phone"></div>
            <div className="guy-bg-color"></div>
            <div className="d-flex justify-content-center align-items-center d-md-none">
              <a href="/signin" className="p-1 anchor-div-1">
                <img
                  src="/asset/images/printfuseFullLogo.png"
                  alt="printfuse-full-logo"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </a>
            </div>
            <h5 className="m-0  font-decoration-signin">
              Sign up and choose from over 200+ high-quality products. Customize
              them and start selling custom merch for free.
            </h5>
          </div>
        </Col>
        <Col xs={12} md={6} className="p-0 d-grid">
          <div
            className=" d-grid px-3 px-lg-5 py-5 position-relative"
            style={{ backgroundColor: "#f5eee9" }}
          >
            <div className="d-none d-md-flex align-items-center justify-content-center position-absolute start-50 logo-div">
              <a href="/signin" className="p-1 anchor-div">
                <img
                  src="/asset/images/printfuseFullLogo.png"
                  alt="printfuse-full-logo"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </a>
            </div>
            <Container className="d-grid gap-4 px-xl-5 position-relative left-side-holder">
              <div className="d-none d-md-block icon-in-sign">
                <FiAtSign className="first" />
                <PiStarFourFill className="second" />
                <IoDiamondOutline className="third" />
                <PiStarFourFill className="fourth" />
              </div>

              <div className="d-grid px-md-5">
                <Form>
                  <h2
                    className="fw-bolder m-0 text-center m-0 text-uppercase "
                    style={{ letterSpacing: " 4px" }}
                  >
                    get started
                  </h2>
                  <h1 className=" fw-bolder m-0 text-center my-2 display-4">
                    for free
                  </h1>
                  <Row className="g-2">
                    <Col xs={12} className="px-1 d-grid align-content-start">
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="mb-0">
                          Mobile
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="Enter 10 digit mobile number"
                          required
                          className="py-2"
                          onBlur={handleBlur}
                          style={{
                            borderColor:
                              touched.mobile && !formData.mobile ? "red" : "",
                          }}
                        />
                        {(error?.mobile ||
                          (touched.mobile && !formData.mobile)) && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "15px",
                              fontWeight: "normal",
                            }}
                          >
                            {error?.mobile
                              ? error.mobile
                              : "*Mobile is required"}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-grid gap-3 pt-sm-3 pt-4">
                    <p className="m-0 text-center" style={{ fontSize: "10px" }}>
                      By clicking Sign up you agree to Printfuse
                      <a href="/signin">Terms of Service</a>
                      <a href="/signin">Privacy Policy</a>
                      and
                      <a href="/signin">Intellectual Property Policy</a>
                    </p>
                    <span className=" text-center" style={{ fontSize: "16px" }}>
                      Already have an account?
                      <a
                        className="text-decoration-none "
                        style={{ fontWeight: "600", color: "#12715b" }}
                        href="/signin"
                      >
                        Signin
                      </a>
                    </span>
                  </div>
                </Form>
              </div>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
