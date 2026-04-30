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
            console.log(error.response)
            // alert(error.response?.data?.message) || "Register failed"
        }
    }

    return (
        <div className="  max-w-2xl m-auto">
            <h3 className="text-3xl mb-5 text-center uppercase">Register Now</h3>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col ">
                    <input type="text" name="name" className="border border-gray-300 p-3 mb-3" placeholder="Name" value={form.name} onChange={e => handleInputChange(e)} />
                    <input type="email" name="email" className="border border-gray-300 p-3 mb-3" placeholder="Email" value={form.email} onChange={e => handleInputChange(e)} />
                    <input type="password" name="password" className="border border-gray-300 p-3 mb-3" placeholder="Password" value={form.password} onChange={e => handleInputChange(e)} />

                    <button className="bg-green-600 p-3 text-xl text-white cursor-pointer hover:bg-green-800">Register Now</button></div>
            </form></div>

    )
}