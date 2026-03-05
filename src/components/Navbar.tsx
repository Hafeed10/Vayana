
import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-10 py-3 bg-white dark:bg-background-dark sticky top-0 z-50">
            <div className="flex items-center gap-4 text-slate-900 dark:text-white">
                <div className="size-8 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl font-bold">auto_stories</span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-xl font-extrabold leading-tight tracking-tight">Vayana</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <div className="hidden md:flex items-center gap-9">
                    <Link href="#" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                    <Link href="#" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">My Library</Link>
                    <Link href="#" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">Lending</Link>
                    <Link href="#" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">Statistics</Link>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCR1d037kQbmFYKkqNPSOE6hexkoERvbIXRcFPFK7zZ2jeMM-x9rctYq8bcCdv4UffOoMvDiFm-azHHLktRuqRY-xc8Y4XarNKIaSvBLXryaY779e56cWBHmGNgrax5Fetxn9VoOW65nmg2ksKs2ZrZb5_3CPjsyjTTt_C0aDO7MIq3vvnSPCCnP57o7s2O9MLsgydQ0VdEeg5EVk9v0d_RV5HHB46YtM84bj8zLlIuSma7AM4onSdJ1CLNyvgQouSyk8qQE5VhFus6")' }}>
                    </div>
                </div>
            </div>
        </header>
    );
}
