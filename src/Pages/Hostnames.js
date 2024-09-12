import React, { useState, useEffect } from 'react';
import axios from '../util/axios';
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

const HostNames = () => {
    const [hostNames, setHostNames] = useState([]);
    const [newHostName, setNewHostName] = useState('');

    // Fetch hostnames on component mount
    useEffect(() => {
        loadHostNames();
    }, []);

    const loadHostNames = async () => {
        try {
            const response = await axios.get('/hostnames');
            setHostNames(response.data);
        } catch (error) {
            console.error('Error loading hostnames:', error);
        }
    };

    // Add a new hostname
    const handleAddHostName = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/hostnames', { name: newHostName });
            loadHostNames(); // Refresh the list
            setNewHostName(''); // Clear input field
        } catch (error) {
            console.error('Error adding hostname:', error);
        }
    };

    // Delete a hostname
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/hostnames/${id}`);
            loadHostNames(); // Refresh the list
        } catch (error) {
            console.error('Error deleting hostname:', error);
        }
    };

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="8">
                    <MDBCard className="my-5">
                        <MDBCardBody>
                            <MDBCardTitle>Manage Hostnames</MDBCardTitle>
                            
                            {/* Form to add new hostname */}
                            <MDBCardText>
                                <form onSubmit={handleAddHostName}>
                                    <MDBInput 
                                        label="New Hostname" 
                                        value={newHostName}
                                        onChange={(e) => setNewHostName(e.target.value)}
                                    />
                                    <MDBBtn type="submit" color="success" className="mt-2">
                                        Add Hostname
                                    </MDBBtn>
                                </form>
                            </MDBCardText>
                            
                            {/* Table to view all hostnames */}
                            <MDBCardText>
                                {hostNames.length > 0 ? (
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>#</th>
                                                <th>Hostname</th>
                                                <th>Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {hostNames.map((hostName, index) => (
                                                <tr key={hostName.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{hostName.name}</td>
                                                    <td>
                                                        <MDBBtn color="danger" onClick={() => handleDelete(hostName.id)}>
                                                            Delete
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                        </MDBTableBody>
                                    </MDBTable>
                                ) : (
                                    <p>No hostnames found.</p>
                                )}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default HostNames;
