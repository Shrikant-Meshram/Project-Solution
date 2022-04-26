const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogsController= require("../controllers/blogsController")



router.post("/createAuthor", authorController.createAuthor)
router.post("/createBlogs",blogsController.createBlogs)
router.get("/getBlogs",blogsController.getBlogs)







module.exports = router;