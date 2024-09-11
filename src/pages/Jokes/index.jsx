import './styles.css';
import { useState, useEffect, useRef } from 'react';
import icon from '../../assets/chuckNorrisIcon.webp'

export default function Jokes() {
    const [joke, setJoke] = useState();
    const [loading, setLoading] = useState(false)
    const [dropdown, setDropdown] = useState(false);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    const categories = [
        "animal", "career", "celebrity", "dev", "fashion",
        "food", "history", "money", "movie", "music",
        , "science", "sport", "travel"
    ];
    //bad jokes: "religion", "explicit", "political"

    const getJokeByCategory = async (category) => {
        setLoading(true)
        try {
            const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const result = await response.json();
            setJoke(result.value);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdown]);

    return (
        <div className='bg'>
        <section className='jokes-section'>
            <h2>Select a category to get a random joke</h2>

            <div className='joke'>
                {loading && <img className='img-loading' src={icon} height={40} width={40} />}
                {joke && !loading ? joke : loading || "Select a category to see a joke"}
            </div>

            <div className="dropdown" ref={dropdownRef}>
                <button onMouseEnter={toggleDropdown} onClick={toggleDropdown}>
                    Categories
                </button>
                <ul className={`dropdownLinks ${dropdown ? "activeDropdown" : "inactiveDropdown"}`}>
                    {categories.map((category, index) => (
                        <li key={index} onClick={() => getJokeByCategory(category)}>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>

        </section>
        </div>
    );
}