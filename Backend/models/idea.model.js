import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    currentStage: {
        type: Number,
        default: 0, // 0: Idea, 1: Script, 2: Video, 3: Editing, 4: SEO
        min: 0,
        max: 4,
    },
    topic: {
        type: String,
        default: "",
    },
    audience: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;