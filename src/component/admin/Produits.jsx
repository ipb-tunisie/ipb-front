import React, { useState, useEffect } from "react";
import { Card, Col, Button, Row } from "react-bootstrap";
import axios from "axios";
import AddProduit from "./siderbarajout";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalUpdate from "./modalUpdate";
function ProductForm({ option, handleShow }) {
  const [products, setProducts] = useState([]);
  const [productsid, setProductsId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  useEffect(() => {
    axios
      .get("https://api.ipb-tunisie.tn/productcours")
      .then((response) => {
        const productsWithMatchingService = response.data.find(
          (product) => product.service === option
        );
        setProductsId(productsWithMatchingService._id);
        setProducts(productsWithMatchingService.productDetails);
      })
      .catch((error) => console.error("Error:", error));
  }, [option]);

  const handleDeleteConfirmation = () => {
    // Perform the delete operation here
    axios
      .post("https://api.ipb-tunisie.tn/productcours/delete", {
        courseId: productsid,
        productDetailId: productToDelete._id,
      })
      .then((response) => {
        toast.error("Product deleted successfully!", {
          // ... (toast configuration remains unchanged)
        });
        setProducts(response.data.productDetails);
        setShowDeleteModal(false); // Close the delete confirmation modal
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <AddProduit
        option={option}
        onAdd={(e) => {
          console.log(e.productDetails);
          setProducts(e.productDetails);
        }}
      />

      <Row sm={6} style={{ paddingTop: "2rem" }}>
        {products &&
          products.map((detail, detailIndex) => (
            <React.Fragment key={detailIndex}>
              <Col sm={3}>
                <Card className="mb-2 me-2">
                  <Card.Img
                    variant="top"
                    src={detail.imgUrl}
                    alt={detail.imgAlt}
                    style={{ height: "10rem" }}
                  />
                  <Card.Body
                    style={{ maxHeight: "25rem", height: "max-content" }}
                  >
                    <Row>
                      <Col
                        className="d-flex-col justify-content-between"
                        style={{ height: "inherit" }}
                        sm={12}
                      >
                        <>
                          <Card.Title>{detail.title}</Card.Title>
                          <Card.Text
                            style={{ maxLines: "3", overflow: "hidden" }}
                          >
                            desc:{detail.desc}
                          </Card.Text>

                          <Card.Text>specialite: {detail.specialite}</Card.Text>
                          <Card.Text>Quantity: {detail.Quantity}</Card.Text>

                          <Card.Text>nobre de page: {detail.page}</Card.Text>
                        </>

                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                          <ModalUpdate
                            courseId={productsid}
                            productDetailId={detail._id}
                            handleShow={handleShow}
                            detail={detail}
                            option={option}
                            onUpdate={(updatedProducts) =>
                              setProducts(updatedProducts)
                            }
                          />
                          <Button
                            variant="danger"
                            onClick={() => {
                              setProductToDelete(detail);
                              setShowDeleteModal(true);
                            }}
                            style={{ marginLeft: "2rem" }}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </React.Fragment>
          ))}
      </Row>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir supprimer le produit ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductForm;
