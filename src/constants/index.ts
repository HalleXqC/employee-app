import { EmployeeDepartment, EmployeeDepartmentOption, EmployeePosition, EmployeePositionOption } from '@/models/employee'

export const positionOptions: EmployeePositionOption[] = [
  { value: EmployeePosition.Developer, label: EmployeePosition.Developer },
  { value: EmployeePosition.Designer, label: EmployeePosition.Designer },
  { value: EmployeePosition.Project_Manager, label: EmployeePosition.Project_Manager },
  { value: EmployeePosition.QA_Engineer, label: EmployeePosition.QA_Engineer },
  { value: EmployeePosition.System_Administrator, label: EmployeePosition.System_Administrator }
]

export const departmentOptions: EmployeeDepartmentOption[] = [
  { value: EmployeeDepartment.Development, label: EmployeeDepartment.Development },
  { value: EmployeeDepartment.Design, label: EmployeeDepartment.Design },
  { value: EmployeeDepartment.Project_Management, label: EmployeeDepartment.Project_Management },
  { value: EmployeeDepartment.QA, label: EmployeeDepartment.QA },
  { value: EmployeeDepartment.IT_Operations, label: EmployeeDepartment.IT_Operations }
]
