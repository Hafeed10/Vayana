'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBookStore } from '@/store/useBookStore';
import { useRouter } from 'next/navigation';

// Helper to get a random cover if none exists (since our model lacks it)
const COVERS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDrTVDx91TOznV_ENPqfbaivwWfnD93QW7hVaibiWIln32lqWI5z-NifkxtPtjoeL_xymsMY6B1VObd8j4-Z00jRu-FUEX2wJdrcAfrOLkRjxsNELLWJkNzr2HggfJXN7HI9Yy3d0GJm-QMgd3fqU5S14I_dky2L08Mug8IhHVYCiLnjKP0NFquhtYokMMYr1aL-Gz8rPoFqrF6OFZVO0MN_y2llB7dXPDM0DBfl-Dz_V6eerAGpBp2Alr01OQxywkAqJUgHT3Ksdtm',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAAt1XOn_PtKNNKQDsOIUP9pNMHQ5DGZbr02HLYAu5De5Mtwkvo9_35iXpTz-RAU46shmC_nRTvDswAmBlRKsMmePLdqdsGb4k7pjCihoLikGMW4-Ayv3lp2FbuTTcVzxwt9G1wDVrVfthS4IfsnYmFOf-VvtuCSUUIynG1H6fpVvdBTl1DjevarNC8FMa7_0gag2LpE4L3dGXya3c5Cjev5er3MMLUR-9XjZLC_HWRqR_AuEGOetCOhsrhtVYxvV1xum5AGgxTezMj',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDIOyqd_BJM8i3kTSJ7LyvSYT1gfX-E6JGSsAT8a9AT4ohpsKjDxrdtcyRs4GwnHAQfRv3YSLh7IFqXTKpCssfGyY3BnamAd-ccNMFgmclaXxcOzw9ZNLC5m_B8sCwDIJnJhmI9p6l1CrmDP6FF9UNzTW4RW6G27u5uhoGkO754griqGfOL3AZyO4btNa94DwGX7dXI3TKAVTBD1pqkB79uoxoMu6vUr560VTWDtH-2eo53vbFJyrWg62PPq-LepXTuiKPbJCPmpM2n',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAfMH0jGRduMp_0f6XaWCzgOX55kr2C-kpiAJVqYQkjfF1wH7cQPRdFpxAiTAVx0hOEa8Cb-iTxhSCIAdmIm0j1uZY8xGzd-Ebcr0SbAECmEjybk5nAR91bSzhVi1Z5HQExjhEBLl8zLU-2w2m-DxXZUo14K7RxJDkoNuThG4ZIHDQ1E1D099JnMXuz3bLDdMadYfUIypj6op3o1pXBE5XdnAeJNWIA9BJVu_9ETZ52iqF4LPX_KUBUTFXSvjTKQJXQUhrkfa0ZFrvF',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCFjFd5YsizPvMeMQKKTDKDsVUPW5oNeegHkV8LpA80_sxqSWny_Vf544oP4rsF5evAIZzzbYQhcl7CW5jsy3ALcFSBsZAFIFGWJrwVQcAAkDnSVtq1tqY3W4vvo4LR2xApqOiFO7fODWsGpf1bJZrE2wPhBGvVjatrCU0kmK_kfBT3w6roDazispQyTE8dtscOXQ_Cs5RTed63RLUIQPlNW15n_cB2GFxFqTBSvkc0TKPd6J8zJFqjOYc8GttWvFZCQrxoaNWemcap',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAd3zLC8AFZA7ygcRQzFYc0ucFHqisB0-Tt7ZndjeEX2QFs0Yn2jDmeCdkRqFE_CAgNcluc6nNKeLGy56-22CSZR87TxTT0o72OjiJ5bUNPF8km0CjKoBzV7_bQjTmeCAQmCJqgq5HLlYzwWB6hzDMdaRCDKbaqyLfQGbXR9_8p_eNxCC8yV7fpXWZ7HkvGzPFcgBb0fwZN05_GAU2szqHSfa9PU5S7j5uOgClfNpwIHyizYdjVWuk6cVe5ZqyeV2IT68aiDzgU4PGV',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBe7BBtmKf0XSOwtZEYNdHKZul8fnUeqGzamp7hQu4uV4Ddc3g83eFaSWfZsK-GsPBy1DpEgbsD7YdqY809vRjRcPQvJWOGS7z29hs2ltMg3zJv_hrtDPK4IrfFsUTnmDdgWTGSP3cH1igzZaIp6NH2h5onRmJ3c31i28BIebpEQere-wJ4sYlxACgcKsU9wUEgoK0LOML0UwJUVTAIKSggMAr7eIqo-wqprgLksjs_sj8UV7_1hrFHKVBUJ2cqrwAlphJvYEMBFMUX'
];

const getCover = (id: string, index: number) => COVERS[index % COVERS.length];

export default function DashboardPage() {
  const {
    books, fetchBooks,
    searchTerm, setSearchTerm,
    filterCategory, setFilterCategory,
    filterStatus, setFilterStatus,
    updateBook
  } = useBookStore();
  const router = useRouter();

  // Load books on mount
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const currentlyReading = books.filter(b => b.currentPage > 0 && b.currentPage < b.totalPages);

  // Filter logic (replicating getFilteredBooks logic here or using the store's filter state if simpler)
  // We can use the store's state for inputs, and compute filtered list here or use getFilteredBooks() if available in component (it is not a hook, so we call it or replicate logic).
  // Actually useBookStore returns state and actions. getFilteredBooks is an action/selector.
  // Wait, in the store definition: getFilteredBooks: () => Book[].
  // Since it relies on `get()` it might not be reactive if just called once.
  // Better to filter inline to ensure reactivity to state changes.
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'All' || filterCategory === 'All Categories' || book.category === filterCategory;

    let matchesStatus = true;
    if (filterStatus === 'lent') matchesStatus = book.isLent;
    if (filterStatus === 'available') matchesStatus = !book.isLent;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Unique categories for dropdown
  const categories = ['All Categories', ...Array.from(new Set(books.map(b => b.category).filter(Boolean)))];

  // Stats
  const totalBooks = books.length;
  const booksLent = books.filter(b => b.isLent).length;
  const totalPagesRead = books.reduce((acc, b) => acc + b.currentPage, 0);
  const completionRate = totalBooks > 0
    ? Math.round((books.filter(b => b.currentPage === b.totalPages).length / totalBooks) * 100)
    : 0;

  return (
    <main className="p-6 space-y-8">
      {/* Currently Reading Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Currently Reading</h2>
          {currentlyReading.length > 0 && (
            <button className="text-sm font-medium text-primary hover:underline">View all active</button>
          )}
        </div>

        {currentlyReading.length === 0 ? (
          <div className="text-slate-500 text-sm italic">No books currently in progress. Start reading!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentlyReading.slice(0, 2).map((book, idx) => { // limit to 2 for the 'featured' view
              const progress = Math.round((book.currentPage / book.totalPages) * 100);
              return (
                <div key={book._id} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4 cursor-pointer hover:border-slate-300 transition-colors"
                  onClick={() => router.push(`/edit-book/${book._id}`)}>
                  <div className="w-24 h-32 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${getCover(book._id, idx)}')` }}></div>
                  </div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{book.title}</h3>
                      <p className="text-sm text-slate-500">{book.author}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-500">{progress}% Complete</span>
                        <span className="text-primary">{book.currentPage} / {book.totalPages} pages</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Main Library Section */}
      <section className="space-y-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input
                className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg pl-10 text-sm focus:ring-primary focus:border-primary py-2.5 outline-none border transition-colors"
                placeholder="Search title, author or ISBN..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary min-w-[120px] py-2.5 px-3 outline-none border cursor-pointer"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-primary focus:border-primary min-w-[120px] py-2.5 px-3 outline-none border cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="lent">Lent</option>
            </select>
          </div>
          <Link href="/add-book" className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-background-dark font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Add Book</span>
          </Link>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, idx) => (
            <div key={book._id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-4 hover:border-slate-300 transition-colors">
              <div className="flex justify-between items-start">
                <div className="w-16 h-24 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden flex-shrink-0 shadow-inner">
                  <div className="w-full h-full bg-cover bg-center opacity-80" style={{ backgroundImage: `url('${getCover(book._id, idx)}')` }}></div>
                </div>
                {book.isLent ? (
                  <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 text-[10px] font-bold uppercase tracking-wider">Lent to {book.borrowerName || 'Unknown'}</span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">Available</span>
                )}
              </div>
              <div onClick={() => router.push(`/edit-book/${book._id}`)} className="cursor-pointer">
                <h4 className="font-bold text-slate-900 dark:text-white">{book.title}</h4>
                <p className="text-xs text-slate-500">{book.author}</p>
              </div>
              <div className="mt-auto space-y-3 pt-2 border-t border-slate-50 dark:border-slate-800">
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>Current Page</span>
                  <span>Page {book.currentPage} of {book.totalPages}</span>
                </div>
                {/* Range input for quick progress update for the daring, or just read-only/disabled for now as strict updates might be better in detailed view or careful logic */}
                <input
                  className="custom-slider"
                  type="range"
                  min="0"
                  max={book.totalPages}
                  value={book.currentPage}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateBook(book._id, { currentPage: parseInt(e.target.value) })}
                />
              </div>
            </div>
          ))}

          {/* Add New Book Placeholder Card */}
          <Link href="/add-book" className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-primary transition-colors min-h-[250px]">
            <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-primary transition-colors">library_add</span>
            <p className="text-sm font-medium text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">Add a new book</p>
          </Link>
        </div>
      </section>

      {/* Footer / Stats */}
      <footer className="p-6 mt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Total Books</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{totalBooks}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Books Lent</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{booksLent}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Pages Read</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{totalPagesRead}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Completion Rate</span>
          <span className="text-2xl font-bold text-primary">{completionRate}%</span>
        </div>
      </footer>
    </main>
  );
}
