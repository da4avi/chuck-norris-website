import { Link } from "react-router-dom"
import "./styles.css"
import chuckNorrisIcon from "../../assets/chuckNorrisIcon.webp"
import { useTranslation } from 'react-i18next'

export default function Footer() {
    const [t] = useTranslation("global")
    return (
        <footer className="main-footer">
            <div>
                <img className='chuck-norris-icon' src={chuckNorrisIcon} alt="Who was Chuck Norris" width={49} height="auto" />
            </div>
            <div className="site-map">
                <h2>{t('websitemap')}</h2>
                <ul>
                    <li><Link to="/">{t('navhome')}</Link></li>
                    <li><Link to="/jokes">{t('navjokes')}</Link></li>
                    <li><Link to="/aboutchucknorris">{t('navabtcn')}</Link></li>
                    <li><Link to="/aboutthecreators">{t('navabttc')}</Link></li>
                    <li><Link to="/register">{t('signin')}</Link></li>
                </ul>
            </div>
        </footer>
    )
}