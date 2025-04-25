import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useDeleteEmployeeMutation } from '@/store/features/employeeApi';
import { EmployeeActionsSlice } from '@/store/reducers/EmployeeActionsSlice';
import React from 'react';

export default function DeleteEmployeeModal() {
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();

  const {
    employeeToDelete,
    isBulkDelete,
    selectedEmployees,
  } = useAppSelector(state => state.EmployeeActionsSlice)

  const dispatch = useAppDispatch()

  const {
    setEmployeeToDelete,
    setIsBulkDelete,
    setSelectedEmployees,
  } = EmployeeActionsSlice.actions

  const confirmDelete = async () => {
    if (isBulkDelete) {
      try {
        await Promise.all(selectedEmployees.map((id) => deleteEmployee(id).unwrap()));
      } catch (error) {
        console.error('Failed to delete employees:', error);
      }
    } else if (employeeToDelete) {
      try {
        await deleteEmployee(employeeToDelete).unwrap();
      } catch (error) {
        console.error('Failed to delete employee:', error);
      }
    }
    dispatch(setEmployeeToDelete(null))
    dispatch(setIsBulkDelete(false))
    dispatch(setSelectedEmployees([]));
  };

  const cancelDelete = () => {
    dispatch(setEmployeeToDelete(null))
    dispatch(setIsBulkDelete(false))
  };

  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      cancelDelete();
    }
  };

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 flex items-center justify-center bg-slate-300/50 bg-opacity-50 bg-opacity-50 backdrop-blur-xs">
      <div ref={modalRef} className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Подтверждение удаления</h2>
        <p className="mb-4">Вы уверены что хотите удалить {isBulkDelete ? 'этих сотрудников' : 'этого сотрудника?'}?</p>
        <div className="flex justify-end">
          <button
            className="mr-2 rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 active:bg-gray-500 hover:cursor-pointer"
            onClick={cancelDelete}
          >
            Отменить
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 active:bg-red-700 hover:cursor-pointer"
            onClick={confirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </div>
    </div>
  )  
}
