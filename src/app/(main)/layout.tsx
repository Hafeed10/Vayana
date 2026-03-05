import Header from '@/components/Header';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-10">
            <div className="max-w-[1200px] mx-auto bg-white dark:bg-slate-900 shadow-sm min-h-[calc(100vh-2rem)] rounded-xl my-4 border border-slate-200 dark:border-slate-800">
                <Header />
                {children}
            </div>
        </div>
    );
}
