import React, { useEffect, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import BlogSlick from "../components/BlogSlick";
import NewArrivalSlick from "../components/NewArrivalSlick";
import { BsSearch } from "../utils/Icon";
import "../styles/CategoryPage.css";
import { categories } from "../data/CategoryData";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoyData } from "../redux/slices/categorySlice";
import { fetchCategoryData } from "../redux/Thunk/categoryThunk";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { NewArrivalData } from "../data/NewArrivalData";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(selectCategoyData);

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  return (
    <div>
      <div className="py-3 py-lg-4 px-0 px-lg-2">
        <div className="px-lg-10">
          {/* <Container className=" pt-3 pt-sm-4 pb-2 pb-sm-3">
            <div className="d-flex  w-100  justify-content-between align-items-center gap-2 gap-lg-3 ps-2 ps-lg-3 rounded-pill search-product">
              <BsSearch
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                onClick={handleSearchClick}
              />

              <Form className="w-100 ">
                <Form.Group controlId="formSearch">
                  <Form.Control
                    ref={inputRef}
                    type="text"
                    className="border border-0"
                    placeholder="Search for products ,brands,categories and print providers"
                  />
                </Form.Group>
              </Form>
              
              <Button className="px-2 px-sm-3 px-lg-4 button">Search</Button>
            </div>
          </Container> */}
          <SearchBar />
          <Container className="py-4 explore-section">
            <Row className="gy-3">
              <Col xs={12}>
                <div className="pb-3">
                  <h4 style={{ fontWeight: "600" }}>
                    Explore Printfuse's Best
                  </h4>
                  <p className="mb-0 text-dark" style={{ width: "70%" }}>
                    Here are some of the most popular product categories in our
                    catalog.
                  </p>
                </div>
              </Col>
              {/* <Col xs={12} sm={6} lg={4}>
                <div>
                  <a
                    href="/category"
                    className="d-flex text-decoration-none text-dark"
                    style={{
                      backgroundColor: "#f7f7f7",
                      overflow: "hidden",
                      borderRadius: "0.5rem ",
                    }}
                  >
                    <div className="px-2 py-3 px-md-3" style={{ width: "60%" }}>
                      <h3 className="text-capitalize text-dark">
                        Kid's Clothing
                      </h3>
                    </div>
                    <div className="image-div">
                      <img
                        src="/asset/images/kidWithWaterGun.png"
                        alt="kid clothing pic"
                      />
                    </div>
                  </a>
                </div>
              </Col>
              <Col xs={12} sm={6} lg={4}>
                <div>
                  <a
                    href="/category"
                    className="d-flex text-decoration-none text-dark"
                    style={{
                      backgroundColor: "#f7f7f7",
                      overflow: "hidden",
                      borderRadius: "0.5rem ",
                    }}
                  >
                    <div className="px-2 py-3 px-md-3" style={{ width: "60%" }}>
                      <h3 className="text-capitalize text-dark">
                        Women's Clothing
                      </h3>
                    </div>
                    <div className="image-div">
                      <img
                        src="/asset/images/womenBody.jpg"
                        alt="kid clothing pic"
                      />
                    </div>
                  </a>
                </div>
              </Col>
              <Col xs={12} sm={6} lg={4}>
                <div>
                  <a
                    href="/category"
                    className="d-flex text-decoration-none text-dark"
                    style={{
                      backgroundColor: "#f7f7f7",
                      overflow: "hidden",
                      borderRadius: "0.5rem ",
                    }}
                  >
                    <div className="px-2 py-3 px-md-3" style={{ width: "60%" }}>
                      <h3 className="text-capitalize text-dark">
                        Men's Clothing
                      </h3>
                    </div>
                    <div className="image-div">
                      <img
                        src="/asset/images/menBody.png"
                        alt="kid clothing pic"
                      />
                    </div>
                  </a>
                </div>
              </Col> */}
              {data?.length > 0 &&
                data.map((category) => (
                  <Col xs={12} sm={6} lg={4} key={category.value}>
                    <div
                      className="d-flex text-decoration-none text-dark category-hover-effect"
                      style={{
                        backgroundColor: "#f7f7f7",
                        overflow: "hidden",
                        borderRadius: "0.5rem",
                      }}
                      onClick={() =>
                        navigate(`/subcategory/${category.value}`, {
                          state: { category },
                        })
                      }
                    >
                      <div
                        className="px-2 py-3 px-md-3"
                        style={{ width: "60%" }}
                      >
                        <h3 className="text-capitalize ">{category.label}</h3>
                      </div>
                      <div className="image-div">
                        <img
                          src={category.thumbnail}
                          alt={`${category.label} `}
                        />
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </Container>
          <Container className="py-4 pt-5 start-designing">
            <Row className="g-0">
              <Col xs={12} sm={8} className="order-2 order-sm-2 order-md-1">
                <div
                  className="p-2 p-sm-3 p-md-4 p-lg-5 gap-2 gap-sm-1 gap-ms-2 h-100 left-side"
                  style={{ backgroundColor: "#12715b" }}
                >
                  <h2
                    className=" mb-3 text-white  text-center text-md-start"
                    style={{ fontWeight: "800" }}
                  >
                    Bring Your Unique Designs to Life on Quality Tees
                  </h2>
                  <p className="mb-2 text-white  text-center text-md-start">
                    Create personalized t-shirts with ease. Design your own
                    prints and shop unique styles at Print Everywhere You Want.
                  </p>
                  <Button className="w-100 button d-flex justify-content-center align-items-center">
                    <span className="fw-bold">Start Designing</span>
                  </Button>
                </div>
              </Col>
              <Col
                xs={12}
                sm={4}
                className="order-1 order-sm-1 order-md-2 right-side-col"
                style={{ backgroundColor: "#12715b", aspectRatio: "3/2" }}
              >
                <div
                  className="overflow-hidden h-100 right-side w-100"
                  style={{ aspectRatio: "3/2" }}
                >
                  <img
                    src="/asset/images/back1.b77e5b36094e818278a6.png"
                    alt="2 tshirt"
                    style={{
                      height: "100%",
                      minWidth: "100%",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>

          <Container className="px-3 px-sm-2 p-2 py-4 ">
            <h4 className="mb-3" style={{ fontWeight: "600" }}>
              New Arrivals
            </h4>
            <p>
              Coming in hot—the latest additions to our product catalog you
              don’t want to miss
            </p>
            <NewArrivalSlick NewArrivalData={NewArrivalData} />
          </Container>
          <Container className="px-3 px-sm-2 p-2 py-4 ">
            <h4 className="mb-3" style={{ fontWeight: "600" }}>
              Explore what's our new blogs
            </h4>
            <BlogSlick />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
