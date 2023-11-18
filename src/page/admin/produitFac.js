import React from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import Navbars from "../../component/admin/Navbars";
import ProductFac from "../../component/admin/ProduitFAC";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function ProduitFac({ name }) {
  return (
    <AdminLayout>
      <React.Fragment>
        <div>
          <Navbars />
          <ToastContainer />
          <ProductFac option={name} />
        </div>
      </React.Fragment>
    </AdminLayout>
  );
}

export default ProduitFac;
