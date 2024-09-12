import React from 'react';
import { Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
} from 'mdb-react-ui-kit';

const AdminPanel = () => {
    return (
        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="8">
                    <MDBCard className="my-5">
                        <MDBCardBody>
                            <MDBCardTitle>Admin Panel</MDBCardTitle>

                            {/* Button Layout */}
                            <MDBRow>
                                {/* Row 1 */}
                                <MDBCol md="6" className="mb-2">
                                    <Link to="/register">
                                        <MDBBtn color="primary" block>
                                            Create New User
                                        </MDBBtn>
                                    </Link>
                                </MDBCol>
                                <MDBCol md="6" className="mb-2">
                                    <Link to="/manage-hostnames">
                                        <MDBBtn color="success" block>
                                            Manage Hostnames
                                        </MDBBtn>
                                    </Link>
                                </MDBCol>

                                {/* Row 2 */}
                                <MDBCol md="6" className="mb-2">
                                    <Link to="/manage-statuses">
                                        <MDBBtn color="warning" block>
                                            Manage Statuses
                                        </MDBBtn>
                                    </Link>
                                </MDBCol>
                                <MDBCol md="6" className="mb-2">
                                    <Link to="/all-users">
                                        <MDBBtn color="info" block>
                                            View All Users
                                        </MDBBtn>
                                    </Link>
                                </MDBCol>

                                {/* Row 3 */}
                                <MDBCol md="6" className="mb-2">
                                    <Link to="/manage-locations">
                                        <MDBBtn color="primary" block>
                                            Manage Locations
                                        </MDBBtn>
                                    </Link>
                                </MDBCol>
                                <MDBCol md="6" className="mb-2">
                                    <Link to="/manage-related-groups">
                                        <MDBBtn color="dark" block>
                                            Manage Related Groups
                                        </MDBBtn>
                                    </Link>
                                </MDBCol>

                                {/* Row 4 */}
                                <MDBCol md="6" className="mb-2">
                                    <Link to="/manage-operating-systems">
                                        <MDBBtn color="secondary" block>
                                            Manage Operating Systems
                                        </MDBBtn>
                                    </Link>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default AdminPanel;
