import React, { useState } from "react";
import axios from '../util/axios';
import { useNavigate } from "react-router-dom";
import logo from '../layout/logo.png'; 
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
} from 'mdb-react-ui-kit';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/signup", {
        username,
        password,
      });
      navigate("/all-users");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Username already exists! Please choose a different one.");
      } else {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
            <div className="text-center mb-4">
                { <img src={logo} alt="Logo" style={{ width: '250px' }} /> }
              </div>
              <h2 className="fw-bold mb-2 text-center">Register</h2>
              <p className="text-white-50 mb-3">Please create your account!</p>

              <MDBInput 
                wrapperClass='mb-4 w-100' 
                label='Username' 
                id='formControlLg' 
                type='text' 
                size="lg" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput 
                wrapperClass='mb-4 w-100' 
                label='Password' 
                id='formControlLg' 
                type='password' 
                size="lg" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn size='lg' onClick={handleRegister}>
                Register
              </MDBBtn>

              <hr className="my-4" />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
