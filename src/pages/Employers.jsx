import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useUsersStore from "../store/userStores";
import "../styles/employers.scss";
import AddEmploy from "../components/addEmploy";
import EditEmploy from "../components/editEmploy";
import add from "../assets/add.svg";
import edit from "../assets/edit.svg";
import remove from "../assets/delete.svg";
import find from "../assets/search.svg";


function Employers() {
  const { t } = useTranslation();

  const roles = [
    { name: t("roles.teacher"), value: "Учитель" },
    { name: t("roles.student"), value: "Ученик" },
    { name: t("roles.curator"), value: "Куратор" },
    { name: t("roles.parent"), value: "Родитель" },
    { name: t("roles.admin"), value: "Администратор" }
  ];

  const statuses = [
    { name: t("statuses.active"), value: "Активен" },
    { name: t("statuses.deactivated"), value: "Деактивирован" }
  ];

  const roleMapping = {
    "Учитель": "teacher",
    "Ученик": "student",
    "Куратор": "curator",
    "Родитель": "parent",
    "Администратор": "admin"
  };
  
  const statusMapping = {
    "Активен": "active",
    "Деактивирован": "deactivated"
  };
  
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
      setError(t("error.fillAllFields"));
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
        <h2>{t("users")}</h2>
        <div className="actions">
          <button className="add" onClick={() => setModalType("add")}>
            <img src={add} alt="" /> <p>{t("add")}</p></button>
          <button className="edit" onClick={() => selectedUser && setModalType("edit")} disabled={!selectedUser}>
            <img src={edit} alt="" /> {t("edit")}
          </button>
          <button className={`delete ${isDeleteMode ? "active" : ""}`} onClick={toggleDeleteMode}>
            <img src={remove} alt="" />{isDeleteMode ? t("confirm_delete") : t("delete")}
          </button>
          <div className="search__employ">
          <img src={find} alt="" />
          <input type="text" placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="search__btn" onClick={() => setSearchQuery(search)} disabled={modalType}> {t("find")}
          </button>
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="user-list">
      <div className="filters">
        <p className="chapter">{t("users")}</p>
        <select className="chapter" value={filterRole} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">{t("role")}</option>
            {roles.map((role) => (
          <option key={role.value} value={role.value}>{role.name}</option>
          ))}
        </select>

        <select className="chapter" value={filterStatus} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">{t("status")}</option>
            {statuses.map((status) => (
          <option key={status.value} value={status.value}>{status.name}</option>
          ))}
        </select>

        <p className="chapter">{t("coins")}</p>
        <p className="chapter">{t("changeStatus")}</p>
      </div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className={`user-item ${selectedUser?.id === user.id ? "selected" : ""}`} onClick={() => !isDeleteMode && setSelectedUser(user)}>
              <div className="main__users">{isDeleteMode &&  <input className="checkbox__delete" type="checkbox" checked={selectedUsers.has(user.id)} onChange={() => handleUserSelect(user.id)} />}
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
              </div>
               <span className="user-role">
                {t(`roles.${roleMapping[user.role]}`)}
              </span>
              <span className="user-status">
                {t(`statuses.${statusMapping[user.status]}`)}
              </span>
              <span className="user-coins">{user.coins} {t("coins")}</span>
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
          <p className="no-results">{t("noUsersFound")}</p>
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

export default Employers;