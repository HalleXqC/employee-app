import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { employeeApi } from '@/store/features/employeeApi';
import EmployeeActionsSlice from './reducers/EmployeeActionsSlice'

const rootReducer = combineReducers({
  EmployeeActionsSlice,
  [employeeApi.reducerPath]: employeeApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
