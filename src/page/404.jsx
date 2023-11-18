
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";

const title = "Error 404!";
const desc = "Oups ! La page que vous recherchez est introuvabl";
const btnText = "Retour à l'accueil";

const ErrorPage = () => {
  return (
    <div className="four-zero-section padding-tb section-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="four-zero-content">
              <Link to="/">
                <img
                  src="assets/images/logo/02.png"
                  alt="CodexCoder"
                  style={{ width: "30%" }}
                />
              </Link>
              <h2 className="title">{title}</h2>
              <p>{desc}</p>
              <Link to="/" className="lab-btn">
                <span>
                  {btnText} <i className="icofont-external-link"></i>
                </span>
              </Link>
            </div>
          </div>
          <div className="col-lg-8 col-sm-6 col-12">
            <div className="foue-zero-thumb">
              <img src="assets/images/404.png" alt="CodexCoder" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;