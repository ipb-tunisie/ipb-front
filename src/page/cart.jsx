import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import axios from "axios";
import { useCart } from "react-use-cart";
import image from "../assets/images/cart/a1.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../component/layout/footer";
import { useSelector } from "react-redux";
const conTitle = "prier de remplir la form pour confirmer votre commande";

const Cart = () => {
  const { isAuth, userData } = useSelector((state) => state.auth);
  const sendOrderDataToServer = () => {
    const orderData = {
      firstName: name,

      tel: number,
      email: email,
      adress: subject,
      status: "en attend",
      products: parsedCartItems.map((item) => ({
        quantity: item.quantity,
        producttitle: item.title,
      })),
    };
    axios
      .post("http://102.211.210.62/commande/add", orderData)
      .then((response) => {
        console.log("Order data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending order data:", error);
      });
  };
  const { items, removeItem, updateItemQuantity, emptyCart, isEmpty } =
    useCart();
  const checkRequiredFields = () => {
    if (isAuth) {
      // If user is logged in, check only number and subject
      return number && subject;
    } else {
      // If user is not logged in, check all fields
      return name && email && number && subject;
    }
  };
  const parsedCartItems = items;
  console.log(parsedCartItems);
  const calculateTotal = () => {
    let total = 0;

    if (parsedCartItems) {
      for (let i = 0; i < parsedCartItems.length; i++) {
        total += parseFloat(
          parsedCartItems[i].price * parsedCartItems[i].quantity
        );
      }
    }

    return total.toFixed(0);
  };
  //emailsender

  const [name, setName] = useState(isAuth ? userData.fullName : "");
  const [email, setEmail] = useState(isAuth ? userData.email : "");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  //emailsender
  const handleConfirmation = () => {
    const itemNames = parsedCartItems.map((item) => item.title).join(", ");
    const itemQuantity = parsedCartItems
      .map((item) => item.quantity)
      .join(", ");
    const totalPrice = (parseFloat(calculateTotal()) + 7).toFixed(2);
    const templateParams = {
      from_name: email,
      to_name: "ipb19321@gmail.com",
      name: name,
      number: number,
      subject: subject,
      produit: itemNames,
      quantity: itemQuantity,
      totalprice: totalPrice,
      message: text,
    };

    const emailSendingPromise = new Promise((resolve, reject) => {
      emailjs
        .send(
          "ipb19321@gmail.com",
          "template_ipb",
          templateParams,
          "hlHn5NgUKHZUSlsxw"
        )
        .then((response) => {
          console.log("Email sent successfully!", response);
          if (response.status === 200) {
            resolve();
          } else {
            reject();
          }
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          reject();
        });
    });

    toast.promise(emailSendingPromise, {
      pending: "Envoi email en cours...",
      success: "Commande confirmée et email envoyé !",
      error: "Commande non confirmée. Veuillez réessayer plus tard.",
    });

    emailSendingPromise
      .then(() => {
        setTimeout(() => {
          emptyCart();
          window.location.replace("/");
        }, 2000);
      })
      .catch(() => {});
  };

  if (isEmpty)
    return (
      <div>
        <Header />

        <h2 style={{ textAlign: "center", paddingTop: "10rem" }}>
          Il n'y a plus d'articles dans votre panier
        </h2>
        <img
          alt="emty cart"
          style={{
            width: "50%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "auto",
          }}
          src={image}
        />
      </div>
    );

  return (
    <Fragment>
      <Header />
      <PageHeader title={"Panier"} curPage={"Panier"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {parsedCartItems === null || parsedCartItems.length === 0 ? (
              <h2 style={{ padding: "0 0 0 25rem" }}>Pannier vide</h2>
            ) : (
              <div className="cart-top">
                <table>
                  <thead>
                    <tr>
                      <th className="cat-product">Produit</th>
                      <th className="cat-price">Prix</th>
                      <th className="cat-quantity">Quantité</th>
                      <th className="cat-toprice">Total</th>
                      <th className="cat-edit">Modifier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedCartItems &&
                      parsedCartItems.map((val, i) => (
                        <tr key={i}>
                          <td className="product-item cat-product">
                            <div className="p-thumb">
                              <Link to="/shop-single">
                                <img
                                  src={`${val.imgUrl}`}
                                  alt={`${val.imgAlt}`}
                                />
                              </Link>
                            </div>
                            <div className="p-content">
                              <Link to="/shop-single">{val.title}</Link>
                            </div>
                          </td>
                          <td className="cat-price">{val.price}DT</td>
                          <td className="cat-quantity">
                            <div
                              className="cart-plus-minus"
                              style={{ width: "85px" }}
                            >
                              <button
                                disabled={val.quantity === 1}
                                onClick={() => {
                                  updateItemQuantity(val.id, val.quantity - 1);
                                }}
                              >
                                -
                              </button>

                              <button
                                onClick={() => {
                                  if (val.quantity < val.total_quantity) {
                                    updateItemQuantity(
                                      val.id,
                                      val.quantity + 1
                                    );
                                  }
                                }}
                              >
                                +
                              </button>
                              <span style={{ marginLeft: "2rem" }}>
                                {" "}
                                {val.quantity}
                              </span>
                            </div>
                          </td>
                          <td className="cat-toprice">
                            {val.price * val.quantity}
                            DT
                          </td>
                          <td className="cat-edit">
                            <a onClick={() => removeItem(val.id)}>
                              <img
                                src="assets/images/shop/del.png"
                                alt="Remove Thumb"
                              />
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="cart-bottom">
              <div className="shiping-box">
                <div className="row">
                  <div className="col-md-6 col-12"></div>
                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>Totaux du panier</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">
                            Sous-total du panier
                          </span>
                          <p className="pull-right">{calculateTotal()}Dt</p>
                        </li>
                        <li>
                          <span className="pull-left">frais de livraison</span>
                          <p className="pull-right">7Dt</p>
                        </li>
                        <li>
                          <span className="pull-left">
                            Total de la commande
                          </span>
                          <p className="pull-right">
                            {(parseFloat(calculateTotal()) + 7).toFixed(2)}Dt
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section padding-tb">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="title">{conTitle}</h2>
          </div>
          <div className="section-wrapper">
            <form className="contact-form">
              {isAuth ? (
                <>
                  {/* If user is logged in, use userData for name and email */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="NOM *"
                      value={userData.fullName}
                      readOnly
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email *"
                      value={userData.email}
                      readOnly
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* If user is not logged in, show regular name and email inputs */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="NOM *"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email *"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>
                </>
              )}
              <div className="form-group">
                <input
                  type="text"
                  name="number"
                  placeholder="
                  Numéro de portable *"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Adresse *"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="form-group w-100 text-center">
                <button
                  type="button"
                  className="lab-btn"
                  onClick={() => {
                    const isValid = checkRequiredFields();
                    if (isValid) {
                      handleConfirmation();
                      sendOrderDataToServer();
                    } else {
                      console.log("fill form");
                    }
                  }}
                >
                  <span>Confirm order</span>
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Cart;
