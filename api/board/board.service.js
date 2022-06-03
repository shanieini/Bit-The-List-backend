const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

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
            style: {},
            columns: [
                "text",
                "status",
                "importance",
                "date",
                "persons"
            ],
            persons: [
                {
                    id: "u101",
                    fullname: "Carmel Yona",
                    imgUrl: "https://www.facebook.com/photo/?fbid=5291191697564727&set=a.152304304786851"
                },
                {
                    id: "u102",
                    fullname: "Shani Eini",
                    imgUrl: "https://www.google.com"
                },
                {
                    id: "u103",
                    fullname: "Hallel Hofman",
                    imgUrl: "https://www.google.com"
                }
            ],
            groups: [
                {
                    id: "g101",
                    title: "Group 1",
                    archivedAt: new Date,
                    style: {},
                    tasks: [
                        {
                            id: "c101",
                            title: "New item",
                            text: "write something",
                            status: "done",
                            date: "24/05/2022",
                            importance: "high",
                            persons: [
                                {
                                    id: "u101",
                                    fullname: "Carmel Yona",
                                    imgUrl: "https: www.facebook.com/photo/?fbid=5291191697564727&set=a.152304304786851"
                                }
                            ]
                        },
                        {
                            id: "c102",
                            title: "New item",
                            text: "write something",
                            status: "done",
                            date: "24/05/2022",
                            importance: "mid",
                            persons: [
                                {
                                    id: "u101",
                                    fullname: "Carmel Yona",
                                    imgUrl: "https: www.facebook.com/photo/?fbid=5291191697564727&set=a.152304304786851"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "g102",
                    title: "Group 2",
                    tasks: [
                        {
                            id: "c103",
                            title: "New item",
                            text: "write something",
                            status: "done",
                            date: "24/05/2021",
                            importance: "low",
                            persons: [
                                {
                                    id: "u102",
                                    fullname: "Shani eini",
                                    imgUrl: "https: www.facebook.com/photo/?fbid=5291191697564727&set=a.152304304786851"
                                }
                            ],
                            archivedAt: new Date
                        },
                        {
                            id: "c104",
                            title: "New item",
                            text: "write something",
                            date: "24/06/2012",
                            importance: "high",
                            persons: [
                                {
                                    id: "u102",
                                    fullname: "Shani eini",
                                    imgUrl: "https: www.facebook.com/photo/?fbid=5291191697564727&set=a.152304304786851"
                                }
                            ],
                            status: "in-progress",
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
                            style: {
                                bgColor: "#26de81"
                            }
                        }
                    ],
                    style: {}

                }
            ],
            activities: [
                {
                    id: "a101",
                    txt: "Changed Color",
                    createdAt: 154514,
                    byMember: {
                        id: "u101",
                        fullname: "Abi Abambi",
                        imgUrl: "http://some-img"
                    },
                    task: {
                        id: "c101",
                        title: "Replace Logo"
                    }
                }
            ],
            cmpsOrder: [
                "status-picker",
                "member-picker",
                "date-picker"
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


