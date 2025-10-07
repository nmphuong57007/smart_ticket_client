import Footer from "@/components/footer";
import Header from "@/components/header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        <div className="relative z-10 container mx-auto py-8 flex justify-center min-h-[calc(100vh-theme(spacing.20)-theme(spacing.32))]">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
