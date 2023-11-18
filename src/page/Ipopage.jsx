import { Fragment } from "react";

import descImage from "../assets/images/desciption/description.png";
import LeafletMap from "../component/Contact/maps";
import Header from "../component/layout/header";
import Banner from "../component/section/banner";
import Featureservice from "../component/section/feature-service";

import React, { useRef } from "react";
import Footer from "../component/layout/footer";
const subTitle = "À PROPOS DE NOTRE IPB";
const title = "Où peux-tu nous trouver";
const desc =
  "IPB qui assure depuis plus que 25 ans maintenant le service d'impression numérique de différents types de documents du cursus universitaire médical, est le partenaire officiel de l'étudiant qu'il soit externe ou résident des quatre facultés de médecine en Tunisie.\nEn effet que vous soyez étudiant à L'FMT,  FMSO, FMM ou FMS, IPB vous accompagne durant toutes vos années d'études et est constamment disponible pour vous offrir dans les meilleurs conditions et délais les Cours, Évaluations, Résumés, Ecos, Ecosm  .........etc.\n  Lors du passage du concours du résidanat,  IPB assure l'impression  de tout les documents utiles à votre révision.";

const contactList = [
  {
    imgUrl: "assets/images/icon/01.png",
    imgAlt: "contact icon",
    title: "Office Address",
    desc: "Bureau de tunis: 3 rue djdel lakhdher,beb sa3doun, tunis",
    desc2:
      "   Bureau sousse: Immeuble la médicale ibn el jazzar 2éme étage B2 ,rue aziza othmana,sousse",
  },
  {
    imgUrl: "assets/images/icon/02.png",
    imgAlt: "contact icon",
    title: "Phone number",

    desc: "Bureau de tunis: 56 213 903-21 354 344",
    desc2: "Bureau sousse: 21 836 411-24 604 908",
  },
];

const Ipopage = () => {
  const aboutSectionRef = useRef(null);

  const scrollToAboutSection = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Fragment>
      <Header scrollToAboutSection={scrollToAboutSection} />
      <Banner />

      <div
        className="about-section style-3 padding-tb section-bg"
        style={{ padding: "4rem 0 0 0" }}
      >
        <div className="container">
          <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-center">
            <div className="col">
              <div className="about-left">
                <div className="about-thumb">
                  <img src={descImage} alt="about" />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="about-right">
                <div className="section-header">
                  <span className="subtitle">{subTitle}</span>
                  <p>
                    IPB qui assure depuis plus que 25 ans maintenant le service
                    d'impression numérique de différents types de documents du
                    cursus universitaire médical, est le partenaire officiel de
                    l'étudiant qu'il soit externe ou résident des quatre
                    facultés de médecine en Tunisie.{" "}
                  </p>
                  <br />
                  <p>
                    En effet que vous soyez étudiant à L'FMT, FMSO, FMM ou FMS,
                    IPB vous accompagne durant toutes vos années d'études et est
                    constamment disponible pour vous offrir dans les meilleurs
                    conditions et délais les Cours, Évaluations, Résumés, Ecos,
                    Ecosm...
                  </p>
                  <br />
                  <p>
                    Lors du passage du concours du résidanat, IPB assure
                    l'impression de tout les documents utiles à votre révision.
                  </p>
                  <br />
                  <p>
                    Une fois résident IPB continue son engagement, vous
                    garantissant avec la meilleure qualité d'impression, les
                    ouvrages de votre spécialité soient proposés par nos
                    conseillers ou même choisi par vos soins.
                  </p>
                  <br />
                  <p style={{ color: "black", fontSize: "1.3rem" }}>
                    ENSEMBLE, ARPENTONS LE CHEMIN DE LA RÉUSSITE.
                  </p>
                </div>
                <div className="section-wrapper"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="service" style={{ scrollBehavior: "smooth" }}>
        <Featureservice scrollToAboutSection={scrollToAboutSection} />
      </div>

      <div className="map-address-section padding-tb section-bg" id="Contact">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{subTitle}</span>
            <h2 className="title">{title}</h2>
          </div>
          <div className="section-wrapper">
            <div className="row flex-row-reverse">
              <div className="col-xl-4 col-lg-5 col-12">
                <div className="contact-wrapper">
                  {contactList.map((val, i) => (
                    <div className="contact-item" key={i}>
                      <div className="contact-thumb">
                        <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                      </div>
                      <div className="contact-content">
                        <h6 className="title">Où peux-tu nous trouver</h6>
                        <p>{val.desc}</p>
                        <br />
                        <p>{val.desc2}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-12">
                <LeafletMap />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Ipopage;
