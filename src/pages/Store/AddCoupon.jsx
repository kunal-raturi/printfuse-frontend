import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { pattern } from "../../utils/Pattern";
import { API_BASE_URL } from "../../Constant/apiContant";
import axios from "axios";
import { triggerToast } from "../../components/Toaster";

const AddCoupon = () => {
  const [couponData, setCouponData] = useState({
    name: "",
    type: "",
    limitCondition: "",
    maxOffAmount: "",
    userLimit: "",
    couponLimit: "",
    expireDate: "",
    value: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [gotCouponData, setGotCouponData] = useState([]);
  const [touched, setTouched] = useState({
    name: false,
    type: false,
    limitCondition: false,
    maxOffAmount: false,
    userLimit: false,
    couponLimit: false,
    expireDate: false,
    value: false,
  });
  const [error, setError] = useState({
    name: "",
    type: "",
    limitCondition: "",
    maxOffAmount: "",
    userLimit: "",
    couponLimit: "",
    expireDate: "",
    value: "",
  });

  //thisis to display error
  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    if (couponData[name] === "") {
      setError((prevError) => ({
        ...prevError,
        [name]: `*${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        [name]: "",
      }));
    }
  };

  //this to fill the form
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "expireDate") {
      // Convert "yyyy-MM-dd" into "yyyy-MM-ddT00:00:00Z" format for the backend
      const formattedDate = `${value}T00:00:00Z`;
      setCouponData({ ...couponData, [name]: formattedDate });
    } else {
      setCouponData({ ...couponData, [name]: value });
    }
  };

  //this is to add coupon
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const storeCode = localStorage.getItem("storeCode");

    try {
      const response = await axios.post(`${API_BASE_URL}coupon`, couponData, {
        headers: {
          token: `Bearer ${token}`,
          storeCode: `${storeCode}`,
        },
      });
      triggerToast("success", "Coupon added successfully");
      console.log(response);
      setRefresh((prev) => !prev);
      setCouponData({
        name: "",
        type: "",
        limitCondition: "",
        maxOffAmount: "",
        userLimit: "",
        couponLimit: "",
        expireDate: "",
        value: "",
      });
      setTouched({
        name: false,
        type: false,
        limitCondition: false,
        maxOffAmount: false,
        userLimit: false,
        couponLimit: false,
        expireDate: false,
        value: false,
      });
      setError({
        name: "",
        type: "",
        limitCondition: "",
        maxOffAmount: "",
        userLimit: "",
        couponLimit: "",
        expireDate: "",
        value: "",
      });
    } catch (error) {
      console.error("error while fetching  data::", error);
      triggerToast("error", "error while adding Coupon");
    }
  };

  //this is to fetch data to list in the table
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const storeCode = localStorage.getItem("storeCode");
      try {
        const response = await axios.put(
          `${API_BASE_URL}coupon`,
          {},
          {
            headers: {
              token: `Bearer ${token}`,
              storeCode: `${storeCode}`,
            },
          }
        );
        setGotCouponData(response.data.data);
      } catch (error) {
        console.error("erro while fetching dropdown data::", error);
      }
    };
    fetchData();
  }, [refresh]);

  // this is to change status in table
  const handleStatusChange = async (id, currentStatus) => {
    const token = localStorage.getItem("token");
    const storeCode = localStorage.getItem("storeCode");

    try {
      setGotCouponData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? { ...item, status: currentStatus === 1 ? 0 : 1 }
            : item
        )
      );

      const response = await axios.put(
        `${API_BASE_URL}social/status/${id}`,
        { status: currentStatus === 1 ? 0 : 1 },
        {
          headers: {
            token: `Bearer ${token}`,
            storeCode: `${storeCode}`,
          },
        }
      );
      if (currentStatus) {
        triggerToast("success", "Coupon deactivated");
      } else {
        triggerToast("success", "Coupon activated");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      triggerToast("error ", "error while chaaging status ");

      setGotCouponData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: currentStatus } : item
        )
      );
    }
  };

  //this is to edit the table
  const handleEdit = async (id) => {
    const token = localStorage.getItem("token");
    const storeCode = localStorage.getItem("storeCode");

    try {
      const response = await axios.get(
        `${API_BASE_URL}coupon/${id}`,

        {
          headers: {
            token: `Bearer ${token}`,
            storeCode: `${storeCode}`,
          },
        }
      );
      console.log(response.data.data);
      setCouponData({
        id: response.data.data.id,
        name: response.data.data.name || "",
        type: response.data.data.type || "",
        limitCondition: response.data.data.limitCondition || "",
        maxOffAmount: response.data.data.maxOffAmount || "",
        userLimit: response.data.data.userLimit || "",
        couponLimit: response.data.data.couponLimit || "",
        expireDate: response.data.data.expireDate || "",
        value: response.data.data.value || "",
      });
    } catch (error) {
      console.error("error while fetching dropdown data::", error);
    }
  };

  //this is to update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const storeCode = localStorage.getItem("storeCode");

    try {
      const response = await axios.put(
        `${API_BASE_URL}coupon/${couponData.id}`,
        {
          name: couponData.name,
          type: couponData.type,
          limitCondition: couponData.limitCondition,
          maxOffAmount: couponData.maxOffAmount,
          userLimit: couponData.userLimit,
          couponLimit: couponData.couponLimit,
          expireDate: couponData.expireDate,
          value: couponData.value,
        },
        {
          headers: {
            token: `Bearer ${token}`,
            storeCode: `${storeCode}`,
          },
        }
      );
      triggerToast("success", "Coupon updated successfully");
      console.log(response);
      setRefresh((prev) => !prev);
      setCouponData({
        name: "",
        type: "",
        limitCondition: "",
        maxOffAmount: "",
        userLimit: "",
        couponLimit: "",
        expireDate: "",
        value: "",
      });
      setTouched({
        name: false,
        type: false,
        limitCondition: false,
        maxOffAmount: false,
        userLimit: false,
        couponLimit: false,
        expireDate: false,
        value: false,
      });
      setError({
        name: "",
        type: "",
        limitCondition: "",
        maxOffAmount: "",
        userLimit: "",
        couponLimit: "",
        expireDate: "",
        value: "",
      });
    } catch (error) {
      console.error("error while fetching dropdown data::", error);
      triggerToast("error", "error while updating Coupon");
    }
  };

  return (
    <div className="d-grid gap-3  social-media add-coupon">
      <div className="d-grid gap-2 px-2">
        <h4 className="fw-semibold m-0">Store Coupon</h4>
        <p className=" m-0 text-muted">Manage coupons for your snap store.</p>
      </div>
      <Container className="px-sm-0 py-sm-4">
        <Row className="gy-4">
          <Col xs={12} md={8} className="d-grid py-3 left-side-div ">
            <Form onSubmit={couponData?.id > 0 ? handleUpdate : handleSubmit}>
              <Container>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formCouponName" className="mb-3">
                      <Form.Label>
                        Coupon Name<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        pattern={pattern.textNumber}
                        type="text"
                        name="name"
                        value={couponData.name}
                        onChange={handleChange}
                        placeholder="Enter coupon name"
                        required
                        onBlur={handleBlur}
                        style={{
                          borderColor:
                            touched.name && !couponData.name ? "red" : "",
                        }}
                      />
                      {(error?.name || (touched.name && !couponData.name)) && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "15px",
                            fontWeight: "normal",
                          }}
                        >
                          {error.name}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formType" className="mb-3">
                      <Form.Label>
                        Type<span style={{ color: "red" }}>*</span>
                      </Form.Label>

                      <Form.Select
                        name="type"
                        value={couponData.type}
                        onChange={handleChange}
                        required
                        onBlur={handleBlur}
                        style={{
                          borderColor:
                            touched.type && !couponData.type ? "red" : "",
                        }}
                      >
                        <option value="">Select type</option>
                        <option value="PER">PERCENTAGE</option>
                        <option value="AMT">AMOUNT</option>
                      </Form.Select>

                      {(error?.type || (touched.type && !couponData.type)) && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "15px",
                            fontWeight: "normal",
                          }}
                        >
                          {error.type}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formValue" className="mb-3">
                      <Form.Label>
                        Value<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="value"
                        value={couponData.value}
                        onChange={handleChange}
                        placeholder="Enter amount or percentage value"
                        required
                        onBlur={handleBlur}
                        style={{
                          borderColor:
                            touched.value && !couponData.value ? "red" : "",
                        }}
                      />
                      {(error?.value ||
                        (touched.value && !couponData.value)) && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "15px",
                            fontWeight: "normal",
                          }}
                        >
                          {error.value}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formExpireDate" className="mb-3">
                      <Form.Label>
                        Expire date<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="expireDate"
                        required
                        value={
                          couponData.expireDate
                            ? couponData.expireDate.split("T")[0]
                            : ""
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                          borderColor:
                            touched.expireDate && !couponData.expireDate
                              ? "red"
                              : "",
                        }}
                      />
                      {(error?.expireDate ||
                        (touched.expireDate && !couponData.expireDate)) && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "15px",
                            fontWeight: "normal",
                          }}
                        >
                          {error.expireDate}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formLimitCondition" className="mb-3">
                      <Form.Label>
                        Limit Condition<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="limitCondition"
                        required
                        value={couponData.limitCondition}
                        onChange={handleChange}
                        placeholder="Enter limit condition"
                        onBlur={handleBlur}
                        style={{
                          borderColor:
                            touched.limitCondition && !couponData.limitCondition
                              ? "red"
                              : "",
                        }}
                      />
                      {(error?.limitCondition ||
                        (touched.limitCondition &&
                          !couponData.limitCondition)) && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "15px",
                            fontWeight: "normal",
                          }}
                        >
                          {error.limitCondition}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formMaxOffAmount" className="mb-3">
                      <Form.Label>
                        Maximum Amount Off
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>

                      <Form.Control
                        type="text"
                        name="maxOffAmount"
                        value={couponData.maxOffAmount}
                        onChange={handleChange}
                        required
                        placeholder="Enter maximum discount in amount"
                        onBlur={handleBlur}
                        style={{
                          borderColor:
                            touched.maxOffAmount && !couponData.maxOffAmount
                              ? "red"
                              : "",
                        }}
                      />
                      {(error?.maxOffAmount ||
                        (touched.maxOffAmount && !couponData.maxOffAmount)) && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "15px",
                            fontWeight: "normal",
                          }}
                        >
                          {error.maxOffAmount}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formUserLimit" className="mb-3">
                      <Form.Label>
                        User Limit<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="userLimit"
                        required
                        value={couponData.userLimit}
                        onChange={handleChange}
                        placeholder="Enter user limit"
                        onBlur={handleBlur}
                        style={{
                          borderColor:
                            touched.userLimit && !couponData.userLimit
                              ? "red"
                              : "",
                        }}
                      />
                      {(error?.userLimit ||
                        (touched.userLimit && !couponData.userLimit)) && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "15px",
                            fontWeight: "normal",
                          }}
                        >
                          {error.userLimit}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="formcouponLimit" className="mb-3">
                      <Form.Label>
                        Coupon Limit
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>

                      <Form.Control
                        type="number"
                        name="couponLimit"
                        value={couponData.couponLimit}
                        onChange={handleChange}
                        required
                        placeholder="Entercoupon limit"
                        onBlur={handleBlur}
                        style={{
                          borderColor:
                            touched.couponLimit && !couponData.couponLimit
                              ? "red"
                              : "",
                        }}
                      />
                      {(error?.couponLimit ||
                        (touched.couponLimit && !couponData.couponLimit)) && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "15px",
                            fontWeight: "normal",
                          }}
                        >
                          {error.couponLimit}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
              <Button className="btn-1" type="submit">
                <span className="fw-bold">Submit</span>
              </Button>
            </Form>
          </Col>
          <Col xs={12} className=" d-grid px-0 px-sm-2 align-content-start ">
            {/* <h4 className="text-center text-muted">No Coupon Added</h4> */}

            <Table className="social-media-table" responsive>
              <thead>
                <tr className="fs-sm-12">
                  <th className="text-center">Name</th>
                  <th className="text-center">Value</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Expire On</th>
                  <th className="text-center">Limit</th>
                  <th className="text-center">Max Off</th>
                  <th className="text-center"> User Limit</th>
                  <th className="text-center">Coupon Limit</th>
                  <th className="text-center">Total Used</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {gotCouponData?.length > 0 &&
                  gotCouponData?.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.name}</td>
                      <td>{item.value}</td>
                      <td>{item.type}</td>
                      <td>
                        {new Date(item.expireDate).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>{item.limitCondition}</td>
                      <td>{item.maxOffAmount}</td>
                      <td>{item.userLimit}</td>
                      <td>{item.couponLimit}</td>
                      <td>{item.totalUsed}</td>
                      <td className="text-center">
                        <Form.Check
                          aria-label="Toggle status"
                          type="switch"
                          id={`custom-switch-${item.id}`}
                          className="status-switch"
                          checked={item.status === 1}
                          onChange={() =>
                            handleStatusChange(item.id, item.status)
                          }
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-around custom-btns">
                          <i
                            className=" bi bi-pen-fill custom-btns-edit"
                            onClick={() => handleEdit(item.id)}
                          ></i>
                          <i className=" bi bi-trash-fill custom-btns-delete"></i>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddCoupon;
