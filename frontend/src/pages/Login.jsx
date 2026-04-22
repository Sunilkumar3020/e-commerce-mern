import { useState } from "react"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
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
        navigate('/')
    }
    return (
        <div className="  max-w-2xl m-auto">
            <h3 className="text-3xl mb-5 text-center uppercase">Welcome, Login here !</h3>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col "><input type="email" placeholder="Email" value={form.email} name="email" className="border mb-3 border-gray-300 p-3" onChange={e => handleInputChange(e)} />
                    <input type="password" placeholder="Password" className="border border-gray-300 p-3 border mb-3" name="password" value={form.password} onChange={e => handleInputChange(e)} />
                    <button className="bg-green-600 p-3 text-xl text-white cursor-pointer hover:bg-green-800">Login</button></div>
            </form></div>

    )
}