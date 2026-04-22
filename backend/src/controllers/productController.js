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
            console.log("ENV CHECK:");
            console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
            console.log("API_KEY:", process.env.API_KEY);
            console.log("API_SECRET:", process.env.API_SECRET);
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

export const getProducts = async (req, res) => {
    try {
        // const queryObj = { ...req.query };

        // const removeFields = ["sort", "page", "limit", "keyword"];


        // removeFields.forEach((value) => delete queryObj[value]);


        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, m => `$${m}`);

        // let query = Product.find(JSON.parse(queryStr))
        console.log("IP", req.ip)
        const queryObj = { ...req.query };

        const removeFields = ["page", "limit", "sort", "fields", "keyword"];
        removeFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, m => `$${m}`);

        // console.log("queryStr", queryStr)

        let query = Product.find(JSON.parse(queryStr));
        if (req.query.sort) {
            query = query.sort(req.query.sort)
        }

        const products = await query

        // const queryObj = { ...req.query };

        // const formattedQuery = {};

        // for (let key in queryObj) {
        //     if (key.includes("[")) {
        //         const field = key.split("[")[0];            // price
        //         const operator = key.match(/\[(.*?)\]/)[1]; // lte

        //         if (!formattedQuery[field]) {
        //             formattedQuery[field] = {};
        //         }

        //         formattedQuery[field][`$${operator}`] = Number(queryObj[key]);
        //     } else {
        //         formattedQuery[key] = queryObj[key];
        //     }
        // }

        // console.log("FINAL QUERY:", formattedQuery);

        // const products = await Product.find(formattedQuery);

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export const getProducts = async (req, res) => {
//     try {
//         let queryObj = { ...req.query };

//         const removeFields = ["page", "limit", "sort", "fields", "keyword"];
//         removeFields.forEach(el => delete queryObj[el]);

//         let queryStr = JSON.stringify(queryObj);

//         queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, m => `$${m}`);

//         let formattedQuery = JSON.parse(queryStr);

//         // convert numbers
//         if (formattedQuery.price) {
//             Object.keys(formattedQuery.price).forEach(key => {
//                 formattedQuery.price[key] = Number(formattedQuery.price[key]);
//             });
//         }

//         const products = await Product.find(formattedQuery);

//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
//   };    

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