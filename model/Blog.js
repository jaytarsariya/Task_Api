const { default: mongoose } = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: String,
    image: String,
    comment: String,
    like: Boolean,
    description: String
},
    {
        timestamps: true
    })
const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;