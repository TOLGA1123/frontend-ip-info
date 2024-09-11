import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Registered Users</h2>
      {users.length > 0 ? (
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default AllUsers;
