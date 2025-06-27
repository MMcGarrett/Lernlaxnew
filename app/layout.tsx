import "./globals.css";
import { DM_Sans } from "next/font/google";
import { MotionBgProvider } from "@/components/MotionBgProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Lernlax",
  description: "Scrollytelling Projekt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={dmSans.className}>
        <MotionBgProvider>
          {children}
        </MotionBgProvider>
      </body>
    </html>
  );
}
