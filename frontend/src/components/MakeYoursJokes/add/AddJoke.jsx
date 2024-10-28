/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import Button from "../../General/Button";
import Form from "../../General/Form";
import Input from "../../General/Input";
import { createJoke } from "../../../api/joke";

export default function AddJoke() {
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
    try {
      if (!joke.category || joke.category === "Select a category") {
        return setError("Please select a category");
      }
      setLoading(true);
      const response = await createJoke(joke);

      if (!response.ok) {
        setError(response.message);
      }

      setSuccess("Joke created successfully");
      setJoke({ category: "Select a category", strValue: "" });
      setTimeout(() => {
        setJoke({
          category: "Select a category",
          strValue: "",
        });
        setSuccess("");
        setError("");
        setLoading(false);
      }, 3000);
      window.location.reload();
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setTimeout(() => {
        setSuccess("");
        setError("");
        setLoading(false);
      }, 500);
    }
  };

  const handleCategorySelect = (category) => {
    setJoke({ ...joke, category });
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