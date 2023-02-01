const e = require("express");
const { CartItem, Cart } = require("../models/carts.model");
const catchSyncErr = require("../utils/catchSyncErr");
const ThrowError = require("../utils/throwError");

class CartController {
  //@desc: get cart
  //@route: [GET]/v2/api/cart/
  //@access: auth
  getCartUser = catchSyncErr(async (req, res, next) => {
    let cart = await Cart.findOneAndUpdate(
      {
        user: req.user.id,
        status: "idle",
      },
      {},
      { upsert: true, new: true }
    ).populate({
      path: "products.product",
      select: {
        name_product: 1,
        discount: 1,
        price: 1,
        images: { $slice: 1 },
        slug: 1,
        in_stock: 1,
      },
    });

    updatePriceInCart(cart);

    cart = await cart.save();
    return res.json({
      success: true,
      cart,
    });
  });

  //@desc: add product to cart
  //@route: [POST]/v2/api/cart
  //@access: auth
  addProduct = catchSyncErr(async (req, res, next) => {
    const { product, quantity } = req.body;
    const user = req.user.id;

    if (!product || !quantity) {
      return next(new ThrowError("Info Invalid!", 400));
    }

    let cart = await Cart.findOneAndUpdate(
      { user, status: "idle" },
      {},
      { upsert: true, new: true }
    ).populate({
      path: "products.product",
      select: {
        name_product: 1,
        discount: 1,
        price: 1,
        images: { $slice: 1 },
        slug: 1,
        in_stock: 1,
      },
    });

    let existProductIncart = cart.products.find(
      (item) => item.product._id == product
    );

    if (existProductIncart) {
      existProductIncart.quantity = existProductIncart.quantity + quantity;
      if (existProductIncart.quantity <= 0) {
        cart.products.pull(existProductIncart);
      }
    } else {
      const cartItem = await CartItem.create({
        product,
        quantity,
      });
      cart.products.push(cartItem);
    }

    await cart.save();

    this.getCartUser(req, res, next);
  });

  //@desc: delete product in cart
  //@route: [DELETE]/v2/api/cart
  //@access: auth
  deleteProduct = catchSyncErr(async (req, res, next) => {
    const { cartItem } = req.body;
    if (!cartItem) {
      return next(new ThrowError("Info Invalid!", 400));
    }
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id, status: "idle" },
      { $pull: { products: { _id: cartItem } } },
      { new: true }
    );
    res.json({ success: true, cart });
  });
}

const updatePriceInCart = (cart) => {
  if (cart.products.length) {
    cart.products.forEach((cartItem) => {
      cartItem.perchasePrice = cartItem.product.price;
      cartItem.totalPrice =
        cartItem.quantity * cartItem.product.price -
        cartItem.product.price * cartItem.product.discount;
    });
  }
};

module.exports = new CartController();
