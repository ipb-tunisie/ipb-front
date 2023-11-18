import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbars from "../../component/admin/Navbars";
import AdminLayout from "../../component/layout/AdminLayout";
import "../../css/commande.css";
import Badge from "react-bootstrap/Badge";

import "../../css/qwertz.css";

import Pagination from "react-bootstrap/Pagination";

import { GoIssueClosed, GoXCircle } from "react-icons/go";

function Commande() {
  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [acceptedStatus, setAcceptedStatus] = useState(false);
  useEffect(() => {
    axios
      .get("https://dull-bull-cowboy-hat.cyclic.app/commande")
      .then((response) => {
        console.log(response.data);
        setFormData(response.data);
        // Check if any order has status "accepter"
        const hasAcceptedOrder = response.data.some(
          (order) => order.status === "accepter"
        );
        setAcceptedStatus(hasAcceptedOrder);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleStatusChange = (newStatus, index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].status = newStatus;
    setFormData(updatedFormData);
  };
  const updateStatus = (CommandeId, status) => {
    axios
      .post("https://dull-bull-cowboy-hat.cyclic.app/commande/edit", {
        CommandeId,
        status,
      })
      .then((response) => {
        toast.success("Commande status changer", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const totalItemsPerPage = 5;
  const startIndex = (currentPage - 1) * totalItemsPerPage;
  const endIndex = currentPage * totalItemsPerPage;

  const totalPages = Math.ceil(formData.length / totalItemsPerPage);
  return (
    <AdminLayout>
      <React.Fragment>
        <Navbars />

        <table className="styled-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>E-mail</th>
              <th>Adresse</th>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Statut</th>
              <th>Validation</th>
              {acceptedStatus && <th>envoyé</th>}
            </tr>
          </thead>
          <tbody>
            {formData.slice(startIndex, endIndex).map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.firstName}</td>
                <td>{item.tel}</td>
                <td>{item.email}</td>
                <td>{item.adress}</td>

                <td>
                  {item.products.map((product, productIndex) => (
                    <div key={productIndex}> {product.producttitle}</div>
                  ))}
                </td>
                <td>
                  {item.products.map((product, productIndex) => (
                    <div key={productIndex}> {product.quantity}</div>
                  ))}
                </td>
                <td>
                  <Badge
                    bg={
                      item.status === "annuler"
                        ? "danger"
                        : item.status === "accepter"
                        ? "success"
                        : item.status === "en attend"
                        ? "warning"
                        : ""
                    }
                  >
                    {item.status}
                  </Badge>
                </td>
                <td>
                  <button
                    className="icon-button"
                    disabled={item.status === "accepter" && acceptedStatus}
                  >
                    <GoXCircle
                      style={{ color: "red" }}
                      onClick={() => {
                        handleStatusChange("annuler", index);
                        updateStatus(item._id, "annuler");
                      }}
                    />
                  </button>
                  <button
                    className="icon-button"
                    disabled={item.status === "accepter" && acceptedStatus}
                  >
                    <GoIssueClosed
                      onClick={() => {
                        handleStatusChange("accepter", index);
                        updateStatus(item._id, "accepter");
                      }}
                      style={{ color: "green" }}
                    />
                  </button>
                </td>

                {item.status === "accepter" && acceptedStatus ? (
                  <td>oui</td>
                ) : item.status === "annuler" ? (
                  <td>commande annulée</td>
                ) : (
                  <td>pas encore</td>
                )}
              </tr>
            ))}
          </tbody>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Pagination size="sm">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={endIndex >= formData.length}
              />
            </Pagination>
          </div>
        </table>

        <ToastContainer />
      </React.Fragment>
    </AdminLayout>
  );
}

export default Commande;
