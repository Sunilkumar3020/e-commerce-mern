import { useState } from "react"
import API from "../api/axios"

export default function AdminAndProduct() {
    const [form, setForm] = useState({
        name: "",
        description: '',
        price: '',
        category: '',
        stock: ''
    })

    const [image, setImage] = useState(null)

    const handleInputChange = e => {
        setForm((prevForm) => (
            {
                ...prevForm,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleFormSubmit = async e => {
        e.preventDefault()
        const data = new FormData();
        Object.keys(form).forEach(key => data.append(key, form[key]))
        data.append("image", image)
        await API.post('/products', data);
        alert("Product Add")
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={e => handleInputChange(e)} />
            <input type="text" placeholder="Description" name="description" value={form.description} onChange={e => handleInputChange(e)} />
            <input type="number" name="price" placeholder="Price" value={form.price} onChange={e => handleInputChange(e)} />
            <input type="text" name="category" placeholder="Category" value={form.category} onChange={e => handleInputChange(e)} />
            <input type="text" name="stock" placeholder="Stock" value={form.stock} onChange={e => handleInputChange(e)} />
            <button>Add Product</button>
        </form>

    )
}