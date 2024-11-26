import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { Accordion, Form } from "react-bootstrap";

function ModalForFilter({ show, onHide, productFilter }) {
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        style={{ height: "100vh" }}
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="0" flush style={{ height: "73vh" }}>
            {productFilter?.data?.length > 0 &&
              productFilter.data.map((filter, index) => (
                <Accordion.Item eventKey={index.toString()} key={filter.name}>
                  <Accordion.Header>
                    <span className="text-capitalize fw-semibold">
                      {filter.label}
                    </span>
                  </Accordion.Header>

                  {filter.data.map((item, itemIndex) => (
                    <Accordion.Body key={itemIndex} className="py-2">
                      <div className="d-grid gap-1 gap-sm-2">
                        <div className="d-flex align-items-center gap-2">
                          <Form.Check type="checkbox" label={item.label} />
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
                <span className="text-capitalize fw-semibold">Prize Range</span>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
ModalForFilter.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ModalForFilter;
