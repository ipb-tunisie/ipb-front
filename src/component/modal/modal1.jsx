import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useCart } from "react-use-cart";
const Modal1 = (props) => {
  const {
    id,
    imgUrl,
    imgAlt,
    title,
    desc,
    quantity,
    total_quantity,
    page,
    header,
    style,
    val,
  } = props;

  // console.log(header);
  const [prix, setPrix] = useState([]);
  const [impression, setImpression] = useState(0);
  const [embalage, setEmbalage] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [oldimpression, setOldImpression] = useState(0);
  const [Oldembalage, setOldEmbalage] = useState(0);
  const [oldtotalPrice, setOldTotalPrice] = useState(0);
  const { addItem } = useCart();
  useEffect(() => {
    if (!isNaN(page) && !isNaN(impression) && !isNaN(embalage)) {
      const data = page * impression;
      setTotalPrice(data + embalage);
    }
    if (!isNaN(page) && !isNaN(oldimpression) && !isNaN(Oldembalage)) {
      const data = page * oldimpression;
      setOldTotalPrice(data + Oldembalage);
    }
    if (!isNaN(page) && isNaN(oldimpression) && !isNaN(Oldembalage)) {
      const data = page * impression;
      setOldTotalPrice(data + Oldembalage);
    }
    if (!isNaN(page) && !isNaN(oldimpression) && isNaN(Oldembalage)) {
      const data = page * impression;
      setOldTotalPrice(data + embalage);
    }
  }, [page, impression, embalage, oldimpression, Oldembalage]);
  useEffect(() => {
    if (header === "Ouvrages Medicaux") {
      setPrix([
        {
          prixJet: val.Jet,
          oldprixJet: val.oldJet,
          prixLaser: val.Laser,
          oldprixLaser: val.oldLaser,
          prixachaud: val.achaud,
          oldprixachaud: val.oldachaud,
          prixSperal: val.Speral,
          oldprixSperal: val.oldSperal,
          prixRegistre: val.Registre,
          oldprixRegistre: val.oldRegistre,
        },
      ]);
    } else {
      // Fetch prices from the server for other cases
      axios
        .get("https://dull-bull-cowboy-hat.cyclic.app/impression")
        .then((response) => {
          setPrix(response.data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [header, val]);
  // console.log(totalPrice);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setTotalPrice(0);
    setOldTotalPrice(0);
    setEmbalage(0);
    setOldEmbalage(0);
    setImpression(0);
    setOldImpression(0);
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const [showPrices, setShowPrices] = useState(false);
  const [isItemInCart, setIsItemInCart] = useState(false);
  return (
    <>
      <Button
        // style={{ marginRight: "2rem" }}
        onClick={handleShow}
        className={`${style === "slider" ? "lab-btn br ml-50" : "lab-btn br"} `}
      >
        {style === "slider" ? "voir pack" : "voir le produit"}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img src={imgUrl} alt={imgAlt} className="rounded  img-fluid" />
              <h5 style={{ marginTop: "2rem" }}>{desc}</h5>
            </Col>

            <Col md={6}>
              {prix.map((impressionOption, index) => (
                <Form key={index}>
                  <h5 style={{ textAlign: "center" }}>{title}</h5>
                  <h6 style={{ textAlign: "center" }}>{page}pages</h6>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                      <Form.Label style={{ textAlign: "center" }}>
                        Type d"impression
                      </Form.Label>

                      <div key={`inline-radio`} className="mb-3">
                        <Form.Check
                          inline
                          label="Jet"
                          name="group1"
                          type="radio"
                          id={`inline-radio-1`}
                          onClick={() => {
                            setImpression(impressionOption.prixJet);
                            setOldImpression(impressionOption.oldprixJet);
                            setShowPrices(true);
                          }}
                        />

                        <Form.Check
                          inline
                          label="laser"
                          name="group1"
                          type="radio"
                          id={`inline-radio-2`}
                          onClick={() => {
                            setImpression(impressionOption.prixLaser);
                            setOldImpression(impressionOption.oldprixLaser);
                            setShowPrices(true);
                          }}
                        />
                        {showPrices && <></>}
                      </div>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                      <Form.Label>Type d"embalage</Form.Label>
                      <div key={`inline-radio`} className="mb-3">
                        <Form.Check
                          inline
                          label="a chaud"
                          name="group2"
                          type="radio"
                          id={`inline-radio-22`}
                          onClick={() => {
                            setEmbalage(impressionOption.prixachaud);
                            setOldEmbalage(impressionOption.oldprixachaud);
                          }}
                        />

                        <>
                          <Form.Check
                            inline
                            label="speral"
                            name="group2"
                            type="radio"
                            id={`inline-radio-21`}
                            onClick={() => {
                              setEmbalage(impressionOption.prixSperal);
                              setOldEmbalage(impressionOption.oldprixSperal);
                            }}
                          />
                        </>

                        {header === "Ouvrages Medicaux" && (
                          <>
                            <Form.Check
                              inline
                              label="registre"
                              name="group2"
                              type="radio"
                              id={`inline-radio-23`}
                              onClick={() => {
                                setEmbalage(impressionOption.prixRegistre);
                                setOldEmbalage(
                                  impressionOption.oldprixRegistre
                                );
                              }}
                            />
                          </>
                        )}
                      </div>
                    </Form.Group>
                  </Row>
                </Form>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        {oldtotalPrice !== 0 && (
          <h3>
            Prix total :
            <span
              style={{
                textDecoration: " line-through",
                color: "red",
                fontSize: "1.5rem",
                marginRight: "1rem",
                marginLeft: "1rem",
              }}
            >
              {oldtotalPrice} Dt
            </span>
            {totalPrice} Dt
          </h3>
        )}

        <Modal.Footer>
          <Button className="lab-btn bg" onClick={handleClose}>
            Annuler
          </Button>

          <Button
            className="lab-btn br"
            onClick={() => {
              if (header === "Tunis" && impression && embalage == 0) {
                alert(
                  "prier de choisir une option d´impretion et d´emballage."
                );
              } else if (impression == 0) {
                alert("prier de choisir une option d´impretion .");
              } else {
                addItem({
                  id: id,
                  imgUrl: imgUrl,
                  imgAlt: imgAlt,
                  title: title,
                  price: totalPrice,
                  desc: desc,
                  quantity: quantity,
                  total_quantity: total_quantity,
                });
                setIsItemInCart(true);
                handleClose();
              }
            }}
          >
            Ajouter au panier
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modal1;
