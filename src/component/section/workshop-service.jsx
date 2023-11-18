import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const title = "Choisir la faculte et l'année universitaire ";
const btnText = "Voir cours";
const cardTitle = ["F.M.Sfax", "F.M.Sousse", "F.M.Tunis", "F.M.Monastir"];
const anneUniversitere = ["1", "2", "3", "4", "5"];
const Workshopservice = (show, handleClose) => {
  const [adress, setAdress] = useState("choisir une faculte");
  const [anne, setAnne] = useState("Choisir année");

  return (
    <div className="workshop-join" style={{ paddingTop: "7rem" }} show={show}>
      <div
        className="container"
        style={{ margin: "auto", paddingLeft: "20rem" }}
      >
        <div className="section-wrapper">
          <div className="workshop-title">
            <h5>{title}</h5>
          </div>
          <div className="workshop-join-form" style={{ width: "35rem" }}>
            <form>
              <div className="input-area">
                <div className="row">
                  <div className="col-sm" style={{ marginBottom: "1rem" }}>
                    <Dropdown drop="end" id="00">
                      <Dropdown.Toggle
                        className=" lab-btn br"
                        style={{ backgroundColor: "#C21807" }}
                        id="dropdown-basic"
                      >
                        {adress}
                      </Dropdown.Toggle>

                      <Dropdown.Menu drop="end">
                        <Dropdown.Item
                          style={{ zIndex: "1000", borderColor: "green" }}
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
                  </div>
                  <div className="col-sm">
                    <Dropdown drop="end" id="11">
                      <Dropdown.Toggle
                        className=" lab-btn br"
                        style={{ backgroundColor: "#C21807" }}
                        id="dropdown-basic"
                      >
                        {anne}
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ zIndex: "1000" }}>
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
                  </div>
                </div>
              </div>
              <div style={{ marginLeft: "10rem" }}>
                <div className="submit-area">
                  <button
                    type="button"
                    className="lab-btn"
                    onClick={() => {
                      window.location.href = `/${adress}${anne}`;
                    }}
                  >
                    <span>{btnText}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshopservice;
