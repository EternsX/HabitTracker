import mongoose from 'mongoose'

const habitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    habit: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },

    frequency: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (v) {
                if (v === "Daily") return true;
                return Number.isInteger(v) && v >= 1 && v <= 6;
            },
            message: "Frequency must be 'Daily' or a number between 1 and 6"
        }
    },

    completionDates: {
        type: [Date],
        default: []
    },
}, { timestamps: true })

habitSchema.index({ habit: 1, userId: 1 }, { unique: true });

export default mongoose.model('Habit', habitSchema)