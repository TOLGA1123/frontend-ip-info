import axios from '../util/axios';
import React, { useState, useEffect, useCallback } from "react";
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

  const [hostNames, setHostNames] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  const loadHostNames = async () => {
    try {
      const result = await axios.get('/hostnames');
      setHostNames(result.data);
    } catch (error) {
      console.error("Error loading hostnames:", error);
    }
  };

  const loadStatuses = async () => {
    try {
      const result = await axios.get('/statuses');
      setStatuses(result.data);
    } catch (error) {
      console.error("Error loading statuses:", error);
    }
  };

  useEffect(() => {
    loadIpAddress();
    loadHostNames();
    loadStatuses();
  }, [loadIpAddress]);

  const { ip, hostName, status, location, relatedGroup, operatingSystem } = ipAddress;

  const onInputChange = (e) => {
    setIpAddress({ ...ipAddress, [e.target.name]: e.target.value });
  };

  const handleHostNameChange = (e) => {
    setIpAddress({ ...ipAddress, hostName: e.target.value });
  };

  const handleStatusChange = (e) => {
    setIpAddress({ ...ipAddress, status: e.target.value });
  };

  const validateForm = () => {
    if (!ipAddress.ip) {
      setErrorMessage("IP Address is required");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) return;
      await axios.put(`/info/ip/${id}`, ipAddress);
      setSuccessMessage("IP Address updated successfully!");
      setErrorMessage(null);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("IP Address " + ipAddress.ip + " already exists.");
      } else {
        setErrorMessage("An error occurred while updating the IP address.");
      }
      setSuccessMessage(null);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit IP</h2>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="ip" className="form-label">
                IP Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter IP address"
                name="ip"
                value={ip}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hostName" className="form-label">
                Host Name
              </label>
              <select
                className="form-control"
                name="hostName"
                value={hostName}
                onChange={handleHostNameChange}
              >
                <option value="">Select Host Name</option>
                {hostNames.map((host) => (
                  <option key={host.id} value={host.name}>
                    {host.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                className="form-control"
                name="status"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="">Select Status</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                name="location"
                value={location}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="relatedGroup" className="form-label">
                Related Group
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter related group"
                name="relatedGroup"
                value={relatedGroup}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="operatingSystem" className="form-label">
                Operating System
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter operating system"
                name="operatingSystem"
                value={operatingSystem}
                onChange={onInputChange}
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
