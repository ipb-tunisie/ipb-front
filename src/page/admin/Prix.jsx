import React from "react";
import PrixMain from "../../component/admin/Prix";
import AdminLayout from "../../component/layout/AdminLayout";
import Navbars from "../../component/admin/Navbars";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Prix({ name }) {
  return (
    <AdminLayout>
      <React.Fragment>
        <div>
          <Navbars />
          <ToastContainer />
          <PrixMain />
        </div>
      </React.Fragment>
    </AdminLayout>
  );
}

export default Prix;
