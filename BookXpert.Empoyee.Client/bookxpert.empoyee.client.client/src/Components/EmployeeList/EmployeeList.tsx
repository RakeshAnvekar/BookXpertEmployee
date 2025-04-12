import React, { useEffect, useState } from "react";
import IEmployee from "../../Models/IEmployee";
import { IState } from "../../Models/IState";
import IocHelper from "../../Helper/IocHelper";
import "./EmployeeList.css"

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
  const [states, setStates] = useState<IState[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const pageSize = 5;


  const iocHelper = new IocHelper();
  const employeeRepo = iocHelper.getEmployeeRepository();
  const stateRepo = iocHelper.getStateRepository();

  useEffect(() => {
    loadEmployees();
    loadStates();
  }, [page]);

  const loadStates = async () => {
    const result = await stateRepo.getAllStates();
    if (result) setStates(result);
  };

  const loadEmployees = async () => {
    const result = await employeeRepo.getPagedEmployees(page, pageSize);
    if (result) setEmployees(result.data);
  };

  const handleSearch = async () => {
    if (!searchTerm) return loadEmployees();
    const result = await employeeRepo.searchEmployees(searchTerm);
    if (result) setEmployees(result);
  };

  const openEdit = (emp: IEmployee) => {
    setSelectedEmployee({ ...emp });
  };

  const handleUpdate = async () => {
    if (selectedEmployee && isValidEmployee(selectedEmployee)) {
      const success = await employeeRepo.updateEmployee(selectedEmployee.id!, selectedEmployee);
      if (success) {
        alert("Updated successfully");
        setSelectedEmployee(null);
        loadEmployees();
      }
    } else {
      alert("Please fix validation errors.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure to delete?")) {
      await employeeRepo.deleteEmployee(id);
      loadEmployees();
    }
  };

  const handleMultiDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm("Delete selected employees?")) return;
    await employeeRepo.deleteMultiple(selectedIds);
    setSelectedIds([]);
    loadEmployees();
  };

  const toggleCheckbox = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(employees.map((e) => e.id!));
    }
    setSelectAll(!selectAll);
  };

  const isValidEmployee = (e: IEmployee) =>
    e.name &&
    e.age && e.age > 0 &&
    e.dateOfBirth &&
    e.dateOfJoin &&
    e.salary > 0 &&
    e.gender &&
    e.stateId;

  return (
    <div className="employee-list">
      <h2>Employee List</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleMultiDelete}>Delete Selected</button>

      <table>
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAll} onChange={toggleSelectAll} /></th>
            <th>Name</th>
            <th>DOB</th>
            <th>Age</th>
            <th>DOJ</th>
            <th>Salary</th>
            <th>Gender</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td><input type="checkbox" checked={selectedIds.includes(emp.id!)} onChange={() => toggleCheckbox(emp.id!)} /></td>
              <td onClick={() => openEdit(emp)} style={{ cursor: "pointer", color: "blue" }}>{emp.name}</td>
              <td>{emp.dateOfBirth?.substring(0, 10)}</td>
              <td >{emp.age}</td>
              <td>{emp.dateOfJoin?.substring(0, 10)}</td>
              <td>{emp.salary}</td>
              <td>{emp.gender}</td>
              <td>{states.find(s => s.id === emp.stateId)?.name}</td>
              <td><button onClick={() => handleDelete(emp.id!)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page}</span>
        <button disabled={employees.length < pageSize} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {/* Edit Form Popup */}
      {selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Employee</h3>

            <label>Name</label>
            <input value={selectedEmployee.name} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })} />

            <label>Age</label>
            <input type="number" readOnly={true} value={selectedEmployee.age ?? ""} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, age: parseInt(e.target.value) })} />

            <label>Date of Birth</label>
            <input type="date" value={selectedEmployee.dateOfBirth?.substring(0, 10)} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dateOfBirth: e.target.value })} />

            <label>Date of Joining</label>
            <input type="date" value={selectedEmployee.dateOfJoin?.substring(0, 10)} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dateOfJoin: e.target.value })} />

            <label>Salary</label>
            <input type="number" value={selectedEmployee.salary} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, salary: parseFloat(e.target.value) })} />

            <label>Gender</label>
            <select value={selectedEmployee.gender} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, gender: e.target.value })}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>State</label>
            <select value={selectedEmployee.stateId} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, stateId: parseInt(e.target.value) })}>
              <option value="">Select</option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <div style={{ marginTop: 10 }}>
              <button onClick={handleUpdate} disabled={!isValidEmployee(selectedEmployee)}>Update</button>
              <button onClick={() => setSelectedEmployee(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;