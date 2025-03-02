import Select from "react-select";

const PositionSelect = ({ value, onChange }) => {
  const positions = [
    "Администратор",
    "Учитель",
    "Ученик",
    "Куратор",
    "Родитель",
  ].map((pos) => ({ value: pos, label: pos }));

  return (
    <Select
      styles={{
        control: (base) => ({
          ...base,
          width: 388,
          minHeight: 27,
          fontSize: 14,
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "0 8px",
        }),
        menu: (base) => ({
          ...base,
          width: 388,
        }),
      }}
      options={positions}
      value={positions.find((p) => p.value === value)}
      onChange={(selected) => onChange(selected.value)}
      placeholder="Выберите должность"
    />
  );
};

export default PositionSelect;