const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator');

const profileSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    default:'Default profile'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date_created: { 
    type: Date,
    default: new Date()
  },
  activated: {
    type: Boolean,
    default: true,
  },
  currentProfile: {
    type: Boolean,
    default: false,
  },
  date_modified: {
    type: Date,
    default: new Date()
  }
})

profileSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Profile', profileSchema)
