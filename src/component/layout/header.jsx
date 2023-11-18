import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/images/ipbLogo.png";

const Header = (scrollToAboutSection) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [headerFiexd, setHeaderFiexd] = useState(false);
  const { isAuth, userData } = useSelector((state) => state.auth);
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
    <header
      className={`header-section style-2 ${
        headerFiexd ? "header-fixed fadeInUp" : ""
      }`}
    >
      <div className="header-bottom">
        <div className="header-wrapper">
          <div className="logo-search-acte">
            <div className="logo">
              <Link to="/">
                <img src={logo} width={"75px"} alt="logo" />
              </Link>
            </div>
            <div className="cate-search d-none d-xxl-block"></div>
          </div>
          <div className="menu-area">
            <div className="menu">
              <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                <li className="menu-item">
                  <a
                    href="/"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-bs-offset="0,0"
                  >
                    Accueil
                  </a>
                </li>

                <li className="menu-item">
                  <a
                    href="/#service"
                    onClick={handleServiceClick}
                    role="button"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    Service
                  </a>
                </li>

                <li>
                  <a
                    href="/#Contact"
                    onClick={handleServiceClick}
                    role="button"
                  >
                    à propos
                  </a>
                </li>
                {isAuth ? (
                  userData.role === "admin" ? (
                    <li>
                      <a
                        href="/admin"
                        onClick={handleServiceClick}
                        role="button"
                        style={{ display: "block", textAlign: "center" }}
                      >
                        {/* {userData.fullName} */}
                        <span style={{ display: "block", fontSize: "15px" }}>
                          Espace admin
                        </span>
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a
                        href="/profile"
                        onClick={handleServiceClick}
                        role="button"
                        style={{ display: "block", textAlign: "center" }}
                      >
                        {userData.fullName}
                        <span style={{ display: "block", fontSize: "10px" }}>
                          commande
                        </span>
                      </a>
                    </li>
                  )
                ) : (
                  <li>
                    <a href="/Login" onClick={handleServiceClick} role="button">
                      Login
                    </a>
                  </li>
                )}

                <li className="menu-item">
                  <a
                    href="/cart"
                    onClick={handleServiceClick}
                    role="button"
                    style={{
                      scrollBehavior: "smooth",
                      backgroundColor: "#C21807",
                      borderRadius: "40px",
                      color: "white",
                    }}
                  >
                    Panier
                  </a>
                </li>
              </ul>
            </div>

            <div
              className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              onClick={() => setMenuToggle(!menuToggle)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
