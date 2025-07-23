export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      <main
        className="
          flex-1
          w-full           
          bg-gradient-to-br
          from-gray-100
          via-white
          to-gray-50
        "
      >
        {children}
      </main>
    </div>
  );
}
