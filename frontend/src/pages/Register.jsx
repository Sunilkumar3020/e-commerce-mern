import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ''
    })
    const handleInputChange = e => {
        setForm(prevInputFields => (
            {
                ...prevInputFields,
                [e.target.name]: e.target.value
            }
        ))
    }
    const handleFormSubmit = async e => {
        e.preventDefault()
        try {
            await register(form)
            navigate("/")
        } catch (error) {
            alert(error.response?.data?.message) || "Register failed"
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={e => handleInputChange(e)} />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={e => handleInputChange(e)} />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={e => handleInputChange(e)} />

            <button>Register Now</button>
        </form>

    )
}