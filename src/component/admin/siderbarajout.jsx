import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddProduct({ option, onAdd = () => {} }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    imageurl: "",
    imagealt: "",
    title: "",
    specialite: "",
    desc: "",
    quantity: 0,
    page: 0,
    Laser: "",
    oldLaser: "",
    Jet: "",
    oldJet: "",
    Speral: "",
    oldSperal: "",
    achaud: "",
    oldachaud: "",
    Registre: "",
    olRegistre: "",
    exempleurl: [""],
  });

  const [specialties, setSpecialties] = useState({});
  const [specialties2, setSpecialties2] = useState("Spécialités_médicales");
  const [specialtiesConcours, setSpecialtiesConcours] = useState();
  useEffect(() => {
    axios
      .get("https://www.api.ipb-tunisie.tn/specialties")
      .then((response) => {
        setSpecialties(response.data[0]);
        if (option === "Ouvrages Medicaux") {
          const defaultSpecialiteValue =
            specialties[specialties2] && specialties[specialties2][0];

          setFormData((prevData) => ({
            ...prevData,
            specialite: defaultSpecialiteValue || "",
          }));
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [option]);
  useEffect(() => {
    axios
      .get("https://www.api.ipb-tunisie.tn/specialiteConcours")
      .then((response) => {
        console.log(response.data[0].Spécialités[0]);
        setSpecialtiesConcours(response.data[0].Spécialités);
        if (option === "Concours ECN Tunisie") {
          const defaultSpecialiteValue =
            Array.isArray(response.data[0].Spécialités) &&
            response.data[0].Spécialités.length > 0
              ? response.data[0].Spécialités[0]
              : "";

          setFormData((prevData) => ({
            ...prevData,
            specialite: defaultSpecialiteValue || "",
          }));
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [option]);
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
  const handelSpec = (e) => {
    console.log(e.target.value);
    setSpecialties2(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      imgUrl: formData.imageurl,
      imgAlt: formData.imagealt,
      title: formData.title,
      specialite: formData.specialite,
      exempleurl: formData.exempleurl,
      desc: formData.desc,
      Quantity: parseInt(formData.quantity, 10),
      page: formData.page,
      Laser: formData.Laser,
      oldLaser: formData.oldLaser,
      Jet: formData.Jet,
      oldJet: formData.oldJet,
      Speral: formData.Speral,
      oldSperal: formData.oldSperal,
      achaud: formData.achaud,
      oldachaud: formData.oldachaud,
      Registre: formData.Registre,
      olRegistre: formData.olRegistre,
    };

    setProductDetails([...productDetails, newProduct]);
    setFormData({
      imageurl: "",
      imagealt: "",
      title: "",
      specialite: "",
      desc: "",
      quantity: 0,
      page: 0,
      Laser: "",
      oldLaser: "",
      Jet: "",
      oldJet: "",
      Speral: "",
      oldSperal: "",
      achaud: "",
      oldachaud: "",
      Registre: "",
      olRegistre: "",
      exempleurl: [""],
    });

    handleClose();
  };

  const handleSaveAll = async () => {
    const formattedData = {
      service: option,
      productDetails,
    };

    try {
      const response = await axios
        .post(
          "https://www.api.ipb-tunisie.tn/productcours/add",
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
  const handleAddExempleInput = () => {
    setFormData((prevData) => ({
      ...prevData,
      exempleurl: [...prevData.exempleurl, ""],
    }));
  };
  const handleExempleInputChange = (index, e) => {
    const updatedExempleUrls = [...formData.exempleurl];
    updatedExempleUrls[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      exempleurl: updatedExempleUrls,
    }));
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
          <Offcanvas.Title>Ajouter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="imgUrl">
              <Form.Label>Image URL :</Form.Label>
              <Form.Control
                type="text"
                name="imageurl"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="imgAlt">
              <Form.Label>Image Alt :</Form.Label>
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
            <Form.Group controlId="exemple">
              <Form.Label>exemple</Form.Label>
              {formData.exempleurl &&
                formData.exempleurl.map((exemple, index) => (
                  <div key={index} className="d-flex mb-2">
                    <Form.Control
                      type="text"
                      name={`exemple_${index}`}
                      value={exemple}
                      onChange={(e) => handleExempleInputChange(index, e)}
                    />
                    {index === formData.exempleurl.length - 1 && (
                      <Button
                        variant="outline-secondary"
                        className="ms-2"
                        onClick={handleAddExempleInput}
                      >
                        +
                      </Button>
                    )}
                  </div>
                ))}
            </Form.Group>
            {option === "Ouvrages Medicaux" && (
              <>
                <Form.Group controlId="specialite principale">
                  <Form.Label>Type de specialite</Form.Label>
                  <Form.Control
                    as="select"
                    name="specialite principale"
                    onChange={handelSpec}
                  >
                    <option value="Spécialités_médicales">
                      Spécialités_médicales
                    </option>
                    <option value="Spécialités_chirurgicales">
                      Spécialités_chirurgicales
                    </option>
                    <option value="Spécialités_fondamentales">
                      Spécialités_fondamentales
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="specialite">
                  <Form.Label>specialite</Form.Label>
                  <Form.Control
                    as="select"
                    name="specialite"
                    onChange={handleChange}
                  >
                    {specialties[specialties2] &&
                      specialties[specialties2].map((detail) => (
                        <option value={detail}>{detail}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </>
            )}
            {option === "Concours ECN Tunisie" && (
              <>
                <Form.Group controlId="specialite">
                  <Form.Label>specialite</Form.Label>
                  <Form.Control
                    as="select"
                    name="specialite"
                    onChange={handleChange}
                  >
                    {specialtiesConcours &&
                      specialtiesConcours.map((detail) => (
                        <option value={detail}>{detail}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </>
            )}
            <Form.Group controlId="desc">
              <Form.Label>Description:</Form.Label>
              <Form.Control type="text" name="desc" onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>Quantity :</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                onChange={handleChange}
              />
            </Form.Group>
            {option === "Concours ECN Tunisie" && (
              <Form.Group controlId="page">
                <Form.Label>nombre de page :</Form.Label>
                <Form.Control
                  type="number"
                  name="page"
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            {option === "Ouvrages Medicaux" && (
              <Form.Group controlId="page">
                {/* Add input fields for Laser, oldLaser, Jet, oldJet, Speral, oldSperal, achaud, oldachaud, Registre, olRegistre */}
                <Form.Label>Laser:</Form.Label>
                <Form.Control
                  type="text"
                  name="Laser"
                  onChange={handleChange}
                />

                <Form.Label>Laser Fictif :</Form.Label>
                <Form.Control
                  type="text"
                  name="oldLaser"
                  onChange={handleChange}
                />

                <Form.Label>Jet:</Form.Label>
                <Form.Control type="text" name="Jet" onChange={handleChange} />

                <Form.Label>Jet Fictif:</Form.Label>
                <Form.Control
                  type="text"
                  name="oldJet"
                  onChange={handleChange}
                />

                <Form.Label>Speral:</Form.Label>
                <Form.Control
                  type="text"
                  name="Speral"
                  onChange={handleChange}
                />

                <Form.Label>Speral Fictif:</Form.Label>
                <Form.Control
                  type="text"
                  name="oldSperal"
                  onChange={handleChange}
                />

                <Form.Label>achaud:</Form.Label>
                <Form.Control
                  type="text"
                  name="achaud"
                  onChange={handleChange}
                />

                <Form.Label>achaud Fictif:</Form.Label>
                <Form.Control
                  type="text"
                  name="oldachaud"
                  onChange={handleChange}
                />

                <Form.Label>Registre:</Form.Label>
                <Form.Control
                  type="text"
                  name="Registre"
                  onChange={handleChange}
                />

                <Form.Label>Registre Fictif:</Form.Label>
                <Form.Control
                  type="text"
                  name="olRegistre"
                  onChange={handleChange}
                />
              </Form.Group>
            )}

            <Button className="mt-2" variant="danger" type="submit">
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

export default AddProduct;
