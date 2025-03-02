import { useState } from "react";
import useUsersStore from "../store/userStores";
import "../styles/addEmploy.scss";
import BranchForm from "./forms/BranchForm";
import PositionForm from "./forms/PositionForm";
import PhoneForm from "./forms/PhoneForm";
import useValidation from "./forms/ValidationForm";

const EditEmploy = ({ user, onClose }) => {
  const updateUser = useUsersStore((state) => state.updateUser);

  const [formData, setFormData] = useState({
    id: user.id,
    firstName: user.name.split(" ")[0] || "",
    lastName: user.name.split(" ")[1] || "",
    email: user.email,
    phone: user.phone,
    country: { label: "Казахстан (+7)", value: "KZ", flag: "KZ" },
    position: user.role,
    branch: user.branch || "",
  });

  const { errors, validate } = useValidation(formData);

  const handleSubmit = () => {
    if (!validate()) return;

    const updatedUser = {
      ...user,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      role: formData.position,
      branch: formData.branch,
    };

    updateUser(updatedUser);
    onClose();
  };

  return (
    <div className="modal__edit">
      <div className="form__add">
        <h2>Редактировать сотрудника</h2>
        <div className="form-group">
          <label>Имя и фамилия</label>
          <div className="input-group">
            <input
              type="text" className="name_input"
              placeholder="Имя"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              type="text" className="name_input"
              placeholder="Фамилия"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          {errors.firstName && <p className="error">{errors.firstName}</p>}
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label>Эл. почта</label>
          <input
            type="email" className="email_input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Телефон</label>
          <PhoneForm
            value={{ country: formData.country, phone: formData.phone }}
            onChange={(data) =>
              setFormData({
                ...formData,
                country: data.country.value,
                phone: data.phone,
              })
            }
          />
          {/* {errors.phone && <p className="error">{errors.phone}</p>} */}
        </div>

        {/* Должность */}
        <div className="form-group">
                <label>Должность</label>
                <PositionForm
                  value={formData.position}
                  onChange={(selected) => setFormData({ ...formData, position: selected })}
                />
                </div>
                {/* {errors.position && <p className="error">{errors.position}</p>} */}

                {/* Филиал */}
                <div className="form-group">
                <label>Филиал</label>
                <BranchForm className="branch__form"
                  value={formData.branch}
                  onChange={(selected) => setFormData({ ...formData, branch: selected })}
                />
                </div>
                {errors.branch && <p className="error">{errors.branch}</p>}
        <div className="buttons">
          <button className="cancel" onClick={onClose}>
            Отмена
          </button>
          <button className="submit" onClick={handleSubmit}>
            Обновить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmploy;