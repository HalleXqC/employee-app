import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/store/features/employeeApi', () => ({
  useGetEmployeesQuery: jest.fn(),
}));
jest.mock('@/hooks/redux', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

import { useGetEmployeesQuery } from '@/store/features/employeeApi';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import EmployeeList from '.';
import { EmployeeActionsSlice } from '@/store/reducers/EmployeeActionsSlice';

describe('EmployeeList', () => {
  const mockDispatch = jest.fn();
  const mockUseGet = useGetEmployeesQuery as jest.Mock;
  const mockUseSel = useAppSelector as jest.Mock;
  const mockUseDisp = useAppDispatch as jest.Mock;

  const employees = [
    {
      id: 1,
      name: 'Иван',
      email: 'ivan@example.com',
      age: 30,
      position: 'Dev',
      department: 'IT',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDisp.mockReturnValue(mockDispatch);
    mockUseSel.mockReturnValue({
      selectedEmployees: [],
      searchFilters: {},
    });
  });

  it('показывает спиннер при isLoading', () => {
    mockUseGet.mockReturnValue({ data: undefined, isLoading: true, error: null });
    render(<EmployeeList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('показывает ошибку при error', () => {
    mockUseGet.mockReturnValue({ data: undefined, isLoading: false, error: {} });
    render(<EmployeeList />);
    expect(screen.getByText('Error loading employees')).toBeInTheDocument();
  });

  it('рендерит заголовки и безстрочно при пустом списке', () => {
    mockUseGet.mockReturnValue({ data: [], isLoading: false, error: null });
    render(<EmployeeList />);

    ['Select', 'Name', 'Email', 'Age', 'Position', 'Department', 'Actions'].forEach((text) =>
      expect(screen.getByText(text)).toBeInTheDocument()
    );
    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  it('рендерит строку сотрудника и добавляет в selectedEmployees', async () => {
    mockUseGet.mockReturnValue({ data: employees, isLoading: false, error: null });
    render(<EmployeeList />);

    expect(screen.getByText('Иван')).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith(
      EmployeeActionsSlice.actions.setSelectedEmployees([1])
    );
  });

  it('удаляет из selectedEmployees, если id уже был выбран', async () => {
    mockUseSel.mockReturnValue({
      selectedEmployees: [1],
      searchFilters: {},
    });
    mockUseGet.mockReturnValue({ data: employees, isLoading: false, error: null });
    render(<EmployeeList />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith(
      EmployeeActionsSlice.actions.setSelectedEmployees([])
    );
  });

  it('диспатчит setCurrentEditingEmployee при клике на edit', async () => {
    mockUseGet.mockReturnValue({ data: employees, isLoading: false, error: null });
    render(<EmployeeList />);

    const editBtn = screen.getByTestId('edit-btn-1');
    await userEvent.click(editBtn);
    expect(mockDispatch).toHaveBeenCalledWith(
      EmployeeActionsSlice.actions.setCurrentEditingEmployee(employees[0])
    );
  });

  it('диспатчит setEmployeeToDelete и setIsBulkDelete при клике на delete', async () => {
    mockUseGet.mockReturnValue({ data: employees, isLoading: false, error: null });
    render(<EmployeeList />);

    const delBtn = screen.getByTestId('delete-btn-1');
    await userEvent.click(delBtn);

    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      EmployeeActionsSlice.actions.setEmployeeToDelete(1)
    );
    expect(mockDispatch).toHaveBeenNthCalledWith(
      2,
      EmployeeActionsSlice.actions.setIsBulkDelete(false)
    );
  });
});
