import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../styles/StoreSetting.css";
import {
  IoStorefrontOutline,
  GiTakeMyMoney,
  CiLocationOn,
  SiReacthookform,
} from "../../utils/Icon";
import CommonButton from "../../components/CommonButton";
import { API_BASE_URL } from "../../Constant/apiContant";
import axios from "axios";

const UpdateDetails = () => {
  const [storeData, setStoreData] = useState({
    name: "",
    shortDescription: "",
    mobileNumber: "",
    addressFirstLine: "",
    addressSecondLine: "",
    state: "",
    city: "",
    pinCode: "",
    email: "",
    billingAddressFirstLine: "",
    billingAddressSecondLine: "",
    billingCity: "",
    billingState: "",
    billingPinCode: "",
    billingMobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData({
      ...storeData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const storeId = localStorage.getItem("storeId");
      try {
        const response = await axios.get(`${API_BASE_URL}store/${storeId}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setStoreData(response.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("erro while fetching dropdown data::", error);
      }
    };
    fetchData();
  }, []);
  console.log("storeData::", storeData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const storeCode = localStorage.getItem("storeCode");

    try {
      const response = await axios.put(`${API_BASE_URL}store`, storeData, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error("erro while updating data::", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className="d-grid gap-4 gap-sm-5 position-relative">
        <Row className="custom-contain-align-center py-3">
          <Col xs={12}>
            <h3 className="fw-semibold text-center py-3">Store Details</h3>
          </Col>

          <Col xs={0} md={3}>
            <div
              className="d-none d-md-flex align-content-center text-align-center w-100 h-100
           justify-content-center flex-wrap
        "
            >
              <IoStorefrontOutline style={{ fontSize: "100px" }} />
            </div>
          </Col>
          <Col xs={12} md={9}>
            <Form.Group className="mb-2" controlId="formName">
              <Form.Label className="mb-0">Store Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="store name"
                name="name"
                value={storeData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formShortDescription">
              <Form.Label className="mb-0">Description(optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="store name"
                name="shortDescription"
                value={storeData.shortDescription}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label htmlFor="logo">
                Store Logo
                <div>
                  <img
                    src="https://printfuse.blr1.digitaloceanspaces.com/printfuse/images/store/logo-1731506709504-193967cc-f1ed-4ec7-a06d-952cf192bdf0.png"
                    alt="Store logo"
                  />
                </div>
              </Form.Label>
              <Form.Control
                type="file"
                name="logo"
                id="logo"
                required
                accept=".png, .jpg, .jpeg, .webp, .svg"
                autoComplete="off"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="custom-contain-align-center py-3">
          <Col xs={12}>
            <h3 className="fw-semibold text-center py-3">Is COD available ?</h3>
          </Col>
          <Col xs={0} md={3}>
            <div
              className="d-none d-md-flex align-content-center text-align-center w-100 h-100
           justify-content-center flex-wrap
        "
            >
              <GiTakeMyMoney style={{ fontSize: "100px" }} />
            </div>
          </Col>
          <Col xs={12} md={9} className="align-items-center  d-flex">
            <Form.Group as={Row} className=" gap-2">
              <Col xs="auto">
                <Form.Check
                  type="checkbox"
                  id="isCodAvailable"
                  name="isCodAvailable"
                  className="ui-checkbox"
                  autoComplete="off"
                  label=""
                />
              </Col>
              <Col>
                <Form.Label
                  htmlFor="isCodAvailable"
                  style={{ fontSize: "1rem" }}
                >
                  Enable this checkbox to offer Cash on Delivery (COD) as a
                  payment option for your customers.
                </Form.Label>
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row className="custom-contain-align-center py-3">
          <Col xs={12}>
            <h3 className="fw-semibold text-center py-3">
              Shop Address Details
            </h3>
          </Col>
          <Col xs={0} md={3}>
            <div
              className="d-none d-md-flex align-content-center text-align-center w-100 h-100
           justify-content-center flex-wrap
        "
            >
              <CiLocationOn style={{ fontSize: "100px" }} />
            </div>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formAddressFirstLine" className="mb-3">
                  <Form.Label className="mb-0">Address First Line</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Flat no/building name "
                    name="addressFirstLine"
                    value={storeData.addressFirstLine}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formAddressSecondLine" className="mb-3">
                  <Form.Label className="mb-0">Address Second Line</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="area/street name"
                    name="addressSecondLine"
                    value={storeData.addressSecondLine}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group controlId="formState" className="mb-3">
                    <Form.Label className="mb-0">State</Form.Label>
                    <Form.Select
                      name="state"
                      value={storeData.state}
                      onChange={handleChange}
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group controlId="formCity" className="mb-3">
                    <Form.Label className="mb-0">City</Form.Label>
                    <Form.Select
                      name="city"
                      value={storeData.city}
                      onChange={handleChange}
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId="formPincode" className="mb-3">
                    <Form.Label className="mb-0">Pincode</Form.Label>
                    <Form.Control
                      placeholder="pincode"
                      type="tel"
                      name="pinCode"
                      value={storeData.pinCode}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formMobileNumber" className="mb-3">
                    <Form.Label className="mb-0">Mobile Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your mobile number"
                      name="mobileNumber"
                      value={storeData.mobileNumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label className="mb-0">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      name="email"
                      value={storeData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>

        <Row className="custom-contain-align-center py-3">
          <Col xs={12}>
            <h3 className="fw-semibold text-center py-3">
              Billing Address Details
            </h3>
          </Col>
          <Col xs={0} md={3}>
            <div
              className="d-none d-md-flex align-content-center text-align-center w-100 h-100
           justify-content-center flex-wrap
        "
            >
              <SiReacthookform style={{ fontSize: "100px" }} />
            </div>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              <Col xs={12} className="d-flex">
                <Form.Check
                  type="checkbox"
                  id="isCodAvailable"
                  name="isCodAvailable"
                  className="ui-checkbox"
                  autoComplete="off"
                  label=""
                />

                <Form.Label
                  htmlFor="isCodAvailable"
                  style={{ fontSize: "1rem" }}
                  className="fw-bold"
                >
                  Same as shop address
                </Form.Label>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formAddressFirstLine" className="mb-3">
                  <Form.Label className="mb-0">Address First Line</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Flat no/building name "
                    name="billingAddressFirstLine"
                    value={storeData.billingAddressFirstLine}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formAddressSecondLine" className="mb-3">
                  <Form.Label className="mb-0">Address Second Line</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="area/street name"
                    name="billingAddressSecondLine"
                    value={storeData.billingAddressSecondLine}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group controlId="formState" className="mb-3">
                    <Form.Label className="mb-0">State</Form.Label>
                    <Form.Select
                      name="billingState"
                      value={storeData.billingState}
                      onChange={handleChange}
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group controlId="formCity" className="mb-3">
                    <Form.Label className="mb-0">City</Form.Label>
                    <Form.Select
                      name="billingCity"
                      value={storeData.billingCity}
                      onChange={handleChange}
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId="formPincode" className="mb-3">
                    <Form.Label className="mb-0">Pincode</Form.Label>
                    <Form.Control
                      placeholder="pincode"
                      type="tel"
                      name="billingPinCode"
                      value={storeData.billingPinCode}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formMobile" className="mb-3">
                    <Form.Label className="mb-0">Mobile Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your mobile number"
                      name="billingMobileNumber"
                      value={storeData.billingMobileNumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label className="mb-0">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
        <div className="d-flex justify-content-center pt-3 pt-md-4">
          <Button type="submit">Save</Button>
        </div>
      </Container>
    </Form>
  );
};

export default UpdateDetails;
