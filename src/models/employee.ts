export enum EmployeePosition {
  Developer = "Developer",
  Designer = "Designer",
  Project_Manager = "Project Manager",
  QA_Engineer = "QA Engineer",
  System_Administrator = "System Administrator",
}

export type EmployeePositionType = EmployeePosition | null | string

export interface EmployeePositionOption {
  label: EmployeePosition,
  value: EmployeePosition,
}

export enum EmployeeDepartment {
  Development = "Development",
  Design = "Design",
  Project_Management = "Project Management",
  QA = "QA",
  IT_Operations = "IT Operations",
}

export type EmployeeDepartmentType = EmployeeDepartment | null | string

export interface EmployeeDepartmentOption {
  label: EmployeeDepartment,
  value: EmployeeDepartment,
}

export interface IGetEmployee {
  id: number;
  name: string;
  email: string;
  age: number;
  position: EmployeePositionType;
  department: EmployeeDepartmentType;
}

export interface ICreateEmployee {
  name: string;
  email: string;
  age: number;
  position: EmployeePositionType;
  department: EmployeeDepartmentType;
}

export const initialEmployeeValues: ICreateEmployee = {
  name: '',
  email: '',
  age: 0,
  position: null,
  department: null,
}
