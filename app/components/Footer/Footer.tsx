import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 mt-16 text-sm">
      <Container>
        <div className="flex justify-between flex-col md:flex-row pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href="/">Phones</Link>
            <Link href="/">Laptops</Link>
            <Link href="/">Desktop</Link>
            <Link href="/">Watches</Link>
            <Link href="/">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Services</h3>
            <Link href="/">Contact Us </Link>
            <Link href="/">Shipping Policies</Link>
            <Link href="/">Return & Exchanges</Link>
            <Link href="/">FAQs</Link>
          </FooterList>
          <div className="w-full mb-6 md:w-1/3 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              At our Mooneye Electronic Gadgets and Screens, we are dedicated to
              providing the latest and greatest devices and accessories to our
              customers. with a wide selection of phones, TVs, laptops, Watches,
              and accessories
            </p>
            <p>
              &copy; {new Date().getFullYear()} Mooneye E-shop. All rights
              reserved
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="facebook">
                <FaFacebook size={24} />
              </Link>
              <Link href="Instagram">
                <FaInstagramSquare size={24} />
              </Link>
              <Link href="Twitter X">
                <FaSquareXTwitter size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
