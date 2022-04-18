const jwt = require('jsonwebtoken')

const todosRouter = require('express').Router()

const User = require('../models/user')
const ItemsToDo = require('../models/itemToDo')
const Project = require('../models/project')


todosRouter.get('/', async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }
    
        const user = await User.findById(request.user)

        const todos = await ItemsToDo.find({creator:user, activated:true})
        response.json(todos.map(todo => todo.toJSON()))
    }
    catch (exception) {
        next(exception)
    }
})


todosRouter.post('/', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)
      const defaultProject =  await Project.findOne({defaultAdmin:true})

      const todo = new ItemsToDo({
        description: body.description,
        creator: user,
        project:defaultProject
    })

    const newToDoSaved = await todo.save()
    response.json(newToDoSaved.toJSON())


  }
  catch (exception) {
      next(exception)
  }
})


todosRouter.put('/deactivate', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const itemToUpdate = await ItemsToDo.findById(body.id)
    itemToUpdate.activated = false
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})


todosRouter.put('/', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const itemToUpdate = await ItemsToDo.findById(body.id)
    itemToUpdate.description = body.description
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})

module.exports = todosRouter