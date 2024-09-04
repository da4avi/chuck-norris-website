import './styles.css';
import { useState, useRef } from 'react';

export default function Jokes() {
    const [joke, setJoke] = useState()

    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    const categories = [
        "animal", "career", "celebrity", "dev", "explicit", "fashion",
        "food", "history", "money", "movie", "music", "political",
        "religion", "science", "sport", "travel"
    ];

    const getJokeByCategory = (async (e) => {
        try {
            const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${e.target.value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const result = await response.json()

            setJoke(result)
        } catch (error) {

        }
    })

    return (
        <section>
            <h2>Select a category to get a random joke</h2>
            <div className="dropdown">
                <button onClick={toggleDropdown} className="navLink">
                    Categories
                </button>
                <ul className={`dropdownLinks ${dropdown ? "activeDropdown" : "inactiveDropdown"}`}>
                    {categories.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}