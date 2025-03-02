import { useState, useEffect } from "react";
import Select from "react-select";
import { getCountryCallingCode, isSupportedCountry } from "libphonenumber-js";
import countryList from "react-select-country-list";

const PhoneForm = ({ value, onChange }) => {
  const countries = countryList()
    .getData()
    .map((country) => {
      const phoneCode = isSupportedCountry(country.value)
        ? `+${getCountryCallingCode(country.value)}`
        : null;

        const flagUrl =
        country.value === "AQ"
          ? "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Antarctica.svg/200px-Flag_of_Antarctica.svg.png"
          : `https://flagcdn.com/w40/${country.value.toLowerCase()}.png`;
      

      return phoneCode
        ? {
            label: (
              <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                <img style={{width: "20px", height: "15px"}} src={flagUrl} alt={country.label} className="flag__size" />
                {`${country.label} (${phoneCode})`}
              </div>
            ),
            value: {
              code: country.value,
              flag: flagUrl,
              phoneCode,
            },
          }
        : null;
    })
    .filter(Boolean);

//   const defaultCountry = countries.find((c) => c.value.code === "RU");

  const [phoneData, setPhoneData] = useState({
    country: value?.country,
    phone: value?.phone || "",
  });

  useEffect(() => {
    onChange(phoneData);
  }, [phoneData]);

  const handleCountryChange = (selected) => {
    setPhoneData({
      ...phoneData,
      country: selected,
    });
  };

  const handlePhoneChange = (e) => {
    let onlyNumbers = e.target.value.replace(/\D/g, "");

    if (onlyNumbers.length > 10) return; // Ограничение 10 цифр

    let formattedNumber = onlyNumbers
      .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4")
      .trim();

    setPhoneData({ ...phoneData, phone: formattedNumber });
  };

  return (
    <div style={{display: "flex", gap: "10px", flexDirection: "row"}}>
      <Select
  styles={{
    control: (base) => ({
      ...base,
      width: "219px",
      minHeight: "27px", 
      overflow: "hidden",
      whiteSpace: "nowrap",
    }),
    valueContainer: (base) => ({
      ...base,
      overflow: "hidden",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "27px", 
    }),
  }}
  options={countries}
  value={phoneData.country}
  onChange={handleCountryChange}
/>

      <div className="phone-input">
        <input style={{width: "140px", height: "20px", outline: "none",}}
          type="tel"
          placeholder="XXX XXX XX XX"
          value={phoneData.phone}
          onChange={handlePhoneChange}   
        />
      </div>
    </div>
  );
};

export default PhoneForm;