'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                // Check for redirect parameter in URL
                const searchParams = new URLSearchParams(window.location.search);
                const redirect = searchParams.get('redirect') || '/dashboard';

                // Use window.location.href for a full page reload to ensure cookie is sent
                window.location.href = redirect;
            } else {
                const data = await res.json();
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-primary/20 text-primary">
                        <span className="material-symbols-outlined text-3xl">auto_stories</span>
                    </div>
                    <Link href="/" className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Vayana</Link>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Books</Link>
                        <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Lending</Link>
                        <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">About</Link>
                    </nav>
                    <Link href="/register" className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-black text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
                        Sign Up
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[5%] right-[5%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-3xl"></div>
                </div>
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-800 rounded-xl p-8 md:p-10">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sign in to your Library</h1>
                            <p className="text-slate-500 dark:text-slate-400">Manage your books and track your lending with Vayana.</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1" htmlFor="email">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-xl">alternate_email</span>
                                    </div>
                                    <input
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                                    <Link className="text-xs font-medium text-primary hover:underline" href="#">Forgot password?</Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-xl">lock</span>
                                    </div>
                                    <input
                                        className="w-full pl-11 pr-11 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" type="button">
                                        <span className="material-symbols-outlined text-xl">visibility</span>
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">error</span>
                                    {error}
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <input className="w-4 h-4 rounded text-primary focus:ring-primary/40 border-slate-300 dark:bg-slate-800 dark:border-slate-700 accent-primary" id="remember" type="checkbox" />
                                <label className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none" htmlFor="remember">Keep me signed in</label>
                            </div>
                            <button
                                className="w-full bg-primary text-black font-bold py-3.5 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isLoading}
                            >
                                <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                                {!isLoading && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 font-medium">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYndGNZYhWF4yGldquNm8DjN076tcdi_K9qBDR0T72j-Gl5jB4paswVP3kMpfyn1z7LT3v8oEBXURseUWfpr75KRHQmfMkoFn_3_2_CH_5dVb_fkZfwleeI4HHp6oXo96MHWwdr74A3qC1l-sHLIrohJM0BiheYWX0rVYlB_HrLpS0UrBT7KB0LTFw3BTwwhR8etOjfJ6Eq0SrAHHOIourZZ3OsyUokUHsOnuctLn-YFzEWdDoP8iHLDNztiAXPSoj9vDyeauzN0zq" />
                                <span className="text-sm font-medium">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-xl">ios</span>
                                <span className="text-sm font-medium">Apple</span>
                            </button>
                        </div>

                        <div className="mt-10 text-center">
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                Don't have an account yet?
                                <Link className="text-primary font-bold hover:underline ml-1" href="/register">Join the community</Link>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">inventory_2</span>
                            <span className="text-xs font-medium uppercase tracking-wider">Catalog Tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">group</span>
                            <span className="text-xs font-medium uppercase tracking-wider">Lending Circles</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">local_library</span>
                            <span className="text-xs font-medium uppercase tracking-wider">Reading Stats</span>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="p-6 text-center text-slate-500 dark:text-slate-600 text-xs">
                © 2024 Vayana Library Management System. All rights reserved.
            </footer>
        </div>
    );
}
