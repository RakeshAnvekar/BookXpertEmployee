import React, { useEffect, useState } from "react";


import IEmployee from "../../Models/IEmployee";
import { IState } from "../../Models/IState";
import IocHelper from "../../Helper/IocHelper";

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
  const [states, setStates] = useState<IState[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const pageSize = 5;

  const iocHelper = new IocHelper();
  const employeeRepo = iocHelper.getEmployeeRepository();
  const stateRepo = iocHelper.getStateRepository();

  useEffect(() => {
    loadEmployees();
    loadStates();
  }, [page]);

  useEffect(() => {
    // // Calculate total salary using jQuery
    // const total = employees.reduce((acc, emp) => acc + emp.salary, 0);
    // $("#totalSalary").text(`Total Salary: ₹ ${total}`);
  }, [employees]);

  const loadStates = async () => {
    const result = await stateRepo.getAllStates();
    if (result) setStates(result);
  };

  const loadEmployees = async () => {
    const result = await employeeRepo.getPagedEmployees(page, pageSize);
    if (result) {
      setEmployees(result.data);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) return loadEmployees();
    const result = await employeeRepo.searchEmployees(searchTerm);
    if (result) setEmployees(result);
  };

  const openEdit = (emp: IEmployee) => {
    setSelectedEmployee(emp);
  };

  const handleUpdate = async () => {
    if (selectedEmployee) {
      const isDuplicate = await employeeRepo.checkDuplicate(selectedEmployee.name, selectedEmployee.id);
      if (isDuplicate) {
        alert("Duplicate employee name.");
        return;
      }

      const success = await employeeRepo.updateEmployee(selectedEmployee.id!, selectedEmployee);
      if (success) {
        alert("Updated successfully");
        setSelectedEmployee(null);
        loadEmployees();
      }
    }
  };

  const confirmDelete = (id: number) => {
    setIdToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (idToDelete != null) {
      await employeeRepo.deleteEmployee(idToDelete);
      loadEmployees();
      setShowDeleteDialog(false);
      setIdToDelete(null);
    }
  };

  const handleMultiDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirm = window.confirm("Delete selected employees?");
    if (!confirm) return;
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

  return (
    <div className="employee-list">
      <h2>Employee List</h2>

      <div className="search-actions">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleMultiDelete}>Delete Selected</button>
      </div>

      <table>
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAll} onChange={toggleSelectAll} /></th>
            <th>Name</th>
            <th>Designation</th>
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
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(emp.id!)}
                  onChange={() => toggleCheckbox(emp.id!)}
                />
              </td>
              <td className="editable" onClick={() => openEdit(emp)}>{emp.name}</td>
              <td>{emp.designation}</td>
              <td>{emp.dateOfBirth}</td>
              <td>{emp.age}</td>
              <td>{emp.dateOfJoin}</td>
              <td>{emp.salary}</td>
              <td>{emp.gender}</td>
              <td>{states.find(s => s.id === emp.stateId)?.name}</td>
              <td>
                <button onClick={() => confirmDelete(emp.id!)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={employees.length < pageSize}>Next</button>
      </div>

      <div id="totalSalary" className="salary-bar"></div>

      {/* Edit Dialog */}
      {selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Employee</h3>
            <input value={selectedEmployee.name} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })} />
            <input value={selectedEmployee.designation} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, designation: e.target.value })} />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setSelectedEmployee(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteDialog && (
        <div className="modal">
          <div className="modal-content">
            <h4>Are you sure you want to delete?</h4>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowDeleteDialog(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
