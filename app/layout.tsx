import "@/app/globals.css";
import { SSEProvider } from "@/app/providers/SSEProvider";
import { NotificationProvider } from "@/app/(user)/alram/NotificationContext";
import NotificationContainerWrapper from "@/app/(user)/alram/NotificationContainerWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main>
          <NotificationProvider>
            <NotificationContainerWrapper />
            <SSEProvider>{children}</SSEProvider>
          </NotificationProvider>
        </main>
      </body>
    </html>
  );
}
