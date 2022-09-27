const jwt = require('jsonwebtoken')

const itemsRouter = require('express').Router()

const User = require('../models/user')
const Category = require('../models/category')
const ItemsCategory = require('../models/itemCategory')


itemsRouter.get('/categories', async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }
    
        const user = await User.findById(request.user)

        // const categoriesCreator = await Category.find({creator:user, activated:true})
        // const categoriesDefault = await Category.find({defaultAdmin:true})

        // const categories = await Category.find({
        //   creator:user,
        //     $or:[
        //       {defaultAdmin:true}
        //      ]
        //   })

        //const catFiltered = categoriesCreator.concat(categoriesDefault);

        const categories = await Category.find({$or:[{creator:user,activated:true, profile:user.currentProfile},{defaultAdmin:true, activated:true}]})

        const sortedCategories = categories.sort(function(a, b){return a.order - b.order})
        response.json(sortedCategories.map(cat => cat.toJSON()))
    }
    catch (exception) {
        next(exception)
    }

})



itemsRouter.post('/category', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)
      const categories = await Category.find({creator:user, profile:user.currentProfile})
      const categoriesDefault = await Category.find({defaultAdmin:true})

      const newCategory = new Category({
        description: body.description.charAt(0).toUpperCase() + body.description.slice(1),
        creator: user,
        order: categories.length+categoriesDefault.length,
        profile:user.currentProfile
      })
      //order start at 0 in admin_initial so no need to add 1

    const newCategorySaved = await newCategory.save()
    response.json(newCategorySaved.toJSON())


  }
  catch (exception) {
      next(exception)
  }
})


itemsRouter.put('/category/deactivate', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const itemToUpdate = await Category.findById(body.id)
    itemToUpdate.activated = false
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()

    const allAssociatedItems = await ItemsCategory.find({category:itemToUpdate})
    allAssociatedItems.forEach( item => {
      item.activated = false
      item.date_modified = new Date()
      item.save()
    })

    response.json(itemToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})



itemsRouter.put('/category/update', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)

      const itemToUpdate = await Category.findById(body.id)
      itemToUpdate.description = body.description
      itemToUpdate.date_modified = new Date()
      await itemToUpdate.save()

      response.json(itemToUpdate.toJSON())


  }
  catch (exception) {
      next(exception)
  }
})


itemsRouter.get('/', async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }
    
        const user = await User.findById(request.user)

        const ItemsCategories = await ItemsCategory.find({creator:user, activated:true, profile:user.currentProfile})
        response.json(ItemsCategories.map(item => item.toJSON()))
    }
    catch (exception) {
        next(exception)
    }
})


itemsRouter.get('/onecategory/:id', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)

      const ItemsCategories = await ItemsCategory.find({creator:user, activated:true, profile:user.currentProfile, category:request.params.id})
      response.json(ItemsCategories.map(item => item.toJSON()))
  }
  catch (exception) {
      next(exception)
  }
})

itemsRouter.post('/', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)
      const categoryToAssociate = await Category.findById(body.category)

      const itemCategory = new ItemsCategory({
        description: body.description,
        creator: user,
        category: categoryToAssociate,
        profile:user.currentProfile
    })

    const newItemCategorySaved = await itemCategory.save()
    response.json(newItemCategorySaved.toJSON())


  }
  catch (exception) {
      next(exception)
  }
})


itemsRouter.put('/deactivate', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const itemToUpdate = await ItemsCategory.findById(body.id)
    itemToUpdate.activated = false
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})

itemsRouter.put('/', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const itemToUpdate = await ItemsCategory.findById(body.id)
    itemToUpdate.description = body.description
    itemToUpdate.date_modified = new Date()
    await itemToUpdate.save()
    response.json(itemToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})


module.exports = itemsRouter