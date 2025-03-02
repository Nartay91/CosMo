import { useState } from "react";
import * as XLSX from "xlsx";
import useUsersStore from "../store/userStores";
import "../styles/addByExel.scss";
import exel from "../assets/exel.svg";

const AddMultipleEmployees = ({ onClose }) => {
  const addUser = useUsersStore((state) => state.addUser);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setFile(uploadedFile);
      setError("");
    } else {
      setError("Пожалуйста, загрузите корректный Excel-файл.");
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Выберите файл перед добавлением сотрудников.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      const users = parsedData.map((row, index) => ({
        id: Date.now() + index,
        name: `${row["Имя"] || "Неизвестно"} ${row["Фамилия"] || ""}`.trim(),
        email: row["Email"] || "",
        phone: row["Телефон"] || "",
        role: row["Должность"] || "Без должности",
        status: "Активен",
        coins: 0,
      }));

      addUser(users);
      onClose();
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="modal__exel">
      <div className="modal-content-exel">
        <h2>Добавить несколько сотрудников</h2>
        <div className="file-upload">
          {/* Кастомная кнопка загрузки */}
          <label className="custom-file-upload">
            <input type="file" accept=".xlsx" onChange={handleFileUpload} style={{ display: "none" }} />
            <img src={exel} alt="" />
            <p className="exel__text__load">
            Перетащите или нажмите чтобы<br />загрузить
            </p>
          </label>
          </div>

          {/* Отображение загруженного файла */}
          {file && <p className="file-name">{file.name}</p>}

          {error && <p className="error">{error}</p>}
        
        <div className="buttons">
          <button className="cancel" onClick={onClose}>Отмена</button>
          <button className="submit" onClick={handleSubmit} disabled={!file}>Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default AddMultipleEmployees;