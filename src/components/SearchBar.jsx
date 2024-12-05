import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

 

  const inputRef = useRef(null);
  const handleToFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };


  const handleSearch = () => {};

  useEffect(()=>{})

  return (
    <Container className=" pt-3 pt-sm-4 pb-2 pb-sm-3">
      <div className="d-flex  w-100  justify-content-between align-items-center gap-2 gap-lg-3 ps-2 ps-lg-3 rounded-pill search-product">
        <BsSearch
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
          onClick={handleToFocus}
        />

        <Form className="w-100 ">
          <Form.Group controlId="formSearch">
            <Form.Control
              ref={inputRef}
              type="text"
              className="border border-0"
              placeholder="Search for products ,brands,categories and print providers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Form>

        <Button className="px-2 px-sm-3 px-lg-4 button" type="submit">
          Search
        </Button>
      </div>
    </Container>
  );
};

export default SearchBar;
