import { Link } from "react-router-dom";
import { useState } from "react";
import Choisir from "./choose";
const subTitle = "POURQUOI NOUS CHOISIR";
const title = "Obtenez tout pour apprendre";

const featureList = [
  {
    imgUrl: "assets/images/feature/01.png",
    imgAlt: "feature ",
    title: "Service d'impression ",
    titleSpan: "et reliure ",
    btnText: "Voir plus",
    URL: "#Contact",
    href: "#Contact",
  },
  {
    imgUrl: "assets/images/feature/02.png",
    imgAlt: "feature rajibraj91 rajibraj",
    title: "Ouvrages  ",
    titleSpan: "Medicaux ",
    btnText: "Voir plus",
    URL: "/Cours",
  },
  {
    imgUrl: "assets/images/feature/03.png",
    imgAlt: "feature rajibraj91 rajibraj",
    title: "Concours ",
    titleSpan: "ECN Tunisie",
    btnText: "Voir plus",
    URL: "/Etudiant-externat",
  },
];

const Featureservice = () => {
  const [showWorkshopService, setShowWorkshopService] = useState(false);

  const handleWorkshopServiceClick = () => {
    setShowWorkshopService(!showWorkshopService);
  };
  const [menuToggle, setMenuToggle] = useState(false);
  const [headerFiexd, setHeaderFiexd] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFiexd(true);
    } else {
      setHeaderFiexd(false);
    }
  });
  const handleServiceClick = () => {
    setMenuToggle(false);
  };
  return (
    <>
      <div className="feature-section padding-tb">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{subTitle}</span>
            <h2 className="title">{title}</h2>
          </div>
          <div className="section-wrapper">
            <div className="row g-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 justify-content-center">
              {featureList.map((val, i) => (
                <div className="col" key={i}>
                  <div className="feature-item">
                    <div
                      className="feature-inner"
                      style={{ borderRadius: "40px" }}
                    >
                      <div className="feature-thumb">
                        <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                      </div>
                      <div className="feature-content">
                        <Link to={val.URL} onClick={handleServiceClick}>
                          <h5>
                            {val.title} <span>{val.titleSpan}</span>
                          </h5>
                        </Link>
                        <Link to={val.URL} className="lab-btn-text">
                          {val.btnText} <span></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col">
                <div className="feature-item">
                  <div
                    className="feature-inner"
                    style={{ borderRadius: "40px" }}
                  >
                    <div className="feature-thumb">
                      <img
                        src="assets/images/feature/06.png"
                        alt="feature rajibraj91 rajibraj"
                      />
                    </div>
                    <div className="feature-content">
                      <h5>
                        Documenetation <span>Extarnat</span>
                      </h5>

                      <Link
                        onClick={handleWorkshopServiceClick}
                        className="lab-btn-text"
                      >
                        Voir plus <span></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showWorkshopService && <Choisir />}
    </>
  );
};

export default Featureservice;
