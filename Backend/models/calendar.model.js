// Backend/models/calendar.model.js
import mongoose from 'mongoose';

const calendarEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        default: "",
    },
    details: {
        type: String,
        default: "",
    },
    colorStage: {
        type: Number,
        default: 0,
        min: 0,
        max: 4,
    },
}, { timestamps: true });

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

export default CalendarEvent;