import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";

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
      <body className={`${poppins.className} text-slate-700`}>
        <div className="flex flex-col min-h-screen bg-slate-100">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
