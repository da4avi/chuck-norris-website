import { useRef, useState, useEffect } from "react";
import Button from "../General/Button";
import Form from "../General/Form";
import Input from "../General/Input";
import { createJoke } from "../../api/joke";

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
        strValue: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await createJoke(joke);

            if (!response.ok) {
                setError(response.message)
            }

            setSuccess("Joke created successfully");
            setJoke({ category: "Select a category", strValue: "" });
        } catch (error) {
            setError("An unexpected error occurred");
        } finally {
            setTimeout(() => {
                setJoke({
                    category: "Select a category",
                    strValue: ""
                })
                setSuccess("")
                setError("")
                setLoading(false)
            }, 2000)
        }
    };

    const handleCategorySelect = (category) => {
        setJoke({ ...joke, category });
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
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
                <button type="button" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={dropdownOpen}>
                    {joke.category}
                </button>
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
                label={"Joke"}
                name={"joke"}
                value={joke.strValue}
                onChange={(e) => setJoke({ ...joke, strValue: e.target.value })}
            />
            <Button type={"submit"} disabled={loading}>{loading ? "Loading" : "Create Joke"}</Button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </Form>
    );
}
