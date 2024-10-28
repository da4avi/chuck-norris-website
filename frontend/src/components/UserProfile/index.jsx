import React, { useState, useEffect } from "react";
import { getUser, updateUser, deleteUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
        });
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar usuário", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja deletar seu perfil?")) {
      try {
        await deleteUser();
        alert("Perfil deletado com sucesso!");
        navigate("/login"); // Redireciona para a página de login após a exclusão
      } catch (error) {
        console.error("Erro ao deletar perfil", error);
      }
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
      <button onClick={handleDelete}>Deletar Perfil</button>
    </div>
  );
};

export default UserProfile;
