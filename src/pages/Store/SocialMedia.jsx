import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from "axios";
import { API_BASE_URL } from "../../Constant/apiContant";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaWhatsapp,
} from "../../utils/Icon";
import { triggerToast } from "../../components/Toaster";
const SocialMedia = () => {
  const [socialMediaData, setSocialMediaData] = useState({
    icon: "",
    link: "",
  });
  const [touched, setTouched] = useState({ icon: false, link: false });
  const [error, setError] = useState({
    icon: "",
    link: "",
  });

  const [gotMediaData, setGotMediaData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const storeId = localStorage.getItem("storeId");

  const requestData = [
    {
      storeId: storeId,
      page: 1,
      limit: 10,
      search: "",
    },
  ];
  //this is to display error
  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    if (socialMediaData[name] === "") {
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: `*${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  //this to fill the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaData({ ...socialMediaData, [name]: value });
  };

  //this to add the icon to table
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const storeCode = localStorage.getItem("storeCode");

    try {
      const response = await axios.post(
        `${API_BASE_URL}social`,
        socialMediaData,
        {
          headers: {
            token: `Bearer ${token}`,
            storeCode: `${storeCode}`,
          },
        }
      );
      triggerToast("success", "Icon added successfully");
      console.log(response);
      setRefresh((prev) => !prev);
      setSocialMediaData({
        icon: "",
        link: "",
      });
      setTouched({ icon: false, link: false });
      setError({ icon: "", link: "" });
    } catch (error) {
      console.error("error while fetching dropdown data::", error);
      triggerToast("error", "error while adding icon");
    }
  };

  //this is to fetch data to list in the table
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const storeCode = localStorage.getItem("storeCode");
      try {
        const response = await axios.put(
          `${API_BASE_URL}storesocial`,
          requestData,
          {
            headers: {
              token: `Bearer ${token}`,
              storeCode: `${storeCode}`,
            },
          }
        );
        setGotMediaData(response.data.data);
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
      setGotMediaData((prevData) =>
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
        triggerToast("success", "Link deactivated");
      } else {
        triggerToast("success", "Link activated");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      triggerToast("error ", "error while chaaging status ");

      setGotMediaData((prevData) =>
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
        `${API_BASE_URL}social/${id}`,

        {
          headers: {
            token: `Bearer ${token}`,
            storeCode: `${storeCode}`,
          },
        }
      );
      console.log(response.data.data);
      setSocialMediaData({
        id: response.data.data.id,
        icon: response.data.data.icon,
        link: response.data.data.link,
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
        `${API_BASE_URL}social/${socialMediaData.id}`,
        {
          icon: socialMediaData.icon,
          link: socialMediaData.link,
        },
        {
          headers: {
            token: `Bearer ${token}`,
            storeCode: `${storeCode}`,
          },
        }
      );
      triggerToast("success", "Icon updated successfully");
      console.log(response);
      setRefresh((prev) => !prev);
      setSocialMediaData({
        icon: "",
        link: "",
      });
      setTouched({ icon: false, link: false });
      setError({ icon: "", link: "" });
    } catch (error) {
      console.error("error while fetching dropdown data::", error);
      triggerToast("error", "error while updating icon");
    }
  };

  const iconMapping = {
    facebook: <FaFacebook className="fs-20" />,
    whatsapp: <FaWhatsapp className="fs-20" />,
    instagram: <FaInstagram className="fs-20" />,
    linkedin: <FaLinkedin className="fs-20" />,
    twitter: <FaTwitter className="fs-20" />,
    pinterest: <FaPinterest className="fs-20" />,
  };

  return (
    <div className="d-grid gap-3 social-media">
      <div className="d-grid gap-2 px-2">
        <h4 className="fw-semibold m-0">Manage Social Media</h4>
        <p className=" m-0 text-muted">
          Connect your social media accounts for your customers to find you
          easily.
        </p>
      </div>
      <Container className="px-sm-0 py-sm-4">
        <Row className="gy-4">
          <Col xs={12} md={5}>
            <div className="left-side-div p-3">
              <div>
                <Form
                  onSubmit={
                    socialMediaData?.id > 0 ? handleUpdate : handleSubmit
                  }
                >
                  <Form.Group controlId="formIcon" className="mb-3">
                    <Form.Label>
                      Icon<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      name="icon"
                      required
                      value={socialMediaData.icon}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        borderColor:
                          touched.icon && !socialMediaData.icon ? "red" : "",
                      }}
                    >
                      <option value="">Select icon</option>
                      <option value="whatsapp">whatsapp</option>
                      <option value="facebook">facebook</option>
                      <option value="instagram">instagram</option>
                      <option value="linkedIn">linkedIn</option>
                      <option value="twitter">twitter</option>
                      <option value="pinterest">pinterest</option>
                    </Form.Select>

                    {(error?.icon ||
                      (touched.icon && !socialMediaData.icon)) && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "normal",
                        }}
                      >
                        {error.icon}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formLink" className="mb-3">
                    <Form.Label>
                      Link<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="url"
                      name="link"
                      // pattern={pattern.link}
                      value={socialMediaData.link}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        borderColor:
                          touched.link && !socialMediaData.link ? "red" : "",
                      }}
                    />
                    {(error?.link ||
                      (touched.link && !socialMediaData.link)) && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "normal",
                        }}
                      >
                        {error.link}
                      </div>
                    )}
                  </Form.Group>
                  <Button className="btn-1" type="submit">
                    <span className="fw-bold">Submit</span>
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            md={7}
            className="d-grid px-0 px-sm-2 align-content-start "
          >
            {/* <h4 className="text-center text-muted">No Links Added</h4> */}

            <Table className="social-media-table">
              <thead>
                <tr className="fs-sm-12">
                  <th className="text-center">Media</th>
                  <th className="text-center">Link</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {gotMediaData?.length > 0 &&
                  gotMediaData?.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">
                        {iconMapping[item.icon.toLowerCase()] || "N/A"}
                      </td>
                      <td className="fs-14 fs-sm-10">
                        <a
                          className="d-block d-lg-none"
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.link.length > 10
                            ? `${item.link.substring(0, 10)}...`
                            : item.link}
                        </a>
                        <a
                          className="d-none d-lg-block"
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.link}
                        </a>
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

export default SocialMedia;
