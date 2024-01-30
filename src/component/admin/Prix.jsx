import React, { useState, useEffect } from "react";
import { Form, Card, Col, Button, Row } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalUpdate from "./modalUpdate";

function PrixMain() {
  const [prix, setPrix] = useState({
    prixJet: "",
    oldprixJet: "",
    prixLaser: "",
    oldprixLaser: "",
    prixSperal: "",
    oldprixSperal: "",
    prixAChaud: "",
    oldprixachaud: "",
    prixRegistre: "",
    oldprixRegistre: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrix((prevPrix) => ({
      ...prevPrix,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const modifiedValues = {};
    for (const key in prix) {
      if (prix[key] !== "") {
        modifiedValues[key] = prix[key];
      }
    }
    console.log(modifiedValues);
    axios
      .post(
        "http://102.211.210.62:3001/impression/edit",
        modifiedValues
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Data submitted successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error submitting data");
      });

    setPrix({
      prixJet: "",
      oldprixJet: "",
      prixLaser: "",
      oldprixLaser: "",
      prixSperal: "",
      oldprixSperal: "",
      prixAChaud: "",
      oldprixachaud: "",
      prixRegistre: "",
      oldprixRegistre: "",
    });
  };
  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} className="text-center">
        <Form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Impression</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Row sm={2}>
              <Col>
                <Form.Label>Prix Jet</Form.Label>
                <Form.Control
                  type="number"
                  name="prixJet"
                  value={prix.prixJet}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Prix Facultatif Jet</Form.Label>
                <Form.Control
                  type="number"
                  name="oldprixJet"
                  value={prix.oldprixJet}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row sm={2}>
              <Col>
                <Form.Label>Prix Laser</Form.Label>
                <Form.Control
                  type="number"
                  name="prixLaser"
                  value={prix.prixLaser}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Prix Facultatif Laser</Form.Label>
                <Form.Control
                  type="number"
                  name="oldprixLaser"
                  value={prix.oldprixLaser}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form.Group>
          <h3 className="text-center mb-4">Embalage</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Row sm={2}>
              <Col>
                <Form.Label>Prix Speral</Form.Label>
                <Form.Control
                  type="number"
                  name="prixSperal"
                  value={prix.prixSperal}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Prix Facultatif Speral</Form.Label>
                <Form.Control
                  type="number"
                  name="oldprixSperal"
                  value={prix.oldprixSperal}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row sm={2}>
              <Col>
                <Form.Label>Prix a chaud</Form.Label>
                <Form.Control
                  type="number"
                  name="prixAChaud"
                  value={prix.prixAChaud}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Prix Facultatif A Chaud</Form.Label>
                <Form.Control
                  type="number"
                  name="oldprixachaud"
                  value={prix.oldprixachaud}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row sm={2}>
              <Col>
                <Form.Label>Prix Registre</Form.Label>
                <Form.Control
                  type="number"
                  name="prixRegistre"
                  value={prix.prixRegistre}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Prix Facultatif Registre</Form.Label>
                <Form.Control
                  type="number"
                  name="oldprixRegistre"
                  value={prix.oldprixRegistre}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form.Group>

          <Button
            className="mt-3 centered"
            block
            variant="danger"
            type="submit"
          >
            Ajouter / Modifier
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default PrixMain;
