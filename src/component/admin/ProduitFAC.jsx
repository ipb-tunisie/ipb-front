import React, { useState, useEffect } from "react";
import { Card, Col, Button, Row } from "react-bootstrap";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Yeardopdown from "./Yeardopdown";
import AddProductFac from "./siderbarajoutFAC";
import ModalUpdateFAC from "./modalUpdateFAC";
function ProductFac({ option }) {
  const [products, setProducts] = useState([]);
  const [filterproducts, setFilterProducts] = useState([]);
  const [productsid, setProductsId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  useEffect(() => {
    axios
      .get("https://api.ipb-tunisie.tn/product")
      .then((response) => {
        console.log(response.data);
        const productsWithMatchingService = response.data.filter(
          (product) => product.Faculte === option
        )[0];
        setProductsId(productsWithMatchingService._id);

        setProducts(productsWithMatchingService.productDetails);
        setFilterProducts(productsWithMatchingService.productDetails);
      })
      .catch((error) => console.error("Error:", error));
  }, [option]);

  const handleDeleteConfirmation = () => {
    // Perform the delete operation here
    axios
      .post("https://api.ipb-tunisie.tn/product/delete", {
        courseId: productsid,
        productDetailId: productToDelete._id,
      })
      .then((response) => {
        toast.error("Product deleted successfully!", {
          // ... (toast configuration remains unchanged)
        });
        setProducts(response.data.productDetails);
        setFilterProducts(response.data.productDetails);
        setShowDeleteModal(false); // Close the delete confirmation modal
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const filterPerYear = (year) => {
    if (year === "all") {
      setFilterProducts(products);
    } else
      setFilterProducts(products.filter((product) => product.anne === year));
  };
  return (
    <>
      <Row>
        <Col>
          <AddProductFac
            option={option}
            onAdd={(e) => {
              console.log(e);
              setFilterProducts(e.productDetails);
              setProducts(e.productDetails);
            }}
          />
        </Col>
        <Col>
          <Yeardopdown
            filterProducts={(e) => {
              filterPerYear(e);
            }}
          />
        </Col>
      </Row>

      <Row sm={6} style={{ paddingTop: "2rem" }}>
        {filterproducts &&
          filterproducts.map((detail, detailIndex) => (
            <React.Fragment key={detailIndex}>
              <Col sm={3}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={detail.imgUrl}
                    alt={detail.imgAlt}
                    style={{ height: "10rem" }}
                  />
                  <Card.Body style={{ height: "20rem" }}>
                    <>
                      <Card.Title>{detail.title}</Card.Title>
                      <Card.Title>anne:{detail.anne}</Card.Title>
                      <Card.Text type="input">desc:{detail.desc}</Card.Text>

                      <Card.Text>Quantity: {detail.Quantity}</Card.Text>
                      <Card.Text>periode: {detail.periode}</Card.Text>
                      <Card.Text>page: {detail.page}</Card.Text>
                    </>

                    <ModalUpdateFAC
                      courseId={productsid}
                      productDetailId={detail._id}
                      detail={detail}
                      onUpdate={(updatedProducts) => {
                        setProducts(updatedProducts);
                        setFilterProducts(updatedProducts);
                      }}
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

export default ProductFac;
