/* eslint-disable react/prop-types */
import "./styles/input.css";
export default function Input({
  name,
  className,
  value,
  label,
  onChange,
  required,
  type = "text",
  width,
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
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
