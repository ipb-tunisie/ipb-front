import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
function ModalUpdateFAC({ courseId, productDetailId, onUpdate }) {
  const [show, setShow] = useState(false);
  console.log(courseId, productDetailId);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [products, setProducts] = useState([]);
  const handleSaveChanges = () => {
    axios
      .post("https://www.api.ipb-tunisie.tn/product/edit", {
        courseId,
        productDetailId,
        anne: products.anne,
        imgUrl: products.imgUrl,
        imgAlt: products.imgAlt,
        title: products.title,
        periode: products.periode,
        desc: products.desc,
        Quantity: products.Quantity,
        page: products.page,
      })
      .then((response) => {
        onUpdate(response.data.updatedProduct.productDetails);
        console.log(response.data.updatedProduct.productDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    handleClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts((prevProducts) => ({
      ...prevProducts,
      [name]: value,
    }));
  };
  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        style={{ marginLeft: "2rem" }}
      >
        Modifier
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="anne">
              <Form.Label>Anne</Form.Label>
              <Form.Control as="select" name="anne" onChange={handleChange}>
                <option value="1ere">1ere</option>
                <option value="2eme">2eme</option>
                <option value="3eme">3eme</option>
                <option value="4eme">4eme</option>
                <option value="5eme">5eme</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>image url</Form.Label>
              <Form.Control
                type="url"
                placeholder="image.com"
                autoFocus
                name="imgUrl"
                value={products.imgUrl}
                onChange={handleChange}
              />

              <Form.Label>titre produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="produit 1 "
                autoFocus
                value={products.title}
                onChange={handleChange}
                name="title"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>description</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                value={products.desc}
                onChange={handleChange}
                name="desc"
              />

              <Form.Label>Quantity produit</Form.Label>
              <Form.Control
                type="number"
                placeholder="10 "
                autoFocus
                value={products.Quantity}
                onChange={handleChange}
                name="Quantity"
              />
              <Form.Label> Nombre de page</Form.Label>
              <Form.Control
                type="number"
                placeholder="s5 "
                autoFocus
                value={products.page}
                onChange={handleChange}
                name="page"
              />
              <Form.Label> periode</Form.Label>
              <Form.Control
                type="text"
                placeholder="a2 "
                autoFocus
                value={products.periode}
                onChange={handleChange}
                name="periode"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSaveChanges();
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateFAC;
