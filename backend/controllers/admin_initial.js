const adminRouter = require('express').Router()

const User = require('../models/user')
const Category = require('../models/category')
const Status = require('../models/status')
const Project = require('../models/project')
const ToDo = require('../models/itemToDo')


const categoryInitial = ["Daily", "Retro", "Planning"]
const statusInitial = ["Keep in mind", "To do", "In progress", "Blocked / Pending", "Validation", "Done"]
const projectInitial = ["Unassigned"]

// https://yusuals.herokuapp.com/api/admin_init/

// adminRouter.get('/category', async (request, response, next) => {
//     try {
//         const userAdmin = await User.findOne({type:1})

//         categoryInitial.forEach(async cat => {
//             const newCategoryUser = await new Category({
//                 description: cat,
//                 creator:userAdmin,
//                 order: categoryInitial.indexOf(cat),
//                 defaultAdmin: true
//             })
//             await newCategoryUser.save()
//         })
//     }
//     catch (exception) {
//         next(exception)
//     }

// })


// adminRouter.get('/status', async (request, response) => {
//     try {
//         const userAdmin = await User.findOne({type:1})

//         statusInitial.forEach(async status => {
//             const newStatusUser = await new Status({
//                 description: status,
//                 creator:userAdmin,
//                 order: statusInitial.indexOf(status),
//                 defaultAdmin: true
//             })
//             await newStatusUser.save()
//         })
//     }
//     catch (exception) {
//         next(exception)
//     }
// })

// adminRouter.get('/project', async (request, response) => {
//     try {
//         const userAdmin = await User.findOne({type:1})

//         projectInitial.forEach(async proj => {
//             const newProjectUser = await new Project({
//                 projectName: proj,
//                 creator:userAdmin,
//                 order: projectInitial.indexOf(proj),
//                 defaultAdmin: true
//             })
//             await newProjectUser.save()
//         })
//     }
//     catch (exception) {
//         next(exception)
//     }
// })


// adminRouter.get('/todoref', async (request, response) => {
//     const alltodos = await ToDo.find({})
//     const proj =  await Project.findOne({defaultAdmin:true})
//     alltodos.forEach(async todo => {
//         todo.project = proj
//         await todo.save()
//     })
// })


module.exports = adminRouter