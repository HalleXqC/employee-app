'use client'

import React from 'react';
import { useCreateEmployeeMutation } from '@/store/features/employeeApi';
import Select from 'react-select';
import { EmployeeActionsSlice } from '@/store/reducers/EmployeeActionsSlice';
import { useAppDispatch } from '@/hooks/redux';
import { departmentOptions, positionOptions } from '@/constants';
import { EmployeeDepartmentType, EmployeePositionType } from '@/models/employee';

export default function CreateEmployeeModal() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState('');
  const [position, setPosition] = React.useState<EmployeePositionType>(null);
  const [department, setDepartment] = React.useState<EmployeeDepartmentType>(null);

  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const { setIsCreateModalOpen } = EmployeeActionsSlice.actions
  const dispatch = useAppDispatch()

  const modalRef = React.useRef<HTMLDivElement>(null);

  function onClose() {
    dispatch(setIsCreateModalOpen(false))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEmployee({ name, email, age: Number(age), position, department }).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to create employee:', error);
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 flex items-center bg-slate-300/50 justify-center bg-opacity-50 backdrop-blur-xs">
      <div ref={modalRef} className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Создание нового сотрудника</h2>
        <div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Position</label>
            <Select
              classNames={{
                control: () => "border-black!",
              }}
              options={positionOptions}
              isSearchable={true}
              isClearable={true}
              menuPlacement='auto'
              onChange={(e) => setPosition(e ? e.value : null)}
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Department</label>
            <Select
              classNames={{
                control: () => "border-black!",
              }}
              options={departmentOptions}
              isSearchable={true}
              isClearable={true}
              menuPlacement='auto'
              onChange={(e) => setDepartment(e ? e.value : null)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 active:bg-gray-500 hover:cursor-pointer"
              onClick={onClose}
            >
              Отменить
            </button>
            <button
              type="button"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 active:bg-blue-700 hover:cursor-pointer"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Создание...' : 'Создать'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
