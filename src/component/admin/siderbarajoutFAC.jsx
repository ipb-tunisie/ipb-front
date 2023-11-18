import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddProductFac({ option, onAdd = () => {} }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    anne: "1ere",
    imageurl: "",
    imagealt: "",
    title: "",
    desc: "",
    periode: "",
    quantity: "",
    page: "",
  });
  const [productDetails, setProductDetails] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      anne: formData.anne,
      imgUrl: formData.imageurl,
      imgAlt: formData.imagealt,
      title: formData.title,
      periode: formData.periode,
      page: formData.page,
      desc: formData.desc,
      Quantity: parseInt(formData.quantity, 10),
    };

    setProductDetails([...productDetails, newProduct]);
    setFormData({
      anne: "",
      imageurl: "",
      imagealt: "",
      title: "",
      desc: "",
      periode: "",
      quantity: "",
      page: "",
    });

    handleClose();
  };

  const handleSaveAll = async () => {
    const formattedData = {
      Faculte: option,
      productDetails,
    };

    try {
      const response = await axios
        .post(
          "https://dull-bull-cowboy-hat.cyclic.app/product/add",
          formattedData
        )
        .then((res) => {
          onAdd(res.data.entity);
        });
      toast.success("Product saved successfully!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("Data sent to server:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }

    setProductDetails([]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        variant="secondary"
        onClick={handleShow}
        className="me-2"
        style={{ marginTop: "2rem", marginLeft: "5rem" }}
      >
        Ajouter des produit
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group controlId="imgUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageurl"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="imgAlt">
              <Form.Label>Image Alt</Form.Label>
              <Form.Control
                type="text"
                name="imagealt"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="desc">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="desc" onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="periode">
              <Form.Label>periode</Form.Label>
              <Form.Control
                type="text"
                name="periode"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="page">
              <Form.Label>page </Form.Label>
              <Form.Control type="number" name="page" onChange={handleChange} />
            </Form.Group>

            <Button className="mt-2" variant="secondary" type="submit">
              Enregistrer
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      {productDetails.length > 0 && (
        <Button
          variant="danger"
          style={{ marginTop: "2rem" }}
          onClick={handleSaveAll}
        >
          Enregistrer tous les produits
        </Button>
      )}
    </div>
  );
}

export default AddProductFac;
