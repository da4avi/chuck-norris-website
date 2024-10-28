import { useState, useEffect } from "react";
import "./styles.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddJoke from "../../components/MakeYoursJokes/add/AddJoke";
import ListAllJokes from "../../components/MakeYoursJokes/listAllJokes/ListAllJokes";
import UpdateJoke from "../../components/MakeYoursJokes/update/UpdateJoke";
import Button from "../../components/General/Button";
import { getJokes } from "../../api/joke";

export default function MakeYoursJokes() {
  const [showAddJoke, setShowAddJoke] = useState(false);
  const [showUpdateJoke, setShowUpdateJoke] = useState(null);
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className="panel-container">
      <h1>Jokes</h1>
      <div className="addJokesContainer">
        <Button onClick={() => setShowAddJoke(!showAddJoke)}>
          {!showAddJoke ? (
            <>
              Add new joke <FontAwesomeIcon icon={faPlus} />
            </>
          ) : (
            <>Close</>
          )}
        </Button>
        {showAddJoke && <AddJoke onJokeAdded={fetchJokes} />}{" "}
        {/* Passa a função de atualização */}
      </div>
      <ListAllJokes
        jokes={jokes}
        onEditJoke={(jokeId) => setShowUpdateJoke(jokeId)}
        loading={loading}
        error={error}
      />
      {showUpdateJoke && (
        <UpdateJoke
          jokeId={showUpdateJoke}
          onClose={() => setShowUpdateJoke(null)}
          onUpdate={fetchJokes}
        />
      )}
    </div>
  );
}
