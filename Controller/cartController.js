import Cart from "../Model/cartModel.js"; // Ensure to import your Cart model

// Add product to cart
export const addProduct = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] });
    }

    let product = cart.products.find(
      (p) => p.product.toString() === productId.toString()
    );

    if (product) {
      product.quantity += quantity;
    } else {
      cart.products.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    res.json({
      success: true,
      msg: "Product added to cart successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, msg: "Add to cart controller error", error });
  }
};

//get cart products
export const cartProducts = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );
    res.json({ success: true, msg: "Products in cart", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error getting products", error });
  }
};

//cart filter products to add new quantity
export const filterProducts = async (req, res) => {
  try {
    const { pid, nquantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.send({ success: false, message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== pid
    );

    const product = cart.products.find((item) => item.id === pid);
    if (product) {
      product.quantity = nquantity;
    }

    // Save the updated cart
    await cart.save();

    // Return the updated cart
    res.send({ success: true, message: "Product removed successfully", cart });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error while updating cart" });
  }
};
