const express = require('express')
const router = express.Router()

const BlogController = require("../controllers/blogController")
const {tokenVerification} = require('D:/blogging-app/backend/middleware.js')

router.use(['/create', '/getBlogs', '/searchBlogs'], tokenVerification);

router.post('/create', BlogController.createBlog)
router.get('/getBlogs', BlogController.getAllBlogs)
router.get('/searchBlogs', BlogController.searchBlogs)


module.exports = router