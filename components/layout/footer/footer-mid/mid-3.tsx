import { Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import fbIcon from "@/assets/images/icons/fb.png"
import twitterIcon from "@/assets/images/icons/twitter.png"
import kakaoStoryIcon from "@/assets/images/icons/kakao-story.png"
import naverBandIcon from "@/assets/images/icons/naver-band.png"
import youtubeIcon from "@/assets/images/icons/youtube.png"
import instagramIcon from "@/assets/images/icons/instagram.png"
import naverBlogIcon from "@/assets/images/icons/naver-blog.png"
import { Button } from "@/components/ui/button"

const iconW = 32;
const iconH = 32;


export default function ThirdMid() {
  return (
    <div className="col-span-12 text-center md:text-left md:col-span-4 mb-4 md:mb-0 px-4 border-white/30">
      <div className="text-lg font-bold text-footer-foreground/80 mb-4">공지사항</div>
      <Link href={'/announcement/1'} className="text-footer-foreground/60 flex justify-between gap-2">
        <div className="text-ellipsis text-nowrap max-w-[260px] overflow-hidden">발전의 속도와 인간의 체감에 대한 설문조사에</div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>2022-03-22</span>
        </div>
      </Link>
      <Link href={'/announcement/1'} className="text-footer-foreground/60 flex justify-between gap-2">
        <div className="text-ellipsis text-nowrap max-w-[260px] overflow-hidden">드론의 발전과 활용 방안에 대한 개인 의견을</div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>2022-03-22</span>
        </div>
      </Link>
      <div className="mt-8">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <Link href={'#'}>
            <Image width={iconW} height={iconH} src={fbIcon}  alt="Soc Med Icon" />
          </Link>
          <Link href={'#'}>
            <Image width={iconW} height={iconH} src={twitterIcon}  alt="Soc Med Icon" />
          </Link>
          <Link href={'#'}>
            <Image width={iconW} height={iconH} src={kakaoStoryIcon}  alt="Soc Med Icon" />
          </Link>
          <Link href={'#'}>
            <Image width={iconW} height={iconH} src={naverBandIcon}  alt="Soc Med Icon" />
          </Link>
          <Link href={'#'}>
            <Image width={iconW} height={iconH} src={youtubeIcon}  alt="Soc Med Icon" />
          </Link>
          <Link href={'#'}>
            <Image width={iconW} height={iconH} src={instagramIcon}  alt="Soc Med Icon" />
          </Link>
          <Link href={'#'}>
            <Image width={iconW} height={iconH} src={naverBlogIcon}  alt="Soc Med Icon" />
          </Link>
        </div>
        <div className="mt-4">
          <Button variant={'outline'} className="w-full bg-unset rounded border-footer-foreground hover:bg-footer-foreground/20 text-footer-foreground hover:text-footer-foreground">1:1 문의하기</Button>
        </div>
      </div>
    </div>
  )
}