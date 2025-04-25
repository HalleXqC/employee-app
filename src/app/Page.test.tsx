import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('./components/EmployeeFilter',      () => () => <div data-testid="employee-filter" />);
jest.mock('./components/EmployeeList',        () => () => <div data-testid="employee-list" />);
jest.mock('./components/UI/CreateButton',     () => () => <button data-testid="create-button">Create</button>);
jest.mock('./components/UI/DeleteSelectedButton', () => () => <button data-testid="delete-selected-button">Delete Selected</button>);
jest.mock('./components/modals/CreateEmployeeModal', () => () => <div data-testid="create-employee-modal" />);
jest.mock('./components/modals/EditEmployeeModal',   () => () => <div data-testid="edit-employee-modal" />);
jest.mock('./components/modals/DeleteEmployeeModal', () => () => <div data-testid="delete-employee-modal" />);

jest.mock('@/hooks/redux', () => ({
  useAppSelector: jest.fn(),
}));

import Home from './page';
import { useAppSelector } from '@/hooks/redux';

describe('Home (page.tsx)', () => {
  const mockUseAppSelector = useAppSelector as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендерит фильтр, список и кнопки без модалей, если все флаги false/null', () => {
    mockUseAppSelector.mockReturnValue({
      employeeToDelete: null,
      isBulkDelete: false,
      isCreateModalOpen: false,
      currentEditingEmployee: null,
    });

    render(<Home />);

    expect(screen.getByTestId('employee-filter')).toBeInTheDocument();
    expect(screen.getByTestId('employee-list')).toBeInTheDocument();
    expect(screen.getByTestId('delete-selected-button')).toBeInTheDocument();
    expect(screen.getByTestId('create-button')).toBeInTheDocument();

    expect(screen.queryByTestId('create-employee-modal')).toBeNull();
    expect(screen.queryByTestId('edit-employee-modal')).toBeNull();
    expect(screen.queryByTestId('delete-employee-modal')).toBeNull();
  });

  it('показывает CreateEmployeeModal, когда isCreateModalOpen=true', () => {
    mockUseAppSelector.mockReturnValue({
      employeeToDelete: null,
      isBulkDelete: false,
      isCreateModalOpen: true,
      currentEditingEmployee: null,
    });

    render(<Home />);
    expect(screen.getByTestId('create-employee-modal')).toBeInTheDocument();
  });

  it('показывает EditEmployeeModal, когда currentEditingEmployee не null', () => {
    mockUseAppSelector.mockReturnValue({
      employeeToDelete: null,
      isBulkDelete: false,
      isCreateModalOpen: false,
      currentEditingEmployee: { id: 42 },
    });

    render(<Home />);
    expect(screen.getByTestId('edit-employee-modal')).toBeInTheDocument();
  });

  it('показывает DeleteEmployeeModal, когда employeeToDelete truthy', () => {
    mockUseAppSelector.mockReturnValue({
      employeeToDelete: 7,
      isBulkDelete: false,
      isCreateModalOpen: false,
      currentEditingEmployee: null,
    });

    render(<Home />);
    expect(screen.getByTestId('delete-employee-modal')).toBeInTheDocument();
  });

  it('показывает DeleteEmployeeModal, когда isBulkDelete=true', () => {
    mockUseAppSelector.mockReturnValue({
      employeeToDelete: null,
      isBulkDelete: true,
      isCreateModalOpen: false,
      currentEditingEmployee: null,
    });

    render(<Home />);
    expect(screen.getByTestId('delete-employee-modal')).toBeInTheDocument();
  });
});
