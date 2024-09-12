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

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [newLocation, setNewLocation] = useState('');

    useEffect(() => {
        loadLocations();
    }, []);

    const loadLocations = async () => {
        try {
            const result = await axios.get('/locations');
            setLocations(result.data);
        } catch (error) {
            console.error('Error loading locations:', error);
        }
    };

    const handleAddLocation = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/locations', { name: newLocation });
            loadLocations(); // Refresh the list
            setNewLocation('');
        } catch (error) {
            console.error('Error adding location:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/locations/${id}`);
            loadLocations(); // Refresh the list
        } catch (error) {
            console.error('Error deleting location:', error);
        }
    };

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="8">
                    <MDBCard className="my-5">
                        <MDBCardBody>
                            <MDBCardTitle>Manage Locations</MDBCardTitle>
                            
                            {/* Form to add new location */}
                            <MDBCardText>
                                <form onSubmit={handleAddLocation}>
                                    <MDBInput 
                                        label="New Location" 
                                        value={newLocation}
                                        onChange={(e) => setNewLocation(e.target.value)}
                                    />
                                    <MDBBtn type="submit" color="success" className="mt-2">
                                        Add Location
                                    </MDBBtn>
                                </form>
                            </MDBCardText>
                            
                            {/* Table to view all locations */}
                            <MDBCardText>
                                {locations.length > 0 ? (
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>#</th>
                                                <th>Location</th>
                                                <th>Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {locations.map((location, index) => (
                                                <tr key={location.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{location.name}</td>
                                                    <td>
                                                        <MDBBtn color="danger" onClick={() => handleDelete(location.id)}>
                                                            Delete
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                        </MDBTableBody>
                                    </MDBTable>
                                ) : (
                                    <p>No locations found.</p>
                                )}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Locations;
