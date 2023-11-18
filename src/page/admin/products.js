import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbars from "../../component/admin/Navbars";
import ProductForm from "../../component/admin/Produits";
import AdminLayout from "../../component/layout/AdminLayout";
function Products({ name }) {
  return (
    <AdminLayout>
      <React.Fragment>
        <div>
          <Navbars />
          <ToastContainer />
          <ProductForm option={name} />
        </div>
      </React.Fragment>
    </AdminLayout>
  );
}

export default Products;
