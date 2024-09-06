import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if token exists (user is logged in)

  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token && ( // Only show these buttons if the user is logged in
              <>
              <li className="nav-item">
                {}
                <MDBBtn
                  color="info"
                  size="md"
                  className="me-2"
                  onClick={() => navigate("/AddIP")}
                >
                  Add New IP
                </MDBBtn>
              </li>
                <li className="nav-item">
                  <MDBBtn color='danger' onClick={handleLogout} className="ms-2">Logout</MDBBtn>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
