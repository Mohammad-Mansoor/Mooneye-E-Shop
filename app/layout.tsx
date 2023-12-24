import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Mooneye",
  description:
    "Start a journey of technological excellence with Mooneye Electronic Gadgets and Screens, your premier online destination for the latest and most innovative gadgets and screens in Afghanistan. We bring the world of cutting-edge technology to your fingertips, ensuring that you stay ahead in the fast-paced realm of electronics. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-slate-300">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
