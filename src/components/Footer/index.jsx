import { Link } from "react-router-dom"
import "./styles.css"

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="site-map">
                <h2>Website Map</h2>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/jokes">Jokes</Link></li>
                    <li><Link to="/aboutchucknorris">About Chuck Norris</Link></li>
                    <li><Link to="/aboutthecreators">About the creators</Link></li>
                    <li><Link to="/register">Sign In</Link></li>
                </ul>
            </div>
        </footer>
    )
}