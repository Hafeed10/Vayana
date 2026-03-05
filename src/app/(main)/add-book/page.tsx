
import Link from 'next/link';
import AddBookForm from './add-book-form';

export const metadata = {
    title: 'Add New Book | Vayana',
};

export default function AddBookPage() {
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
                    <span className="text-slate-900 dark:text-white font-medium">Add New Book</span>
                </div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-start px-6 pb-20">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                        <span className="material-symbols-outlined text-primary text-4xl">library_add</span>
                    </div>
                    <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight mb-2">Add New Book</h1>
                    <p className="text-slate-500 dark:text-slate-400">Fill in the details to expand your digital collection.</p>
                </div>

                <AddBookForm />

                <div className="mt-8 flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm">
                    <span className="material-symbols-outlined text-base">info</span>
                    <span>Pro-tip: Adding a category helps you filter your collection later.</span>
                </div>
            </main>
        </>
    );
}
