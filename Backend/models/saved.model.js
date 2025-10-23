import mongoose from 'mongoose';

const savedContentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['idea', 'script', 'seo'],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const SavedContent = mongoose.model('SavedContent', savedContentSchema);

export default SavedContent;