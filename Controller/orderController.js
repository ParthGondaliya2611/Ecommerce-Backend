import Order from "../Model/OrderModel.js";
import Stripe from "stripe";

export const createOrderController = async (req, res) => {
  try {
    const { products, address, paymentMethod } = req.body;
    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Address not provided" });
    }

    if (paymentMethod === "card") {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const order = new Order({
        user: req.user.id,
        products,
        address,
        paymentMethod: paymentMethod,
      });

      const lineitem = products.map((product) => {
        return {
          price_data: {
            currency: "USD",
            product_data: {
              name: product.product.name,
              images: [product.product.thumbnail[0]],
            },
            unit_amount: Math.round(product.product.price * 100),
          },
          quantity: product.quantity,
        };
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineitem,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/`,
        cancel_url: `${process.env.FRONTEND_URL}/cart`,
      });

      await order.save();
      res.json({
        success: true,
        message: "Order created successfully",
        sessionId: session.id,
        order,
      });
    } else {
      const order = new Order({
        user: req.user.id,
        products,
        address,
        paymentMethod: paymentMethod,
      });
      await order.save();
      res.json({
        success: true,
        message: "Order created successfully",
        order,
      });
    }
  } catch (error) {
    console.log("Error in creating order: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error in creating order", error });
  }
};

//get order
export const getOrderController = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user.id })
      .populate("products.product")
      .populate("address");
    res.json({ success: true, message: "Order fetched successfully", order });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in getting order", error });
  }
};

//cancel order
export const cancelOrderController = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "cancelled",
      },
      { new: true }
    );
    await order.save();
    res.json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in cancelling order",
      error: error,
    });
  }
};
