import Link from "next/link";
import Container from "../Container";

const Navbar = () => {
  return (
    <div className="sticky top-0 w-full shadow-sm bg-blue-100 z-30">
      <div className="border-b-2 py-4">
        <Container>
          <div className="flex justify-between items-center gap-3 md:gap-0">
            <Link href="/">Moon Eye</Link>
            <div className="hidden md:block">search</div>
            <div className="flex justify-between items-center gap-8 md:gap-12">
              <div>card count</div>
              <div>User menu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
