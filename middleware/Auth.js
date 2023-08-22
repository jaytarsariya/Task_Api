const jwt = require('jsonwebtoken');
const User = require("../model/User");
require('dotenv').config();
const auth = async (req, res, next) => {
    try {
        const token = req.header('authorization');
        const verifyToken = await jwt.verify(token, process.env.ADMIN_TOKEN)
        if (!verifyToken) {
            return res.status(401).json({ message: "unaurthorize" });
        }
        if (verifyToken) {
            const userdata = await User.findById({ _id: verifyToken.id })
            req.user = userdata;
            req.token = token;
            next();
        }

    } catch (error) {
        console.log("Error,Auth", error);
        return res.status(401).json({ message: "unaurthorize" });

    }
}

module.exports = auth;