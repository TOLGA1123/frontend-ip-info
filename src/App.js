import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
function App() {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={userRole === 'ADMIN' ? (<Register />) : (<Navigate to="/login" />)} />
            <Route exact path="/addIp" element={<PrivateRoute><AddIp /></PrivateRoute>} />
            <Route exact path="/viewIp/:id" element={<PrivateRoute><ViewIp /></PrivateRoute>} />
            <Route exact path="/editIp/:id" element={<PrivateRoute><EditIp /></PrivateRoute>} />
            <Route path="/admin" element={userRole === 'ADMIN' ? ( <AdminPanel />) : (<Navigate to="/login" />)}/>
            <Route path="/all-users" element={<PrivateRoute><AllUsers /></PrivateRoute>} />
            {/* Add more routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
