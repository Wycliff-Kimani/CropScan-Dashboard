import type { Metadata } from "next";
import "./globals.css";
import { DarkModeProvider } from "@/components/providers/DarkModeProvider";

export const metadata: Metadata = {
  title: "CropScan Dashboard",
  description:
    "Modern agricultural IoT device management dashboard for CropScan.co.ke",
  keywords: [
    "agriculture",
    "IoT",
    "crop scanning",
    "Kenya",
    "dashboard",
    "agritech",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
