/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import Button from "../../General/Button";
import Form from "../../General/Form";
import Input from "../../General/Input";
import { createJoke } from "../../../api/joke";
import { getAllCategories } from "../../../api/category";

export default function AddJoke() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [joke, setJoke] = useState({
    category: "Select a category",
    strValue: "",
  });

  const validateJoke = (joke) => {
    const spaceRegex = /^(?=.*\s).*$/;
    if (!spaceRegex.test(joke.strValue)) {
      return "The joke must contain at least one space between letters.";
    }

    if (joke.strValue.length < 10) {
      return "The joke must be at least 10 characters long.";
    }

    if (joke.strValue.length > 200) {
      return "The joke must be no more than 200 characters long.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!joke.category || joke.category === "Select a category") {
        return setError("Please select a category");
      }

      const validationError = validateJoke(joke);
      if (validationError) {
        return setError(validationError);
      }

      setLoading(true);
      const response = await createJoke(joke);

      if (!response.ok) {
        setError(response.message);
      }
      setSuccess("Joke created successfully");
      setJoke({ category: "Select a category", strValue: "" });
      setTimeout(() => {
        setSuccess("");
        setError("");
        setLoading(false);
      }, 3000);
      window.location.reload();
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setJoke({ ...joke, category: e.target.value });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories(); // Await the API call
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          console.error("Expected an array of categories", categoriesData);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

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
        label={"Joke"}
        name={"joke"}
        value={joke.strValue}
        onChange={(e) => setJoke({ ...joke, strValue: e.target.value })}
      />
      <Button type={"submit"} disabled={loading}>
        {loading ? "Loading" : "Create Joke"}
      </Button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </Form>
  );
}
