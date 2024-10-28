const Router = require('express').Router;
const router = new Router()

const userRouter = require('./UserRouter')
const noteRouter = require('./NoteRouter')

router.use('/user', userRouter)
router.use('/note', noteRouter)

module.exports = router