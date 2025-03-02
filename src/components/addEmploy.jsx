import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUsersStore from "../store/userStores";
import "../styles/addEmploy.scss";
import AddMultipleEmployees from "../components/addByExcel";
import BranchForm from "./forms/BranchForm";
import PositionForm from "./forms/PositionForm";
import PhoneForm from "./forms/PhoneForm";
import useValidation from "./forms/ValidationForm";

const AddEmploy = ({ onClose }) => {
  const addUser = useUsersStore((state) => state.addUser);
  const [showExcelUpload, setShowExcelUpload] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: { label: "Казахстан", value: "KZ", flag: "🇰🇿" },
    role: "",
    branch: "",
  });

  const { errors, validate } = useValidation(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addUser({
      id: Date.now(),
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      role: formData.role.trim(),
      branch: formData.branch.trim(),
      country: formData.country.label,
      status: "Активен",
      coins: 0,
    });

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: { label: "Казахстан", value: "KZ", flag: "🇰🇿" },
      role: "",
      branch: "",
    });
    onClose();
  };

  return (
    <div className="modal__add">
      <div className="modal__content__add">
        <AnimatePresence mode="wait">
          {!showExcelUpload ? (
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.4 }}>
              <form className="form__add" onSubmit={handleSubmit}>
                <h2>Добавить одного сотрудника</h2>
                <div className="form-group">
                  <label>Имя и фамилия</label>
                  <div className="input-group">
                    <input className="name_input" type="text" placeholder="Имя" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    <input className="name_input" type="text" placeholder="Фамилия" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                  </div>
                </div>
                {/* {errors.firstName && <p className="error">{errors.firstName}</p>} */}
                {/* {errors.lastName && <p className="error">{errors.lastName}</p>} */}

                <div className="form-group">
                  <label>Эл. почта</label>
                  <input className="email_input" type="email" placeholder="example@mail.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
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
                  <button type="button" className="cancel" onClick={onClose}>Отмена</button>
                  <button type="button" className="submit" onClick={() => setShowExcelUpload(true)}>Добавить через Excel</button>
                  <button type="submit" className="submit">Создать</button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div key="excel" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.4 }}>
              <AddMultipleEmployees onClose={() => setShowExcelUpload(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddEmploy;