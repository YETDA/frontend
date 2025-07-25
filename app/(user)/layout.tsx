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
      <main className="w-full md:px-10 lg:px-20 xl:px-32 xxl:px-40 xxxl:px-[320px] max-w-screen-2xl mx-auto">
        <NotificationProvider>
          <NotificationContainerWrapper />
          <SSEProvider>{children}</SSEProvider>
        </NotificationProvider>
      </main>
    </>
  );
}
