import PostTitle from "@/components/post-title";
import Image from "next/image";

export default function PostPage() {
  
  return (
    <>
      <PostTitle />
      <div className="">
        <Image
          src="/images/sample.png"
          alt="sample"
          width={120}
          height={50}
          className="border w-full max-w-[400px] mx-auto h-auto"
        />
      </div>
    </>
  )
}