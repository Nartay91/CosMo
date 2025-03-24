import { create } from "zustand";
import { getBranches, createBranch, updateBranch, deleteBranches } from "../api/api";

const useBranchStore = create((set, get) => ({
  branches: [], // Данные с API

  // Загрузка филиалов с API
  fetchBranches: async (name = '') => {
    try {
      const data = await getBranches(name);
      set({ branches: data.elements });
    } catch (error) {
      console.error("Ошибка загрузки филиалов:", error);
    }
  },

  // Добавление филиала
  addBranch: async (branchData) => {
    try {
      const newBranch = await createBranch(branchData);
      set((state) => ({ branches: [...state.branches, newBranch] }));
    } catch (error) {
      console.error("Ошибка при добавлении филиала:", error);
    }
  },

  // Редактирование филиала
  editBranch: async (id, updatedData) => {
    try {
      const updatedBranch = await updateBranch(id, updatedData);
      set((state) => ({
        branches: state.branches.map((branch) =>
          branch.id === id ? { ...branch, ...updatedBranch } : branch
        ),
      }));
    } catch (error) {
      console.error("Ошибка при обновлении филиала:", error);
    }
  },

  // Удаление филиалов
  deleteBranch: async (ids) => {
    try {
      await deleteBranches(ids);
      set((state) => ({
        branches: state.branches.filter((branch) => !ids.includes(branch.id)),
      }));
    } catch (error) {
      console.error("Ошибка при удалении филиала:", error);
    }
  },
}));

export default useBranchStore;






// import { create } from "zustand";


// const useBranchStore = create((set) => ({
//   branches: [
//     {
//       id: 1,
//       name: "Tesle Education",
//       address: "ул. Ленина, 10",
//       manager: "Жексен Аян",
//       employees: 200,
//     },
//     {
//       id: 2,
//       name: "Tesle Education",
//       address: "ул. Ленина, 10",
//       manager: "Жексен Аян",
//       employees: 300,
//     },
//     {
//       id: 3,
//       name: "Tesle Education",
//       address: "ул. Абая, 1",
//       manager: "Жексен Аян",
//       employees: 200,
//     },
//     {
//       id: 4,
//       name: "Tesle Education",
//       address: "ул. Жумабаева, 11",
//       manager: "Жексен Аян",
//       employees: 700,
//     },
//     {
//       id: 5,
//       name: "Tesle Education",
//       address: "ул. Туран, 22",
//       manager: "Жексен Аян",
//       employees: 500,
//     },
//   ],

//   addBranch: (branch) =>
//     set((state) => ({
//       branches: [...state.branches, { id: Date.now(), ...branch }],
//     })),

//   editBranch: (id, updatedBranch) =>
//     set((state) => ({
//       branches: state.branches.map((branch) =>
//         branch.id === id ? { ...branch, ...updatedBranch } : branch
//       ),
//     })),

//   deleteBranch: (ids) =>
//     set((state) => ({
//       branches: state.branches.filter((branch) => !ids.includes(branch.id)),
//     })),
// }));

// export default useBranchStore;