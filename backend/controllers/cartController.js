import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        // Validate itemId
        if (!req.body.itemId) {
            return res.json({ success: false, message: "Item ID is required" });
        }

        // Find user and cart data
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {};

        // Add or update item in cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Remove invalid keys
        Object.keys(cartData).forEach((key) => {
            if (!key || key === "undefined") {
                delete cartData[key];
            }
        });

        // Update user cart in database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Validate itemId
        if (!req.body.itemId) {
            return res.json({ success: false, message: "Item ID is required" });
        }

        // Find user and cart data
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {};

        // Remove or decrement item in cart
        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // Remove item if quantity becomes 0
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        } else {
            return res.json({ success: false, message: "Item not found in cart or quantity is already 0" });
        }

        // Remove invalid keys
        Object.keys(cartData).forEach((key) => {
            if (!key || key === "undefined") {
                delete cartData[key];
            }
        });

        // Update user cart in database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//fetch user cart data 
const getCart = async (req, res) => {
    try {
        // Find user by ID
        let userData = await userModel.findById(req.body.userId);

        // Ensure user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Retrieve and clean up cart data
        let cartData = userData.cartData || {};
        Object.keys(cartData).forEach((key) => {
            if (!key || key === "undefined") {
                delete cartData[key];
            }
        });

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };