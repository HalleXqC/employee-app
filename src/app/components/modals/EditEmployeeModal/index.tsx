'use client'

import React from 'react';
import { useUpdateEmployeeMutation } from '@/store/features/employeeApi';
import { EmployeeActionsSlice } from '@/store/reducers/EmployeeActionsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { departmentOptions, positionOptions } from '@/constants';
import { EmployeeDepartment, EmployeeDepartmentType, EmployeePosition, EmployeePositionType } from '@/models/employee';

export default function EditEmployeeModal() {
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const { currentEditingEmployee } = useAppSelector(state => state.EmployeeActionsSlice)
  const { setCurrentEditingEmployee } = EmployeeActionsSlice.actions
  const dispatch = useAppDispatch()

  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState<number | string>('');
  const [position, setPosition] = React.useState<EmployeePositionType>('');
  const [department, setDepartment] = React.useState<EmployeeDepartmentType>('');

  React.useEffect(() => {
    setId(currentEditingEmployee?.id || 0)
    setName(currentEditingEmployee?.name || '')
    setEmail(currentEditingEmployee?.email || '')
    setAge(currentEditingEmployee?.age || '')
    setPosition(currentEditingEmployee?.position || null)
    setDepartment(currentEditingEmployee?.department || null)
  }, [currentEditingEmployee])

  const modalRef = React.useRef<HTMLDivElement>(null);

  function onClose() {
    dispatch(setCurrentEditingEmployee(null))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEmployee({ id, name, email, age: Number(age), position, department }).unwrap();
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

  if (!currentEditingEmployee) return <></>

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 flex items-center bg-slate-300/50 justify-center bg-opacity-50 backdrop-blur-xs">
      <div ref={modalRef} className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Редактирование сотрудника</h2>
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
            <select
              className="w-full rounded border p-2"
              value={position as EmployeePosition}
              onChange={(e) => setPosition(e.target.value as EmployeePosition)}
            >
              <option value="">-</option>
              {
                positionOptions.map((option, index) => {
                  return <option
                    key={index}
                    value={option.value}
                  >{option.label}</option>
                })
              }
            </select>
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Department</label>
            <select
              className="w-full rounded border p-2"
              value={department as EmployeeDepartment}
              onChange={(e) => setDepartment(e.target.value as EmployeeDepartment)}
            >
              <option value="">-</option>
              {
                departmentOptions.map((option, index) => {
                  return <option
                    key={index}
                    value={option.value}
                  >{option.label}</option>
                })
              }
            </select>
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
              {isLoading ? 'Редактирование...' : 'Редактировать'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
