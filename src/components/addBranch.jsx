import { useState, useRef } from "react";
import useBranchStore from "../store/useBranchStore";
import "../styles/addBranch.scss";
import tooltip from "../assets/tooltip.svg";
import plus from "../assets/plus_gray.svg";

const ModalBranch = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false); // Новый флаг для ручного ввода
  const inputRef = useRef(null);
  let timeoutId = useRef(null);

  const existingManagers = useBranchStore.getState().branches.flatMap(
    (branch) => (branch.manager ? [branch.manager] : [])
  );

  const handleAddManager = (manager) => {
    setSelectedManager(manager);
    setIsManualEntry(false); // Отключаем ручной ввод при выборе из списка
    setShowManagerModal(false);
  };

  const handleSave = () => {
    onSave({ name, address, manager: selectedManager });
    onClose();
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId.current);
    setShowManagerModal(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => setShowManagerModal(false), 300);
  };

  const handleAddNewManager = () => {
    setIsManualEntry(true); // Включаем возможность ручного ввода
    setSelectedManager(""); // Очищаем поле перед вводом нового
    inputRef.current?.focus(); // Ставим фокус на инпут
  };

  return (
    <div className="modal1">
      <div className="modal-content">
        <div className="center-content">
          <h2>Добавить филиал</h2>

          <div className="name_info">
            <label>Название</label>
            <input placeholder="Введите название" className="division_inputs" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="name_info" >
            <label>Адрес</label>
            <input placeholder="Введите адресс филиала" className="division_inputs" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="name_info">
            <label>Выбрать управляющего</label>
            <div className="manager-input">
              <input
                className="division_inputs"
                ref={inputRef}
                value={selectedManager}
                placeholder="Выберите или введите управляющего"
                readOnly={!isManualEntry} // Разрешаем ввод только при нажатии на "плюс"
                onChange={(e) => setSelectedManager(e.target.value)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <button
                className="add-manager-btn"
                onClick={handleAddNewManager} // Теперь кнопка включает ручной ввод
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <img src={plus} alt="" />
                {showTooltip && <span className="tooltip"><img src={tooltip} alt="" /></span>}
              </button>

              {showManagerModal && !isManualEntry && (
                <div
                  className="modal-manager"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="modal-manager-content">
                    <h3>Выберите управляющего</h3>
                    <ul>
                      {existingManagers.length > 0 ? (
                        existingManagers.map((manager, index) => (
                          <li key={index} onClick={() => handleAddManager(manager)}>
                            {manager}
                          </li>
                        ))
                      ) : (
                        <li className="disabled">Нет доступных управляющих</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="buttons_division">
          <button className="cancels" onClick={onClose}>Отмена</button>
          <button className="submits" onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default ModalBranch;