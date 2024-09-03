import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddIp() {
  let navigate = useNavigate();

  const [ipAddress, setIpAddress] = useState({
    ip: "",
    hostName: "",
    status: "",
    location: "",
    relatedGroup: "",
  });

  const { ip, hostName, status, location, relatedGroup } = ipAddress;

  const onInputChange = (e) => {
    setIpAddress({ ...ipAddress, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/info/ip", ipAddress);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add New IP</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                IP Adresi
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter ip address"
                name="ip"
                value={ip}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hostName" className="form-label">
                Sunucu Adı
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter host name"
                name="hostName"
                value={hostName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Durumu
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter status"
                name="status"
                value={status}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Location" className="form-label">
                Konumu
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter status"
                name="location"
                value={location}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="relatedGroup" className="form-label">
                İlgilenen Grup
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter status"
                name="relatedGroup"
                value={relatedGroup}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}