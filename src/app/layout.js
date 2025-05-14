// app/layout.js
import "../styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { TBRProvider } from "./context/TBRContext"; 

export const metadata = {
  title: "Book Nook",
  description: "Track your reading list with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <TBRProvider>
          <Navbar />
          <main className="flex-grow px-8 py-8">{children}</main>
          <Footer />
        </TBRProvider>
      </body>
    </html>
  );
}
