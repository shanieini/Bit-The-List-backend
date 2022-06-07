const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')
const utilService = require('../../services/util.service.js')


async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('board')
        var boards = await collection.find(criteria).toArray()
        boards = boards.map(board => {
            // delete user.password
            // user.createdAt = ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return board
        })
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }

}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}


async function add(board) {
    const createdAt = new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    try {
        const boardToAdd = {
            title: board.title,
            archivedAt: new Date,
            createdAt: new Date,
            createdBy: {
                byUserId: ObjectId(board.byUserId),
                fullname: 'guest',
                imgUrl: "http://some-img"
            },
            labels: utilService.getColors(),
            columns: [
                "status",
                "date",
                "priority",
                "text",
                "persons"
            ],
            persons: [
                {
                    id: "u101",
                    fullname: "Carmel Yona",
                    imgUrl: "https://ca.slack-edge.com/T02SFLQBMS9-U02TP754YHH-119f03fb57ec-512"
                },
                {
                    id: "u102",
                    fullname: "Shani Eini",
                    imgUrl: "https://ca.slack-edge.com/T02SFLQBMS9-U03273X77HS-f54656e9e28d-48"
                },
                {
                    id: "u103",
                    fullname: "Hallel Hofman",
                    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Hoeffler_H.svg/1024px-Hoeffler_H.svg.png"
                }
            ],
            groups: [
                {
                    id: "g101",
                    progress: [],
                    title: "Group 1",
                    archivedAt: new Date,
                    style: utilService.getRandomColor(),
                    tasks: [
                        {
                            id: "c101",
                            title: "New item",
                            text: "write something",
                            status: "done",
                            date: "",
                            priority: "high",
                            style: {
                                status: "rgb(0, 200, 117)",
                                priority: "rgb(0, 200, 117)"
                            },
                            updates: [{
                                byMember: {
                                    fullname: "Carmel Yona",
                                    imgUrl: "",
                                    _id: "userId",
                                    createdAt: createdAt
                                },
                                text: `Created at ${createdAt}  `,
                                isRead: false,
                            }],
                            persons: [

                            ]
                        },
                        {
                            id: "c102",
                            title: "New item",
                            text: "write something",
                            status: "done",
                            date: "",
                            priority: "mid",
                            style: {
                                status: "rgb(0, 200, 117)",
                                priority: "rgb(253, 171, 61)"
                            },
                            updates: [{
                                byMember: {
                                    fullname: "Carmel Yona",
                                    imgUrl: "",
                                    _id: "userId",
                                    createdAt: createdAt
                                },
                                text: `Created at ${createdAt}  `,
                                isRead: false,
                            }],
                            persons: [

                            ]
                        }
                    ]
                },
                {
                    id: "g102",
                    title: "Group 2",
                    style: utilService.getRandomColor(),
                    progress: [],
                    tasks: [
                        {
                            id: "c103",
                            title: "New item",
                            text: "write something",
                            status: "done",
                            date: "",
                            priority: "low",
                            style: {
                                status: "rgb(0, 200, 117)",
                                priority: "rgb(226, 68, 92)"
                            },
                            updates: [{
                                byMember: {
                                    fullname: "Carmel Yona",
                                    imgUrl: "",
                                    _id: "userId",
                                    createdAt: createdAt
                                },
                                text: `Created at ${createdAt}  `,
                                isRead: false,
                            }],
                            persons: [

                            ],
                            archivedAt: new Date
                        },
                        {
                            id: "c104",
                            title: "New item",
                            text: "write something",
                            date: "",
                            status: 'done',
                            priority: "high",
                            style: {
                                status: "rgb(0, 200, 117)",
                                priority: "rgb(0, 200, 117)"
                            },
                            updates: [{
                                byMember: {
                                    fullname: "Carmel Yona",
                                    imgUrl: "",
                                    _id: "userId",
                                    createdAt: createdAt
                                },
                                text: `Created at ${createdAt}  `,
                                isRead: false,
                            }],
                            persons: [

                            ],
                            description: "description",
                            comments: [
                                {
                                    id: "ZdPnm",
                                    txt: "also @yaronb please CR this",
                                    createdAt: 1590999817436.0,
                                    byMember: {
                                        id: "u101",
                                        fullname: "Tal Tarablus",
                                        imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    }
                                }
                            ],
                            checklists: [
                                {
                                    id: "YEhmF",
                                    title: "Checklist",
                                    todos: [
                                        {
                                            id: "212jX",
                                            title: "To Do 1",
                                            isDone: false
                                        }
                                    ]
                                }
                            ],
                            memberIds: [
                                "u101"
                            ],
                            labelIds: [
                                "l101",
                                "l102"
                            ],
                            createdAt: 1590999730348,
                            dueDate: 16156215211,
                            byMember: {
                                id: "u101",
                                username: "Tal",
                                fullname: "Tal Tarablus",
                                imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            },

                        }
                    ],
                }
            ],
            activities: [
            ]
        }
        const collection = await dbService.getCollection('board')
        await collection.insertOne(boardToAdd)
        return boardToAdd
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ _id: ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding toy ${boardId}`, err)
        throw err
    }
}

async function update(board) {
    try {
        var id = ObjectId(board._id)
        delete board._id
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: id }, { $set: { ...board } })
        return board
    } catch (err) {
        logger.error(`cannot update board ${boardId}`, err)
        throw err
    }
}

module.exports = {
    query,
    remove,
    add,
    getById,
    update
}


