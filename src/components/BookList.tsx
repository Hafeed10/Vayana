
'use client';

import { useEffect } from 'react';
import { useBookStore } from '../store/useBookStore';
import BookCard from './BookCard';
import { useRouter } from 'next/navigation';

export default function BookList() {
    const { isLoading, error, fetchBooks, getFilteredBooks, searchTerm, filterCategory, filterStatus, books } = useBookStore();
    const router = useRouter();

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const filteredBooks = getFilteredBooks();

    if (isLoading) return <div className="text-center py-10">Loading library...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    if (!books.length) return <div className="text-center py-10 text-gray-500">No books found. Add one to get started!</div>;
    if (!filteredBooks.length) return <div className="text-center py-10 text-gray-500">No books match your search.</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
                <BookCard
                    key={book._id}
                    book={book}
                    onEdit={(b) => router.push(`/edit-book/${b._id}`)}
                />
            ))}
        </div>
    );
}
