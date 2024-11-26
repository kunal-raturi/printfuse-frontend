import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import {
  Container,
  Row,
  Col,
  Accordion,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import ModalForFilter from "../components/ModalForFilter";
import axios from "axios";
import { API_BASE_URL } from "../Constant/apiContant";
import { useDispatch, useSelector } from "react-redux";
import { selectProductListData } from "../redux/slices/productListSlice";
import { fetchProductListData } from "../redux/Thunk/productListThunk";
import { useNavigate, useParams } from "react-router-dom";
const ProductListingPage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector(selectProductListData);
  console.log("data::", data);

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [productFilter, setProductFilter] = useState([]);
  useEffect(() => {
    const requestData = [
      {
        page: 1,
        limit: 10,
        search: "",
        categoryId: [id],
        variantId: [],
        brandId: [],
        priceRange: [],
      },
    ];

    dispatch(fetchProductListData(requestData));
  }, [dispatch, id]);

  useEffect(() => {
    const fetchproductFilter = async () => {
      const token = localStorage.getItem("token");
      const storeCode = localStorage.getItem("storeCode");
      try {
        const response = await axios.get(`${API_BASE_URL}home/filter`, {
          headers: {
            token: `Bearer ${token}`,
            storeCode: `${storeCode}`,
          },
        });

        setProductFilter(response.data);
      } catch (error) {
        console.error("error while fetching dropdown data::", error);
      }
    };
    fetchproductFilter();
  }, []);

  return (
    <div>
      <div className="py-3 py-lg-4 px-0 px-lg-2">
        <div className="px-lg-10">
          <div className="pb-4 ">
            <SearchBar />
          </div>
          <Container className="mb-4">
            <div className="d-grid gap-2">
              <div className="d-flex justify-content-between align-items-center w-100">
                <h4 className="fw-bold text-capitalize mb-0">
                  <span className="fw-semibold">Search By : </span>tshirt
                </h4>
                <div className="d-none d-sm-flex justify-content-between align-items-center gap-2">
                  <span>Sort by</span>
                  <select name="" id="" className="p-2 px-4">
                    <option value="">Popularity</option>
                    <option value="">latest</option>
                    <option value="">Lowest Price</option>
                    <option value="">Highest Price</option>
                  </select>
                </div>
              </div>
            </div>
          </Container>
          <Container>
            <Row>
              <Col xs={12} sm={4} lg={3} className="px-2 px-sm-1">
                <Accordion
                  className="d-none d-sm-block"
                  defaultActiveKey="0"
                  flush
                >
                  {productFilter?.data?.length > 0 &&
                    productFilter.data.map((filter, index) => (
                      <Accordion.Item
                        eventKey={index.toString()}
                        key={filter.name}
                      >
                        <Accordion.Header>
                          <span className="text-capitalize fw-semibold">
                            {filter.label}
                          </span>
                        </Accordion.Header>

                        {filter.data.map((item, itemIndex) => (
                          <Accordion.Body className="py-2" key={itemIndex}>
                            <div className="d-grid gap-1 gap-sm-2">
                              <div className="d-flex align-items-center gap-2">
                                <Form.Check
                                  type="checkbox"
                                  label={item.label}
                                />
                              </div>
                            </div>
                          </Accordion.Body>
                        ))}
                      </Accordion.Item>
                    ))}
                  {/* <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <span className="text-capitalize fw-semibold">Size</span>
                    </Accordion.Header>
                    <Accordion.Body className="py-2">
                      <div className="d-grid gap-1 gap-sm-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Check type="checkbox" label="xs" />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Form.Check type="checkbox" label="s" />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <span className="text-capitalize fw-semibold">Color</span>
                    </Accordion.Header>
                    <Accordion.Body className="py-2">
                      <div className="d-grid gap-1 gap-sm-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Check type="checkbox" label="red" />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Form.Check type="checkbox" label="blue" />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      <span className="text-capitalize fw-semibold">
                        Prize Range
                      </span>
                    </Accordion.Header>
                    <Accordion.Body className="py-2">
                      <div className="d-grid gap-1 gap-sm-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Check type="checkbox" label="0-900" />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Form.Check type="checkbox" label="900-1800" />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item> */}
                </Accordion>
                <div className="d-flex d-sm-none justify-content-between align-items-center gap-2">
                  <select
                    name=""
                    id=""
                    className="p-2 rounded w-100 px-4 border border-muted"
                  >
                    <option value="">Popularity</option>
                    <option value="">latest</option>
                    <option value="">Lowest Price</option>
                    <option value="">Highest Price</option>
                  </select>
                  <Button
                    style={{ backgroundColor: "white" }}
                    onClick={handleShow}
                  >
                    <i
                      className="bi bi-funnel-fill"
                      style={{ color: "black" }}
                    ></i>
                  </Button>
                  <ModalForFilter
                    productFilter={productFilter}
                    show={showModal}
                    onHide={handleClose}
                  />
                </div>
              </Col>
              <Col xs={12} sm={4} lg={3} className="px-1 ">
                <Container fluid>
                  <Row className="g-3">
                    {data?.length > 0 &&
                      data?.map((item) => (
                        <Col
                          xs={12}
                          sm={6}
                          lg={4}
                          className="px-0 px-sm-2 "
                          key={item.id}
                        >
                          <Card
                            className="border-0 card"
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() =>
                              navigate(`/product-detail/${item.id}`)
                            }
                          >
                            <Card.Img
                              variant="top"
                              style={{
                                width: "100%",
                                // aspect-ratio: "7 / 8",  // You can keep it commented out or uncomment as needed
                                overflow: "hidden",
                                borderRadius: "1rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#f8f8f8",
                              }}
                              src={
                                hoveredCard === item.id
                                  ? item.thumbnailSlide
                                  : item.thumbnail
                              }
                            />
                            <Card.Body className="pb-0">
                              <Card.Title className="text-black">
                                {item.name}
                              </Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush border-0">
                              <ListGroup.Item className="border-0 text-black fw-semibold py-0">
                                ₹{item.offeredProductPrice}
                              </ListGroup.Item>
                              <ListGroup.Item
                                className="border-0 py-0 "
                                style={{ color: "#12715b" }}
                              >
                                {item.memberDiscountPercentage}% OFF
                              </ListGroup.Item>
                              <ListGroup.Item className="border-0 text-muted py-0">
                                {item.variantData
                                  ?.find((v) => v.name === "size")
                                  ?.data.join(", ")}{" "}
                                size •{" "}
                                {item.variantData
                                  ?.find((v) => v.name === "color")
                                  ?.data.join(", ")}{" "}
                                color
                              </ListGroup.Item>
                            </ListGroup>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
