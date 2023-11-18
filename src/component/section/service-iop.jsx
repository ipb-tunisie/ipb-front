import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdowns from "./dropdowns";
import Container from "react-bootstrap/Container";
const subTitle = "Popular Category";
const title = "Popular Category For Learn";

const categoryList = [
  //   {
  //     imgUrl: "assets/images/category/icon/07.jpg",
  //     imgAlt: "category rajibraj91 rajibraj",
  //     title: "Computer Science",assets/images/category/icon/07.jpg
  //     desc: "24 Course",Computer Science",assets/images/category/icon/07.jp
  //     link: "/",
  //
  //   },
  {
    imgUrl: "assets/images/category/icon/08.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    title: "Imprimerie et roulement",
    desc: "",
    link: "/course",
  },
  {
    imgUrl: "assets/images/category/icon/09.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    title: "A2",
    desc: "43 Course",
    link: "/Produit",
  },
  {
    imgUrl: "assets/images/category/icon/10.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    title: "Etudiant externat",
    desc: "50 Course",
    link: "/about",
  },
];

const Services = () => {
  const [show, setShow] = useState(false);

  const cardTitle = ["F.M.Sfax", "F.M.Sousse", "F.M.Tunis", "F.M.Moastir"];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      className="category-section padding-tb section-bg style-2"
      id="Service"
    >
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
            {categoryList.map((val, i) => (
              <div className="col" key={i}>
                <div className="category-item text-center">
                  <div className="category-inner">
                    <div className="category-thumb">
                      <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                    </div>
                    <div className="category-content">
                      <Link to={val.link}>
                        <h6>{val.title}</h6>
                      </Link>
                      <span>{val.desc}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <div className="col">
                <div className="category-item text-center">
                  <div className="category-inner">
                    <div className="category-thumb">
                      <img
                        src="assets/images/category/icon/07.jpg"
                        alt="category rajibraj91 rajibraj"
                      />
                    </div>
                    <div className="category-content">
                      <Link onClick={handleShow}>
                        <h6>Etudiant residanat </h6>
                      </Link>
                      <span>"24 Course"</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>List des Faculte</Modal.Title>
          </Modal.Header>
          <div className="container">
            <div className="section-wrapper">
              <div className="row g-4 justify-content-center row-cols-xl-2 row-cols-lg-3 row-cols-sm-2 row-cols-1">
                <div className="col">
                  <div className=" text-center">
                    <div className="category-inner">
                      <div
                        className="category-thumb mt-2"
                        style={{
                          position: "relative",
                        }}
                      >
                        <img
                          style={{
                            borderRadius: "0.5rem",
                            filter: "brightness(50%)",
                            width: "200px",
                          }}
                          src="https://www.medecinesousse.com/useruploads/articles_thumbs/315483186280_03_30_28.jpg"
                          alt="category rajibraj91 rajibraj"
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: "38%",
                            top: "38%",
                          }}
                          className="category-content"
                        >
                          <Dropdowns title={cardTitle[0]} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className=" text-center">
                    <div className="category-inner">
                      <div className="category-thumb">
                        <img
                          src="https://www.ecoles.com.tn/sites/default/files/universite/logo/xfms-logo_0.jpg.pagespeed.ic.XLJLk9sZz-.jpg"
                          alt="category rajibraj91 rajibraj"
                        />
                      </div>
                      <div className="category-content">
                        <Dropdowns title={cardTitle[1]} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-wrapper">
              <div className="row g-4 justify-content-center row-cols-xl-2 row-cols-lg-3 row-cols-sm-2 row-cols-1">
                <div className="col">
                  <div className=" text-center">
                    <div className="category-inner">
                      <div className="category-thumb">
                        <img
                          src="data:image/jpeg;base64,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"
                          alt="category rajibraj91 rajibraj"
                        />
                      </div>
                      <div className="category-content">
                        <Dropdowns title={cardTitle[2]} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className=" text-center">
                    <div className="category-inner">
                      <div className="category-thumb">
                        <img
                          src="https://www.ecoles.com.tn/sites/default/files/universite/logo/faculte-de-medecine-de-monastir-logo.jpg"
                          alt="category rajibraj91 rajibraj"
                        />
                      </div>
                      <div className="category-content">
                        <Dropdowns title={cardTitle[3]} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Services;
