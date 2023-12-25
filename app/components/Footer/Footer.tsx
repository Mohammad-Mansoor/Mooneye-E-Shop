import Container from "../Container";
import FooterList from "./FooterList";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 mt-16 text-sm">
      <Container>
        <div className="flex justify-between flex-col md:flex-row pt-16 pb-8">
          <FooterList>
            <div>
              <h3>phones</h3>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
