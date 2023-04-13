import React from "react";

function Admin(props) {
  let login = localStorage.getItem("login");
  let role = localStorage.getItem("role");
  return login && role == 1 ? (
    <div>
      <h1>Profile Admin</h1>
    </div>
  ) : (
    <div>Have no access</div>
  );
}

export default Admin;
