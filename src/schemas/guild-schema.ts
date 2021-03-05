import mongoose from 'mongoose'

const guild = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
      },
    language: {
        type: String,
      },
    prefix: {
      type: String,
    },
    disabled_commands: {
      type: [String]
    }
})

export default mongoose.model('guild', guild)