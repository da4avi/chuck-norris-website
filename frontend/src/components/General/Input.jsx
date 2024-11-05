import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./styles/input.css";

export default function Input({
  name,
  className,
  value,
  label,
  onChange,
  required,
  type,
  placeholder,
  width,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div className="input-container" style={{ width }}>
        <input
          disabled={disabled}
          type={type === "password" && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          name={name}
          value={value}
          className={`styledInput ${className}`}
          onChange={onChange}
          required={required}
        />
        {/* {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )} */}
      </div>
    </>
  );
}
