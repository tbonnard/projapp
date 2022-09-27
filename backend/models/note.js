const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
      },
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
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  meetingNote:{
    type: Boolean,
    default: false,
  },
  meetingDate:{
    type: Date
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

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Note', noteSchema)
