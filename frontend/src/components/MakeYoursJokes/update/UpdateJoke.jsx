/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { updateJoke } from "../../../api/joke";
import Button from "../../General/Button";
import Form from "../../General/Form";
import Input from "../../General/Input";
import "./styles.css";

export default function UpdateJoke({ jokeId, onUpdate, onClose }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    "animal",
    "career",
    "celebrity",
    "dev",
    "fashion",
    "food",
    "history",
    "money",
    "movie",
    "music",
    "science",
    "sport",
    "travel",
  ];

  const [joke, setJoke] = useState({
    category: "Select a category",
    strValue: "",
  });

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

  const handleCategorySelect = (category) => {
    setJoke((prevJoke) => ({ ...prevJoke, category }));
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="dropdown" ref={dropdownRef}>
        <Button
          type="button"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          {joke.category}
        </Button>
        {dropdownOpen && (
          <ul className="dropdownLinks activeDropdown">
            {categories.map((cat, index) => (
              <li key={index} onClick={() => handleCategorySelect(cat)}>
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Input
        required={true}
        label={"Joke"}
        name={"joke"}
        value={joke.strValue}
        onChange={(e) =>
          setJoke((prevJoke) => ({ ...prevJoke, strValue: e.target.value }))
        }
      />
      <Button type={"submit"} disabled={loading}>
        {loading ? "Loading..." : "Update Joke"}
      </Button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </Form>
  );
}
