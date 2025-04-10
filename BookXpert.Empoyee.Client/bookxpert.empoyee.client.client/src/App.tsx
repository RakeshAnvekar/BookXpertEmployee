import './App.css';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/EmployeeList/EmployeeList';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



function App() {  

    return (
        <div>
        <h1>BOOKXPERT - Employee Management</h1>
        <Router>
      <nav style={{ padding: "10px", backgroundColor: "#eee" }}>
        <Link to="/" style={{ marginRight: "20px" }}>Create Employee</Link>
        <Link to="/employees">Employee List</Link>
      </nav>

      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </Router>
       
      </div>
    );
   
}

export default App;