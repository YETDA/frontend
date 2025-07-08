import "./globals.css";
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main className="h-[200vh]">
          <Header />
          <SubHeader />
          {children}
        </main>
      </body>
    </html>
  );
}
