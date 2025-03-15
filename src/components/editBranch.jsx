import { useState } from "react";
import useBranchStore from "../store/useBranchStore";
import "../styles/addBranch.scss";

const EditBranchModal = ({ branch, onClose }) => {
  const { editBranch } = useBranchStore();
  const [name, setName] = useState(branch.name);
  const [address, setAddress] = useState(branch.address);
  const [manager, setManager] = useState(branch.manager);

  const handleSubmit = () => {
    editBranch(branch.id, { name, address, manager });
    onClose();
  };

  return (
    <div className="modal1">
      <div className="modal-content">
      <div className="center-content">
        <h2>Редактировать филиал</h2>
        <div className="name_info">
        <label>Название</label>
        <input className="division_inputs" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" />
        </div>
        <div className="name_info">
        <label>Адрес</label>
        <input className="division_inputs" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адрес" />
        </div>
        <div className="name_info">
        <label>Управляющий</label>
        <input className="division_inputs" value={manager} onChange={(e) => setManager(e.target.value)} placeholder="Управляющий" />
        </div>
        
        <div className="buttons_division">
        <button className="cancels" onClick={onClose}>Отмена</button>
        <button className="submits" onClick={handleSubmit}>Сохранить</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EditBranchModal;
