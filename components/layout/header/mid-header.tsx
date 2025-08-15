import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/eyoom-logo.png"


export default function MidHeader() {
  return (
    <div className="max-w-7xl m-auto py-4 px-4 md:px-0">
      <Link href={'/'}>
        <Image width={140} height={60} src={logo} alt="Logo" />
      </Link>
    </div>
  )
}