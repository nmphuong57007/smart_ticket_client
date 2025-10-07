import Footer from "@/components/footer";
import Header from "@/components/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-auth-cinema" />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-full">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
