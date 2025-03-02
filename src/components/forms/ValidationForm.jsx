import { useState, useEffect } from "react";

const useValidation = (formData) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const timer = setTimeout(() => setErrors({}), 2000);
    return () => clearTimeout(timer);
  }, [errors]);

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Введите имя";
    if (!formData.lastName.trim()) newErrors.lastName = "Введите фамилию";
    if (!formData.email.trim()) newErrors.email = "Введите почту";

    // const minPhoneLength = 10;
    // const phoneCodeLength = formData.country?.phoneCode?.length || 0;
    // const requiredPhoneLength = phoneCodeLength + minPhoneLength;

    // if (!formData.phone.trim() || formData.phone.length < minPhoneLength) {
    //   newErrors.phone = `Введите корректный номер (${minPhoneLength} цифр минимум)`;
    // } else if (formData.phone.length > requiredPhoneLength) {
    //   newErrors.phone = `Слишком длинный номер (максимум ${requiredPhoneLength} цифр)`;
    // }

    if (!formData.position) newErrors.position = "Выберите должность";
    if (!formData.branch) newErrors.branch = "Выберите филиал";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useValidation;
