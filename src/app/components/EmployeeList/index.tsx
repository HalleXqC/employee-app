import React from 'react';
import { useGetEmployeesQuery } from '@/store/features/employeeApi';
import { PencilLine, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { EmployeeActionsSlice } from '@/store/reducers/EmployeeActionsSlice';
import { IGetEmployee } from '@/models/employee';

export default function EmployeeList() {
  const {selectedEmployees, searchFilters} = useAppSelector(state => state.EmployeeActionsSlice)
  const dispatch = useAppDispatch()

  console.log('searchFilters', searchFilters)

  const { data: employees, error, isLoading } = useGetEmployeesQuery(searchFilters);

  const {
    setEmployeeToDelete,
    setIsBulkDelete,
    setSelectedEmployees,
    setCurrentEditingEmployee,
  } = EmployeeActionsSlice.actions

  const handleEditEmployee = (employee: IGetEmployee) => {
    dispatch(setCurrentEditingEmployee(employee))
  }

  const handleSelectEmployee = (id: number) => {
    dispatch(
      setSelectedEmployees(
        selectedEmployees.includes(id)
          ? selectedEmployees.filter((empId) => empId !== id)
          : [...selectedEmployees, id]
      )
    )
  };

  const handleDeleteClick = (id: number) => {
    dispatch(setEmployeeToDelete(id))
    dispatch(setIsBulkDelete(false))
  };

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading employees</div>;

  return (
    <div className="mx-auto max-w-6xl p-4 overflow-x-auto">
      <h1 className="text-blue-500 font-bold text-2xl text-center mb-4">Сотрудники</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 rounded-t-lg bg-blue-500 p-4 font-semibold text-white shadow-md">
        <div>Select</div>
        <div>Name</div>
        <div className="hidden sm:block">Email</div>
        <div className="hidden md:block">Age</div>
        <div className="hidden md:block">Position</div>
        <div className="hidden lg:block">Department</div>
        <div className="text-center">Actions</div>
      </div>

      <div className="divide-y divide-gray-300">
        {employees?.map((employee: IGetEmployee) => (
          <div
            key={employee.id}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 bg-white p-4 transition hover:bg-gray-50"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedEmployees.includes(employee.id)}
                onChange={() => handleSelectEmployee(employee.id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="text-gray-700">{employee.name}</div>

            <div className="hidden sm:block truncate text-gray-700">
              {employee.email}
            </div>

            <div className="hidden md:block text-gray-700">
              {employee.age}
            </div>

            <div className="hidden md:block text-gray-700">
              {employee.position}
            </div>

            <div className="hidden lg:block text-gray-700">
              {employee.department}
            </div>

            <div className="flex justify-center items-center gap-2">
              <PencilLine
                color="#d97706"
                className="hover:cursor-pointer"
                onClick={() => handleEditEmployee(employee)}
                data-testid={`edit-btn-${employee.id}`}
              />
              <Trash2
                color="#FF0000"
                className="hover:cursor-pointer"
                onClick={() => handleDeleteClick(employee.id)}
                data-testid={`delete-btn-${employee.id}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
