import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBar from "../components/navbar/page";
import Footer from "../components/footer/page";
import Providers from "./providers";
import DrawerMenu from "@/components/DrawerMenu/page";
import SearchDrawer from "@/components/SearchDrawer/page";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Textile Trend",
  description: "With Innovation and Sustainability",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='light'>
      <body className={`${inter.className} bg-base-100`}>
        <Providers>
          <NavBar />
          <SearchDrawer/>
          <DrawerMenu />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
