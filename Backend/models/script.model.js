import mongoose from 'mongoose';

const scriptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contentTitle: {
        type: String,
        required: true,
    },
    // The main generated script text
    generatedScript: { 
        type: String,
        required: true,
    },
    // Optional: Reference to an Idea if the content originated from one
    ideaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Idea',
        default: null,
    },
    // Metadata like content type or duration from the generation step
    metadata: { 
        type: Object,
        default: {},
    }
}, { timestamps: true });

const Script = mongoose.model('Script', scriptSchema);

export default Script;