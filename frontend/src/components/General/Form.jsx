import "./styles/form.css";

export default function Form({ children, onSubmit }) {
  return (
    <form className="formStyled" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
