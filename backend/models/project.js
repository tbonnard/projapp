const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required:true,
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
  defaultAdmin: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default:"#fafafa"
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

projectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Project', projectSchema)
