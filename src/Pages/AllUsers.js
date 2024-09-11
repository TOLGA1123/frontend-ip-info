import React, { useState, useEffect } from "react";
import axios from "../util/axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";

function AllUsers() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
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
              <th style={{ fontWeight: 'bold', fontSize: '24px' }}>#</th>
              <th style={{ fontWeight: 'bold', fontSize: '24px' }}>Username</th>
              <th style={{ fontWeight: 'bold', fontSize: '24px' }}>Role</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                        <MDBBtn color="danger" onClick={() => handleDelete(user.id)}>
                          Delete
                        </MDBBtn>
                      </td>
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
