import { useAppDispatch } from '@/hooks/redux'
import { EmployeeActionsSlice } from '@/store/reducers/EmployeeActionsSlice'

export default function CreateButton() {
  const { setIsCreateModalOpen } = EmployeeActionsSlice.actions
  const dispatch = useAppDispatch()

  function openCreateModal() {
    dispatch(setIsCreateModalOpen(true))
  }

  return (
    <button
      className="
        rounded
        bg-blue-500
        px-4 py-2 
        text-white
        shadow-md
        hover:bg-blue-600
        active:bg-blue-700
        hover:cursor-pointer"
      onClick={() => openCreateModal()}
    >
      Создать нового сотрудника
    </button>
  )
}
