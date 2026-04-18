import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
export default function Navbar() {
    const { user, logout } = useAuth()
    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            throw error
        }
    }
    return (
        <nav>
            <Link to="/" >Home</Link>
            {user ? (<>
                <span>Welcome, {user.name}</span>
                {user.isAdmin && (
                    <Link to='/admin/add-product'>Add Product </Link>
                )}
                <button onClick={handleLogout}> Logout</button>
            </>) : (<>
                <Link to="/login" >Login</Link>
                <Link to="/register" >Register</Link>
            </>)}
        </nav>
    )
}