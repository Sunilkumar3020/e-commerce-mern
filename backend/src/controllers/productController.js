import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

export const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;
        // validation
        if (!name || !price) {
            return res.status(400).json({ message: "Name and price are required" })
        }
        // check image
        if (!req.file) {
            return res.status(400).json({
                message: "Product image is required"
            })
        }

        // upload image to cloudinary
        let uploadedImage;
        try {

            uploadedImage = await cloudinary.uploader.upload(req.file.path, {
                folder: "products"
            });
        } catch (error) {
            console.error("Cloudinary Error:", error)

            return res.status(500).json({ message: "Image upload failed.", error: error.message })
        }

        // Create product
        const product = await Product.create({
            name, price, description, category,
            stock: stock || 0,
            image: uploadedImage.secure_url,
            createdBy: req?.user?._id

        })

        res.status(201).json({
            message: "Product created successfully",
            product
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

// Get All products

// export const getProducts = async (req, res) => {
//     try {

//         const queryObj = { ...req.query };

//         const removeFields = ["page", "limit", "sort", "fields", "keyword"];
//         removeFields.forEach((el) => delete queryObj[el]);

//         let queryStr = JSON.stringify(queryObj);

//         queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, m => `$${m}`);



//         let query = Product.find(JSON.parse(queryStr));
//         if (req.query.sort) {
//             query = query.sort(req.query.sort)
//         }

//         const products = await query



//         res.status(200).json(products)
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

export const getProducts = async (req, res) => {
    try {
        let queryObj = { ...req.query }
        const removeFields = ["page", "limit", "sort", "fields", "keywords"]
        removeFields.forEach(el => delete queryObj[el])
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, m => `$${m}`)

        query = Product = await Product.find(JSON.parse(queryStr))
        console.log("Query Object:", queryObj)
        console.log("Query String:", queryStr)
        res.status(200).json({ message: "" })

        // search
        if (req.query.keyword) {
            query = query.find({
                name: {
                    $regex: req.query.keyword,
                    $options: "i"
                }
            })
        }
        // Category filter (case insensitive)
        if (req.query.category) {
            query = query.find({
                category: {
                    $regex: `^${req.query.category}$`,
                    $options: "i"
                }
            })
        }

        //Sorting
        if(req.query.sort){
            //Example: sort = price , -createdAt
            const sortBy = req.query.sort.split(',').join(" ");
            query = query.sort(sortBy)

        }else{
            query = query.sort("-createAt")
        }

        // Pagination

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) ||10
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// getProductsByCategory 

export const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;

        const products = await Product.find({ category: { $regex: `^${category}$`, $options: "i" } })
        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found in this category"
            })
        }
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Get Single Product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Invalid product Id" })
    }
}


// Update Product (Admin)
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        //Update fields
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.description = req.body.description || product.description;
        product.category = req.body.category || product.category;
        product.stock = req.body.stock ?? product.stock;

        //if new image upload
        if (req.file) {
            const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
                folder: "products"
            });
            product.image = uploadedImage.secure_url;
        }
        const updatedProduct = await product.save()
        res.status(200).json({
            message: "Product updated",
            product: updatedProduct
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete Product (Admin)

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        await product.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}