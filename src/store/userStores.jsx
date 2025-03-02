import { create } from "zustand";
import avatar1 from "../assets/avatar.svg";
import avatar2 from "../assets/avatar.svg";
import avatar3 from "../assets/avatar.svg";
import avatar4 from "../assets/avatar.svg";
import avatar5 from "../assets/avatar.svg";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

const useUsersStore = create((set) => {
  const savedUsers = JSON.parse(localStorage.getItem("users")) || [
    { id: 1, name: "Жексен Аян", role: "Куратор", status: "Активен", coins: 500, avatar: avatars[0] },
    { id: 2, name: "Жексен Аян", role: "Ученик", status: "Деактивирован", coins: 500, avatar: avatars[1] },
    { id: 3, name: "Жексен Аян", role: "Родитель", status: "Активен", coins: 500, avatar: avatars[2] },
    { id: 4, name: "Жексен Аян", role: "Учитель", status: "Деактивирован", coins: 500, avatar: avatars[3] },
    { id: 5, name: "Жексен Аян", role: "Администратор", status: "Активен", coins: 500, avatar: avatars[4] },
  ];

  return {
    users: savedUsers,
    filterRole: "",
    filterStatus: "",

    setRoleFilter: (role) => set({ filterRole: role }),
    setStatusFilter: (status) => set({ filterStatus: status }),

    addUser: (newUser) => {
      set((state) => {
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
        const updatedUsers = [...state.users, { ...newUser, id: Date.now(), avatar: randomAvatar }];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { users: updatedUsers };
      });
    },

    updateUser: (updatedUser) => {
      set((state) => {
        const updatedUsers = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { users: updatedUsers };
      });
    },

    deleteUsers: (idsToDelete) =>
      set((state) => {
        const updatedUsers = state.users.filter((user) => !idsToDelete.includes(user.id));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { users: updatedUsers };
      }),
  };
});

export default useUsersStore;