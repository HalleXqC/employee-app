import { IGetEmployee } from '@/models/employee';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmployeeActionsState {
  employeeToDelete: number | null;
  selectedEmployees: number[];
  isBulkDelete: boolean;
  isCreateModalOpen: boolean;
  currentEditingEmployee: IGetEmployee | null;
  searchFilters: Record<string, string>;
}

const initialState: EmployeeActionsState = {
  employeeToDelete: null,
  selectedEmployees: [],
  isBulkDelete: false,
  isCreateModalOpen: false,
  currentEditingEmployee: null,
  searchFilters: {}
}

export const EmployeeActionsSlice = createSlice({
  name: 'employeeActions',
  initialState,
  reducers: {
    setEmployeeToDelete: (state, action: PayloadAction<number | null>) => {
      state.employeeToDelete = action.payload
    },
    setSelectedEmployees: (state, action: PayloadAction<number[]>) => {
      state.selectedEmployees = action.payload
    },
    setIsBulkDelete: (state, action: PayloadAction<boolean>) => {
      state.isBulkDelete = action.payload
    },
    setIsCreateModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateModalOpen = action.payload
    },
    setCurrentEditingEmployee: (state, action: PayloadAction<IGetEmployee | null>) => {
      state.currentEditingEmployee = action.payload
    },
    setSearchFilters: (state, action: PayloadAction<Record<string, string>>) => {
      state.searchFilters = action.payload
    }
  }
})

export default EmployeeActionsSlice.reducer;
