import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  blockUser,
  unlockUser,
} from "../../../api/user";
import Input from "../../../components/General/Input";
import Button from "../../../components/General/Button";
import Form from "../../../components/General/Form";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserById(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch {
      setError("Failed to delete user");
    }
  };

  const handleToggleBlockUser = async (id, isBlocked) => {
    try {
      const updatedUser = isBlocked
        ? await unlockUser(id)
        : await blockUser(id);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, role: updatedUser.role } : user
        )
      );
    } catch {
      setError("Failed to block/unblock user");
    }
  };

  const handleEditUser = async (id) => {
    try {
      const user = await getUserById(id);
      setSelectedUser(user);
      setFormData({ name: user.name, email: user.email, password: "" });
      setIsEditing(true);
    } catch {
      setError("Failed to load user details");
    }
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await updateUserById(formData, selectedUser.id);
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setIsEditing(false);
      setSelectedUser(null);
      setFormData({ name: "", email: "", password: "" });
    } catch {
      setError("Failed to update user");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="panel-container">
      <h1>Admin - Usuários</h1>
      <ul className="users-list-container">
        {users.map((user) => (
          <li className="user-actions-row" key={user.id}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
            <div className="actions-buttons">
              <Button onClick={() => handleEditUser(user.id)}>Editar</Button>
              <Button onClick={() => handleDeleteUser(user.id)}>Deletar</Button>

              <Button
                onClick={() =>
                  handleToggleBlockUser(
                    user.id,
                    user.role === "blocked" ? true : false
                  )
                }
              >
                {user.role === "blocked" ? "Unban" : "Ban"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {isEditing && (
        <Form className="edit-form">
          <h2>Editar Usuário</h2>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nova Senha"
          />
          <Button onClick={handleUpdateUser}>Atualizar</Button>
          <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
        </Form>
      )}
    </div>
  );
}
