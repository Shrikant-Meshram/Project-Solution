const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogsController= require("../controllers/blogsController")



router.post("/createAuthor", authorController.createAuthor)
router.post("/blogs",blogsController.createBlogs)
router.get("/blogs",blogsController.getBlogs)
router.put("/blogs/:blogId",blogsController.updateBlogs)
router.delete("/blogs/:blogId",blogsController.deleteId)
router.delete("/blogs",blogsController.deleteByQuery)





module.exports = router;