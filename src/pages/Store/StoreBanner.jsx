import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import "../../styles/StoreSetting.css";
import { triggerToast } from "../../components/Toaster";
import axios from "axios";
import { API_BASE_URL } from "../../Constant/apiContant";

const StoreBanner = () => {
  const [Banner, setBanner] = useState({
    relatedName: "",
    relatedId: "",
    thumbnail: null,
    name: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [gotBannerData, setGotBannerData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [touched, setTouched] = useState({
    relatedName: false,
    relatedId: false,
    thumbnail: false,
    name: false,
  });
  const [error, setError] = useState({
    relatedName: "",
    relatedId: "",
    thumbnail: null,
    name: "",
  });
  const categories = [
    { id: 1, name: "Kids Clothing" },
    { id: 2, name: "Mens Clothing" },
    { id: 3, name: "Womens Clothing" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setBanner({
        ...Banner,
        thumbnail: file,
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

  //handle to throw error
  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    if (Banner[name] === "") {
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

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "relatedName") {
      const selectedCategory = categories.find(
        (category) => category.name === value
      );
      setBanner({
        ...Banner,
        relatedName: value,
        relatedId: selectedCategory ? selectedCategory.id : "",
      });
    } else {
      setBanner({ ...Banner, [name]: value });
    }
  };

  //submit data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const storeCode = localStorage.getItem("storeCode");
    const formData = new FormData();
    formData.append("relatedName", Banner.relatedName);
    formData.append("relatedId", Banner.relatedId);
    formData.append("thumbnail", Banner.thumbnail);
    formData.append("name", Banner.name);

    try {
      const response = await axios.post(`${API_BASE_URL}banner`, formData, {
        headers: {
          token: `Bearer ${token}`,
          storeCode: `${storeCode}`,
          "Content-Type": "multipart/form-data",
        },
      });
      triggerToast("success", "Banner added successfully");
      console.log(response);
      setRefresh((prev) => !prev);
      setBanner({
        relatedName: "",
        relatedId: "",
        thumbnail: null,
        name: "",
      });
      setImagePreview(null);
      setTouched({
        relatedName: false,
        relatedId: false,
        thumbnail: false,
        name: false,
      });
      setError({
        relatedName: "",
        relatedId: "",
        thumbnail: null,
        name: "",
      });
    } catch (error) {
      console.error("error while fetching dropdown data::", error);
      triggerToast("error", "error while adding Banner");
    }
  };

  //this is to fetch data to list in the table
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const storeCode = localStorage.getItem("storeCode");
      try {
        const response = await axios.put(
          `${API_BASE_URL}banner`,
          {},
          {
            headers: {
              token: `Bearer ${token}`,
              storeCode: `${storeCode}`,
            },
          }
        );
        setGotBannerData(response.data.data);
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
      setGotBannerData((prevData) =>
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
        triggerToast("success", "Banner deactivated");
      } else {
        triggerToast("success", "Bannner activated");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      triggerToast("error ", "error while chaaging status ");

      setGotBannerData((prevData) =>
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
        `${API_BASE_URL}banner/${id}`,

        {
          headers: {
            token: `Bearer ${token}`,
            storeCode: `${storeCode}`,
          },
        }
      );
      setBanner({
        id: response.data.data.id,
        relatedName: response.data.data.relatedName,
        relatedId: response.data.data.relatedId,
        thumbnail: null,
        name: response.data.data.name,
      });
      setImagePreview(response.data.data.thumbnail);
    } catch (error) {
      console.error("error while fetching data::", error);
    }
  };

  //this is to update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const storeCode = localStorage.getItem("storeCode");

    const formData = new FormData();
    formData.append("relatedName", Banner.relatedName);
    formData.append("relatedId", Banner.relatedId);
    formData.append("name", Banner.name);

    // Only append the thumbnail if there's a new file selected
    if (Banner.thumbnail) {
      formData.append("thumbnail", Banner.thumbnail);
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}banner/${Banner.id}`,
        formData,
        {
          headers: {
            token: `Bearer ${token}`,
            storeCode: `${storeCode}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      triggerToast("success", "Banner updated successfully");
      console.log(response);
      setRefresh((prev) => !prev);
      setBanner({
        relatedName: "",
        relatedId: "",
        thumbnail: null,
        name: "",
      });
      setImagePreview(null);
      setTouched({
        relatedName: false,
        relatedId: false,
        thumbnail: false,
        name: false,
      });
      setError({
        relatedName: "",
        relatedId: "",
        thumbnail: null,
        name: "",
      });
    } catch (error) {
      console.error("error while fetching  data::", error);
      triggerToast("error", "error while updating Banner");
    }
  };

  return (
    <div className="d-grid gap-3 social-media">
      <div className="d-grid gap-2 px-2">
        <h4 className="fw-semibold m-0">Manage Store Banner</h4>
        <p className=" m-0 text-muted">
          Add a stunning banner to your homepage to captivate visitors and
          showcase your brand instantly.
        </p>
      </div>
      <Container className="px-sm-0 py-sm-4">
        <Row className="gy-4">
          <Col xs={12} md={5} className="py-3 left-side-div ">
            <div>
              <Form
                onSubmit={Banner?.id > 0 ? handleUpdate : handleSubmit}
                encType="multipart/form-data"
              >
                <Form.Group className="mb-3">
                  <Form.Label>
                    Related<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select
                    name="relatedName"
                    value={Banner.relatedName}
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    style={{
                      borderColor:
                        touched.relatedName && !Banner.relatedName ? "red" : "",
                    }}
                  >
                    <option value="">Select RelatedId</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                  {(error?.relatedName || touched.relatedName) && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "15px",
                        fontWeight: "normal",
                      }}
                    >
                      {error.relatedName}
                    </div>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Image<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div className="div-for-image-banner d-flex align-items-center justify-content-center mb-3">
                    <label htmlFor="thumbnail">
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
                        <i
                          className="bi bi-image"
                          style={{ fontSize: "40px" }}
                        ></i>
                      )}
                    </label>
                    <Form.Control
                      type="file"
                      id="thumbnail"
                      name="thumbnail"
                      className="d-none"
                      required
                      onChange={handleFileChange}
                      onBlur={handleBlur}
                      style={{
                        borderColor:
                          touched.thumbnail && !Banner.thumbnail ? "red" : "",
                      }}
                    />
                    {(error?.thumbnail ||
                      (touched.thumbnail && !Banner.thumbnail)) && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "normal",
                        }}
                      >
                        {error.thumbnail}
                      </div>
                    )}
                  </div>
                </Form.Group>

                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>
                    Banner Name<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    placeholder="Enter banner name"
                    name="name"
                    value={Banner.name}
                    type="text"
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    style={{
                      borderColor: touched.name && !Banner.name ? "red" : "",
                    }}
                  />
                  {(error?.name || (touched.thumbnail && !Banner.name)) && (
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
                <Button className="btn-1" type="submit">
                  <span className="fw-bold">Submit</span>
                </Button>
              </Form>
            </div>
          </Col>
          <Col
            xs={12}
            md={7}
            className="d-grid px-0 px-sm-2 align-content-start "
          >
            {/* <h4 className="text-center text-muted">No Links Added</h4> */}

            <Table className="social-media-table" responsive>
              <thead>
                <tr className="fs-sm-12">
                  <th className="text-center">Name</th>
                  <th className="text-center">Image</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {gotBannerData?.length > 0 &&
                  gotBannerData?.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center d-flex justify-content-center align-items-center">
                        <div className="d-grid align-content-center div-for-image-in-table-banner">
                          <img
                            src={item.thumbnail}
                            alt="error"
                            className="w-100"
                            style={{ objectFit: "contain", height: "auto" }}
                          />
                        </div>
                      </td>
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

export default StoreBanner;
