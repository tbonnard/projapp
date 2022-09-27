const jwt = require('jsonwebtoken')

const dailyRouter = require('express').Router()

const User = require('../models/user')
const Daily = require('../models/daily')

dailyRouter.get('/:limit', async (request, response, next) => {
    try {
      const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }
        const user = await User.findById(request.user)

        const dailys = await Daily.find({creator:user, activated:true, profile:user.currentProfile})
        const dailysSorted = dailys.sort(function(a, b){return b.dailyDate - a.dailyDate})
        const slicedArray = dailysSorted.slice(0, request.params.limit);
        response.json(slicedArray.map(dailyItem => dailyItem.toJSON()))
    }
    catch (exception) {
        next(exception)
    }
})



dailyRouter.post('/', async (request, response, next) => {
  try {
      const body = request.body
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      } else {
        request.user = decodedToken.id
      }
  
      const user = await User.findById(request.user)
      
      let yourDate = new Date()
      dateToAssociate= yourDate.getFullYear()+'-'+(yourDate.getMonth()+1)+'-'+yourDate.getDate()

      const dailyNew = new Daily({
        description: body.description,
        creator: user,
        date_modified :new Date(),
        profile:user.currentProfile,
        dailyDate:dateToAssociate
    })

    const dailyNewSaved = await dailyNew.save()
    response.json(dailyNewSaved.toJSON())

  }
  catch (exception) {
      next(exception)
  }
})


dailyRouter.put('/deactivate', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const dailyToUpdate = await Daily.findById(body.id)
    dailyToUpdate.activated = false
    dailyToUpdate.date_modified = new Date()
    await dailyToUpdate.save()
    response.json(dailyToUpdate.toJSON())

  }

  catch (exception) {
    next(exception)
}
})


dailyRouter.put('/', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      request.user = decodedToken.id
    }

    const user = await User.findById(request.user)

    const dailyToUpdate = await Daily.findById(body.id)
    dailyToUpdate.description = body.description
    dailyToUpdate.date_modified = new Date()
    await dailyToUpdate.save()
    response.json(dailyToUpdate.toJSON())
  }
  catch (exception) {
    next(exception)
}
})


dailyRouter.put('/updatedailydate', async (request, response, next) => {
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
    const dateDaily = new Date(body.dailyDate).addHours(4)

    const dailyToUpdate = await Daily.findById(body.id)
    dailyToUpdate.dailyDate = dateDaily
    dailyToUpdate.date_modified = new Date()
    await dailyToUpdate.save()
    response.json(dailyToUpdate.toJSON())
  }
  catch (exception) {
    next(exception)
}
})

module.exports = dailyRouter