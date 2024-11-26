import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useRef } from "react";
import Slider from "react-slick";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BlogData } from "../data/BlogData";
import "../styles/CategoryPage.css"

function BlogSlick() {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <Container>
      <div className="slider-container">
        <div style={{ textAlign: "end" }}>
          <Button
            className="button m-1 p-0"
            onClick={previous}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #d3d3d3",
              borderRadius: ".5rem",
              height: " 2.5rem",
              width: "2.5rem",
              textAlign: "center",
            }}
          >
            <FaChevronCircleLeft className="fs-5 text-dark" />
          </Button>
          <Button
            className="button p-0 m-1"
            onClick={next}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #d3d3d3",
              borderRadius: ".5rem",
              height: " 2.5rem",
              width: "2.5rem",
            }}
          >
            <FaChevronCircleRight className="fs-5 text-dark" />
          </Button>
        </div>
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {BlogData?.length > 0 &&
            BlogData?.map((blog) => (
              <div key={blog.id}>
                <Container fluid>
                  <Row>
                    <Col xs="12" md="4" className="ps-0">
                      <div
                        className="w-100 d-flex justify-content-center overflow-hidden blog-image-div"
                        style={{ aspectRatio: "1/1" }}
                      >
                        <img
                          src={blog.img}
                          alt={blog.name}
                          className="img-fluid"
                        />
                      </div>
                    </Col>
                    <Col xs="12" md="8">
                      <div className=" d-flex  flex-column justify-content-center align-items-center p-2 p-sm-3 p-md-4 p-lg-5 h-100">
                        <div
                          className="  h4 text-start fs-sm-18 text-capitalize w-100"
                          style={{ fontWeight: "600" }}
                        >
                          {blog.title}
                        </div>
                        <div className="w-100 text-end text-muted">
                          - By {blog.name}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            ))}
        </Slider>
      </div>
    </Container>
  );
}

export default BlogSlick;
