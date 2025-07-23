export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      <main className="flex-1 w-full full-bleed">{children}</main>
    </div>
  );
}
