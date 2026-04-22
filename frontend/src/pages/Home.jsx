import { useEffect, useState } from "react"
import API from "../api/axios"

export default function Home() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        API.get('/products').then(res => setProducts(res.data))
    }, [])

    return (
        <div>
            <h2>Products</h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 ">
                {products.map(product => (
                    <div key={product._id} className="border border-gray-300 flex justify-center flex-col  items-center">
                        <img src={product.image} width="100" alt="" />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <button className="bg-lime-600 p-1.5 cursor-pointer rounded-xl">Add to Cart</button>
                    </div>
                ))}
            </div>
           
        </div>

    )
}