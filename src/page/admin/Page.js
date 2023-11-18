// src/App.js

import React from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import Navbars from "../../component/admin/Navbars";
// import "./App.css";
import Main from "./MainPage";

function Page() {
  return (
    <AdminLayout>
      <React.Fragment>
        <div className="App">
          <Navbars />
          <Main />
        </div>
      </React.Fragment>
    </AdminLayout>
  );
}

export default Page;
