import Footer from "@/components/footer";
import Header from "@/components/header";

interface MainLayoutProps {
  readonly children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <div className="fixed top-0 h-20 w-full bg-background z-50">
        <Header />
      </div>

      <main className="container mx-auto px-4 pt-25 pb-15">{children}</main>

      <div>
        <Footer />
      </div>
    </div>
  );
}
