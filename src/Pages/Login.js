import React, { useState } from "react";
import axios from '../util/axios';
import { useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    //MDBIcon,
    //MDBCheckbox
} from 'mdb-react-ui-kit';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/auth/login`, {
        username,
        password,
      });
      console.log("Full response:", response); // Log entire response object
      console.log("Response data:", response.data); // Log response data
      if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/");
      } else {
          console.error("Token not found in response data");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

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

              <MDBBtn size='lg' onClick={handleLogin}>
                Login
              </MDBBtn>

              <hr className="my-4" />


            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
