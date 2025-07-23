import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SSEProvider } from "../providers/SSEProvider";
import { NotificationProvider } from "./alram/NotificationContext";
import NotificationContainerWrapper from "./alram/NotificationContainerWrapper";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex justify-center itmes-center w-full mx-auto">
        <NotificationProvider>
          <NotificationContainerWrapper />
          <SSEProvider>{children}</SSEProvider>
        </NotificationProvider>
      </main>
      <Footer />
    </>
  );
}
