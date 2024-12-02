import { useEffect, useState } from "react";
import {
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/category";
import Input from "../../../components/General/Input";
import Button from "../../../components/General/Button";
import Modal from "../../../components/General/Modal"; // Importando o Modal
import "./styles.css";
import Loading from "../../../components/General/Loading";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    value: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    };
    fetchCategories();
    setLoading(false);
  }, []);

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleEditCategory = async (id) => {
    const category = await getCategory(id);
    setSelectedCategory(category);
    setFormData({ value: category.value, description: category.description });
    setIsEditing(true);
  };

  const handleUpdateCategory = async () => {
    const updatedCategory = await updateCategory(selectedCategory.id, formData);
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setIsEditing(false);
    setSelectedCategory(null);
    setFormData({ value: "", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  if (loading) return <Loading allPage={true} />;

  return (
    <div className="panel-container">
      <h1>Admin - Categories</h1>

      {/* Tabela de Categorias */}
      <table className="categories-table">
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.value}</td>
              <td>{category.description}</td>
              <td className="actions-buttons-category">
                <Button onClick={() => handleEditCategory(category.id)}>
                  Edit
                </Button>
                <Button
                  className="delete-category-button"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para edição */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <h2>Edit Category</h2>
        <Input
          type="text"
          name="value"
          value={formData.value}
          onChange={handleChange}
          placeholder="Valor"
        />
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
        />
        <div className="edit-buttons-container">
          <Button className="button-update" onClick={handleUpdateCategory}>
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
