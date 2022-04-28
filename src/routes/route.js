const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogsController= require("../controllers/blogsController")
const middlewareController=require("../middleware/mid")



router.post("/createAuthor", authorController.createAuthor)
router.post("/login",authorController.loginAuthor)
router.post("/blogs",middlewareController.authenticate,middlewareController.authorise1,blogsController.createBlogs)
router.get("/blogs",middlewareController.authenticate,middlewareController.authorise1,blogsController.getBlogs)
router.put("/blogs/:blogId",middlewareController.authenticate,middlewareController.authorise1,blogsController.updateBlogs)
router.delete("/blogs/:blogId",middlewareController.authenticate,middlewareController.authorise1,blogsController.deleteId)
router.delete("/blogs",middlewareController.authenticate,middlewareController.authorise1,blogsController.deleteByQuery)





module.exports = router;