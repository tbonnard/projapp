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

        //const categories = await Category.find({creator:user})
        const categories = await Category.find({defaultAdmin:true})
        const sortedCategories = categories.sort(function(a, b){return a.order - b.order})
        response.json(sortedCategories.map(cat => cat.toJSON()))
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

        const ItemsCategories = await ItemsCategory.find({creator:user, activated:true})
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
        category: categoryToAssociate
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