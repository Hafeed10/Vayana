'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { createBook } from './action';

type BookResult = {
    key: string;
    title: string;
    author_name?: string[];
    number_of_pages_median?: number;
    cover_i?: number;
    first_publish_year?: number;
};

export default function AddBookForm() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<BookResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Form states for controlled inputs
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pages, setPages] = useState<string>('');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setShowResults(true);
        setResults([]);

        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=key,title,author_name,number_of_pages_median,cover_i,first_publish_year&limit=10`);
            const data = await response.json();
            setResults(data.docs || []);
        } catch (error) {
            console.error('Failed to search books:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const selectBook = (book: BookResult) => {
        setTitle(book.title);
        setAuthor(book.author_name ? book.author_name[0] : '');
        setPages(book.number_of_pages_median ? String(book.number_of_pages_median) : '');
        setShowResults(false);
        setQuery('');
    };

    return (
        <div className="w-full max-w-[600px]">
            {/* Search Section */}
            <div className="mb-8 relative" ref={searchContainerRef}>
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">search</span>
                        Auto-fill details
                    </h2>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by title or ISBN..."
                                className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isSearching || !query.trim()}
                            className="bg-slate-900 dark:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSearching ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Search'
                            )}
                        </button>
                    </form>

                    {/* Search Results Dropdown */}
                    {showResults && (
                        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 max-h-[400px] overflow-y-auto z-50">
                            {results.length > 0 ? (
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {results.map((book) => (
                                        <button
                                            key={book.key}
                                            onClick={() => selectBook(book)}
                                            className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex gap-4 group"
                                        >
                                            {book.cover_i ? (
                                                <img
                                                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                                                    alt={book.title}
                                                    className="w-12 h-16 object-cover rounded bg-slate-200 dark:bg-slate-700"
                                                />
                                            ) : (
                                                <div className="w-12 h-16 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400">
                                                    <span className="material-symbols-outlined">book</span>
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                                                    {book.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                                    {book.author_name?.join(', ') || 'Unknown Author'}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                                    {book.first_publish_year && (
                                                        <span>{book.first_publish_year}</span>
                                                    )}
                                                    {book.number_of_pages_median && (
                                                        <span>{book.number_of_pages_median} pages</span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                                    {isSearching ? 'Searching library...' : 'No books found. Try a different search.'}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Manual Entry Form */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-10">
                <form action={createBook} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="book-title" className="text-slate-700 dark:text-slate-200 text-sm font-semibold">Book Title</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">title</span>
                            <input
                                type="text"
                                id="book-title"
                                name="book-title"
                                placeholder="e.g. The Great Gatsby"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="author" className="text-slate-700 dark:text-slate-200 text-sm font-semibold">Author</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                placeholder="e.g. F. Scott Fitzgerald"
                                required
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="pages" className="text-slate-700 dark:text-slate-200 text-sm font-semibold">Total Pages</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">menu_book</span>
                                <input
                                    type="number"
                                    id="pages"
                                    name="pages"
                                    placeholder="e.g. 180"
                                    value={pages}
                                    onChange={(e) => setPages(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="category" className="text-slate-700 dark:text-slate-200 text-sm font-semibold">Category</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">category</span>
                                <select
                                    id="category"
                                    name="category"
                                    defaultValue=""
                                    className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                >
                                    <option value="" disabled>Select Genre</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Non-Fiction">Non-Fiction</option>
                                    <option value="Biographies">Biographies</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                    <option value="History">History</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Uncategorized">Uncategorized</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button type="submit" className="w-full bg-primary hover:bg-opacity-90 text-slate-900 font-bold py-4 px-6 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]">
                            <span className="material-symbols-outlined">save</span>
                            Save Book to Library
                        </button>
                        <Link href="/dashboard" className="w-full mt-4 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
