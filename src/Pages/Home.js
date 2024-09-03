import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
    const [IPs, setIPs] = useState([]);
    const { id } = useParams();
    useEffect(() => {
      loadIPs();
    }, []);
  
    const loadIPs = async () => {
      try {
        const result = await axios.get('http://localhost:8080/info/ip');
        setIPs(result.data);
      } catch (error) {
        console.error("Error loading IPs:", error);
      }
    };
    const deleteIP = async (id) => {
        try {
          await axios.delete(`http://localhost:8080/info/ip/${id}`);    //not ' use `
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
                  <td>
                  <Link to={`/viewIp/${ip.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </td>
                <button
                    className="btn btn-danger mx-1"
                    onClick={() => deleteIP(ip.id)}
                  >
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }