import mongoose from 'mongoose'

const habitSchema = new mongoose.Schema({
    habit: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true})

export default mongoose.model('Habit', habitSchema)