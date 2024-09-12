import axios from '../util/axios';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddIp() {
  let navigate = useNavigate();

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
  const [locations, setLocations] = useState([]);
  const [relatedGroups, setRelatedGroups] = useState([]);
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  useEffect(() => {
    loadHostNames();
    loadStatuses();
    loadLocations();
    loadRelatedGroups();
    loadOperatingSystems();
  }, []);
  
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

  const loadLocations = async () => {
    try {
      const result = await axios.get('/locations');
      setLocations(result.data);
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  };

  const loadRelatedGroups = async () => {
    try {
      const result = await axios.get('/related-groups');
      setRelatedGroups(result.data);
    } catch (error) {
      console.error("Error loading related groups:", error);
    }
  };

  const loadOperatingSystems = async () => {
    try {
      const result = await axios.get('/operating-systems');
      setOperatingSystems(result.data);
    } catch (error) {
      console.error("Error loading operating systems:", error);
    }
  };

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

  const handleLocationChange = (e) => {
    setIpAddress({ ...ipAddress, location: e.target.value });
  };

  const handleRelatedGroupChange = (e) => {
    setIpAddress({ ...ipAddress, relatedGroup: e.target.value });
  };

  const handleOperatingSystemChange = (e) => {
    setIpAddress({ ...ipAddress, operatingSystem: e.target.value });
  };

  const validateForm = () => {
    if (!ipAddress.ip) {
      setError("IP Address is required");
      return false;
    }
    setError(null);
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) return;
      const response = await axios.post('/info/ip', ipAddress);
      setSuccess("IP Address added successfully!");
      setError(null);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("IP Address already exists.");
      } else {
        setError("An error occurred while adding the IP address.");
      }
      setSuccess(null);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add New IP</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
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
              <select
                className="form-control"
                name="location"
                value={location}
                onChange={handleLocationChange}
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="relatedGroup" className="form-label">
                Related Group
              </label>
              <select
                className="form-control"
                name="relatedGroup"
                value={relatedGroup}
                onChange={handleRelatedGroupChange}
              >
                <option value="">Select Related Group</option>
                {relatedGroups.map((group) => (
                  <option key={group.id} value={group.name}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="operatingSystem" className="form-label">
                Operating System
              </label>
              <select
                className="form-control"
                name="operatingSystem"
                value={operatingSystem}
                onChange={handleOperatingSystemChange}
              >
                <option value="">Select Operating System</option>
                {operatingSystems.map((os) => (
                  <option key={os.id} value={os.name}>
                    {os.name}
                  </option>
                ))}
              </select>
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
