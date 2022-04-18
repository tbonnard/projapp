const jwt = require('jsonwebtoken')

const projectRouter = require('express').Router()

const User = require('../models/user')
const Project = require('../models/project')
const ItemProject = require('../models/itemProject')
const Status = require('../models/status')


// PROJECTS (items below)
projectRouter.get('/statusproject', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    //const status = await Status.find({creator:user})
    const status = await Status.find({defaultAdmin:true})
    const sortedstatus = status.sort(function(a, b){return a.order - b.order})
    response.json(sortedstatus.map(stat => stat.toJSON()))
  }
  catch (exception) {
      next(exception)
  }

})

projectRouter.get('/userproject', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)
    const projects = await Project.find({$or:[{creator:user},{defaultAdmin:true}]})
    const sortedProjects = projects.sort(function(a, b){return a.projectName - b.projectName})
    response.json(sortedProjects.map(proj => proj.toJSON()))
  }
  catch (exception) {
      next(exception)
  }

})


projectRouter.post('/userproject', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const project = new Project({
      projectName: body.projectName,
      creator: user,
    })

    const newProject = await project.save()
    response.json(newProject.toJSON())
    
    }
  catch (exception) {
      next(exception)
  }

})

projectRouter.put('/userprojectdeactivate', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const itemToUpdate = await Project.findById(body.id)
    itemToUpdate.activated = false
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})



// ITEMS RELATED TO PROJECTS
projectRouter.get('/', async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }
    
        const user = await User.findById(request.user)

        const items = await ItemProject.find({creator:user, activated:true})
        response.json(items.map(item => item.toJSON()))
    }
    catch (exception) {
        next(exception)
    }
})


projectRouter.post('/', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)
      const statusToDo = await Status.findOne({description:'To do'})

      let projectToAssociate;
      if (body.project) {
        projectToAssociate =  await Project.findById(body.project)
      } else {
        projectToAssociate =  await Project.findOne({defaultAdmin:true})
      }

      const projectItem = new ItemProject({
        title: body.title,
        description: body.description,
        creator: user,
        project:projectToAssociate,
        status:statusToDo
    })

    const newProjectItem = await projectItem.save()
    response.json(newProjectItem.toJSON())


  }
  catch (exception) {
      next(exception)
  }
})


projectRouter.put('/deactivate', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const itemToUpdate = await ItemProject.findById(body.id)
    itemToUpdate.activated = false
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})


projectRouter.put('/updatestatus', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const itemToUpdate = await ItemProject.findById(body.id)
    itemToUpdate.status = body.status
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})

module.exports = projectRouter