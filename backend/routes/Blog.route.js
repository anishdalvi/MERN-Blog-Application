const express = require('express')
const router = express.Router();
const { getAllBlogs, addBlog, updateBlog , getById, deleteBlog, getByUserId} = require('../controllers/Blog.controller');

router.get('/', getAllBlogs)
router.post('/add', addBlog)
router.put('/update/:id', updateBlog)
router.get('/:id', getById)
router.delete('/:id', deleteBlog)
router.get('/user/:id', getByUserId)






module.exports = router