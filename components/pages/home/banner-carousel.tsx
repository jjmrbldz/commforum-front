"use client"

import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image, { StaticImageData } from "next/image";

export default function BannerCarousel({ images } : { images: string[] | StaticImageData[]}) {
  return (
    <Carousel 
      className="w-full"
      opts={{
        loop: true
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {/* {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
        {images && images.length > 0 && images.map((item, index) => (
          <CarouselItem key={index}>
            <Image alt={`banner ${index}`} src={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious 
        variant={"link"} 
        size={"lg"} 
        className="left-2 text-white/60 size-10 text-xl" 
        iconClass="size-14"
      />
      <CarouselNext
        variant={"link"} 
        size={"lg"} 
        className="right-2 text-white/60 size-10 text-xl" 
        iconClass="size-14"
      />
    </Carousel>
  )
}