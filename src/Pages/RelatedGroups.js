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

const RelatedGroups = () => {
    const [relatedGroups, setRelatedGroups] = useState([]);
    const [newRelatedGroup, setNewRelatedGroup] = useState('');

    useEffect(() => {
        loadRelatedGroups();
    }, []);

    const loadRelatedGroups = async () => {
        try {
            const result = await axios.get('/related-groups');
            setRelatedGroups(result.data);
        } catch (error) {
            console.error('Error loading related groups:', error);
        }
    };

    const handleAddRelatedGroup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/related-groups', { name: newRelatedGroup });
            loadRelatedGroups(); // Refresh the list
            setNewRelatedGroup('');
        } catch (error) {
            console.error('Error adding related group:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/related-groups/${id}`);
            loadRelatedGroups(); // Refresh the list
        } catch (error) {
            console.error('Error deleting related group:', error);
        }
    };

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center">
                <MDBCol md="8">
                    <MDBCard className="my-5">
                        <MDBCardBody>
                            <MDBCardTitle>Manage Related Groups</MDBCardTitle>
                            
                            {/* Form to add new related group */}
                            <MDBCardText>
                                <form onSubmit={handleAddRelatedGroup}>
                                    <MDBInput 
                                        label="New Related Group" 
                                        value={newRelatedGroup}
                                        onChange={(e) => setNewRelatedGroup(e.target.value)}
                                    />
                                    <MDBBtn type="submit" color="success" className="mt-2">
                                        Add Related Group
                                    </MDBBtn>
                                </form>
                            </MDBCardText>
                            
                            {/* Table to view all related groups */}
                            <MDBCardText>
                                {relatedGroups.length > 0 ? (
                                    <MDBTable>
                                        <MDBTableHead>
                                            <tr>
                                                <th>#</th>
                                                <th>Related Group</th>
                                                <th>Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {relatedGroups.map((group, index) => (
                                                <tr key={group.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{group.name}</td>
                                                    <td>
                                                        <MDBBtn color="danger" onClick={() => handleDelete(group.id)}>
                                                            Delete
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                        </MDBTableBody>
                                    </MDBTable>
                                ) : (
                                    <p>No related groups found.</p>
                                )}
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default RelatedGroups;
