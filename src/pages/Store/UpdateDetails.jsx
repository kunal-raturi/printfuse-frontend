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
import { triggerToast } from "../../components/Toaster";
import "../../styles/StoreSetting.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
    emailAddress: "",
    billingAddressFirstLine: "",
    billingAddressSecondLine: "",
    billingCity: "",
    billingState: "",
    billingPinCode: "",
    billingMobileNumber: "",
    billingEmailAddress: "",
    logo: null,
    isCodAvailable: 0,
  });

  const [stateCityData, setStateCityData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    mobileNumber: false,
    addressFirstLine: false,
    addressSecondLine: false,
    state: false,
    city: false,
    pinCode: false,
    emailAddress: false,
    billingAddressFirstLine: false,
    billingAddressSecondLine: false,
    billingCity: false,
    billingState: false,
    billingPinCode: false,
    billingMobileNumber: false,
    billingEmailAddress: false,
  });
  const [error, setError] = useState({
    name: "",
    mobileNumber: "",
    addressFirstLine: "",
    addressSecondLine: "",
    state: "",
    city: "",
    pinCode: "",
    emailAddress: "",
    billingAddressFirstLine: "",
    billingAddressSecondLine: "",
    billingCity: "",
    billingState: "",
    billingPinCode: "",
    billingMobileNumber: "",
    billingEmailAddress: "",
  });

  //to display error
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setStoreData({
        ...storeData,
        logo: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setStoreData({
      ...storeData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  //to fetch the data of form
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
        setStoreData({
          name: response.data.data.name,
          shortDescription: response.data.data.shortDescription,
          mobileNumber: response.data.data.mobileNumber,
          addressFirstLine: response.data.data.addressFirstLine,
          addressSecondLine: response.data.data.addressSecondLine,
          state: response.data.data.state,
          city: response.data.data.city,

          pinCode: response.data.data.pinCode,
          emailAddress: response.data.data.emailAddress,
          billingAddressFirstLine: response.data.data.billingAddressFirstLine,
          billingAddressSecondLine: response.data.data.billingAddressSecondLine,
          billingCity: response.data.data.billingCity,
          billingState: response.data.data.billingState,
          billingPinCode: response.data.data.billingPinCode,
          billingMobileNumber: response.data.data.billingMobileNumber,
          billingEmailAddress: response.data.data.billingEmailAddress,
          logo: null,
          isCodAvailable: response.data.data.isCodAvailable,
        });
        setImagePreview(response.data.data.logo);
      } catch (error) {
        console.error("erro while fetching data::", error);
      }
    };
    fetchData();
  }, [refresh]);

  //to fetch data of state and city
  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}home/global`, {
          headers: {
            token: `essentials`,
          },
        });
        setStateCityData(response.data.data);
      } catch (error) {
        console.error("error while fetching data:: ", error);
      }
    };
    fetchStateData();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");
  //   const storeCode = localStorage.getItem("storeCode");

  //   try {
  //     const response = await axios.put(`${API_BASE_URL}store`, storeData, {
  //       headers: {
  //         token: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response);
  //     triggerToast("success", "Store data updated successfully ");
  //   } catch (error) {
  //     console.error("error while updating data::", error);
  //     triggerToast("error", "Unable to update store data successfully ");
  //   }
  // };

  //this is to update
  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");
  //   const storeId = localStorage.getItem("storeId");

  //   const formData = new FormData();

  //   formData.append("name", storeData.name || "");
  //   formData.append("shortDescription", storeData.shortDescription || "");
  //   formData.append("mobileNumber", storeData.mobileNumber || "");
  //   formData.append("addressFirstLine", storeData.addressFirstLine || "");
  //   formData.append("addressSecondLine", storeData.addressSecondLine || "");
  //   formData.append("state", storeData.state || "");
  //   formData.append("city", storeData.city || "");
  //   formData.append("pinCode", storeData.pinCode || "");
  //   formData.append("emailAddress", storeData.emailAddress || "");
  //   formData.append(
  //     "billingAddressFirstLine",
  //     storeData.billingAddressFirstLine || ""
  //   );
  //   formData.append(
  //     "billingAddressSecondLine",
  //     storeData.billingAddressSecondLine || ""
  //   );
  //   formData.append("billingCity", storeData.billingCity || "");
  //   formData.append("billingState", storeData.billingState || "");
  //   formData.append("billingPinCode", storeData.billingPinCode || "");
  //   formData.append("billingMobileNumber", storeData.billingMobileNumber || "");
  //   formData.append("billingEmailAddress", storeData.billingEmailAddress || "");
  //   formData.append("logo", storeData.logo || null);

  //   // Only append the thumbnail if there's a new file selected
  //   if (storeData.logo) {
  //     formData.append("logo", storeData.logo);
  //   }

  //   try {
  //     const response = await axios.put(
  //       `${API_BASE_URL}store/${storeId}`,
  //       formData,
  //       {
  //         headers: {
  //           token: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     triggerToast("success", "storeData updated successfully");
  //     console.log(response);
  //     setStoreData({
  //       name: "",
  //       shortDescription: "",
  //       mobileNumber: "",
  //       addressFirstLine: "",
  //       addressSecondLine: "",
  //       state: "",
  //       city: "",
  //       pinCode: "",
  //       emailAddress: "",
  //       billingAddressFirstLine: "",
  //       billingAddressSecondLine: "",
  //       billingCity: "",
  //       billingState: "",
  //       billingPinCode: "",
  //       billingMobileNumber: "",
  //       billingEmailAddress: "",
  //       logo: null,
  //     });
  //     setImagePreview(null);
  //     setRefresh((prev) => !prev);
  //   } catch (error) {
  //     console.error("error while fetching  data::", error);
  //     triggerToast("error", "error while updating storeData");
  //   }
  // };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Do you really want to save this data?",

        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("token");
          const storeId = localStorage.getItem("storeId");

          const formData = new FormData();
          formData.append("name", storeData.name || "");
          formData.append("shortDescription", storeData.shortDescription || "");
          formData.append("mobileNumber", storeData.mobileNumber || "");
          formData.append("addressFirstLine", storeData.addressFirstLine || "");
          formData.append(
            "addressSecondLine",
            storeData.addressSecondLine || ""
          );
          formData.append("state", storeData.state || "");
          formData.append("city", storeData.city || "");
          formData.append("pinCode", storeData.pinCode || "");
          formData.append("emailAddress", storeData.emailAddress || "");
          formData.append(
            "billingAddressFirstLine",
            storeData.billingAddressFirstLine || ""
          );
          formData.append(
            "billingAddressSecondLine",
            storeData.billingAddressSecondLine || ""
          );
          formData.append("billingCity", storeData.billingCity || "");
          formData.append("billingState", storeData.billingState || "");
          formData.append("billingPinCode", storeData.billingPinCode || "");
          formData.append(
            "billingMobileNumber",
            storeData.billingMobileNumber || ""
          );
          formData.append(
            "billingEmailAddress",
            storeData.billingEmailAddress || ""
          );
          formData.append("logo", storeData.logo || null);
          formData.append("isCodAvailable", storeData.isCodAvailable || "");

          // Only append the thumbnail if there's a new file selected
          if (storeData.logo) {
            formData.append("logo", storeData.logo);
          }

          try {
            const response = await axios.put(
              `${API_BASE_URL}store/${storeId}`,
              formData,
              {
                headers: {
                  token: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            triggerToast("success", "Store data updated successfully!");
            console.log(response);

            // Reset the form and clear preview
            setStoreData({
              name: "",
              shortDescription: "",
              mobileNumber: "",
              addressFirstLine: "",
              addressSecondLine: "",
              state: "",
              city: "",
              pinCode: "",
              emailAddress: "",
              billingAddressFirstLine: "",
              billingAddressSecondLine: "",
              billingCity: "",
              billingState: "",
              billingPinCode: "",
              billingMobileNumber: "",
              billingEmailAddress: "",
              logo: null,
              isCodAvailable: 0,
            });
            setImagePreview(null);
            setRefresh((prev) => !prev);
          } catch (error) {
            console.error("Error while updating store data:", error);
            triggerToast("error", "Error while updating store data.");
          }
          swalWithBootstrapButtons.fire({
            title: "Updated!",
            text: "Your store data have been updated.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // If the user cancels, show a canceled message
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  return (
    <Form onSubmit={handleUpdate} encType="multipart/form-data">
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
                required
                value={storeData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  borderColor: touched.name && !storeData.name ? "red" : "",
                }}
              />
              {(error?.name || (touched.name && !storeData.name)) && (
                <div
                  style={{
                    color: "red",
                    fontSize: "15px",
                    fontWeight: "normal",
                  }}
                >
                  {error?.name ? error.name : "*Name is required"}
                </div>
              )}
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
                // onBlur={handleBlur}
                // style={{
                //   borderColor:
                //     touched.shortDescription && !storeData.shortDescription
                //       ? "red"
                //       : "",
                // }}
              />
              {/* {(error?.shortDescription ||
                (touched.shortDescription && !storeData.shortDescription)) && (
                <div
                  style={{
                    color: "red",
                    fontSize: "15px",
                    fontWeight: "normal",
                  }}
                >
                  {error?.name ? error.name : "*Description is required"}
                </div>
              )} */}
            </Form.Group>

            {/* <Form.Group className="mb-2">
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
            </Form.Group> */}
            <Form.Group className="mb-2">
              <Form.Label>
                Store Logo
              </Form.Label>
              <div className="div-for-image-storeData d-flex align-items-center justify-content-start mb-3">
                <label htmlFor="logo">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: " 150px",
                        height: "100px",
                        objectFit: "cover",
                      }} // Style the image preview
                    />
                  ) : (
                    <i className="bi bi-image" style={{ fontSize: "40px" }}></i>
                  )}
                </label>
                <Form.Control
                  type="file"
                  id="logo"
                  name="logo"
                  className="d-none"
                  onChange={handleFileChange}
                />
              </div>
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
                  checked={storeData.isCodAvailable === 1}
                  onChange={handleChange}
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
                    onBlur={handleBlur}
                    style={{
                      borderColor:
                        touched.addressFirstLine && !storeData.addressFirstLine
                          ? "red"
                          : "",
                    }}
                  />
                  {(error?.addressFirstLine ||
                    (touched.addressFirstLine &&
                      !storeData.addressFirstLine)) && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "15px",
                        fontWeight: "normal",
                      }}
                    >
                      {error?.name ? error.name : "*Address 1 is required"}
                    </div>
                  )}
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
                    onBlur={handleBlur}
                    style={{
                      borderColor:
                        touched.addressSecondLine &&
                        !storeData.addressSecondLine
                          ? "red"
                          : "",
                    }}
                  />
                  {(error?.addressSecondLine ||
                    (touched.addressSecondLine &&
                      !storeData.addressSecondLine)) && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "15px",
                        fontWeight: "normal",
                      }}
                    >
                      {error?.name ? error.name : "*Address 2 is required"}
                    </div>
                  )}
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
                      <option value="">select state</option>
                      {stateCityData?.length > 0 &&
                        stateCityData?.map((state, index) => (
                          <option key={index} value={state.value}>
                            {state.label}
                          </option>
                        ))}
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
                      {stateCityData
                        .find((state) => state.value === storeData.state)
                        ?.children.map((city, index) => (
                          <option key={index} value={city.value}>
                            {city.label}
                          </option>
                        ))}
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
                      required
                      value={storeData.pinCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        borderColor:
                          touched.pinCode && !storeData.pinCode ? "red" : "",
                      }}
                    />
                    {(error?.pinCode ||
                      (touched.pinCode && !storeData.pinCode)) && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "normal",
                        }}
                      >
                        {error?.name ? error.name : "*Pincode is required"}
                      </div>
                    )}
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
                      onBlur={handleBlur}
                      style={{
                        borderColor:
                          touched.mobileNumber && !storeData.mobileNumber
                            ? "red"
                            : "",
                      }}
                    />
                    {(error?.mobileNumber ||
                      (touched.mobileNumber && !storeData.mobileNumber)) && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "normal",
                        }}
                      >
                        {error?.mobileNumber
                          ? error.mobileNumber
                          : "*Mobile number is required"}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label className="mb-0">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      name="emailAddress"
                      required
                      value={storeData.emailAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        borderColor:
                          touched.emailAddress && !storeData.emailAddress
                            ? "red"
                            : "",
                      }}
                    />
                    {(error?.emailAddress ||
                      (touched.emailAddress && !storeData.emailAddress)) && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "normal",
                        }}
                      >
                        {error?.name ? error.name : "*Email is required"}
                      </div>
                    )}
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
                  id="sameAsShopAddress"
                  name="sameAsShopAddress"
                  className="ui-checkbox"
                  autoComplete="off"
                  label=""
                  onChange={(e) => {
                    const isChecked = e.target.checked;

                    setStoreData((prev) => ({
                      ...prev,
                      billingAddressFirstLine: isChecked
                        ? prev.addressFirstLine
                        : "",
                      billingAddressSecondLine: isChecked
                        ? prev.addressSecondLine
                        : "",
                      billingCity: isChecked ? prev.city : "",
                      billingState: isChecked ? prev.state : "",
                      billingPinCode: isChecked ? prev.pinCode : "",
                      billingMobileNumber: isChecked ? prev.mobileNumber : "",
                      billingEmailAddress: isChecked ? prev.emailAddress : "",
                    }));
                  }}
                />

                <Form.Label
                  htmlFor="sameAsShopAddress"
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
                    required
                    onBlur={handleBlur}
                    style={{
                      borderColor:
                        touched.billingAddressFirstLine &&
                        !storeData.billingAddressFirstLine
                          ? "red"
                          : "",
                    }}
                  />
                  {(error?.billingAddressFirstLine ||
                    (touched.billingAddressFirstLine &&
                      !storeData.billingAddressFirstLine)) && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "15px",
                        fontWeight: "normal",
                      }}
                    >
                      {error?.billingAddressFirstLine
                        ? error.billingAddressFirstLine
                        : "*billing Address 1 is required"}
                    </div>
                  )}
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
                    onBlur={handleBlur}
                    required
                    style={{
                      borderColor:
                        touched.billingAddressSecondLine &&
                        !storeData.billingAddressSecondLine
                          ? "red"
                          : "",
                    }}
                  />
                  {(error?.billingAddressSecondLine ||
                    (touched.billingAddressSecondLine &&
                      !storeData.billingAddressSecondLine)) && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "15px",
                        fontWeight: "normal",
                      }}
                    >
                      {error?.billingAddressSecondLine
                        ? error.billingAddressSecondLine
                        : "*billing Address 2 is required"}
                    </div>
                  )}
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
                      <option value="">select state</option>
                      {stateCityData?.length > 0 &&
                        stateCityData?.map((state, index) => (
                          <option key={index} value={state.value}>
                            {state.label}
                          </option>
                        ))}
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
                      {stateCityData
                        .find((state) => state.value === storeData.state)
                        ?.children.map((city, index) => (
                          <option key={index} value={city.value}>
                            {city.label}
                          </option>
                        ))}
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
                      required
                      value={storeData.billingPinCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        borderColor:
                          touched.billingPinCode && !storeData.billingPinCode
                            ? "red"
                            : "",
                      }}
                    />
                    {(error?.billingPinCode ||
                      (touched.billingPinCode &&
                        !storeData.billingPinCode)) && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "normal",
                        }}
                      >
                        {error?.billingPinCode
                          ? error.billingPinCode
                          : "*Billing PinCode is required"}
                      </div>
                    )}
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
                      required
                      onBlur={handleBlur}
                      style={{
                        borderColor:
                          touched.billingMobileNumber &&
                          !storeData.billingMobileNumber
                            ? "red"
                            : "",
                      }}
                    />
                    {(error?.billingMobileNumber ||
                      (touched.billingMobileNumber &&
                        !storeData.billingMobileNumber)) && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "normal",
                        }}
                      >
                        {error?.billingMobileNumber
                          ? error.billingMobileNumber
                          : "*Billing Mobile Number is required"}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label className="mb-0">email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="billingEmailAddress"
                      placeholder="Enter your billing email address"
                      value={storeData.billingEmailAddress}
                      onChange={handleChange}
                      required
                      onBlur={handleBlur}
                      style={{
                        borderColor:
                          touched.billingEmailAddress &&
                          !storeData.billingEmailAddress
                            ? "red"
                            : "",
                      }}
                    />
                    {(error?.billingEmailAddress ||
                      (touched.billingEmailAddress &&
                        !storeData.billingEmailAddress)) && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "normal",
                        }}
                      >
                        {error?.billingEmailAddress
                          ? error.billingEmailAddress
                          : "*Billing Email Address is required"}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
        <div className="d-flex justify-content-center pt-3 pt-md-4">
          <CommonButton type="submit" />
        </div>
      </Container>
    </Form>
  );
};

export default UpdateDetails;
