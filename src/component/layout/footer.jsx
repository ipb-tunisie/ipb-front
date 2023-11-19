import { Link } from "react-router-dom";

import logo from "../../assets/images/ipbLogo.png";

const Footer = () => {
  return (
    <div className="news-footer-wrap">
      <footer>
        <div className="footer-bottom style-2">
          <div className="container">
            <div className="section-wrapper">
              <p>
                &copy; 2023{" "}
                <Link to="/" style={{ color: "rgb(194, 24, 7)" }}>
                  IPB
                </Link>{" "}
                Designed by{" "}
                <a
                  style={{ color: "rgb(194, 24, 7)" }}
                  href="https://www.ostrix.tn"
                  target="_blank"
                >
                  OSTRIX
                </a>{" "}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
