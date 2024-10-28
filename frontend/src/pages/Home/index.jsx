import { Link } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import translate from "translate";
translate.engine = "google";
import { useTranslation } from "react-i18next";
import { getRandomJoke } from "../../api/joke";

export default function Home() {
  const [t, i18n] = useTranslation("global");

  const [joke, setJoke] = useState(<>Loading...</>);
  const [jokeTranslated, setJokeTranslated] = useState(<>Loading...</>);

  async function getRandomJokes() {
    try {
      const data = await getRandomJoke();
      const translated = await translate(data.value, "pt");
      setJoke(data.value);
      setJokeTranslated(translated);
    } catch (error) {
      console.error("Error to get a joke", error);
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
        <p className="p">{i18n.language === "en" ? joke : jokeTranslated}</p>
        <br />
        <button onClick={getRandomJokes} type="button">
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
