const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')

module.exports = (req, res, next) => {
    console.log(req.body.userId)
    User.findOne({ _id: req.body.userId })
        .then((user) => {
            if (user.isAdmin) {
                next()
            }

            Post.findOne({ _id: req.params.id })
                .then((post) => {
                    const token = req.headers.authorization.split(' ')[1]
                    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN || 'SECRET_TOKEN')
                    const userId = decodedToken.userId

                    if (post.userId && post.userId === userId) {
                        next()
                    } else {
                        res.status(403).json({ message: 'Requête non authorisée.' })
                    }
                })
                .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
        })
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}
