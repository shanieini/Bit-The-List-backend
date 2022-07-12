const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const BoardService = require('./board.service')

async function getBoards(req, res) {
    try {
        const boards = await BoardService.query(req.query)
        res.send(boards)
    } catch (err) {
        logger.error('Cannot get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function deleteBoard(req, res) {
    try {
        const boardId = req.params.id;
        console.log('boardId: ', boardId);
        const removedId = await BoardService.remove(boardId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to delete board', err)
        res.status(500).send({ err: 'Failed to delete board' })
    }
}


async function addBoard(req, res) {


    try {
        var board = req.body
        console.log('board: ', board);
        board = await BoardService.add(board)
        socketService.broadcast({ type: 'board-added', data: board, userId: board.byUserId })
        socketService.emitToUser({ type: 'board-about-you', data: board, userId: board.aboutUserId })
        res.send(board)
    } catch (err) {
        console.log(err)
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

async function getBoardById(req, res) {
    try {
        const boardId = req.params.id;
        console.log('SSSSSSSSSSSS', boardId);
        const board = await BoardService.getById(boardId)
        res.json(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}

async function updateBoard(req, res) {
    try {
        const board = req.body;
        const updatedBoard = await BoardService.update(board)
        res.json(updatedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })

    }
}

module.exports = {
    getBoards,
    deleteBoard,
    addBoard,
    getBoardById,
    updateBoard
}