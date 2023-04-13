import React, { useEffect, useState } from "react";
import axios from "axios";
function ManageUsers(props) {
  const [users, setUsers] = useState([]);
  let token = localStorage.getItem("token");
  useEffect(() => {
    let fetchUsers = async () => {
      let res = await axios.get("http://localhost:5000/user/all", {
        headers: { Authorization: token },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <h1 style={{ fontWeight: 600, textAlign: "center" }}>Manage Users</h1>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((item) => {
              return (
                <tr>
                  <th scope="row">{item._id}</th>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
