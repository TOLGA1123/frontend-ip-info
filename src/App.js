import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/addIp" element={<PrivateRoute><AddIp /></PrivateRoute>} />
            <Route exact path="/viewIp/:id" element={<PrivateRoute><ViewIp /></PrivateRoute>} />
            <Route exact path="/editIp/:id" element={<PrivateRoute><EditIp /></PrivateRoute>} />
            {/* Add more routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
