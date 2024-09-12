import axios from '../util/axios';
import React, { useState, useEffect } from 'react';
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
    MDBTableBody,
} from 'mdb-react-ui-kit';

const OperatingSystems = () => {
    const [operatingSystems, setOperatingSystems] = useState([]);
    const [newOperatingSystem, setNewOperatingSystem] = useState('');

    useEffect(() => {
        loadOperatingSystems();
    }, []);

    const loadOperatingSystems = async () => {
        try {
            const result = await axios.get('/operating-systems');
            setOperatingSystems(result.data);
        } catch (error) {
            console.error('Error loading operating systems:', error);
        }
    };

    const handleAddOperatingSystem = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/operating-systems', { name: newOperatingSystem });
            loadOperatingSystems(); // Refresh the list
            setNewOperatingSystem('');
        } catch (error) {
            console.error('Error adding operating system:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/operating-systems/${id}`);
            loadOperatingSystems(); // Refresh the list
        } catch (error) {
            console.error('Error deleting operating system:', error);
        }
    };

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="8">
                    <MDBCard className="my-5">
                        <MDBCardBody>
                            <MDBCardTitle>Manage Operating Systems</MDBCardTitle>
                            
                            {/* Form to add new operating system */}
                            <MDBCardText>
                                <form onSubmit={handleAddOperatingSystem}>
                                    <MDBInput 
                                        label="New Operating System" 
                                        value={newOperatingSystem}
                                        onChange={(e) => setNewOperatingSystem(e.target.value)}
                                    />
                                    <MDBBtn type="submit" color="success" className="mt-2">
                                        Add Operating System
                                    </MDBBtn>
                                </form>
                            </MDBCardText>
                            
                            {/* Table to view all operating systems */}
                            <MDBCardText>
                                {operatingSystems.length > 0 ? (
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>#</th>
                                                <th>Operating System</th>
                                                <th>Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {operatingSystems.map((os, index) => (
                                                <tr key={os.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{os.name}</td>
                                                    <td>
                                                        <MDBBtn color="danger" onClick={() => handleDelete(os.id)}>
                                                            Delete
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                        </MDBTableBody>
                                    </MDBTable>
                                ) : (
                                    <p>No operating systems found.</p>
                                )}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default OperatingSystems;
