interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const bgUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDc-35ojqo8LcGeT8-e3_pS_m1nBkeCTgx1UGgAIA6CWkgmiKmwJgjNKYEBF0OHhMAYjE0ipzw1KSpQfgd48fKnANYxi8Hm97OMagawBcg7CosYjkZV113mhQKeLhO7PYmipQBZI_FtTH-fMutvTAI8qVKUkvzRNANC4wB68Rm8MH93x0AibHV-Is83gj7LgagD6zX834KGT5jgTNud5qImT0hJctLivPb-Zbnt56qImfMHJnk3Y-bMn2HGkqwm-48P2-Sj6fDmUPw";

  return (
    <div
      className="min-h-screen flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url('${bgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-lg mx-auto">{children}</div>
    </div>
  );
}
