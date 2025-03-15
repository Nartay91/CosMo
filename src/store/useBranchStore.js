import { create } from "zustand";

const useBranchStore = create((set) => ({
  branches: [
    {
      id: 1,
      name: "Tesle Education",
      address: "ул. Ленина, 10",
      manager: "Жексен Аян",
      employees: 200,
    },
    {
      id: 2,
      name: "Tesle Education",
      address: "ул. Ленина, 10",
      manager: "Жексен Аян",
      employees: 300,
    },
    {
      id: 3,
      name: "Tesle Education",
      address: "ул. Абая, 1",
      manager: "Жексен Аян",
      employees: 200,
    },
    {
      id: 4,
      name: "Tesle Education",
      address: "ул. Жумабаева, 11",
      manager: "Жексен Аян",
      employees: 700,
    },
    {
      id: 5,
      name: "Tesle Education",
      address: "ул. Туран, 22",
      manager: "Жексен Аян",
      employees: 500,
    },
  ],

  addBranch: (branch) =>
    set((state) => ({
      branches: [...state.branches, { id: Date.now(), ...branch }],
    })),

  editBranch: (id, updatedBranch) =>
    set((state) => ({
      branches: state.branches.map((branch) =>
        branch.id === id ? { ...branch, ...updatedBranch } : branch
      ),
    })),

  deleteBranch: (id) =>
    set((state) => ({
      branches: state.branches.filter((branch) => branch.id !== id),
    })),
}));

export default useBranchStore;