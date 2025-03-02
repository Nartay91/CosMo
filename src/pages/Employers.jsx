import { useState, useEffect } from "react";
import useUsersStore from "../store/userStores";
import "../styles/employers.scss";
import AddEmploy from "../components/addEmploy";
import EditEmploy from "../components/editEmploy";
import add from "../assets/add.svg";
import edit from "../assets/edit.svg";
import remove from "../assets/delete.svg";
import find from "../assets/search.svg";

const roles = ["Учитель", "Ученик", "Куратор", "Родитель", "Администратор"];
const statuses = ["Активен", "Деактивирован"];

export default function Employers() {
  const { users, filterRole, filterStatus, setRoleFilter, setStatusFilter, updateUser, deleteUsers, addUser } = useUsersStore();
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [error, setError] = useState("");

  
  useEffect(() => {
    localStorage.removeItem("users"); // Удаляет только пользователей
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(modalType));
    return () => document.body.classList.remove("modal-open");
  }, [modalType]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterRole ? user.role === filterRole : true) &&
      (filterStatus ? user.status === filterStatus : true)
  );

  const handleUpdateUser = (updatedUser) => {
    updateUser(updatedUser);
    setModalType(null);
  };

  const handleAddUser = (newUser) => {
    if (!newUser.name || !newUser.role || !newUser.status) {
      setError("Все поля должны быть заполнены!");
      return;
    }
    addUser(newUser);
    setModalType(null);
  };

  const toggleDeleteMode = () => {
    if (isDeleteMode && selectedUsers.size > 0) {
      deleteUsers(Array.from(selectedUsers));
      setSelectedUsers(new Set());
    }
    setIsDeleteMode(!isDeleteMode);
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) => {
      const newSelection = new Set(prev);
      newSelection.has(userId) ? newSelection.delete(userId) : newSelection.add(userId);
      return newSelection;
    });
  };

  return (
    <div className={`user-table ${modalType ? "modal-open" : ""}`}>
      <div className="header__employer">
        <h2>Пользователи</h2>
        <div className="actions">
          <button className="add" onClick={() => setModalType("add")}>
            <img src={add} alt="" /> <p>Добавить</p></button>
          <button className="edit" onClick={() => selectedUser && setModalType("edit")} disabled={!selectedUser}>
            <img src={edit} alt="" /> Редактировать
          </button>
          <button className={`delete ${isDeleteMode ? "active" : ""}`} onClick={toggleDeleteMode}>
            <img src={remove} alt="" />{isDeleteMode ? "Подтвердить" : "Удалить"}
          </button>
          <div className="search__employ">
          <img src={find} alt="" />
          <input type="text" placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="search__btn" onClick={() => setSearchQuery(search)} disabled={modalType}> Найти
          </button>
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="user-list">
      <div className="filters">
        <p className="chapter">Пользователи</p>
        <select className="chapter" value={filterRole} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">Роль</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <select className="chapter" value={filterStatus} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Статус</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <p className="chapter">Монеты</p>
        <p className="chapter">Изменить статус</p>
      </div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className={`user-item ${selectedUser?.id === user.id ? "selected" : ""}`} onClick={() => !isDeleteMode && setSelectedUser(user)}>
              <div className="main__users">{isDeleteMode &&  <input className="checkbox__delete" type="checkbox" checked={selectedUsers.has(user.id)} onChange={() => handleUserSelect(user.id)} />}
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
              </div>
              <span className="user-role">{user.role}</span>
              <span className="user-status">{user.status}</span>
              <span className="user-coins">{user.coins} монет</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={user.status === "Активен"}
                  onChange={() => handleUpdateUser({ ...user, status: user.status === "Активен" ? "Деактивирован" : "Активен" })}
                />
                <span className="slider round"></span>
              </label>
            </div>
          ))
        ) : (
          <p className="no-results">Пользователи не найдены</p>
        )}
      </div>

      {modalType && (
        <div className="modal-overlay">
          <div className="modal">
            {modalType === "add" && <AddEmploy onClose={() => setModalType(null)} onAdd={handleAddUser} />}
            {modalType === "edit" && selectedUser && <EditEmploy user={selectedUser} onClose={() => setModalType(null)} />}
          </div>
        </div>
      )}
    </div>
  );
}