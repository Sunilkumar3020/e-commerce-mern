import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register, emailCheck } = useAuth();
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query)
    const [emailStatus, setEmailStatus] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ''
    })

    const validateForm = () => {
        const newErrors = {};
        // name field validation
        if (!form.name.trim()) {
            newErrors.name = "Name is required"
        }

        // email field validation

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email format";
        }

        // password field validation

        if (!form.password) {
            newErrors.password = "Password is required";

        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0;

    }
    useEffect(() => {
        validateForm()
    }, [form])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query)
        }, 500)

        return () => clearTimeout(timer)
    }, [query])

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            return setEmailStatus('')
        }
        if (debouncedQuery) {
            const handleEmailChange = async () => {

                try {
                    const res = await emailCheck(debouncedQuery);
                    setEmailStatus(res.data.message)
                } catch (error) {
                    // alert(error.response?.data?.message) || "Register failed"
                    setEmailStatus(error.response?.data?.message || "Error checking email")
                }
            }
            handleEmailChange()
        }
    }, [debouncedQuery])


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
        if (!validateForm()) return;
        try {
            await register(form)
            navigate("/")
        } catch (error) {
            // console.log(error.response)
            alert(error.response?.data?.message) || "Register failed"
        }
    }





    return (
        <div className="  max-w-2xl m-auto">
            <h3 className="text-3xl mb-5 text-center uppercase">Register Now</h3>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col ">
                    <input type="text" name="name" className="border border-gray-300 p-3 mb-3" placeholder="Name" value={form.name} onChange={e => handleInputChange(e)} />
                    <span className="text-red-600 text-sm">{errors.name}</span>
                    <input type="email" name="email" className="border border-gray-300 p-3 mb-3" placeholder="Email" value={form.email} onChange={e => { handleInputChange(e); setQuery(e.target.value) }} />
                    <span className="text-red-600 text-sm">{errors.email}</span>
                    <span className={`text-sm 
                    ${emailStatus.includes('available')
                            ? "text-green-600" : "text-red-600"}`}>{emailStatus}</span>
                    <input type="password" name="password" className="border border-gray-300 p-3 mb-3" placeholder="Password" value={form.password} onChange={e => handleInputChange(e)} />
                    <span className="text-red-600 text-sm">{errors.password}</span>
                    <button className="bg-green-600 p-3 text-xl text-white cursor-pointer hover:bg-green-800">Register Now</button></div>
            </form></div>

    )
}