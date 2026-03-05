
export default function Footer() {
    return (
        <footer className="py-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-10">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <span className="material-symbols-outlined">copyright</span>
                    2024 Vayana. All rights reserved.
                </div>
                <div className="flex gap-6">
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">Help Center</a>
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">Privacy Policy</a>
                    <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
