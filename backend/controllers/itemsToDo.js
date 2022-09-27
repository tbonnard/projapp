const jwt = require('jsonwebtoken')

const todosRouter = require('express').Router()

const User = require('../models/user')
const ItemsToDo = require('../models/itemToDo')
const Project = require('../models/project')
const Status = require('../models/status')


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

        const todos = await ItemsToDo.find({creator:user, activated:true, profile:user.currentProfile})
        const sortedTodos = todos.sort(function(a, b){return a.order - b.order})
        response.json(sortedTodos.map(todo => todo.toJSON()))
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

      let projectToAssociate;
      if (body.project) {
        projectToAssociate = await Project.findById(body.project)
      } else {
        projectToAssociate =  await Project.findOne({defaultAdmin:true})
      }

      const statusToAssociate = await Status.findOne({description:'To do'})
      const orderInitial = await ItemsToDo.find({creator:user, activated:true, profile:user.currentProfile})
      let orderToDo=1
      if (orderInitial.length > 0) {
        orderToDo = orderInitial[orderInitial.length-1].order+1 
      }
      const todo = new ItemsToDo({
        title: body.title,
        creator: user,
        project:projectToAssociate,
        status: statusToAssociate,
        order:orderToDo,
        profile:user.currentProfile,
        relatedNote:body.relatedNote
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
    itemToUpdate.title = body.title
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()

    response.json(itemToUpdate.toJSON())
  }

  catch (exception) {
    next(exception)
}
})

todosRouter.put('/updateproject', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)
    const projectToAssociate = await Project.findById(body.projectId)

    const itemToUpdate = await ItemsToDo.findById(body.id)
    itemToUpdate.project = projectToAssociate
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})



todosRouter.put('/updatestatus', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)
    const statusToAssociate = await Status.findById(body.statusId)

    const itemToUpdate = await ItemsToDo.findById(body.id)
    itemToUpdate.status = statusToAssociate
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())
  }

  catch (exception) {
    next(exception)
}
})


todosRouter.put('/updateorder', async (request, response, next) => {
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
    itemToUpdate.order = body.order
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())
  }

  catch (exception) {
    next(exception)
}
})

todosRouter.put('/todosdone', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const statusDone = await Status.findOne({description:'Done'})

    const itemsDone = await ItemsToDo.find({creator:user, activated:true, profile:user.currentProfile, status:statusDone})
    itemsDone.forEach(async itemToUpdate => {
      itemToUpdate.activated = false
      itemToUpdate.date_modified = new Date()
      await itemToUpdate.save()
    })

    const items = await ItemsToDo.find({creator:user, activated:true, profile:user.currentProfile})
    response.json(items.map(item => item.toJSON()))
  
  }

  catch (exception) {
    next(exception)
}
})


module.exports = todosRouter