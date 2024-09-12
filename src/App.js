import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Navbar from './layout/Navbar';
import Home from './Pages/Home';
import AddIp from './Pages/AddIp';
import ViewIp from './Pages/ViewIp';
import EditIp from './Pages/EditIp';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PrivateRoute from './util/PrivateRoute';
import AdminPanel from './Pages/AdminPanel';
import AllUsers from './Pages/AllUsers';
import HostNames from './Pages/Hostnames';
import Statuses from './Pages/Statuses';
import OperatingSystems from './Pages/OperatingSystems';
import RelatedGroups from './Pages/RelatedGroups';
import Locations from './Pages/Locations';
function App() {
  //const token = localStorage.getItem('token');
  //const userRole = localStorage.getItem('role');
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setUserRole(role);
    }
    setLoading(false);
  }, []);
   // If loading, don't render anything yet
   if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {/* Home Route*/}
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />

            {/* Login Route - publicly accessible */}
            <Route path="/login" element={<Login />} />

            {/* Register Route - accessible only to admins */}
            <Route path="/register" element={userRole === 'ADMIN' ? <Register /> : <Navigate to="/login" />} />

            {/* Add IP Route*/}
            <Route path="/addIp" element={<PrivateRoute><AddIp /></PrivateRoute>} />

            {/* View IP Route*/}
            <Route path="/viewIp/:id" element={<PrivateRoute><ViewIp /></PrivateRoute>} />

            {/* Edit IP Route*/}
            <Route path="/editIp/:id" element={<PrivateRoute><EditIp /></PrivateRoute>} />

            {/* Admin Panel Route - accessible only to admins */}
            <Route path="/admin" element={userRole === 'ADMIN' ? <AdminPanel /> : <Navigate to="/login" />} />

            {/* All Users Route*/}
            <Route path="/all-users" element={<PrivateRoute><AllUsers /></PrivateRoute>} />

            <Route path="/manage-hostnames" element={userRole === 'ADMIN' ? <HostNames /> : <Navigate to="/login" />} />

            <Route path="/manage-statuses" element={userRole === 'ADMIN' ? <Statuses/> : <Navigate to="/login" />} />
            <Route path="/manage-operating-systems" element={userRole === 'ADMIN' ? <OperatingSystems/> : <Navigate to="/login" />}/>
            <Route path="/manage-related-groups" element={userRole === 'ADMIN' ? <RelatedGroups/> : <Navigate to="/login" />}/>
            <Route path="/manage-locations" element={userRole === 'ADMIN' ? <Locations/> : <Navigate to="/login" />}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
