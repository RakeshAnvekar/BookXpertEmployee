
import IEmployee from "../../Models/IEmployee";
import { IEmployeeRepository } from "./IEmployeeRepository";


const BASE_URL = "https://localhost:7108/api/employees";

export default class EmployeeRepository implements IEmployeeRepository {
  async getPagedEmployees(page: number, pageSize: number): Promise<{ data: IEmployee[]; totalCount: number } | null> {
    try {
      const response = await fetch(`${BASE_URL}/paged?page=${page}&pageSize=${pageSize}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("getPagedEmployees Error:", error);
      return null;
    }
  }

  async getEmployeeById(id: number): Promise<IEmployee | null> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("getEmployeeById Error:", error);
      return null;
    }
  }

  async searchEmployees(name: string): Promise<IEmployee[] | null> {
    try {
      const response = await fetch(`${BASE_URL}/search?name=${encodeURIComponent(name)}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("searchEmployees Error:", error);
      return null;
    }
  }

  async addEmployee(employee: IEmployee): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      return response.ok;
    } catch (error) {
      console.error("addEmployee Error:", error);
      return false;
    }
  }

  async updateEmployee(id: number, employee: IEmployee): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      return response.ok;
    } catch (error) {
      console.error("updateEmployee Error:", error);
      return false;
    }
  }

  async deleteEmployee(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      return response.ok;
    } catch (error) {
      console.error("deleteEmployee Error:", error);
      return false;
    }
  }

  async deleteMultiple(ids: number[]): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/delete-multiple`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ids),
      });
      return response.ok;
    } catch (error) {
      console.error("deleteMultiple Error:", error);
      return false;
    }
  }

  async checkDuplicate(name: string, idToExclude?: number): Promise<boolean> {
    try {
      const url = `${BASE_URL}/check-duplicate?name=${encodeURIComponent(name)}${idToExclude ? `&idToExclude=${idToExclude}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) return false;
      return await response.json();
    } catch (error) {
      console.error("checkDuplicate Error:", error);
      return false;
    }
  }
}
