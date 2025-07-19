import { cn } from "@/lib/utils";
import { AdBoxImageProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function AdBoxImage(props: AdBoxImageProps) {
  return (
    <div className={cn("rounded-lg overflow-hidden my-3 ", props.rootClassName)}>
      <Link href={props.href} target={props.target}>
        <Image 
          width={278} 
          height={140} 
          src={props.src} 
          alt={props.alt} 
          className={cn("object-cover", props.className)} 
        />
      </Link>
    </div>
  )
}