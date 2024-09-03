import { Link } from 'react-router-dom'
import './styles.css'

export default function Home () {
    return (
        <>
        <h1>Home</h1>
        <h2>Who was</h2>
        <p>Chuck Norris is a martial artist, actor, and cultural icon, famous for his tough-guy image and legendary roundhouse kick. Rising to fame in the 1970s with movies like Way of the Dragon, he later became a TV star in Walker, Texas Ranger. Beyond acting, Norris has founded martial arts organizations and programs like Kickstart Kids, impacting thousands of lives. He’s also a pop culture legend thanks to the humorous "Chuck Norris Facts."</p>
        <li><Link to="/aboutchucknorris">Read More</Link></li>
        </>
    )
}