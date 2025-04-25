import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/hooks/redux', () => ({
  useAppDispatch: jest.fn(),
}));

import { useAppDispatch } from '@/hooks/redux';
import EmployeeFilter from '.';
import { EmployeeActionsSlice } from '@/store/reducers/EmployeeActionsSlice';
import { positionOptions, departmentOptions } from '@/constants';

describe('EmployeeFilter', () => {
  const mockDispatch = jest.fn();
  const mockUseDispatch = useAppDispatch as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  it('рендерит правильное число опций в селектах', () => {
    render(<EmployeeFilter />);
    const pos = screen.getByLabelText('Position');
    expect(pos.childElementCount).toBe(positionOptions.length + 1);
    const dep = screen.getByLabelText('Department');
    expect(dep.childElementCount).toBe(departmentOptions.length + 1);
  });

  it('диспатчит только активные фильтры при нажатии "Применить"', async () => {
    render(<EmployeeFilter />);
    const idInput = screen.getByLabelText('ID');
    const nameInput = screen.getByLabelText('Name');
    const positionSelect = screen.getByLabelText('Position');
    const applyBtn = screen.getByRole('button', { name: /Применить/i });

    await userEvent.type(idInput, '7');
    await userEvent.type(nameInput, 'Anna');
    await userEvent.selectOptions(positionSelect, positionOptions[1].value);

    await userEvent.click(applyBtn);

    expect(mockDispatch).toHaveBeenCalledWith(
      EmployeeActionsSlice.actions.setSearchFilters({
        id: '7',
        name: 'Anna',
        position: positionOptions[1].value,
      })
    );
  });

  it('сбрасывает фильтры и диспатчит пустой объект при "Очистить"', async () => {
    render(<EmployeeFilter />);
    const idInput = screen.getByLabelText('ID');
    const clearBtn = screen.getByRole('button', { name: /Очистить/i });

    await userEvent.type(idInput, '10');
    expect(idInput).toHaveValue('10');

    await userEvent.click(clearBtn);

    expect(idInput).toHaveValue('');
    expect(mockDispatch).toHaveBeenCalledWith(
      EmployeeActionsSlice.actions.setSearchFilters({})
    );
  });
});
