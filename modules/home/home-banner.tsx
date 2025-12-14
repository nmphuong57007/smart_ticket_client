import Image from "next/image";
import { useEffect, useState } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const banner_images = [
  "https://www.galaxycine.vn/media/2024/4/16/digital-1135x660_1713257506992.jpg",
  "https://assets.glxplay.io/staticv2/Artboard%202-1762407785.jpg",
  "https://assets.glxplay.io/staticv2/Artboard%202-1762407785.jpg",
  "https://assets.glxplay.io/staticv2/Artboard%202-1762407785.jpg",
  // "https://simg.zalopay.com.vn/zlp-website/assets/1x_CGV_Feb_9_K_0b2c54b7e2.jpg",
];

export default function HomeBanner() {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;

    const id = setInterval(() => {
      try {
        api?.scrollNext();
      } catch (e) {
        console.error(e);
      }
    }, 4000);

    return () => clearInterval(id);
  }, [api]);

  return (
    <Carousel
      opts={{ loop: true }}
      className="w-full h-48 md:h-64 lg:h-80"
      setApi={setApi}
    >
      <CarouselContent>
        {banner_images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-48 md:h-64 lg:h-80">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
