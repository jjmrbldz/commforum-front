import BannerCarousel from "./banner-carousel";
import banner1 from "@/assets/images/banner/banner-1.png"
import banner2 from "@/assets/images/banner/banner-2.png"

export default function Banner() {
  return (
    <BannerCarousel images={[banner1, banner2]} />
  )
}