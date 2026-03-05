
import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    author: {
        type: String,
        required: [true, 'Please provide an author'],
    },
    totalPages: {
        type: Number,
        required: [true, 'Please provide total pages'],
    },
    currentPage: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        default: 'Uncategorized',
    },
    isLent: {
        type: Boolean,
        default: false,
    },
    borrowerName: {
        type: String,
        default: '',
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
