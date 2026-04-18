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
            {products.map(product => (
                <div key={product._id}>
                    <img src={product.image} width="100" alt="" />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                </div>
            ))}

        </div>
    )
}