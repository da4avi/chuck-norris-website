import { Link, Route, Routes } from "react-router-dom";
import "./styles.css"

export default function Admin() {
  return (
    <div className="panel-container">
      <h1>Painel Admin</h1>
      <nav>
        <Link to="/admin/users">Gerenciar Usuários</Link>
        <Link to="/admin/categories">Gerenciar Categorias</Link>
      </nav>
    </div>
  );
}
