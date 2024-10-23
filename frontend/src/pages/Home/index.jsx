import { Link } from 'react-router-dom'
import './styles.css'
import { useEffect, useState } from 'react';
import translate from "translate";
translate.engine = "google";
import { useTranslation } from 'react-i18next'

export default function Home() {
    const [t, i18n] = useTranslation("global")

    const [joke, setJoke] = useState(<>Loading...</>)
    const [jokeTranslated, setJokeTranslated] = useState(<>Loading...</>)

    async function getRandomJoke() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        }

        const response = await fetch("http://localhost:8000/api/v1/joke/random", requestOptions)

        if (!response.ok) {
            throw new Error("Error to get a joke")
        }

        const data = await response.json();

        const translated = await translate(data.value, "pt");
        return setJoke(data.value), setJokeTranslated(translated)
    }

    useEffect(() => {
        if (!joke || joke != "Loading...") {
            getRandomJoke()
        }
    }, [])


    return (

        <div className='home' >
            <section className='texto'>
                <h2>{t('whowas')}</h2>
                <br />
                <p className='p'>{t('home')}</p>
                <br />
                <li><Link to="/aboutchucknorris">{t('readmore')}</Link></li>
            </section>
            <section className='joke'>
                <h2>{t('randomjoke')}</h2>
                <br />
                <p className='p'>{i18n.language === "en" ? joke : jokeTranslated}</p>
                <br />
                <button onClick={() => getRandomJoke()} type="button">{t('newjoke')}</button>
                <br />
                <br />
                <li><Link to="/jokes">{t('morejokes')}</Link></li>
            </section>
        </div>

    )
}