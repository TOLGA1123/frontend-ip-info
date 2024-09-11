import React, {  } from 'react';
import {Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
} from 'mdb-react-ui-kit';

const AdminPanel = () => {

    return (
        <MDBContainer>
        <MDBRow className="justify-content-center">
            <MDBCol md="8">
                <MDBCard className="my-5">
                    <MDBCardBody>
                        <MDBCardTitle>Admin Panel</MDBCardTitle>
                        <MDBCardText>
                            <Link to="/register">
                                <MDBBtn color="primary">
                                    Create New User
                                </MDBBtn>
                            </Link>
                        </MDBCardText>

                        <Link to="/all-users">
                                <MDBBtn color="info" className="ms-2">
                                    View All Users
                                </MDBBtn>
                            </Link>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
    );
};

export default AdminPanel;