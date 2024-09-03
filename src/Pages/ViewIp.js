import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewIp() {
    const [ipAddress, setIpAddress] = useState({
        ip: "",
        hostName: "",
        status: "",
        location: "",
        relatedGroup: "",
      });

  const { id } = useParams();

  useEffect(() => {
    loadIP();
  }, []);

  const loadIP = async () => {
    const result = await axios.get(`http://localhost:8080/info/ip/${id}`);
    setIpAddress(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">IP Details</h2>

          <div className="card">
            <div className="card-header">
              Details of ip address with id: {ipAddress.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>ip: </b>
                  {ipAddress.ip}
                </li>
                <li className="list-group-item">
                  <b>Host Name: </b>
                  {ipAddress.hostName}
                </li>
                <li className="list-group-item">
                  <b>Status: </b>
                  {ipAddress.status}
                </li>
                <li className="list-group-item">
                  <b>Location:  </b>
                  {ipAddress.location}
                </li>
                <li className="list-group-item">
                  <b>Related Group: </b>
                  {ipAddress.relatedGroup}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}