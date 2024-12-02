/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { updateJoke } from "../../../api/joke";
import { getAllCategories } from "../../../api/category";
import Button from "../../General/Button";
import Form from "../../General/Form";
import Input from "../../General/Input";
import "./styles.css";
import Loading from "../../General/Loading";

export default function UpdateJoke({ jokeId, onUpdate, onClose }) {
  // Estados
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [joke, setJoke] = useState({
    category: "Select a category",
    strValue: "",
  });

  // Carregar categorias
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  // Funções de Manipulação
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!joke.category || joke.category === "Select a category") {
      return setError("Please select a category");
    }

    try {
      setLoading(true);
      const response = await updateJoke(jokeId, joke);

      if (response.error) {
        setError(response.message);
        return;
      }

      setSuccess("Joke updated successfully");
      setJoke({ category: "Select a category", strValue: "" });
      onUpdate();
      onClose();
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
    }
  };

  const handleCategoryChange = (e) => {
    setJoke({ ...joke, category: e.target.value });
  };

  // Exibir o carregamento enquanto as categorias não estiverem carregadas
  if (!categories.length || loading) return <Loading />;

  // JSX do componente
  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={joke.category}
          onChange={handleCategoryChange}
          required
        >
          <option value="Select a category" disabled>
            Select a category
          </option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.value}>
              {cat.value}
            </option>
          ))}
        </select>
      </div>

      <Input
        required={true}
        label="Joke"
        name="joke"
        value={joke.strValue}
        onChange={(e) =>
          setJoke((prevJoke) => ({ ...prevJoke, strValue: e.target.value }))
        }
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Update Joke"}
      </Button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </Form>
  );
}
