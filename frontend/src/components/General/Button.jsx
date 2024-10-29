/* eslint-disable react/prop-types */
import "./styles/button.css";
export default function Button({
  name,
  value,
  className,
  children,
  type,
  onClick,
  disabled,
}) {
  return (
    <button
      disabled={disabled}
      name={name}
      value={value}
      className={` styledButton ${className}`}
      type={type || "submit"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
