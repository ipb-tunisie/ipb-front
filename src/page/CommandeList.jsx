import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import "../css/commandeList.css";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
const CommandeList = () => {
  const [commande, setCommande] = useState([]);
  const { userData } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get("https://dull-bull-cowboy-hat.cyclic.app/commande")
      .then((response) => {
        const commandeWithMatchingemail = response.data.filter(
          (product) => product.email === userData.email
        );
        setCommande(commandeWithMatchingemail);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="shop-page padding-tb">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="table-responsive">
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commande.length > 0 ? (
                        commande.map((order, orderIndex) => (
                          <tr key={orderIndex}>
                            <td>
                              {order.products.map((product, productIndex) => (
                                <div key={productIndex}>
                                  {product.producttitle}
                                </div>
                              ))}
                            </td>
                            <td>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            {/* <td >{order.status}</td> */}
                            <Badge
                              style={{ marginTop: "1.5rem" }}
                              bg={
                                order.status === "annuler"
                                  ? "danger"
                                  : order.status === "accepter"
                                  ? "success"
                                  : order.status === "en attend"
                                  ? "warning"
                                  : ""
                              }
                            >
                              {order.status}
                            </Badge>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">
                            <h2>Aucune commande disponible</h2>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default CommandeList;
