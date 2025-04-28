const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const BlogModel = require("./Models/BlogModel")

const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send("Server is running");
})

app.get("/get", async (req, res) => {
    try {
        const blogs = await BlogModel.find(); // fetch all blogs
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/add", async (req, res) => {
    try {
        const { title, subject, img, des } = req.body;  // get data from req.body
        const newBlog = await BlogModel.create({ title, subject, img, des }); // create using them
        res.json(newBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBlog = await BlogModel.findByIdAndDelete({ _id: id });
        res.json(deleteBlog);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on PORT");
})
