const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator');

const dailySchema = new mongoose.Schema({
  description: {
    type: String,
    // required:true,
  },
  date_created: {
    type: Date,
    default: new Date()
  },
  date_modified: {
    type: Date,
    default: new Date()
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  activated: {
    type: Boolean,
    default: true,
  },
  dailyDate:{
    type: Date,
    default: new Date()
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

dailySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Daily', dailySchema)
