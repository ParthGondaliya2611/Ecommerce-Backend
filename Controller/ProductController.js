import Product from "../Model/ProductModel.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

//single product
export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ Success: false, message: "Product not found" });
    res.json({
      Success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Success: false, message: "Single Product Error", error });
  }
};

//create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      pricediscount,
      brand,
      rating,
      category,
      quantity,
      stock,
    } = req.body;

    const img = req.files;
    const foldername = "product_img";
    const thumbnails = await uploadCloudinary(img, foldername);

    const product = await Product.create({
      name,
      description,
      price,
      pricediscount,
      brand,
      thumbnail: thumbnails,
      rating,
      category,
      quantity,
      stock,
    });
    res.status(200).send({
      Success: true,
      product,
      message: "Product Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in Create Product", Success: false, error });
  }
};

//update a Product
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      pricediscount,
      brand,
      rating,
      category,
      quantity,
      stock,
    } = req.body;
    const { id } = req.params;
    const img = req.files;
    const foldername = "product_img";
    const thumbnails = await uploadCloudinary(img, foldername);
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        pricediscount,
        brand,
        thumbnail: thumbnails,
        rating,
        category,
        quantity,
        stock,
      },
      { new: true }
    );
    await product.save();
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in Update Product", Success: false, error });
  }
};

//Delete a Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    res.send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ Success: false, message: "Error in Delete Product", error });
  }
};

//filter products
export const filterProducts = async (req, res) => {
  try {
    const { checked, filters } = req.query;

    const result = filters ? filters.split(",") : [];
    const checkedData = checked ? checked.split(",") : [];

    let products = [];
    const query = {};
    const count = await Product.find().countDocuments();

    const perpage = req.query.perpage || count;    
    const page = req.query.page || 1; 

    if (checked?.length > 0) query.category = checkedData;
    if (filters?.length)
      query.pricediscount = { $gte: result[0], $lte: result[1] };

    if (checked?.length || filters?.length) {
      products = await Product.find(query)
        .skip((page - 1) * perpage)
        .limit(perpage);

    } else {
      products = await Product.find()
        .skip((page - 1) * perpage)
        .limit(perpage);
    }

    


    res.status(200).send({
      success: true,
      message: "Filtered Products",
      products,
      count,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Filtered Product", error });
  }
};

//search for products
export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
      ],
    });
    res
      .status(200)
      .send({ success: true, message: "Searched Products", products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Search Products", error });
  }
};

//Similar products
export const searchSimilarProducts = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await Product.find({
      category: { $regex: cid, $options: "i" },
      _id: { $ne: pid },
    })
      .limit(4)
      .populate("category");
    res
      .status(200)
      .send({ success: true, message: "Similar Products", products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Similar Products", error });
  }
};
