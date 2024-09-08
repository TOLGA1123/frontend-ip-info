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
  const [errorMessage, setErrorMessage] = useState(null);
  const onInputChange = (e) => {
    setIpAddress({ ...ipAddress, [e.target.name]: e.target.value });
  };

  const loadIpAddress = useCallback(async () => {
    try {
        const result = await axios.get(`/info/ip/${id}`);
        setIpAddress(result.data);
        setErrorMessage(null);
    } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrorMessage("IP Address with the id " + id + " not found");
        } else {
          console.error("Error loading IP address:", error);
        }
    }
}, [id]);

  useEffect(() => {
    loadIpAddress();
  }, [loadIpAddress]);

  const validateForm = () => {
    if (!ipAddress.ip) {
      setErrorMessage("IP Address is required");
      return false;
    }
    // Add more validation if needed
    setErrorMessage(null);
    return true;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) return;
      await axios.put(`/info/ip/${id}`, ipAddress);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("IP address "+ ip +" already exists. Please use a different IP.");
      } else {
        console.error("Error updating IP address:", error);
        setErrorMessage("An error occurred while updating the IP address.");
      }
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          {errorMessage ? (
            <>
              {/* Display error message and Back to Home button */}
              <div className="text-center">
                <h2 className="text-danger">{errorMessage}</h2>
                <Link className="btn btn-outline-primary mt-3" to="/">
                  Back to Home
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Render form when no error */}
              <h2 className="text-center m-4">Edit IP</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">IP</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter IP address"
                    name="ip"
                    value={ipAddress.ip}
                    onChange={(e) => setIpAddress({ ...ipAddress, ip: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">Sunucu Adı</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter host name"
                    name="hostName"
                    value={ipAddress.hostName}
                    onChange={(e) => setIpAddress({ ...ipAddress, hostName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">Durumu</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter status"
                    name="status"
                    value={ipAddress.status}
                    onChange={(e) => setIpAddress({ ...ipAddress, status: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">Konumu</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                    name="location"
                    value={ipAddress.location}
                    onChange={(e) => setIpAddress({ ...ipAddress, location: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">İlgilenen Grup</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter related group"
                    name="relatedGroup"
                    value={ipAddress.relatedGroup}
                    onChange={(e) => setIpAddress({ ...ipAddress, relatedGroup: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">İşletim Sistemi</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter operating system"
                    name="operatingSystem"
                    value={ipAddress.operatingSystem}
                    onChange={(e) => setIpAddress({ ...ipAddress, operatingSystem: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-outline-primary">
                  Submit
                </button>
                <Link className="btn btn-outline-danger mx-2" to="/">
                  Cancel
                </Link>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}