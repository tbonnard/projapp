const config = require('./utils/config')

const express = require('express')
const path = require('path');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/user')
const adminRouter = require('./controllers/admin_initial')
const itemsCategoriesRouter = require('./controllers/itemsCategories')
const todosRouter = require('./controllers/itemsToDo')
const notesRouter = require('./controllers/notes')
const projectRouter = require('./controllers/itemsProject')
const profileRouter = require('./controllers/profile')
const dailyRouter = require('./controllers/daily')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
//app.use(express.static('build'))
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
//app.use(middleware.userExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/admin_init', adminRouter)
app.use('/api/items', itemsCategoriesRouter)
app.use('/api/todos', todosRouter)
app.use('/api/notes', notesRouter)
app.use('/api/projects', projectRouter)
app.use('/api/profile', profileRouter)
app.use('/api/daily', dailyRouter)

// NB === USE THAT WITH REACT ROUTER
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app