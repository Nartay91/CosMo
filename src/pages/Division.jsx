import { useState, useEffect } from "react";
import useBranchStore from "../store/useBranchStore";
import "../styles/Division.scss";
import AddBranchModal from "../components/addBranch";
import EditBranchModal from "../components/editBranch";
import addIcon from "../assets/add.svg";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import searchIcon from "../assets/search.svg";

export default function Division() {
  const { branches, addBranch, updateBranch, deleteBranches } = useBranchStore();
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState(new Set());
  const [error, setError] = useState("");

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

  const filteredBranches = branches.filter(
    (branch) => branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateBranch = (updatedBranch) => {
    updateBranch(updatedBranch);
    setModalType(null);
  };

  const handleAddBranch = (newBranch) => {
    if (!newBranch.name || !newBranch.address || !newBranch.manager) {
      setError("Все поля должны быть заполнены!");
      return;
    }
    addBranch(newBranch);
    setModalType(null);
  };

  const toggleDeleteMode = () => {
    if (isDeleteMode && selectedBranches.size > 0) {
      deleteBranches(Array.from(selectedBranches));
      setSelectedBranches(new Set());
    }
    setIsDeleteMode(!isDeleteMode);
  };

  const handleBranchSelect = (branchId) => {
    setSelectedBranches((prev) => {
      const newSelection = new Set(prev);
      newSelection.has(branchId) ? newSelection.delete(branchId) : newSelection.add(branchId);
      return newSelection;
    });
  };

  return (
    <div className={`branch-table ${modalType ? "modal-open" : ""}`}>
      <div className="header__branch">
        <h2>Филиалы</h2>
        <div className="actions">
          <button className="add" onClick={() => setModalType("add")}>
            <img src={addIcon} alt="" /> <p>Добавить</p>
          </button>
          <button className="edit" onClick={() => selectedBranch && setModalType("edit")} disabled={!selectedBranch}>
            <img src={editIcon} alt="" /> Редактировать
          </button>
          <button className={`delete ${isDeleteMode ? "active" : ""}`} onClick={toggleDeleteMode}>
            <img src={deleteIcon} alt="" />{isDeleteMode ? "Подтвердить" : "Удалить"}
          </button>
          <div className="search__branch">
            <img src={searchIcon} alt="" />
            <input type="text" placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="search__btn" onClick={() => setSearchQuery(search)} disabled={modalType}> Найти
            </button>
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="branch-list">
      <div className="filters">
        <p className="chapter">Название</p>
        <p className="chapter">Адрес</p>
        <p className="chapter">Управляющий</p>
        <p className="chapter">Количество сотрудников</p>
      </div>
        {filteredBranches.length > 0 ? (
          filteredBranches.map((branch) => (
            <div key={branch.id} className={`branch-item ${selectedBranch?.id === branch.id ? "selected" : ""}`} 
              onClick={() => !isDeleteMode && setSelectedBranch(branch)}>
              <div className="main__branches">
                {isDeleteMode && <input className="checkbox__delete" type="checkbox" 
                  checked={selectedBranches.has(branch.id)} 
                  onChange={() => handleBranchSelect(branch.id)} />}
                <span className="branch-name">{branch.name}</span>
              </div>
              <span className="branch-address">{branch.address}</span>
              <span className="branch-manager">{branch.manager}</span>
              <span className="branch-employees">{branch.employees}</span>
            </div>
          ))
        ) : (
          <p className="no-results">Филиалы не найдены</p>
        )}
      </div>

      {modalType && (
        <div className="modal-overlay1">
          <div className="modal1">
            {modalType === "add" && <AddBranchModal  onClose={() => setModalType(null)} onSave={handleAddBranch} />}
            {modalType === "edit" && selectedBranch && <EditBranchModal branch={selectedBranch} onClose={() => setModalType(null)} />}
          </div>
        </div>
      )}
    </div>
  );
}