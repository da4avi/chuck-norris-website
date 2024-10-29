/* eslint-disable react/prop-types */
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
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        className={` styledInput ${className}`}
        onChange={onChange}
        required={required}
        style={{ width: width }}
      />
    </>
  );
}
