
import { create } from 'zustand';

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

interface BookStore {
    books: Book[];
    isLoading: boolean;
    error: string | null;
    searchTerm: string;
    filterCategory: string;
    filterStatus: 'all' | 'lent' | 'available' | 'reading';
    fetchBooks: () => Promise<void>;
    addBook: (book: Omit<Book, '_id'>) => Promise<void>;
    updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
    deleteBook: (id: string) => Promise<void>;
    setSearchTerm: (term: string) => void;
    setFilterCategory: (category: string) => void;
    setFilterStatus: (status: 'all' | 'lent' | 'available' | 'reading') => void;
    getFilteredBooks: () => Book[];
}

export const useBookStore = create<BookStore>((set, get) => ({
    books: [],
    isLoading: false,
    error: null,
    searchTerm: '',
    filterCategory: 'All',
    filterStatus: 'all',

    setSearchTerm: (term) => set({ searchTerm: term }),
    setFilterCategory: (category) => set({ filterCategory: category }),
    setFilterStatus: (status) => set({ filterStatus: status }),

    getFilteredBooks: () => {
        const { books, searchTerm, filterCategory, filterStatus } = get();
        return books.filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                filterCategory === 'All' || book.category === filterCategory;

            let matchesStatus = true;
            if (filterStatus === 'lent') matchesStatus = book.isLent;
            if (filterStatus === 'available') matchesStatus = !book.isLent;
            if (filterStatus === 'reading') matchesStatus = book.currentPage > 0 && book.currentPage < book.totalPages;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    },

    fetchBooks: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await fetch('/api/books');
            if (!res.ok) throw new Error('Failed to fetch books');
            const books = await res.json();
            set({ books, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    addBook: async (bookData) => {
        set({ isLoading: true, error: null });
        try {
            const res = await fetch('/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData),
            });
            if (!res.ok) throw new Error('Failed to add book');
            const newBook = await res.json();
            set((state) => ({ books: [newBook, ...state.books], isLoading: false }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateBook: async (id, updates) => {
        // Optimistic update
        set((state) => ({
            books: state.books.map((b) => (b._id === id ? { ...b, ...updates } : b)),
        }));

        try {
            const res = await fetch(`/api/books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (!res.ok) {
                throw new Error('Failed to update book');
                // Revert on failure would be needed here ideally
            }
            // Update with actual server response to be sure
            const updated = await res.json();
            set((state) => ({
                books: state.books.map((b) => (b._id === id ? updated : b)),
            }));
        } catch (error: any) {
            set({ error: error.message });
            get().fetchBooks();
        }
    },

    deleteBook: async (id) => {
        set((state) => ({
            books: state.books.filter((b) => b._id !== id),
        }));

        try {
            const res = await fetch(`/api/books/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete book');
        } catch (error: any) {
            set({ error: error.message });
            get().fetchBooks();
        }
    },
}));
