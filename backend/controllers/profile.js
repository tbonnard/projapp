const jwt = require('jsonwebtoken')

const profileRouter = require('express').Router()

const User = require('../models/user')
const Profile = require('../models/profile')

const ItemsToDo = require('../models/itemToDo')
const Project = require('../models/project')
const Status = require('../models/status')
const Category = require('../models/category')
const ItemsCategory = require('../models/itemCategory')
const ItemProject = require('../models/itemProject')
const Note = require('../models/note')


// profileRouter.get('/createdefault', async (request, response, next) => {
//   try {
  
//       const users = await User.find({})

//       users.forEach(async user => {
//           const profile = await new Profile({
//             creator: user,
//             currentProfile: true
//           })
//           const newProfile = await profile.save()
          
//           user.currentProfile = newProfile
//           await user.save()
//       })

//   }
//   catch (exception) {
//       next(exception)
//   }
// })

// profileRouter.get('/globalupdate', async (request, response, next) => {
//   try {
  
//       const users = await User.find({})

//       users.forEach(async user => {
//         console.log("USER",user)

//         const profile = await Profile.findOne({creator:user, activated:true, currentProfile:true})
//         // console.log("PROFILE",profile)

//         const todos = await ItemsToDo.find({creator:user})
//         console.log("TODO",todos)

//         if (todos.length > 0) {
//           todos.forEach(async todo => {
//             todo.profile = profile
//             await todo.save()
//             console.log("TODO",todo)
//           })
//         }
 
//         const categories = await Category.find({creator:user})
//         if (categories.length > 0) {
//         categories.forEach(async cat => {
//           cat.profile = profile
//           await cat.save()
//           console.log("CATEG",cat)
//         })
//       }
//         const itemCategories = await ItemsCategory.find({creator:user})
//         if (itemCategories.length > 0) {
//         itemCategories.forEach(async cat => {
//           cat.profile = profile
//           await cat.save()
//           console.log("ITEMCATEG",cat)
//         })
//       }

//       //no need because default   
//       //   const statuss = await Status.find({creator:user})
//       //   if (statuss.length > 0) {
//       //   statuss.forEach(async stat => {
//       //     stat.profile = profile
//       //     await stat.save()
//       //     console.log("STATUS",stat)
//       //   })
//       // }

//         const projects = await Project.find({creator:user})
//         if (projects.length > 0) {
//         projects.forEach(async proj => {
//           proj.profile = profile
//           await proj.save()
//           console.log('PROJ',proj)
//         })
//       }
        
//         const itemProjects = await ItemProject.find({creator:user})
//         if (itemProjects.length > 0) {
//         itemProjects.forEach(async item => {
//           item.profile = profile
//           await item.save()
//           console.log('ITEMPROJ',item)
//         })
//       }

//         const notes = await Note.find({creator:user})
//         if (notes.length > 0) {
//         notes.forEach(async item => {
//           item.profile = profile
//           await item.save()
//           console.log('NOTE',item)
//         })
//       }
        
//       })
//       console.log('DONE')

//   }
//   catch (exception) {
//       next(exception)
//   }
// })

profileRouter.get('/', async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }
    
        const user = await User.findById(request.user)

        const profiles = await Profile.find({creator:user, activated:true})
        response.json(profiles.map(prof => prof.toJSON()))
    }
    catch (exception) {
        next(exception)
    }
})


profileRouter.get('/current', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)

      const profile = await Profile.findOne({creator:user, activated:true, currentProfile:true})
      response.json(profile.toJSON())
    }
  catch (exception) {
      next(exception)
  }
})


profileRouter.post('/', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)

      const preCurrentProfile = await Profile.findOne({creator:user, activated:true, currentProfile:true})
      if (preCurrentProfile) {
        preCurrentProfile.currentProfile = false
        preCurrentProfile.date_modified = new Date()
        await preCurrentProfile.save()
      }

      const profile = new Profile({
        title: body.title,
        creator: user,
        currentProfile: true
      })

    const newProfileSaved = await profile.save()

    // user.profile = newProfileSaved
    // await user.save()

    response.json(newProfileSaved.toJSON())
  }
  catch (exception) {
      next(exception)
  }
})


profileRouter.put('/deactivate', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const itemToUpdate = await Profile.findById(body.id)
    itemToUpdate.activated = false
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())
  }

  catch (exception) {
    next(exception)
}
})


profileRouter.put('/', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const itemToUpdate = await Profile.findById(body.id)
    itemToUpdate.title = body.title
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()

    response.json(itemToUpdate.toJSON())
  }

  catch (exception) {
    next(exception)
}
})


profileRouter.put('/changecurrent', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)


    const preCurrentProfile = await Profile.findOne({creator:user, activated:true, currentProfile:true})
    if (preCurrentProfile) {
      preCurrentProfile.currentProfile = false
      preCurrentProfile.date_modified = new Date()
      await preCurrentProfile.save()
    }

    const itemToUpdate = await Profile.findById(body.id)
    itemToUpdate.currentProfile = true
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()

    user.currentProfile = itemToUpdate
    await user.save()
    
    response.json(itemToUpdate.toJSON())
  }

  catch (exception) {
    next(exception)
}
})

module.exports = profileRouter