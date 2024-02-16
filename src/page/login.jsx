import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { handleLogin } from "../redux/authentication";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const title = "Login";

const btnText = "Login Now";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLoginAction = async () => {
    try {
      const response = await axios.post(
        "https://api.ipb-tunisie.tn/auth/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        toast.success("Login successful!");
        const data = {
          ...response.data.user,
          ability: null,
          accessToken: response.data.token,
          refreshToken: "",
        };
        dispatch(handleLogin(data));
        if (response.data.user.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
        // Redirect after 2 seconds
        // setTimeout(() => {
        //   ;
        // }, 2000);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };

  return !isAuth ? (
    <Fragment>
      <div className="login-section  section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form className="account-form">
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  placeholder="Email *"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group text-center">
                <button
                  className="d-block lab-btn"
                  type="button"
                  onClick={handleLoginAction}
                >
                  <span>{btnText}</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Don’t Have any Account?{" "}
                <Link to="/signup" style={{ color: "rgb(194, 24, 7)" }}>
                  Sign Up
                </Link>
                <Link
                  to="/"
                  style={{ color: "rgb(194, 24, 7)", paddingTop: "2rem" }}
                >
                  continue without login
                </Link>
              </span>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  ) : userData.role === "admin" ? (
    <Navigate to="/admin" replace />
  ) : (
    <Navigate to="/" replace />
  );
};

export default LoginPage;
