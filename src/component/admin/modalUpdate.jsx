import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function ModalUpdate({ courseId, productDetailId, onUpdate, detail, option }) {
  console.log(detail);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState({
    imgUrl: detail.imgUrl,
    imgAlt: detail.imgAlt,
    title: detail.title,
    exempleurl: detail.exempleurl,
    desc: detail.desc,
    Quantity: detail.Quantity,
    page: detail.page,
    price: detail.price,
    oldprice: detail.oldprice,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveChanges = () => {
    axios
      .post("http://102.211.210.62/productcours/edit", {
        courseId,
        productDetailId,
        imgUrl: products.imgUrl,
        imgAlt: products.imgAlt,
        title: products.title,
        exempleurl: products.exempleurl,
        desc: products.desc,
        Quantity: products.Quantity,
        page: products.page,
        price: products.price,
        oldprice: products.oldprice,
      })
      .then((response) => {
        onUpdate(response.data.updatedProduct.productDetails);
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

  const handleAddExempleUrl = () => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      exempleurl: [...prevProducts.exempleurl, ""],
    }));
  };

  const handleExempleUrlChange = (index, value) => {
    setProducts((prevProducts) => {
      const updatedexempleurl = [...prevProducts.exempleurl];
      updatedexempleurl[index] = value;
      return {
        ...prevProducts,
        exempleurl: updatedexempleurl,
      };
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Modifer
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
              {option === "Concours ECN Tunisie" && (
                <>
                  {" "}
                  <Form.Label>Nombre de page</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="10 "
                    autoFocus
                    value={products.page}
                    onChange={handleChange}
                    name="page"
                  />
                </>
              )}
              {option === "Ouvrages Medicaux" && (
                <>
                  {" "}
                  <Form.Label>prix:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="10 "
                    autoFocus
                    value={products.price}
                    onChange={handleChange}
                    name="price"
                  />
                  <Form.Label> ancien prix:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="10 "
                    autoFocus
                    value={products.oldprice}
                    onChange={handleChange}
                    name="oldprice"
                  />
                </>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Exemple URLs</Form.Label>
              {products.exempleurl &&
                products.exempleurl.map((url, index) => (
                  <div key={index} className="mb-2">
                    <Form.Control
                      type="url"
                      placeholder={`URL ${index + 1}`}
                      value={url}
                      onChange={(e) =>
                        handleExempleUrlChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              <Button variant="outline-secondary" onClick={handleAddExempleUrl}>
                + Add URL
              </Button>
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

export default ModalUpdate;
