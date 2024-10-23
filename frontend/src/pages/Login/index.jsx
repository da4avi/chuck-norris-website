import { Link, useNavigate } from 'react-router-dom'
import './styles.css'
import { loginUser } from '../../api/user'
import { useContext, useState } from 'react'
import { AuthContext } from '../../auth/Context'
import { useTranslation } from 'react-i18next'

export default function Login() {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [t] = useTranslation("global")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        try {
            const response = await loginUser(email, password)
            console.log(response)
            if (response.token) {
                login(response.token)
                navigate('/')
            }
        } catch (error) {

        }
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <div className='card'>
                <form action="">
                    <div>
                        <label htmlFor="">Email: </label>
                        <br />
                        <input type="email" name="" id="" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div>
                        <label htmlFor="">{t('password')} </label>
                        <br />
                        <input type="password" name="" id="" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                </form>
                <li>
                    <button type="button" onClick={handleSubmit}>Login</button>
                    <Link to="/register">
                        <button type="button">{t('signin')}</button>
                    </Link>
                </li>
            </div>
        </div>
    )
}