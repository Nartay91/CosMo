import Select from "react-select";

const BranchForm = ({ value, onChange }) => {
  const branches = [
    { value: "cosmo1", label: "Cosmo1" },
    { value: "cosmo2", label: "Cosmo2" },
    { value: "cosmo3", label: "Cosmo3" },
  ];

  return (
    <Select
      styles={{
        control: (base) => ({
          ...base,
          width: "388px", 
          minHeight: "20px", 
        }),
        menu: (base) => ({
          ...base,
          width: "388px", 
        }),
      }}
      options={branches}
      value={branches.find((b) => b.value === value)}
      onChange={(selected) => onChange(selected.value)}
      placeholder="Выберите филиал"
    />
  );
};

export default BranchForm;