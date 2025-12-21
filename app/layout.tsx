import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "New Design - Concept",
    description: "New Design Advertising Agency",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-black min-h-screen flex flex-col items-center justify-center">
                {children}
            </body>
        </html>
    );
}
