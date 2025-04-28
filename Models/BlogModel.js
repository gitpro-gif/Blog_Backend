const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: String,
    subject: String,
    img: String,
    des: String
})

const BlogModel = mongoose.model("blogApp", BlogSchema)
module.exports = BlogModel