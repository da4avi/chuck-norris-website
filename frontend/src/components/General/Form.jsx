import "./styles/form.css";

export default function Form({ classname, children, onSubmit }) {
  return (
    <form className={`formStyled ${classname}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
