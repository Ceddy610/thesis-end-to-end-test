import { create } from 'zustand'
import CustomData from '../../to-do.json';

const useDialogStore = create((set, get) => ({
  showDialog: false,
  toDoList: CustomData,
  setShowDialog: () => set({ showDialog: !get().showDialog ?? false }),
  setToDoInList: (toDo) => set({ toDoList: [...get().toDoList, toDo]}),
  deleteToDo: (toDo) => set({ toDoList: get().toDoList.filter((item) => item.name !== toDo.name) }),
}));

export { useDialogStore };