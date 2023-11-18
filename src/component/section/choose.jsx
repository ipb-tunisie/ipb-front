import { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
const title = "Choisir la faculte et l'année universitaire";
const btnText = "Voir cours";
const cardTitle = ["F.M.Sfax", "F.M.Sousse", "F.M.Tunis", "F.M.Monastir"];
const anneUniversitere = ["1", "2", "3", "4", "5"];

const Choisir = (show) => {
  const [adress, setAdress] = useState("choisir une faculte");
  const [anne, setAnne] = useState("Choisir année");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  function removeCharacter() {
    let originalString = adress;
    let firstCharRemoved = originalString.slice(4);

    window.localStorage.setItem("university", firstCharRemoved);
  }

  useEffect(() => {
    setIsButtonEnabled(
      adress !== "choisir une faculte" && anne !== "Choisir année"
    );
  }, [adress, anne]);
  return (
    <Card className="me-2 ms-2">
      <Card.Header style={{ backgroundColor: "#C21807", color: "white" }}>
        {title}
      </Card.Header>
      <Card.Body>
        <Container>
          <form>
            <Row
              style={{
                width: "inherit",
                justifyContent: "center",
              }}
            >
              <Col
                style={{ width: "auto", textAlign: "center" }}
                className="col-4 mb-2 "
              >
                <Dropdown drop="up-centered" id="00">
                  <Dropdown.Toggle
                    className=" lab-btn br"
                    style={{ backgroundColor: "#C21807" }}
                    id="dropdown-basic"
                  >
                    {adress}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setAdress(`${cardTitle[0]}`);
                      }}
                    >
                      {cardTitle[0]}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setAdress(`${cardTitle[1]}`);
                      }}
                    >
                      {cardTitle[1]}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setAdress(`${cardTitle[2]}`);
                      }}
                    >
                      {cardTitle[2]}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setAdress(`${cardTitle[3]}`);
                      }}
                    >
                      {cardTitle[3]}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col
                style={{ width: "auto", textAlign: "center" }}
                className=" mb-1"
              >
                <Dropdown
                  drop="up-centered"
                  id="11"
                  style={{ marginLeft: "1rem" }}
                >
                  <Dropdown.Toggle
                    className=" lab-btn br"
                    style={{ backgroundColor: "#C21807" }}
                    id="dropdown-basic"
                  >
                    {anne}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setAnne(`${anneUniversitere[0]}`);
                      }}
                    >
                      {anneUniversitere[0]}{" "}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setAnne(`${anneUniversitere[1]}`);
                      }}
                    >
                      {anneUniversitere[1]}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setAnne(`${anneUniversitere[2]}`);
                      }}
                    >
                      {anneUniversitere[2]}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setAnne(`${anneUniversitere[3]}`);
                      }}
                    >
                      {anneUniversitere[3]}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setAnne(`${anneUniversitere[4]}`);
                      }}
                    >
                      {anneUniversitere[4]}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col
                className="col-4 mb-2"
                style={{ width: "auto", textAlign: "center" }}
              >
                <button
                  type="button"
                  className="lab-btn"
                  onClick={(e) => {
                    removeCharacter();

                    window.localStorage.setItem(
                      "class",
                      `${anne === "1" ? `${anne}ere` : `${anne}eme`}`
                    );

                    window.location.href = `/Produit`;
                   
                  }}
                  disabled={!isButtonEnabled}
                >
                  <span>{btnText}</span>
                </button>
              </Col>
            </Row>
          </form>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Choisir;
