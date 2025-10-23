import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contentTitle: {
        type: String,
        required: true,
    },
    // The structured SEO data (stored as a JSON string)
    generatedSEOData: { 
        type: String, // Store as string to handle the object structure
        required: true,
    },
    // Optional: Reference to an Idea if the content originated from one
    ideaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Idea',
        default: null,
    },
    // Metadata like the platform and target keywords
    metadata: {
        type: Object,
        default: {},
    }
}, { timestamps: true });

const SEO = mongoose.model('SEO', seoSchema);

export default SEO;