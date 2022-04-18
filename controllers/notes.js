const jwt = require('jsonwebtoken')

const notesRouter = require('express').Router()

const User = require('../models/user')
const Project = require('../models/project')
const Note = require('../models/note')


notesRouter.get('/', async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }
    
        const user = await User.findById(request.user)

        const notes = await Note.find({creator:user, activated:true}).sort({date_modified:-1}) 

        response.json(notes.map(note => note.toJSON()))
    }
    catch (exception) {
        next(exception)
    }
})


notesRouter.post('/', async (request, response, next) => {
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

      const note = new Note({
        title: body.title.charAt(0).toUpperCase() + body.title.slice(1),
        description: body.description,
        creator: user,
        project:defaultProject,
        date_modified :new Date()
    })

    const newNoteSaved = await note.save()
    response.json(newNoteSaved.toJSON())


  }
  catch (exception) {
      next(exception)
  }
})


notesRouter.put('/deactivate', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const noteToUpdate = await Note.findById(body.id)
    noteToUpdate.activated = false
    noteToUpdate.date_modified = new Date()
    await noteToUpdate.save()
    response.json(noteToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})


notesRouter.put('/', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const noteToUpdate = await Note.findById(body.id)
    noteToUpdate.title = body.title.charAt(0).toUpperCase() + body.title.slice(1),
    noteToUpdate.description = body.description
    noteToUpdate.date_modified = new Date()
    await noteToUpdate.save()
    response.json(noteToUpdate.toJSON())
  }
  catch (exception) {
    next(exception)
}
})

module.exports = notesRouter