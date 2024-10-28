import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { deleteJoke, getJokes } from "../../../api/joke";
import "./styles.css";
import UpdateJoke from "../update/UpdateJoke";

export default function ListAllJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJokeId, setEditingJokeId] = useState(null);

  const fetchJokes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getJokes();
      setJokes(response);
    } catch (err) {
      console.error(err);
      setError("Error loading jokes.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jokeId) => {
    if (window.confirm("Are you sure you want to delete this joke?")) {
      try {
        await deleteJoke(jokeId);
        setJokes((prevJokes) => prevJokes.filter((joke) => joke.id !== jokeId));
      } catch (err) {
        console.error(err);
        setError("Failed to delete the joke.");
      }
    }
  };

  const handleEdit = (jokeId) => {
    setEditingJokeId(editingJokeId === jokeId ? null : jokeId);
  };

  const closeEditForm = () => {
    setEditingJokeId(null);
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="jokesListContainer">
      <ul>
        {jokes.length === 0 ? (
          <p>You haven&apos;t created any jokes yet</p>
        ) : (
          jokes.map((joke) => (
            <li key={joke.id}>
              <div className="actionContainer">
                <div className="showJokeContainer">
                  <div>
                    <div>
                      <strong>{joke.category}</strong>
                    </div>
                    <div>{joke.value}</div>
                  </div>
                  <div className="actionsButton">
                    <button
                      onClick={() => handleEdit(joke.id)}
                      title="Edit Joke"
                      aria-label="Edit Joke"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(joke.id)}
                      title="Delete Joke"
                      aria-label="Delete Joke"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
                {editingJokeId === joke.id && (
                  <UpdateJoke
                    jokeId={joke.id}
                    onUpdate={fetchJokes}
                    onClose={closeEditForm}
                  />
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
