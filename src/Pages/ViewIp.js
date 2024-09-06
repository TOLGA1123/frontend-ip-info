import axios from '../util/axios';
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewIp() {
    const [ipAddress, setIpAddress] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const loadIP = useCallback(async () => {
        try {
            const result = await axios.get(`/info/ip/${id}`);
            setIpAddress(result.data);
            setError(null); // Clear any previous errors
        } catch (err) {
            setError("Ip address with the id " + id + " not found");
            setIpAddress(null); // Clear IP address data in case of error
        }
    }, [id]);

    useEffect(() => {
        loadIP();
    }, [loadIP]);

    if (error) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4">Error</h2>
                        <p>{error}</p>
                        <Link className="btn btn-primary my-2" to={"/"}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!ipAddress) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4">Loading...</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">IP Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of IP address with ID: {ipAddress.id}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>IP: </b>{ipAddress.ip}
                            </li>
                            <li className="list-group-item">
                                <b>Host Name: </b>{ipAddress.hostName}
                            </li>
                            <li className="list-group-item">
                                <b>Status: </b>{ipAddress.status}
                            </li>
                            <li className="list-group-item">
                                <b>Location: </b>{ipAddress.location}
                            </li>
                            <li className="list-group-item">
                                <b>Related Group: </b>{ipAddress.relatedGroup}
                            </li>
                            <li className="list-group-item">
                                <b>Operating System: </b>{ipAddress.operatingSystem}
                            </li>
                        </ul>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
