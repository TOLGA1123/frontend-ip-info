import React, { useState, useEffect } from 'react';
import axios from '../util/axios'; // Adjust the import path as necessary
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBInput,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody
} from 'mdb-react-ui-kit';

const Statuses = () => {
    const [statuses, setStatuses] = useState([]);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const result = await axios.get('/statuses');
                setStatuses(result.data);
            } catch (error) {
                console.error('Error fetching statuses:', error);
            }
        };

        fetchStatuses();
    }, []);

    const handleAddStatus = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/statuses', { name: newStatus });
            setNewStatus('');
            const result = await axios.get('/statuses');
            setStatuses(result.data);
        } catch (error) {
            console.error('Error adding status:', error);
        }
    };

    const handleDeleteStatus = async (id) => {
        try {
            await axios.delete(`/statuses/${id}`);
            const result = await axios.get('/statuses');
            setStatuses(result.data);
        } catch (error) {
            console.error('Error deleting status:', error);
        }
    };

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="8">
                    <MDBCard className="my-5">
                        <MDBCardBody>
                            <MDBCardTitle>Manage Statuses</MDBCardTitle>
                            
                            {/* Form to add new status */}
                            <MDBCardText>
                                <form onSubmit={handleAddStatus}>
                                    <MDBInput 
                                        label="New Status" 
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                    />
                                    <MDBBtn type="submit" color="success" className="mt-2">
                                        Add Status
                                    </MDBBtn>
                                </form>
                            </MDBCardText>
                            
                            {/* Table to view all statuses */}
                            <MDBCardText>
                                {statuses.length > 0 ? (
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>#</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {statuses.map((status, index) => (
                                                <tr key={status.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{status.name}</td>
                                                    <td>
                                                        <MDBBtn color="danger" onClick={() => handleDeleteStatus(status.id)}>
                                                            Delete
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                        </MDBTableBody>
                                    </MDBTable>
                                ) : (
                                    <p>No statuses found.</p>
                                )}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Statuses;
