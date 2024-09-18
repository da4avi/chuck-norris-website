import './styles.css'
import { FaGithub, FaLink } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import matheusPhoto from "../../assets/matheusPhoto.jpg"
import daviPhoto from "../../assets/daviPhoto.jpg"

export default function AboutTheCreators() {
    return (
        <>
            <section className='creators-container'>
                <h1>About the Creators</h1>

                <div className='creators'>
                    <div className='creator'>
                        <img src={daviPhoto} alt="Davi Finkler Photo" />
                        <h3>Davi Finkler</h3>
                        <p>Software Developer</p>
                        <div className="icons">
                            <a href="https://github.com/da4avi" target='_blank'><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/davi-finkler-aa185b266/" target='_blank'><FaLinkedin /></a>
                        </div>
                    </div>
                    <div className='creator'>
                        <img src={matheusPhoto} alt="Matheus Martins Photo" />
                        <h3>Matheus Martins</h3>
                        <p>Node | React.js Developer</p>
                        <div className="icons">
                            <a href="https://github.com/matheusmartinsviana" target='_blank'><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/matheusmartinsviana/" target='_blank'><FaLinkedin /></a>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}