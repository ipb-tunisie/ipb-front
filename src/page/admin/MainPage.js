import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../component/layout/AdminLayout";
// import React from "react";
function Main() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [image, setImage] = useState("");
  const [promo, setPromo] = useState([]);
  useEffect(() => {
    axios
      .get("https://www.api.ipb-tunisie.tn/image")
      .then((response) => {
        console.log(response.data);
        setPromo(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const SubmitImage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://www.api.ipb-tunisie.tn/image/add",
        {
          img: image,
        }
      );

      const data = response.data;
      console.log(data);

      toast.success("Image saved successfully!");
      setImage("");
      setPromo(data.allImages);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteConfirmation = () => {
    axios
      .post("https://www.api.ipb-tunisie.tn/image/delete", {
        imageId: productToDelete,
      })
      .then((response) => {
        console.log("Deleted successfully");
        toast.error("Product deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setPromo(response.data.remainingImages);
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <AdminLayout>
      <React.Fragment>
        <Form
          onSubmit={SubmitImage}
          className="d-flex justify-content-center align-items-center"
          style={{ height: "15vh" }}
        >
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="text"
              placeholder="passer votre url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{ width: "20rem", marginRight: "1rem" }}
            />
            <div className="d-grid gap-2">
              <Button
                variant="danger"
                type="submit"
                className="mt-2 mb-2"
                style={{ backgroundColor: "rgb(194, 24, 7)" }}
              >
                Ajouter
              </Button>
            </div>
          </Form.Group>
        </Form>
        <div className="row">
          {promo.map((item, index) => (
            <div className="col-md-4 mb-2" key={index}>
              <Card>
                <Card.Img src={item.img} style={{ height: "15rem" }}></Card.Img>
                <Card.Body style={{ height: "4rem" }}>
                  <Card.Text
                    style={{ fontSize: "2rem" }}
                    className="text-center"
                  >
                    Ajouter le: {new Date(item.createdAt).toLocaleDateString()}
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="danger"
                  onClick={() => {
                    setProductToDelete(item._id);
                    setShowDeleteModal(true);
                  }}
                  className="mb-2 me-2 ms-2"
                >
                  Supprimer
                </Button>
              </Card>
            </div>
          ))}
        </div>

        <ToastContainer />
      </React.Fragment>
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
    </AdminLayout>
  );
}

export default Main;
