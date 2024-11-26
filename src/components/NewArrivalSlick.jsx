import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { Button, Col, Container, Row, Card, ListGroup } from "react-bootstrap";
// import { NewArrivalData } from "../data/NewArrivalData";
import "../styles/NewArrivalSlick.css";

function NewArrivalSlick({ NewArrivalData }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container new-arrival-slick">
      <div className="text-end">
        <Button className="button m-1 p-0" onClick={previous}>
          <FaChevronCircleLeft className="fs-5 text-dark " />
        </Button>
        <Button className="button p-0 m-1" onClick={next}>
          <FaChevronCircleRight className="fs-5 text-dark" />
        </Button>
      </div>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {NewArrivalData?.length > 0 &&
          NewArrivalData?.map((item) => (
            <div key={item.id}>
              <Container fluid>
                <Row>
                  <Card
                    className="border-0 card"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Card.Img
                      variant="top"
                      className=" card-image"
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
                        From ₹{item.productFromPrice}
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0 py-0 "
                        style={{ color: "#12715b" }}
                      >
                        {item.productFromPrice}% OFF
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 text-muted py-0">
                        {Array.isArray(item.variantData) &&
                          item.variantData.length > 0 &&
                          item.variantData.map((variant) => (
                            <p key={variant.name} className="d-flex">
                              {variant.total} {variant.name}
                            </p>
                          ))}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Row>
              </Container>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default NewArrivalSlick;
