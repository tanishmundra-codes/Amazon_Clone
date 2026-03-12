import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Amazon Clone",
  description: "Amazon Clone built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
