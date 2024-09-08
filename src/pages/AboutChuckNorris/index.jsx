import './styles.css'
import oldPic from '../../../public/oldpic.jpeg'
import moviePic from '../../../public/wayofthedragon.jpg'
import ufmaPic from '../../../public/ufma.jpg'
import memePic from '../../../public/joke.jpeg'

export default function About() {
    return (
        <div className='about'>
            <h1 className='h1'>About Chuck Norris</h1>
            <div className='div'>
                <section className='texto'>
                    <h2>Early Life</h2>
                    <br />
                    <p className='p'>Chuck Norris, born on March 10, 1940, in Ryan, Oklahoma, is a martial artist, actor, and cultural icon known for his tough-guy image and signature roundhouse kick. Raised in a humble family, Norris developed a strong interest in martial arts while serving in the United States Air Force in South Korea. After returning to the United States, he began competing in karate tournaments, where he won numerous championships, establishing himself as one of the greatest fighters of his time. </p>
                </section>
                <section className='imagem'>
                    <img src={oldPic} alt="Chuck Norris old picture" className='pics' />
                </section>
            </div>
            <div className='div'>
                <section className='texto'>
                    <h2>Movies</h2>
                    <br />
                    <p className='p'>Chuck Norris began his film career in smaller roles, but it was in 1972, with the movie Way of the Dragon, that he gained worldwide fame. In this film, he starred alongside Bruce Lee, delivering one of the most iconic fight scenes in cinema history. This success opened doors for other action movie roles, which became his trademark. Some of Norris's most notable films include Good Guys Wear Black (1978), Lone Wolf McQuade (1983), Code of Silence (1985), and the Missing in Action series (1984-1988). However, it was on television that he solidified his popularity by portraying Cordell Walker in the series Walker, Texas Ranger (1993-2001), where he played a Texas Ranger who fought crime with a combination of martial arts and moral integrity.</p>
                </section>
                <section className='imagem'>
                    <img src={moviePic} alt="Chuck Norris in Way of the Dragon" className='pics' />
                </section>
            </div>
            <div className='div'>
                <section className='texto'>
                    <h2>Projects</h2>
                    <br />
                    <p className='p'>Beyond his career in film and television, Chuck Norris has been involved in various projects and initiatives over the years. He founded the United Fighting Arts Federation (UFAF), an organization dedicated to the teaching and promotion of martial arts. Another significant project is Kickstart Kids, a program that uses martial arts as a tool for character development and life skills in young people. This program has helped thousands of students build confidence, discipline, and moral values.</p>
                </section>
                <section className='imagem'>
                    <img src={ufmaPic} alt="Chuck Norris project UFMA" className='pics' />
                </section>
            </div>
            <div className='div'>
                <section className='texto'>
                    <h2>Cultural Icon</h2>
                    <br />
                    <p className='p'>Chuck Norris also became a pop culture phenomenon with the rise of "Chuck Norris Facts," a series of satirical factoids that exaggerate his abilities and invincibility, turning him into a living legend. These facts further reinforced his tough-guy image, making him a revered and, at the same time, humorous figure in popular imagination.</p>
                </section>
                <section className='imagem'>
                    <img src={memePic} alt="Chuck Norris project UFMA" className='pics' />
                </section>
            </div>
        </div>
    )
}