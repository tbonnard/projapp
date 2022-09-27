const bcrypt = require('bcrypt')
const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const usersRouter = require('express').Router()

const User = require('../models/user')
const Category = require('../models/category')
const Status = require('../models/status')
const Profile = require('../models/profile')

const categoryInitial = ["Daily", "Retro", "Planning"]
const statusInitial = ["To do", "In progress", "Blocked", "Validation", "Done"]


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON()))
})


// usersRouter.post('/search', async (request, response, next) => {
//     try {
//         const body = request.body
//         const allUsers = await User.find({})
//         const userSearched = allUsers.filter(userReturned => userReturned.username.includes(body.contentSearched))
//         if (userSearched.length > 0) {
//             response.json(userSearched.map(({id, username, fullName}) => [{id, username, fullName}] ))
//         } else {
//             return response.status(200).json({message: 'no result'})
//         }

//     } catch(exception) {
//         next(exception)
//     }
// })


// usersRouter.get('/validate_username/:username', async (request, response, next) => {
//     try {
//         const checkUsername = await User.find({username:request.params.username})
//         if (checkUsername.length>0) {
//             return response.status(200).json({message: 'invalid username'})
//         } else {
//             return response.status(200).json({message: 'username available'})
//         }
//     } catch(exception) {
//         next(exception)
//     }
// })


usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const userEmail = await User.findOne({ email: body.email }) 

        if (userEmail) {
             return response.status(401).json({error: 'invalid email'})
         }

        if (body.email.length === 0 || body.confirmPassword.length === 0 || body.password.length < 6 ) {
            return response.status(401).json({error: 'invalid email or password'})
        }

        if (body.confirmPassword !== body.password) {
            return response.status(401).json({error: 'passwords do not match'})
        }
    
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds) 
    
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };

        emailConfirmed = validateEmail(body.email)
        if (!emailConfirmed) {
            return response.status(401).json({error: 'invalid email'})
        }

        const newUser = new User({
            passwordHash: passwordHash,
            email: body.email
        })
    
        const savedUser = await newUser.save()

        // const defaultCategories = await Category.find({defaultAdmin:true})
        // defaultCategories.forEach( item => {
        //     item.creator = item.creator.concat(savedUser._id)
        //     item.save()
        // })

        // const defaultStatus = await Status.find({defaultAdmin:true})
        // defaultStatus.forEach( item => {
        //     item.creator = item.creator.concat(savedUser._id)
        //     item.save()
        // })
  

        const profile = new Profile({
            creator: savedUser,
            currentProfile: true
        })
        const newProfileSaved = await profile.save()

        const userSavedFinal = await User.findById(savedUser.id)
        const profileSavedFinal = await Profile.findById(newProfileSaved.id)
        userSavedFinal.currentProfile = profileSavedFinal
        await userSavedFinal.save()

        response.json(userSavedFinal.toJSON())


    } catch (exception) {
        next(exception)
    }

})


module.exports = usersRouter