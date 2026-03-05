
import { useBookStore } from '../store/useBookStore';
import { Trash2, Edit } from 'lucide-react';
import { useState } from 'react';

interface Book {
    _id: string;
    title: string;
    author: string;
    totalPages: number;
    currentPage: number;
    category: string;
    isLent: boolean;
    borrowerName?: string;
}

export default function BookCard({ book, onEdit }: { book: Book; onEdit: (book: Book) => void }) {
    const { deleteBook, updateBook } = useBookStore();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this book?')) {
            await deleteBook(book._id);
        }
    };

    const handleProgressUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPage = parseInt(e.target.value);
        if (!isNaN(newPage) && newPage >= 0 && newPage <= book.totalPages) {
            await updateBook(book._id, { currentPage: newPage });
        }
    };

    const progress = Math.min((book.currentPage / book.totalPages) * 100, 100);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-semibold text-gray-900 truncate" title={book.title}>
                        {book.title}
                    </h3>
                    <p className="text-sm text-gray-500">{book.author}</p>
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(book)} className="text-gray-400 hover:text-blue-500">
                        <Edit size={16} />
                    </button>
                    <button onClick={handleDelete} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{book.currentPage} / {book.totalPages} pages</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <input
                    type="range"
                    min="0"
                    max={book.totalPages}
                    value={book.currentPage}
                    onChange={handleProgressUpdate}
                    className="w-full mt-2 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
            </div>

            <div className="mt-4 flex items-center justify-between">
                <span className={`px-2 py-1 text-xs rounded-full ${book.isLent ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                    {book.isLent ? `Lent to: ${book.borrowerName}` : 'Available'}
                </span>
                <span className="text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded">
                    {book.category}
                </span>
            </div>
        </div>
    );
}
