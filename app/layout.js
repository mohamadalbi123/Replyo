import Footer from "./components/Footer";
import Header from "./components/Header";
import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "Replyo",
  description: "Instant replies to your client reviews.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
