import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import NewArrivalSlick from "../components/NewArrivalSlick";
import AsNavFor from "../components/AsNavSlickForProductDetail";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";

import { API_BASE_URL } from "../Constant/apiContant";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [productDetailData, setProductDetailData] = useState([]);
  useEffect(() => {
    const fetchProductDetailData = async () => {
      const token = localStorage.getItem("token");
      const storeCode = localStorage.getItem("storeCode");
      try {
        const response = await axios.get(
          `${API_BASE_URL}product/detail/${id}`,
          {
            headers: {
              token: `Bearer ${token}`,
              storeCode: `${storeCode}`,
            },
          }
        );
        setProductDetailData(response.data.data);
      } catch (error) {
        console.error("erro while fetching dropdown data::", error);
      }
    };
    fetchProductDetailData();
  }, [id]);

  return (
    <div>
      <div className="py-3 py-lg-4 px-0 px-lg-2">
        <div className="px-lg-10">
          <div className="pb-4 ">
            <SearchBar />
          </div>

          <Container className="py-4">
            <Row className="gy-4 gy-md-0">
              <Col xs={12} md={6}>
                <AsNavFor ImageData={productDetailData.imagesData} />
              </Col>
              <Col xs={12} md={6} className=" d-grid ps-md-5">
                <aside className="d-grid gap-3 align-content-start">
                  <h2 className="fw-semibold m-0 text-capitalize">
                    {productDetailData.name}
                  </h2>
                  <div>
                    {productDetailData?.length > 0 &&
                    productDetailData?.shortDescription ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productDetailData.shortDescription,
                        }}
                      />
                    ) : null}
                  </div>
                  <a href="#detail" className="fw-semibold">
                    Product details
                  </a>
                </aside>
              </Col>
            </Row>
          </Container>

          {/*  Provider container---------------------------------------*/}
          <Container className="py-4">
            <Row className="gy-4">
              <Col
                xs={12}
                className="d-grid d-sm-flex align-items-center justify-content-between"
              >
                <h4 className="fw-semibold fs-md-18 m-0">
                  Select your nearby Provider
                </h4>
                <div className="d-flex justify-content-start gap-2 align-items-center">
                  <span style={{ fontSize: "14px", color: "#485256" }}>
                    Sort by
                  </span>
                  <label htmlFor="sort-select" className="visually-hidden">
                    Sort by
                  </label>
                  <select
                    id="sort-select"
                    className="fs-md-14 py-1 px-2 py-sm-2 px-sm-3"
                  >
                    <option value="">Popularity</option>
                    <option value="">Latest</option>
                    <option value="">Lowest Price</option>
                    <option value="">Highest Price</option>
                  </select>
                </div>
              </Col>

              <Col xs={12} className="d-grid gap-3">
                <Accordion>
                  <Accordion.Item
                    eventKey="0"
                    style={{ backgroundColor: "#f7f7f7" }}
                  >
                    <div className="d-grid">
                      <div className="custom-header d-grid d-md-flex align-items-center justify-content-md-between gap-3 p-3">
                        <div className="d-flex gap-2 align-items-center">
                          <div className="d-flex align-items-center gap-2">
                            <a
                              className="h5 fw-semibold m-0 fs-sm-16 text-decoration-none text-capitalize"
                              href="?category"
                            >
                              Provider
                            </a>
                            <i className="bi bi-pin-map-fill"></i>
                          </div>
                        </div>
                        <div className="custom-btns d-grid text-center d-sm-flex gap-2 gap-sm-3 justify-content-sm-end">
                          <div>
                            <a
                              className="d-block d-sm-none fs-sm-14"
                              href="/category"
                            >
                              Start designing
                            </a>
                          </div>
                          <a
                            className="custom-provider fs-sm-14 d-none"
                            href="?category"
                          >
                            Provider Info
                          </a>
                          <div>
                            <a className="d-none d-sm-block" href="/category">
                              Start designing
                            </a>
                          </div>
                        </div>
                      </div>
                      <hr className="m-0" />
                      <Row className="p-3">
                        <Col xs={12} md={5}>
                          <Row className="align-items-start">
                            <Col
                              xs={6}
                              md={6}
                              className="d-grid align-items-start gap-2"
                            >
                              <span
                                className="fw-semibold"
                                style={{ color: "#485256" }}
                              >
                                Price
                              </span>
                              <div className="d-grid gap-2">
                                <h6 className="m-0">From ₹325</h6>
                                <h6
                                  className="m-0 fs-14"
                                  style={{ color: "#12715b" }}
                                >
                                  From ₹286 with printfuse Premium
                                </h6>
                              </div>
                            </Col>
                            <Col
                              xs={6}
                              md={6}
                              className="d-grid align-items-start gap-2"
                            >
                              <span
                                className="fw-semibold fs-14"
                                style={{ color: "#485256" }}
                              >
                                Print areas • 4
                              </span>
                              <div
                                className="d-grid gap-1"
                                style={{ gridTemplateColumns: "auto auto" }}
                              >
                                <div className="badge text-dark border rounded w-100 border-dark">
                                  FRONT
                                </div>
                                <div className="badge text-dark border rounded w-100 border-dark">
                                  BACK
                                </div>
                                <div className="badge text-dark border rounded w-100 border-dark">
                                  RIGHT
                                </div>
                                <div className="badge text-dark border rounded w-100 border-dark">
                                  LEFT
                                </div>
                              </div>
                              <div>
                                <div
                                  className=" border rounded border-secondary fw-semibold px-2 py-1 text-center bg-secondary text-white"
                                  style={{ fontSize: "12px" }}
                                >
                                  Branding insert available
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={12} md={7}>
                          <div className="accordion-collapse collapse show">
                            <div className="pt-3 pt-md-0 accordion-body">
                              <Row className="gy-3">
                                <Col
                                  xs={12}
                                  md={6}
                                  xl={5}
                                  className="d-flex justify-content-end justify-content-xl-between gap-2 p-0 pe-md-3"
                                >
                                  <div className="d-grid gap-2">
                                    <span className="p-color fw-semibold fs-14">
                                      Avg. production time
                                    </span>
                                    <h6 className="text-end text-md-start m-0">
                                      &lt;2 Day
                                    </h6>
                                  </div>
                                </Col>
                                <Col
                                  xs={12}
                                  md={6}
                                  xl={2}
                                  className="d-flex justify-content-between gap-2 p-0 pe-md-3"
                                >
                                  <div className="d-grid gap-2">
                                    <span className="p-color fw-semibold fs-14 text-capitalize">
                                      size • 7
                                    </span>
                                    <h6 className="text-end text-md-start m-0">
                                      XS -XXXL
                                    </h6>
                                  </div>
                                </Col>
                                <Col
                                  xs={12}
                                  xl={5}
                                  className=" d-grid gap-2 align-content-start p-0"
                                >
                                  <span className="p-color fw-semibold fs-14 text-start text-md-end text-xl-start">
                                    Colors • 7
                                  </span>
                                  <div className="d-flex flex-wrap w-100 gap-2 justify-content-start justify-content-md-end justify-content-xl-start">
                                    <span
                                      style={{
                                        backgroundColor: "rgb(0, 0, 0)",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                      aria-label="Black"
                                    ></span>
                                    <span
                                      style={{
                                        backgroundColor: "rgb(255, 255, 255)",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                      aria-label="White"
                                    ></span>
                                    <span
                                      style={{
                                        backgroundColor: "rgb(255, 0, 0)",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                      aria-label="Red"
                                    ></span>
                                    <span
                                      style={{
                                        backgroundColor: "rgb(0, 64, 255)",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                      aria-label="Blue"
                                    ></span>
                                    <span
                                      style={{
                                        backgroundColor: "rgb(255, 136, 0)",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                      aria-label="Orange"
                                    ></span>
                                    <span
                                      style={{
                                        backgroundColor: "rgb(54, 192, 81)",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                      aria-label="Green"
                                    ></span>
                                    <span
                                      style={{
                                        backgroundColor: "rgb(123, 63, 216)",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                      }}
                                      aria-label="Purple"
                                    ></span>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                          <Accordion.Header className="d-block d-md-none"></Accordion.Header>
                        </Col>
                      </Row>
                    </div>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </Container>

          {/* long description--------------------------------------------
           */}
          <Container className="py-4" id="detail">
            <div className="fw-bold fs-2 border-bottom border-dark">
              Description
            </div>
            <div className="mt-2">
              {productDetailData?.length > 0 &&
              productDetailData?.longDescription ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDetailData.longDescription,
                  }}
                />
              ) : null}
            </div>
          </Container>

          <Container className="px-3 px-sm-2 p-2 py-4 ">
            <h4 className="mb-3" style={{ fontWeight: "600" }}>
              Related Products
            </h4>
            <NewArrivalSlick
              NewArrivalData={productDetailData.relatedProductData}
            />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
