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
        <div className=" max-w-2xl m-auto">
            <h3 className="text-3xl mb-5 text-center uppercase">Product add page</h3>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col"> <input type="text" name="name" placeholder="Product Name" className="border border-gray-300 p-3 mb-3" value={form.name} onChange={e => handleInputChange(e)} />
                    <input type="text" placeholder="Description" name="description" className="border border-gray-300 p-3 mb-3" value={form.description} onChange={e => handleInputChange(e)} />
                    <input type="number" name="price" placeholder="Price" className="border border-gray-300 p-3 mb-3" value={form.price} onChange={e => handleInputChange(e)} />
                    <input type="text" name="category" placeholder="Category" className="border border-gray-300 p-3 mb-3" value={form.category} onChange={e => handleInputChange(e)} />
                    <input type="text" name="stock" placeholder="Stock" className="border border-gray-300 p-3 mb-3" value={form.stock} onChange={e => handleInputChange(e)} />
                    <input type="file" name="image" className="border border-gray-300 p-3 mb-3" onChange={e => handleInputChange(e)} />
                    <button className="bg-green-600 p-3 text-xl text-white cursor-pointer hover:bg-green-800">Add Product</button></div>
            </form>
        </div>

    )
}