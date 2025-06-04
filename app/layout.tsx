import "./globals.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // normal, medium, bold
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
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}

