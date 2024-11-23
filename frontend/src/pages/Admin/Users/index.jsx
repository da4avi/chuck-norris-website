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
import Modal from "../../../components/General/Modal"; // Importar o Modal
import "./styles.css";
import Loading from "../../../components/General/Loading";

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

  // Fetch inicial de usuários
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

  // Deletar usuário
  const handleDeleteUser = async (id) => {
    try {
      await deleteUserById(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch {
      setError("Failed to delete user");
    }
  };

  // Bloquear/Desbloquear usuário
  const handleToggleBlockUser = async (id, isBlocked) => {
    try {
      const updatedUser = isBlocked
        ? await unlockUser(id) // Desbloquear
        : await blockUser(id); // Bloquear

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, role: updatedUser.role } : user
        )
      );
      window.location.reload();
    } catch {
      setError("Failed to block/unblock user");
    }
  };

  // Editar usuário
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

  // Atualizar usuário
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

  // Atualizar estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  if (loading) return <Loading allPage={true} />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="panel-container">
      <table className="table-users">
        <caption className="caption">
          <h1>Admin - Users</h1>
        </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <div className="actions-container">
                  <Button
                    className="button-edit"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="button-delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className={
                      user.role === "blocked"
                        ? "button-unblock"
                        : "button-block"
                    }
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para edição */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <h2>Edit User</h2>
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
        <div className="edit-buttons-container">
          <Button className="button-update" onClick={handleUpdateUser}>
            Update
          </Button>
          <Button className="button-cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
