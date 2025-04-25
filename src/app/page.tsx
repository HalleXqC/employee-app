'use client'

import React from 'react';
import EmployeeList from './components/EmployeeList';
import CreateButton from './components/UI/CreateButton';
import CreateEmployeeModal from './components/modals/CreateEmployeeModal';
import DeleteEmployeeModal from './components/modals/DeleteEmployeeModal';
import { useAppSelector } from '@/hooks/redux';
import DeleteSelectedButton from './components/UI/DeleteSelectedButton';
import EditEmployeeModal from './components/modals/EditEmployeeModal';
import EmployeeFilter from './components/EmployeeFilter';

export default function Home() {
  const {
    employeeToDelete,
    isBulkDelete,
    isCreateModalOpen,
    currentEditingEmployee,
  } = useAppSelector(state => state.EmployeeActionsSlice)

  return (
    <main>
      <EmployeeFilter />
      <EmployeeList />

      <div
        className="fixed bottom-8 right-8 flex gap-4"
      >
        <DeleteSelectedButton />
        <CreateButton />
      </div>

      {
        isCreateModalOpen && (
          <CreateEmployeeModal />
        )
      }
      {
        currentEditingEmployee && (
          <EditEmployeeModal />
        )
      }
      {
        (employeeToDelete || isBulkDelete) && (
          <DeleteEmployeeModal />
        )
      }
    </main>
  );
}
