import axios from '../util/axios';
import React, { useCallback ,useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditIp() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [ipAddress, setIpAddress] = useState({
    ip: "",
    hostName: "",
    status: "",
    location: "",
    relatedGroup: "",
    operatingSystem: "",
  });

  const { ip, hostName, status, location, relatedGroup, operatingSystem } = ipAddress;

  const onInputChange = (e) => {
    setIpAddress({ ...ipAddress, [e.target.name]: e.target.value });
  };

  const loadIpAddress = useCallback(async () => {
    try {
        const result = await axios.get(`/info/ip/${id}`);
        setIpAddress(result.data);
    } catch (error) {
        console.error("Error loading IP address:", error);
    }
}, [id]);

  useEffect(() => {
    loadIpAddress();
  }, [loadIpAddress]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/info/ip/${id}`, ipAddress);
    navigate("/");
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit IP</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                IP
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
              <label htmlFor="Name" className="form-label">
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
              <label htmlFor="Name" className="form-label">
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
              <label htmlFor="Name" className="form-label">
                Konumu
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter location"
                name="location"
                value={location}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                İlgilenen Grup
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter related group"
                name="relatedGroup"
                value={relatedGroup}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                İşletim Sistemi
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter operating system"
                name="operatingSystem"
                value={operatingSystem}
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