import '../styles/global.css';
import type { Metadata } from 'next';


export const metadata:Metadata = {
  title: "Portfolio Dashboard",
  description: "Portfolio Dashboard converted to Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-color-background font-sans min-h-screen text-color-text p-8">
        {children}
      </body>
    </html>
  );
}
