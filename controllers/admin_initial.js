const adminRouter = require('express').Router()

const User = require('../models/user')
const Category = require('../models/category')
const Status = require('../models/status')
const Project = require('../models/project')
const ToDo = require('../models/itemToDo')


const categoryInitial = ["Daily", "Retro", "Planning"]
const statusInitial = ["To do", "In progress", "Blocked", "Validation", "Done"]
const projectInitial = ["Global"]


adminRouter.get('/category', async (request, response, next) => {
    // try {
    //     const userAdmin = await User.findOne({type:1})

    //     categoryInitial.forEach( cat => {
    //         const newCategoryUser = new Category({
    //             description: cat,
    //             creator:userAdmin,
    //             order: categoryInitial.indexOf(cat),
                    // defaultAdmin: true
    //         })
    //         newCategoryUser.save()
    //     })
    // }
    // catch (exception) {
    //     next(exception)
    // }

})


adminRouter.get('/status', async (request, response) => {
    // try {
    //     const userAdmin = await User.findOne({type:1})

    //     statusInitial.forEach( status => {
    //         const newStatusUser = new Status({
    //             description: status,
    //             creator:userAdmin,
    //             order: statusInitial.indexOf(status),
                // defaultAdmin: true
    //         })
    //         newStatusUser.save()
    //     })
    // }
    // catch (exception) {
    //     next(exception)
    // }
})

adminRouter.get('/project', async (request, response) => {
    // try {
    //     const userAdmin = await User.findOne({type:1})

    //     projectInitial.forEach( proj => {
    //         const newProjectUser = new Project({
    //             projectName: proj,
    //             creator:userAdmin,
    //             order: projectInitial.indexOf(proj),
    //             defaultAdmin: true
    //         })
    //         newProjectUser.save()
    //     })
    // }
    // catch (exception) {
    //     next(exception)
    // }
})


adminRouter.get('/todoref', async (request, response) => {
    // const alltodos = await ToDo.find({})
    // const proj =  await Project.findOne({defaultAdmin:true})
    // alltodos.forEach(todo => {
    //     todo.project = proj
    //     todo.save()
    // })
})


module.exports = adminRouter