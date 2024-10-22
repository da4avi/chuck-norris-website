import './styles.css'
import oldPic from '../../../public/oldpic.jpeg'
import moviePic from '../../../public/wayofthedragon.jpg'
import ufmaPic from '../../../public/ufma.jpg'
import memePic from '../../../public/joke.jpeg'
import { useTranslation } from 'react-i18next'

export default function About() {
    const [t] = useTranslation("global")
    return (
        <div className='about'>
            <h1>{t('aboutchucknorris')}</h1>
            <div>
                <section className='texto'>
                    <h2>{t('earlylife')}</h2>
                    <br />
                    <p>{t('bornon')}</p>
                </section>
                <img src={oldPic} alt="Chuck Norris old picture"/>
            </div>
            <div>
                <section className='texto'>
                    <h2>{t('movies')}</h2>
                    <br />
                    <p>{t('beganhis')}</p>
                </section>
                <img src={moviePic} alt="Chuck Norris in Way of the Dragon"/>
            </div>
            <div>
                <section className='texto'>
                    <h2>{t('projects')}</h2>
                    <br />
                    <p>{t('beyondhis')}</p>
                </section>
                <img src={ufmaPic} alt="Chuck Norris project UFMA"/>
            </div>
            <div>
                <section className='texto'>
                    <h2>{t('cultural')}</h2>
                    <br />
                    <p >{t('alsobecame')}</p>
                </section>
                <img src={memePic} alt="Chuck Norris project UFMA"/>
            </div>
        </div>
    )
}