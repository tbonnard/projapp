const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator');

const itemProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    // required:true,
  },
  description: {
    type: String,
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
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  order: {
    type: Number,
    required:true,
    default:1
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

itemProjectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('ItemProject', itemProjectSchema)
