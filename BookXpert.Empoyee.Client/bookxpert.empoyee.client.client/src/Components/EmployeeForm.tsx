import "./EmployeeForm.css";
import { useEffect, useState } from "react";
import IEmployee from "../Models/IEmployee";
import { IState } from "../Models/IState";
import IocHelper from "../Helper/IocHelper";

const EmployeePage: React.FC = () => {
  const [employee, setEmployee] = useState<IEmployee>({
    name: "",
    designation: "",
    dateOfBirth: "",
    age: 0,
    dateOfJoin: "",
    salary: 0,
    gender: "",
    stateId: 0,
  });

  const [states, setStates] = useState<IState[]>([]);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const iocHelper = new IocHelper();
  const stateRepository = iocHelper.getStateRepository();
  const employeeRepository = iocHelper.getEmployeeRepository();

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (employee.dateOfBirth) {
      const age = calculateAge(employee.dateOfBirth);
      setEmployee((prev) => ({ ...prev, age }));
    }
  }, [employee.dateOfBirth]);

  const fetchStates = async () => {
    const data = await stateRepository.getAllStates();
    if (data) setStates(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = {
      ...employee,
      [name]: name === "salary" || name === "stateId" ? +value : value,
    };
    setEmployee(updated);
    setValidationErrors((prev) => ({ ...prev, [name]: "" })); // clear individual error
  };

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async () => {
    const errors: { [key: string]: string } = {};

    if (!employee.name) errors.name = "Name is required.";
    if (!employee.dateOfBirth) errors.dateOfBirth = "Date of Birth is required.";
    if (!employee.dateOfJoin) errors.dateOfJoin = "Date of Join is required.";
    if (!employee.salary) errors.salary = "Salary is required.";
    if (!employee.gender) errors.gender = "Gender is required.";
    if (!employee.stateId) errors.stateId = "State is required.";
    if (!employee.designation) errors.designation = "Designation is required.";

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const isDuplicate = await employeeRepository.checkDuplicate(employee.name, employee.id);
    if (isDuplicate) {
      alert("Duplicate employee name.");
      return;
    }

    const success = await employeeRepository.addEmployee(employee);
    if (success) alert("Employee added.");
    handleClear();
  };

  const handleClear = () => {
    setEmployee({
      name: "",
      designation: "",
      dateOfBirth: "",
      age: 0,
      dateOfJoin: "",
      salary: 0,
      gender: "",
      stateId: 0,
    });
    setValidationErrors({});
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="employee-page">
      <h2>Employee Form</h2>
      <form className="employee-form">
        <input
          name="name"
          value={employee.name}
          placeholder="Name"
          onChange={handleChange}
          className={validationErrors.name ? "input-error" : ""}
        />
        {validationErrors.name && <div className="error-text">{validationErrors.name}</div>}

        <input
          name="designation"
          value={employee.designation}
          placeholder="Designation"
          onChange={handleChange}
          className={validationErrors.designation ? "input-error" : ""}
        />
         {validationErrors.designation && <div className="error-text">{validationErrors.designation}</div>}

        <input
          name="dateOfBirth"
          type="date"
          value={employee.dateOfBirth}
          onChange={handleChange}
          max={todayStr}
          className={validationErrors.dateOfBirth ? "input-error" : ""}
        />
        {validationErrors.dateOfBirth && <div className="error-text">{validationErrors.dateOfBirth}</div>}

       {employee.dateOfBirth && <label>Age: {employee.age}</label> } 

        <input
          name="dateOfJoin"
          type="date"
          value={employee.dateOfJoin}
          onChange={handleChange}
          max={todayStr}
          className={validationErrors.dateOfJoin ? "input-error" : ""}
        />
        {validationErrors.dateOfJoin && <div className="error-text">{validationErrors.dateOfJoin}</div>}

        <input
          name="salary"
          type="number"
          value={employee.salary}
          placeholder="Salary"
          onChange={handleChange}
          className={validationErrors.salary ? "input-error" : ""}
        />
        {validationErrors.salary && <div className="error-text">{validationErrors.salary}</div>}

        <select
          name="gender"
          value={employee.gender}
          onChange={handleChange}
          className={validationErrors.gender ? "input-error" : ""}
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        {validationErrors.gender && <div className="error-text">{validationErrors.gender}</div>}

        <select className={validationErrors.stateId ? "input-error" : ""} name="stateId" value={employee.stateId} onChange={handleChange} >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        {validationErrors.stateId && <div className="error-text">{validationErrors.stateId}</div>}

        <div className="form-actions">
          <button type="button" onClick={handleSubmit}>
            Save
          </button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeePage;
