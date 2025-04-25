import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { EmployeeActionsSlice } from '@/store/reducers/EmployeeActionsSlice';

export default function DeleteSelectedButton() {
  const {selectedEmployees} = useAppSelector(state => state.EmployeeActionsSlice)
  const dispatch = useAppDispatch()

  const {
    setIsBulkDelete,
  } = EmployeeActionsSlice.actions
  
  const handleBulkDeleteClick = () => {
    if (selectedEmployees.length > 0) {
      dispatch(setIsBulkDelete(true))
    }
  };

  return (
    <button
      className="
        rounded
        bg-red-500
        px-4
        py-2
        text-white
        shadow-md
        hover:bg-red-600
        active:bg-red-700
        hover:cursor-pointer"
      onClick={handleBulkDeleteClick}
      style={{
        display: selectedEmployees.length === 0 ? 'none' : 'block'
      }}
      disabled={selectedEmployees.length === 0}
    >
      Удалить выбранное
    </button>
  )
}
