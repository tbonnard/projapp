const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
  description: {
    type: String,
    // required:true,
    // maxLength: 50
  },
  date_created: {
    type: Date,
    default: new Date()
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  order: {
    type: Number,
    required:true,
    default:1
  },
  activated: {
    type: Boolean,
    default: true,
  },
  defaultAdmin: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', categorySchema)
