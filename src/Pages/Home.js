import React, { useEffect, useState } from "react";
import axios from '../util/axios';
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  //MDBIcon,
  //MDBCheckbox
} from 'mdb-react-ui-kit';
export default function Home() {
    const [IPs, setIPs] = useState([]);
    //const { id } = useParams();
    useEffect(() => {
      loadIPs();
    }, []);
  
    const loadIPs = async () => {
      try {
        const result = await axios.get('/info/ip');
        setIPs(result.data);
      } catch (error) {
        console.error("Error loading IPs:", error);
      }
    };
    const deleteIP = async (id) => {
        try {
          await axios.delete(`/info/ip/${id}`);    //not ' use `
          loadIPs();
        } catch (error) {
          console.error("Error deleting IP:", error);
        }
      };
      return (
        <MDBContainer fluid>
            <MDBRow className="my-4">
                <MDBCol md="12">
                    <h1 className="text-center mb-4">IP Addresses</h1>
                    <MDBTable striped bordered hover>
                        <MDBTableHead>
                            <tr style={{ fontSize: '1.3rem', fontFamily: 'Arial, sans-serif', fontWeight: '900' }}>
                                <th>IP Adresi</th>
                                <th>Sunucu İsmi</th>
                                <th>Sunucu Durumu</th>
                                <th>Sunucu Konumu</th>
                                <th>İlgilenen Grup</th>
                                <th>İşletim Sistemi</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {IPs.map((ip) => (
                                <tr 
                                key={ip.id}
                                style={{ fontSize: '1.0rem', fontFamily: 'Arial, sans-serif', fontWeight: '500' }}>
                                    <td>{ip.ip}</td>
                                    <td>{ip.hostName}</td>
                                    <td>{ip.status}</td>
                                    <td>{ip.location}</td>
                                    <td>{ip.relatedGroup}</td>
                                    <td>{ip.operatingSystem}</td>
                                    <td>
                                        <Link to={`/viewIp/${ip.id}`} className="btn btn-info btn-md me-1">
                                            View
                                        </Link>
                                        <Link to={`/editIp/${ip.id}`} className="btn btn-warning btn-md me-1">
                                            Edit
                                        </Link>
                                        <MDBBtn 
                                            color="danger" 
                                            size="md"
                                            onClick={() => deleteIP(ip.id)}
                                        >
                                            Delete
                                        </MDBBtn>
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}