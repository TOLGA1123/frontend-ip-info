import React, { useEffect, useState } from "react";
import axios from '../util/axios';
import { Link } from "react-router-dom";

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
        <div className="container">
        <div className="py-4">
          <h1>IP Addresses</h1>
          <table className="table">
            <thead>
              <tr>
                <th>IP Adresi</th>
                <th>Sunucu Adı</th>
                <th>Durumu</th>
                <th>Konumu</th>
                <th>İlgilenen Grup</th>
                <th>İşletim Sistemi</th>
              </tr>
            </thead>
            <tbody>
              {IPs.map((ip) => (
                <tr key={ip.id}>
                  <td>{ip.ip}</td>
                  <td>{ip.hostName}</td>
                  <td>{ip.status}</td>
                  <td>{ip.location}</td>
                  <td>{ip.relatedGroup}</td>
                  <td>{ip.operatingSystem}</td>
                  <td>
                  <Link to={`/viewIp/${ip.id}`} className="btn btn-primary btn-sm me-1">
                    View Details
                  </Link>
                </td>
                <td>
                  <Link to={`/editIp/${ip.id}`} className="btn btn-primary btn-sm me-1">
                    Edit IP
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-lg me-1"
                    onClick={() => deleteIP(ip.id)}
                  >
                    Delete
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }