import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";

import EyeIcon from "../../src/assets/images/eye-solid.svg";

const title = "S'inscrire maintenant";
const socialTitle = "Inscription avec les médias sociaux";
const btnText = "Commencer maintenant";

const SignupPage = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(
        "Le mot de passe et la confirmation du mot de passe ne correspondent pas. Veuillez vérifier."
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://api.ipb-tunisie.tn/auth/register",
        {
          fullName,
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Registration successful
        toast.success("Inscription réussie !");

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        // Registration failed
        toast.error(`Échec de l'inscription: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);

      if (error.response && error.response.status === 400) {
        toast.error(
          "Erreur de validation. Veuillez vérifier vos informations."
        );
      } else {
        toast.error(
          "Une erreur inattendue s'est produite. Veuillez réessayer plus tard."
        );
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Fragment>
      <div className="login-section section-bg">
        <div className="container">
          <div className="account-wrapper" style={{ padding: "23px 40px" }}>
            <h3 className="title">{title}</h3>
            <form className="account-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nom d'utilisateur"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src={EyeIcon}
                    alt="Afficher/Masquer le mot de passe"
                    onClick={togglePasswordVisibility}
                    style={{
                      width: "1rem",
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <img
                    src={EyeIcon}
                    alt="Afficher/Masquer le mot de passe"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{
                      width: "1rem",
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <button className="lab-btn" type="submit">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-15">
                Vous êtes déjà membre ?{" "}
                <Link to="/login" style={{ color: "rgb(194, 24, 7)" }}>
                  Connexion
                </Link>
              </span>
              <span className="d-block cate pt-15">
                <Link to="/" style={{ color: "rgb(194, 24, 7)" }}>
                  Continuer sans se connecter
                </Link>
              </span>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default SignupPage;
