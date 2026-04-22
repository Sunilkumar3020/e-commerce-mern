import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <nav className="flex justify-between mb-5 bg-gray-200 p-5">
            <Link to="/" className="text-xl" >Home</Link>
            <div>
                {user ? (<>
                    <span>Welcome, {user.name}</span>
                    {user.isAdmin && (
                        <Link to='/admin/add-product' className="text-xl">Add Product </Link>
                    )}
                    <button onClick={handleLogout} className="ms-5 bg-red-500 p-3 text-white cursor-pointer"> Logout</button>
                </>) : (<>
                    <Link to="/login" className="text-xl mr-5" >Login</Link>
                    <Link to="/register" className="text-xl" >Register</Link>
                </>)}
            </div>
        </nav>
    )
}