'use client'

import { departmentOptions, positionOptions } from '@/constants';
import { useAppDispatch } from '@/hooks/redux';
import { EmployeeActionsSlice } from '@/store/reducers/EmployeeActionsSlice';
import React from 'react';

const defaultFilters = {
  id: '',
  name: '',
  email: '',
  age: '',
  position: '',
  department: '',
}

export default function EmployeeFilter() {
  const [filters, setFilters] = React.useState(defaultFilters);

  const dispatch = useAppDispatch()
  const { setSearchFilters } = EmployeeActionsSlice.actions

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterClick = (e: any) => {
    e.preventDefault();

    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    dispatch(setSearchFilters(activeFilters))
  };

  const handleFilterClear = () => {
    setFilters(defaultFilters)
    dispatch(setSearchFilters({}))
  }

  return (
    <div className='mx-auto max-w-6xl px-4 pt-4'>
      <h1 className='text-blue-500 font-bold text-2xl text-center mb-4'>Фильтрация сотрудников</h1>
      <form onSubmit={handleFilterClick} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="filter-id" className="mb-1 block text-sm font-medium">ID</label>
          <input
            id="filter-id"
            type="text"
            name="id"
            value={filters.id}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label htmlFor="filter-name" className="mb-1 block text-sm font-medium">Name</label>
          <input
            id="filter-name" 
            type="text"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label htmlFor="filter-email"className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="text"
            id="filter-email"
            name="email"
            value={filters.email}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label htmlFor="filter-age"className="mb-1 block text-sm font-medium">Age</label>
          <input
            type="number"
            id="filter-age"
            name="age"
            value={filters.age}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <label htmlFor="filter-position" className="mb-1 block text-sm font-medium">Position</label>
          <select
          id="filter-position"
            className="w-full rounded border p-2"
            value={filters.position}
            name="position"
            onChange={handleInputChange}
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
        <div>
          <label htmlFor="filter-department"className="mb-1 block text-sm font-medium">Department</label>
          <select
            id="filter-department"
            className="w-full rounded border p-2"
            value={filters.department}
            name="department"
            onChange={handleInputChange}
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
        <div className="col-span-full flex justify-center sm:justify-end gap-4">
          <button
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 active:bg-red-700 hover:cursor-pointer"
            onClick={handleFilterClear}
            type="button"
          >
            Очистить
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 active:bg-blue-700 hover:cursor-pointer"
            type="submit"
          >
            Применить
          </button>
        </div>
      </form>
    </div>
  );
}
