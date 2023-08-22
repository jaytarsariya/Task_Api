const User = require("../model/User");
const Blog = require('../model/Blog');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  *****************************************************************************
const register = async (req, res) => {
    try {

        if (!req.body.email && !req.body.uname && !req.body.password) {
            return res.status(400).json({ message: "Field is require !" })
        }
        const hashpassword = await bcrypt.hash(req.body.password, 10);
        const newuser = await User({
            uname: req.body.uname,
            email: req.body.email,
            password: hashpassword,
            is_admin: req.body.is_admin
        }).save();
        console.log(newuser);
        if (!newuser) {
            return res.status(400).json({ message: "Cant register pls try again !" })
        }
        return res.status(200).json({ message: "Register success !" })
    } catch (error) {
        console.log("Error,UserController:register", error);
    }
}

//  *****************************************************************************
const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        if (!email && !password) {
            return res.status(400).json({ message: "Field is required !" })
        }
        const finduser = await User.findOne({ email: email });
        if (!finduser) {
            return res.status(400).json({ message: "User not found!" })
        }

        const checkPassword = await bcrypt.compare(password, finduser.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid password !" })
        }
        if (finduser.is_admin == true) {
            let admintoken = await jwt.sign({ id: finduser._id }, process.env.ADMIN_TOKEN)
            res.status(200).json({ message: "Admin login success", admintoken: admintoken })
        }
        else {
            let usertoken = await jwt.sign({ id: finduser._id }, process.env.USER_TOKEN)
            res.status(200).json({ message: "User login success", usertoken: usertoken })
        }

    } catch (error) {
        console.log("Error,UserController:login", error);
    }
}

//  *****************************************************************************
const createblog = async (req, res) => {
    try {
        const newblog = await Blog({
            title: req.body.title,
            image: req.file.filename,
            description: req.body.description
        }).save();
        if (!newblog) {
            return res.status(400).json({ message: "Cant crete blog pls try again !" })
        }
        return res.status(200).json({ message: "new blog created success !" })
    } catch (error) {
        console.log("Error,UserController:createblog", error);
    }
}
//  *****************************************************************************

const editblog = async (req, res) => {
    try {
        const id = req.params.id;
        const checkblog = await Blog.findById(id);
        if (!checkblog) {
            return res.status(400).json({ message: "blog not found !" })
        }
        const updateBlog = await Blog.findByIdAndUpdate(id, { title: req.body.title, image: req.file.filename, description: req.body.description });
        if (!updateBlog) {
            return res.status(400).json({ message: "cant update blog pls try again" })
        }
        return res.status(200).json({ message: "blog update success" });

    } catch (error) {
        console.log("Error,UserController:editblog", error);
    }
}
//  *****************************************************************************

const deleteblog = async (req, res) => {
    try {
        const id = req.params.id;
        const checkblog = await Blog.findById(id);
        if (!checkblog) {
            return res.status(400).json({ message: "blog not found !" })
        }
        const updateBlog = await Blog.findByIdAndDelete(id);
        if (!updateBlog) {
            return res.status(400).json({ message: "cant delete blog pls try again" })
        }
        return res.status(200).json({ message: "blog delete success" });

    } catch (error) {
        console.log("Error,UserController:deleteblog", error);
    }
}
//  *****************************************************************************

const viewblog = async (req, res) => {
    try {

        const viewBlog = await Blog.find();
        console.log(viewBlog)
        if (!viewBlog) {
            return res.status(400).json({ message: "not any blog found" })
        }
        return res.status(200).json({ message: "blog fetch success", body: viewBlog, });

    } catch (error) {
        console.log("Error,UserController:deleteblog", error);
    }
}
//  *****************************************************************************

const likecommet = async (req, res) => {
    try {
        const id = req.params.id;
        const like = req.body.like;
        const commet = req.body.commet;
        const viewBlog = await Blog.findById(id);
        if (!viewBlog) {
            return res.status(400).json({ message: "not any blog found" })
        }
        const likecomment = await Blog.updateOne({ like: like, comment: commet })
        if (!likecomment) {
            return res.status(400).json({ message: "like comment error pls try again !" })
        }

        return res.status(200).json({ message: "success !!" });

    } catch (error) {
        console.log("Error,UserController:likecommet", error);
    }
}
//  *****************************************************************************

const shareblog = async (req, res) => {
    try {
        const id = req.params.id;
        const viewBlog = await Blog.findById(id);
        if (!viewBlog) {
            return res.status(400).json({ message: "not any blog found" })
        }
       

    } catch (error) {
        console.log("Error,UserController:likecommet", error);
    }
}
module.exports = { register, login, createblog, editblog, deleteblog, viewblog, likecommet, shareblog }