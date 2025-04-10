import { IEmployee } from "../../models/IEmployee";

export interface IEmployeeRepository {
  getPagedEmployees(page: number, pageSize: number): Promise<{ data: IEmployee[]; totalCount: number } | null>;
  getEmployeeById(id: number): Promise<IEmployee | null>;
  searchEmployees(name: string): Promise<IEmployee[] | null>;
  addEmployee(employee: IEmployee): Promise<boolean>;
  updateEmployee(id: number, employee: IEmployee): Promise<boolean>;
  deleteEmployee(id: number): Promise<boolean>;
  deleteMultiple(ids: number[]): Promise<boolean>;
  checkDuplicate(name: string, idToExclude?: number): Promise<boolean>;
}
