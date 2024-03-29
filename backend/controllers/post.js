const fs = require('fs')
const Post = require('../models/Post')
const PostComment = require('../models/PostComment')
const User = require('../models/User')

exports.getPosts = (req, res, next) => {
    Post.find()
        .populate({
            path: 'postedBy',
            select: 'firstName lastName',
        })
        .sort({
            posted: -1,
        })
        .exec((err, posts) => {
            if (err) {
                res.status(500).json({ error: 'Une erreur est survenue.' })
            } else {
                res.status(200).json(posts)
            }
        })
}

exports.getPost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .populate({
            path: 'postedBy',
            select: 'firstName lastName',
        })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.addPost = (req, res, next) => {
    const postObject = req.body
    const post = new Post({
        ...postObject,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}` : null,
    })

    post.save()
        .then(() => res.status(201).json({ message: 'Votre publication a bien été envoyée.' }))
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.modifyPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (req.body.image_delete === 'true' || (req.file !== undefined && post.imageUrl !== null)) {
                const filename = post.imageUrl.split('/images/posts/')[1]
                fs.unlink(`images/${filename}`, (error) => {
                    error && console.log(error)
                })
                req.body.imageUrl = null
            }
            const postObject = req.file
                ? {
                      ...req.body,
                      imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}` : null,
                  }
                : {
                      ...req.body,
                  }
            Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Votre publication a bien été mise à jour.' }))
                .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
        })
        .catch((error) => {
            res.status(500).json({ error: 'Une erreur est survenue.' })
        })
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.imageUrl !== null) {
                const filename = post.imageUrl.split('/images/posts/')[1]
                fs.unlink(`images/${filename}`, (error) => {
                    error && console.log(error)
                })
            }

            Post.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Votre publication a bien été supprimée.' }))
                .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
        })
        .catch((error) => res.status(500).json({ error }))
}

exports.likePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.usersLiked.indexOf(req.query.userId) == -1) {
                post.usersLiked.push(req.query.userId)
            } else {
                const index = post.usersLiked.findIndex((user) => user === req.query.userId)
                post.usersLiked.splice(index, 1)
            }

            post.save()
                .then(() => res.status(200).json({ message: 'Vous aimé like/dislike cette publication.' }))
                .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
        })
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.getComments = (req, res) => {
    PostComment.find({ postId: req.params.id })
        .populate({
            path: 'postedBy',
            select: 'firstName lastName',
        })
        .sort({
            posted: -1,
        })
        .exec((err, comments) => {
            if (err) {
                res.status(500).json({ error: 'Une erreur est survenue.' })
            } else {
                res.status(200).json(comments)
            }
        })
}

exports.addComment = (req, res) => {
    const postComment = new PostComment({ ...req.body })
    postComment
        .save()
        .then(() => res.status(201).json({ message: 'Votre commentaire a bien été envoyée.' }))
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.deleteComment = (req, res) => {
    PostComment.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Votre commentaire a bien été supprimée.' }))
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
}
