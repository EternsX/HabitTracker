import mongoose from 'mongoose'

const habitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    habit: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    completionDates: {
        type: [Date],
        default: []
    },
}, { timestamps: true })

export default mongoose.model('Habit', habitSchema)