import { useState } from "react"
import { useAuth } from '../context/AuthContext'
export default function Login() {
    const { login } = useAuth()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const handleInputChange = e => {
        setForm((prevFrom) => ({
            ...prevFrom,
            [e.target.name]: e.target.value
        }
        ))
    }
    const handleFormSubmit = async e => {
        e.preventDefault()
        await login(form)
        setForm({
            email: '',
            password: ''
        })
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <input type="email" placeholder="Email" value={form.email} name="email" onChange={e => handleInputChange(e)} />
            <input type="password" placeholder="Password" name="password" value={form.password} onChange={e => handleInputChange(e)} />
            <button>Login</button>
        </form>
    )
}