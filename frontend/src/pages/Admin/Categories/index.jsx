import { useEffect, useState } from "react";
import {
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/category";
import Input from "../../../components/General/Input";
import Button from "../../../components/General/Button";
import Form from "../../../components/General/Form";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    value: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };
    fetchCategories();
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

  return (
    <div className="panel-container">
      <h1>Admin - Categorias</h1>
      <ul className="categories-list-container">
        {categories.map((category) => (
          <li className="category-actions-row" key={category.id}>
            <strong>{category.value}</strong>
            <p>{category.description}</p>
            <div className="actions-buttons">
              <Button onClick={() => handleEditCategory(category.id)}>
                Editar
              </Button>
              <Button onClick={() => handleDeleteCategory(category.id)}>
                Deletar
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {isEditing && (
        <Form classname="edit-form">
          <h2>Editar Categoria</h2>
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
          <Button onClick={handleUpdateCategory}>Atualizar</Button>
          <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
        </Form>
      )}
    </div>
  );
}
