import React from "react";

function User(props) {
  let login = localStorage.getItem("login");
  return login ? (
    <div>
      <h1>Profile User</h1>
    </div>
  ) : (
    <div>Have no access</div>
  );
}

export default User;
