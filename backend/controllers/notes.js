const jwt = require('jsonwebtoken')

const notesRouter = require('express').Router()

const User = require('../models/user')
const Project = require('../models/project')
const Note = require('../models/note')
const Category = require('../models/category')
const ItemsCategory = require('../models/itemCategory')

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

        // const notesJoined = await Note.aggregate([ 
        //   { 
        //     $lookup: 
        //     { 
        //       from: "projects", 
        //       localField: "project", 
        //       foreignField: "_id", 
        //       as: "proj" 
        //     } 
        //   }, 
          
        //   {
        //     $project: 
        //     {
        //       activated: 1,
        //       proj: 
        //       { 
        //         $filter: 
        //         { 
        //           input: "$proj", 
        //           as: "proj", 
        //           cond: { $eq: [ "$$proj.activated", true] } 
        //         } 
        //       } 
        //     } 
        //   } 
        //   ]);


        const notesJoined = await Note.aggregate([ 
            {
              "$lookup": {
                "from": "projects",
                "localField": "project",
                "foreignField": "_id",
                "as": "project"
              }
            }
            ,
          {
            "$unwind": "$project"
          }
            ]);

          //const notesPre = notesJoined.filter(note=> note.project.activated)
          //console.log(notesJoined)
          //response.json(notesPre.map(note => note))

          const notes = await Note.find({creator:user, activated:true, profile:user.currentProfile}).sort({date_modified:-1}) 
          response.json(notes.map(note => note.toJSON()))
    }
    catch (exception) {
        next(exception)
    }
})

notesRouter.get('/meetingdate', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)

      const notes = await Note.find({creator:user, activated:true, meetingNote:true, profile:user.currentProfile}).sort({meetingDate:-1}) 

      response.json(notes.map(note => note.toJSON()))
  }
  catch (exception) {
      next(exception)
  }
})

notesRouter.get('/datecreated', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)

      const notes = await Note.find({creator:user, activated:true, profile:user.currentProfile}).sort({date_created:-1}) 

      response.json(notes.map(note => note.toJSON()))
  }
  catch (exception) {
      next(exception)
  }
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)

      const note = await Note.findById(request.params.id)
      response.json(note.toJSON())
    }
  catch (exception) {
      next(exception)
  }
})


notesRouter.get('/search/:content', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
      const contentSearch = request.params.content
      const user = await User.findById(request.user)
      const notes = await Note.find({creator:user, activated:true, profile:user.currentProfile}).sort({date_modified:-1}) 
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

      let projectToAssociate;
      if (body.project) {
        projectToAssociate = await Project.findById(body.project)
      } else {
        projectToAssociate =  await Project.findOne({defaultAdmin:true})
      }

      let descriptionToAssociate = body.description

      let dateToAssociate = null
      if (body.meetingDate) {
        dateToAssociate = body.meetingDate
      }

      let categoryToAssociate;
      if (body.category) {
        categoryToAssociate = await Category.findById(body.category)
        const allItemFromCategoryToAssociate = await ItemsCategory.find({creator:user, category:categoryToAssociate, activated:true})
        allItemFromCategoryToAssociate.forEach( item => {
          descriptionToAssociate = descriptionToAssociate.concat('<br>- ', item.description.charAt(0).toUpperCase() + item.description.slice(1))
        })
        let yourDate = new Date()
        // dateToAssociate = new Date(yourDate.toISOString().split('T')[0])
        dateToAssociate= yourDate.getFullYear()+'-'+(yourDate.getMonth()+1)+'-'+yourDate.getDate()
        // console.log(yourDate.getDate())
        // console.log(yourDate)
        // console.log(yourDate.toISOString().split('T')[0])
        // console.log('aaa', dateToAssociate)
        // console.log(yourDate.getFullYear()+'-'+(yourDate.getMonth()+1)+'-'+yourDate.getDate())
      } else {
        categoryToAssociate =  null
      }

      const note = new Note({
        title: body.title.charAt(0).toUpperCase() + body.title.slice(1),
        description: descriptionToAssociate,
        creator: user,
        project:projectToAssociate,
        date_modified :new Date(),
        category:categoryToAssociate,
        meetingNote:body.meetingNote || false,
        meetingDate:dateToAssociate,
        profile:user.currentProfile
    })

    const newNoteSaved = await note.save()
    response.json(newNoteSaved.toJSON())
    // console.log('sasas',newNoteSaved.meetingDate)

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

notesRouter.put('/updateproject', async (request, response, next) => {
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

    const noteToUpdate = await Note.findById(body.id)
    noteToUpdate.project = projectToAssociate
    noteToUpdate.date_modified = new Date()
    await noteToUpdate.save()
    response.json(noteToUpdate.toJSON())
  }
  catch (exception) {
    next(exception)
}
})


notesRouter.put('/updatemeetingnote', async (request, response, next) => {
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
    noteToUpdate.meetingNote = body.meetingNote
    if (!body.meetingNote) {
      noteToUpdate.meetingDate = null
    }
    noteToUpdate.date_modified = new Date()
    await noteToUpdate.save()
    response.json(noteToUpdate.toJSON())
  }
  catch (exception) {
    next(exception)
}
})



notesRouter.put('/updatemeetingdate', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    Date.prototype.addHours= function(h){
      this.setHours(this.getHours()+h);
      return this;
    }
    const dateMeeting = new Date(body.meetingDate).addHours(4)

    const noteToUpdate = await Note.findById(body.id)
    noteToUpdate.meetingDate = dateMeeting
    noteToUpdate.date_modified = new Date()
    await noteToUpdate.save()
    response.json(noteToUpdate.toJSON())
  }
  catch (exception) {
    next(exception)
}
})

module.exports = notesRouter