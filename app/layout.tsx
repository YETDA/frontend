import "./globals.css";
// import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main>
          {/* <Header /> */}
          {children}
        </main>
      </body>
    </html>
  );
}
