import FooterBottom from "./footer-bottom";
import FooterMid from "./footer-mid";
import FooterTop from "./footer-top";

export default function Footer() {
  return (
    <div className="bg-footer text-footer-foreground text-sm mt-4 pb-8">
      <div className="max-w-7xl m-auto">
        <div className="grid grid-cols-12">
          <FooterTop />
          <FooterMid />
          <FooterBottom />
        </div>
      </div>
    </div>
  )
}