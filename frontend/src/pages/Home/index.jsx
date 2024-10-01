import { Link } from 'react-router-dom'
import './styles.css'
import { useEffect } from 'react';
import { useState } from 'react'
import translate from "translate";
translate.engine = "google";
import { useTranslation } from 'react-i18next'

export default function Home() {
    const [t, i18n] = useTranslation("global.json")

    const changeLang = (lang) => {
        i18n.changeLanguage(lang)
    }

    const [joke, setJoke] = useState(<>Loading...</>)

    async function getRandomJoke() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        }

        const response = await fetch("https://api.chucknorris.io/jokes/random", requestOptions)

        if (!response.ok) {
            throw new Error("Error to get a joke")
        }

        const data = await response.json();

        const translated = await translate(data.value, "pt");

        return setJoke(translated)
    }

    useEffect(() => {
        if (!joke || joke != "Loading...") {
            getRandomJoke()
        }
        console.log(i18n)
    }, [])

    
    return (

        <div className='home' >
            <section className='texto'>
                <h2>Who was</h2>
                <br />
                <button onClick={ () => changeLang("en") } className='m-2'>en</button>
                <button onClick={ () => changeLang("pt") } className='m-2'>pt</button>
                <p className='p'>{t("home")}</p>
                <br />
                <li><Link to="/aboutchucknorris">Read More</Link></li>
            </section>
            <section className='joke'>
                <h2>Random joke</h2>
                <br />
                <p className='p'>{joke}</p>
                <br />
                <button onClick={() => getRandomJoke()} type="button">New Joke</button>
                <br />
                <br />
                <li><Link to="/jokes">More Jokes</Link></li>
            </section>
        </div>

    )
}