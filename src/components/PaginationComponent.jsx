import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Create an array of page numbers based on totalPages
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Inline styles for pagination items
  const paginationItemStyle = {
    cursor: "pointer",
  };

  const activeItemStyle = {
    backgroundColor: "#e9ecef",
    borderColor: "black",
  };

  const disabledItemStyle = {
    color: "#6c757d",
    pointerEvents: "none",
    borderColor: "black",
  };

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...paginationItemStyle,
          ...(currentPage === 1 ? disabledItemStyle : {}),
        }}
      >
        previous
      </Pagination.Prev>

      {pageNumbers.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
          style={{
            ...paginationItemStyle,
            ...(page === currentPage ? activeItemStyle : {}),
          }}
        >
          {page}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...paginationItemStyle,
          ...(currentPage === totalPages ? disabledItemStyle : {}),
        }}
      >
        Next
      </Pagination.Next>
    </Pagination>
  );
};

export default PaginationComponent;
