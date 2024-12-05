import React, { useState } from "react";
import "../../styles/StoreSetting.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ChangeThemeData } from "../../data/ChangeThemeData";
import axios from "axios";
import { API_BASE_URL } from "../../Constant/apiContant";
import { triggerToast } from "../../components/Toaster";
import CommonButton from "../../components/CommonButton";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ChangeTheme = () => {
  const [activeThemeId, setActiveThemeId] = useState();
  const handleThemeId = (id) => {
    setActiveThemeId(id);
  };
  const currentTheme =
    ChangeThemeData?.find((theme) => theme?.id === activeThemeId)
      ?.currentTheme || "";

  // const handleSubmit = async (activeThemeId) => {
  //   const token = localStorage.getItem("token");
  //   const storeId = localStorage.getItem("storeId");

  //   if (!token) {
  //     triggerToast("error", "Token not found");
  //     return;
  //   }

  //   try {
  //     const response = await axios.put(
  //       `${API_BASE_URL}store/theme/${storeId}`,
  //       { currentTheme },
  //       {
  //         headers: { token: `Bearer ${token}` },
  //       }
  //     );
  //     console.log("response::", response);

  //     triggerToast("success", "Theme changed successfully");
  //   } catch (error) {
  //     console.error("Error in theme change:", error);
  //     triggerToast("error", "Error while changing theme");
  //   }
  // };
  const handleSubmit = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Do you really want to change theme?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("token");
          const storeId = localStorage.getItem("storeId");

          if (!token) {
            triggerToast("error", "Token not found");
            return;
          }

          // Ensure currentTheme is set based on the activeThemeId
          const currentTheme =
            ChangeThemeData?.find((theme) => theme?.id === activeThemeId)
              ?.currentTheme || "";

          if (!currentTheme) {
            triggerToast("error", "No theme selected");
            return;
          }

          try {
            const response = await axios.put(
              `${API_BASE_URL}store/theme/${storeId}`,
              { currentTheme },
              {
                headers: { token: `Bearer ${token}` },
              }
            );
            console.log("response::", response);

            triggerToast("success", "Theme changed successfully");
            swalWithBootstrapButtons.fire({
              title: "Updated!",
              text: "Your theme has been updated.",
              icon: "success",
            });
          } catch (error) {
            console.error("Error in theme change:", error);
            triggerToast("error", "Error while changing theme");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // If the user cancels, show a canceled message
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="d-grid gap-2 change-theme">
      <div className="d-grid gap-2 px-2 ">
        <h4 className="fw-semibold m-0">Select theme</h4>
        <p>
          Personalize your store's look. Select a theme, implement it, and
          switch it whenever you wish.
        </p>
      </div>
      <Container className="py-4 ">
        <Row className="gy-4 position-relative">
          {ChangeThemeData?.length > 0 &&
            ChangeThemeData.map((theme) => (
              <Col xs={12} sm={6} lg={4} className="d-grid" key={theme.id}>
                <div
                  className={`image-div ${
                    activeThemeId === theme.id ? "active" : ""
                  }`}
                  onClick={() => handleThemeId(theme.id)}
                >
                  <img
                    src={theme.image}
                    alt="error"
                    className={`${activeThemeId === theme.id ? "active" : ""}`}
                  />

                  <span
                    className={`theme-span ${
                      activeThemeId === theme.id ? "active" : ""
                    }`}
                  >
                    <i
                      className={`bi bi-check-lg ${
                        activeThemeId === theme.id ? "d-block" : "d-none"
                      }`}
                    ></i>
                  </span>
                </div>
              </Col>
            ))}
        </Row>
        {/* <div className="d-flex justify-content-center pt-3 pt-md-4">
          <Button onClick={handleSubmit}>Save</Button>
        </div> */}
        <div className="d-flex justify-content-center pt-3 pt-md-4">
          <CommonButton onClick={handleSubmit} type="submit" />
        </div>
      </Container>
    </div>
  );
};

export default ChangeTheme;
