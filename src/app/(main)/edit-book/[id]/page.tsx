
'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useBookStore } from '@/store/useBookStore';
import Link from 'next/link';

export default function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { books, updateBook, deleteBook, fetchBooks, isLoading: storeLoading } = useBookStore();

    // Local state for form data
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        totalPages: '',
        currentPage: '',
        category: 'Uncategorized',
        isLent: false,
        borrowerName: '',
    });

    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [notFound, setNotFound] = useState(false);

    // Initial data load
    useEffect(() => {
        const book = books.find((b) => b._id === id);

        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                totalPages: book.totalPages.toString(),
                currentPage: book.currentPage.toString(),
                category: book.category,
                isLent: book.isLent,
                borrowerName: book.borrowerName || '',
            });
        } else {
            // If book not in store, fetch all books to ensure we have latest data
            // Ideally we'd fetch just one book, but store pattern fetches all.
            fetchBooks().then(() => {
                // The next render/effect cycle will handle setting form data if found
                // If specific check needed after fetch:
                // const found = useBookStore.getState().books.find(b => b._id === id);
                // if (!found) setNotFound(true);
            });
        }
    }, [id, books, fetchBooks]);

    // Handle book not found after loading
    useEffect(() => {
        if (!storeLoading && books.length > 0) {
            const book = books.find((b) => b._id === id);
            if (!book) {
                // Optimization: only set not found if we are sure (store loaded, book missing)
                // For now, simple check might flicker if fetch is fast.
                // Let's rely on the user seeing a loading state or "Back to Dashboard" if it takes too long.
            }
        }
    }, [storeLoading, books, id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const total = parseInt(formData.totalPages);
        const current = parseInt(formData.currentPage);

        if (current > total) {
            alert('Current page cannot be greater than total pages');
            setIsSaving(false);
            return;
        }

        try {
            await updateBook(id, {
                title: formData.title,
                author: formData.author,
                totalPages: total,
                currentPage: current,
                category: formData.category,
                isLent: formData.isLent,
                borrowerName: formData.isLent ? formData.borrowerName : '',
            });
            router.push('/dashboard');
            router.refresh();
        } catch (error) {
            console.error("Failed to update book", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
            setIsDeleting(true);
            try {
                await deleteBook(id);
                router.push('/dashboard');
                router.refresh();
            } catch (error) {
                console.error("Failed to delete book", error);
                setIsDeleting(false);
            }
        }
    };

    if (storeLoading && formData.title === '') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-slate-500 font-medium">Loading book details...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="px-6 md:px-40 py-6 max-w-[1200px] mx-auto w-full">
                <div className="flex flex-wrap gap-2 items-center text-sm">
                    <Link href="/dashboard" className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">home</span>
                        Home
                    </Link>
                    <span className="text-slate-300 dark:text-slate-600">/</span>
                    <Link href="/dashboard" className="text-slate-500 hover:text-primary transition-colors">Library</Link>
                    <span className="text-slate-300 dark:text-slate-600">/</span>
                    <span className="text-slate-900 dark:text-white font-medium">Edit Book</span>
                </div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-start px-6 pb-20">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                        <span className="material-symbols-outlined text-primary text-4xl">edit_note</span>
                    </div>
                    <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight mb-2">Edit Book Details</h1>
                    <p className="text-slate-500 dark:text-slate-400">Update information or manage lending status.</p>
                </div>

                <div className="w-full max-w-[600px] bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-10 relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <span className="material-symbols-outlined text-9xl">book</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="book-title" className="text-slate-700 dark:text-slate-200 text-sm font-semibold">Book Title</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">title</span>
                                <input
                                    type="text"
                                    id="book-title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. The Great Gatsby"
                                    required
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
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    placeholder="e.g. F. Scott Fitzgerald"
                                    required
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
                                        min="1"
                                        value={formData.totalPages}
                                        onChange={(e) => setFormData({ ...formData, totalPages: e.target.value })}
                                        placeholder="e.g. 180"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="current-page" className="text-slate-700 dark:text-slate-200 text-sm font-semibold">Current Page</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">bookmark</span>
                                    <input
                                        type="number"
                                        id="current-page"
                                        min="0"
                                        max={formData.totalPages}
                                        value={formData.currentPage}
                                        onChange={(e) => setFormData({ ...formData, currentPage: e.target.value })}
                                        placeholder="e.g. 50"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Lending Section */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Lending Status</span>
                                    <span className="text-xs text-slate-500">Track who has this book</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isLent}
                                        onChange={(e) => setFormData({ ...formData, isLent: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                </label>
                            </div>

                            {formData.isLent && (
                                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <label htmlFor="borrower" className="text-slate-700 dark:text-slate-200 text-sm font-semibold">Borrower Name</label>
                                    <div className="relative group">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">handshake</span>
                                        <input
                                            type="text"
                                            id="borrower"
                                            value={formData.borrowerName}
                                            onChange={(e) => setFormData({ ...formData, borrowerName: e.target.value })}
                                            placeholder="Who has this book?"
                                            className="w-full pl-10 pr-4 py-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-6 flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="w-full bg-primary hover:bg-opacity-90 text-slate-900 font-bold py-4 px-6 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                                {!isSaving && <span className="material-symbols-outlined">save</span>}
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/dashboard"
                                    className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="w-full bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete Book'}
                                    {!isDeleting && <span className="material-symbols-outlined text-sm">delete</span>}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
