import Header from '@/components/layout/header';
import BottomNav from '@/components/layout/bottom-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 container pt-4 pb-24 md:pb-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
