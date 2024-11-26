import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "../styles/CategoryPage.css";
import SearchBar from "../components/SearchBar";

const SubCategorySection = () => {
  const { state } = useLocation();
  const data = state?.category;
  const navigate = useNavigate();
  return (
    <div>
      <div className="py-3 py-lg-4 px-0 px-lg-2">
        <div className="px-lg-10">
          <div className="pb-4 ">
            <SearchBar />
          </div>
          <Container>
            <Row>
              <Col>
                <h2 className="text-capitalize" style={{ fontWeight: "600" }}>
                  {data.label}
                </h2>
              </Col>
            </Row>
          </Container>
          <Container className="explore-section">
            <Row className="gy-3">
              {data?.children?.length > 0 &&
                data.children?.map((category) => (
                  <Col xs={12} sm={6} lg={4} key={category.value}>
                    <div>
                      <div
                        onClick={() =>
                          navigate(`/product-listing/${category.value}`)
                        }
                        className="d-flex text-decoration-none text-dark category-hover-effect"
                        style={{
                          backgroundColor: "#f7f7f7",
                          overflow: "hidden",
                          borderRadius: "0.5rem",
                        }}
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
                    </div>
                  </Col>
                ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SubCategorySection;
