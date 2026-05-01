import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/tazza-logo.png"


export default function MidHeader() {
  return (
    <div className="hidden relative z-1 md:block max-w-7xl m-auto py-2 pb-4 px-4 md:px-0">
      <Link href={'/'} className="block w-max" >
        <Image width={140} height={60} src={logo} alt="Logo" />
      </Link>
    </div>
  )
}