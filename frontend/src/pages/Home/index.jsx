import { Link } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import translate from "translate";
translate.engine = "google";
import { useTranslation } from "react-i18next";
import { getRandomJoke } from "../../api/joke";
import icon from "../../assets/chuckNorrisIcon.webp";

export default function Home() {
  const [t, i18n] = useTranslation("global");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [joke, setJoke] = useState("");
  const [jokeTranslated, setJokeTranslated] = useState("");

  async function getRandomJokes() {
    try {
      setLoading(true);
      const data = await getRandomJoke();
      const translated = await translate(data.value, "pt");
      setJoke(data.value);
      setJokeTranslated(translated);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError("Error to get a joke", error.message);
    }
  }

  useEffect(() => {
    getRandomJokes();
  }, []);

  return (
    <div className="home">
      <section className="texto">
        <h2>{t("whowas")}</h2>
        <br />
        <p className="p">{t("home")}</p>
        <br />
        <li>
          <Link to="/aboutchucknorris">{t("readmore")}</Link>
        </li>
      </section>
      <section className="joke">
        <h2>{t("randomjoke")}</h2>
        <br />
        {loading ? (
          <img className="img-loading" src={icon} height={40} width={40} />
        ) : (
          <p className="p p-joke">
            {i18n.language === "en" ? joke : jokeTranslated}
          </p>
        )}
        {error && (
          <p className="loading-message">
            Error to get joke, await 50 seconds. And try again
          </p>
        )}
        <br />
        <button
          className="get-joke-button"
          onClick={getRandomJokes}
          type="button"
        >
          {t("newjoke")}
        </button>
        <br />
        <br />
        <li>
          <Link to="/jokes">{t("morejokes")}</Link>
        </li>
      </section>
    </div>
  );
}
