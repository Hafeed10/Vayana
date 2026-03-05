
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (res.ok) {
                router.push('/');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
            setIsDropdownOpen(false);
        }
    };

    return (
        <header className="flex h-16 items-center justify-between border-b px-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-t-xl">
            <div className="flex items-center gap-2">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-lg">auto_stories</span>
                    </div>
                    <span className="text-slate-900 dark:text-white">Vayana</span>
                </Link>
            </div>
            <nav className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors"
                >
                    My Library
                </Link>
                <Link
                    href="/add-book"
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors"
                >
                    Add Book
                </Link>
            </nav>
            <div className="flex items-center gap-4 relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined text-sm">person</span>
                </button>

                {isDropdownOpen && (
                    <>
                        {/* Backdrop to close dropdown */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsDropdownOpen(false)}
                        />

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-12 z-20 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2">
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined text-lg">logout</span>
                                {isLoggingOut ? 'Logging out...' : 'Logout'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}
