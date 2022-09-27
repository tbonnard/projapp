const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  email: { 
    type: String,
    //unique: true,
    required:true,
  },
  passwordHash: { 
    type: String,
    required:true,
    minLength: 6
  },
  date_created: { 
    type: Date,
    default: new Date()
  },
  activated: {
    type: Boolean,
    default: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  type:{
    type: Number,
    default: 2
  },
  currentProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })
  
//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)
