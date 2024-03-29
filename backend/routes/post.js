const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')

const auth = require('../middlewares/auth')
const compareId = require('../middlewares/compareId')
const multer = require('../middlewares/multer-config')

router.get('/', auth, postController.getPosts)
router.get('/:id', auth, postController.getPost)
router.post('/', auth, multer, postController.addPost)
router.put('/:id', auth, multer, compareId, postController.modifyPost)
router.delete('/:id', auth, compareId, postController.deletePost)
router.post('/:id/like', auth, postController.likePost)
router.get('/:id/comments', auth, postController.getComments)
router.post('/:id/comment', auth, postController.addComment)
router.delete('/:id/comment/:id', auth, compareId, postController.deleteComment)

module.exports = router
