import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { q, category, brand, make, model, page = 1, limit = 12, sort } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (make) filter["makeModels.make"] = make;
    if (model) filter["makeModels.model"] = model;

    const skip = (Number(page) - 1) * Number(limit);
    const projection = {
      title: 1,
      price: 1,
      salePrice: 1,
      category: 1,
      brand: 1,
      stock: 1,
      images: 1,
      createdAt: 1
    };
    let query = Product.find(filter, projection).skip(skip).limit(Number(limit));

    if (sort === "price_asc") query = query.sort({ price: 1 });
    else if (sort === "price_desc") query = query.sort({ price: -1 });
    else query = query.sort({ createdAt: -1 });

    const products = await query.exec();
    const total = await Product.countDocuments(filter);

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, brand } = req.body;
    const product = new Product({ title, description, price, category, brand });
    const created = await product.save();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid data" });
  }
};
