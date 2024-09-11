import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if token exists (user is logged in)
  const role = localStorage.getItem("role")
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Redirect to the login page
    navigate("/login");
  };

    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to={role === 'ADMIN' ? "/admin" : "/"}>
          {role === 'ADMIN' ? 'Admin Panel' : 'Home'}
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token && role !== 'ADMIN' && (
              <li className="nav-item">
                <MDBBtn
                  color="success"
                  size="md"
                  className="me-2"
                  onClick={() => navigate("/AddIP")}
                  style={{ borderRadius: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                >
                  Add New IP
                </MDBBtn>
              </li>
            )}
            {token && (
              <li className="nav-item">
                <MDBBtn
                  color='danger'
                  onClick={handleLogout}
                  className="ms-2"
                  style={{ borderRadius: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                >
                  Logout
                </MDBBtn>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
