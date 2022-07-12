const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { addBoard, getBoards, deleteBoard, getBoardById, updateBoard } = require('./board.controller')
const router = express.Router()

router.get('/', log, getBoards)
router.get('/:id', getBoardById)
router.post('/', log, addBoard)
router.delete('/:id', deleteBoard)
router.put('/:id', updateBoard)

module.exports = router