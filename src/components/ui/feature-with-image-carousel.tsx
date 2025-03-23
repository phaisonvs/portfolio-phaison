
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FeatureProps {
  title?: string;
  description?: string;
  badgeText?: string;
  images?: string[];
}

export function Feature({
  title = "This is the start of something new",
  description = "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.",
  badgeText = "Platform",
  images = Array(5).fill("")
}: FeatureProps) {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-end items-end gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>{badgeText}</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                {title}
              </h2>
              <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                {description}
              </p>
            </div>
          </div>
          <div className="w-full max-w-full px-6">
            <Carousel>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="flex rounded-md aspect-video bg-muted items-center justify-center p-6">
                      {image ? (
                        <img 
                          src={image} 
                          alt={`Screenshot ${index + 1}`} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-sm">
                          Platform Screenshot {index + 1}
                        </span>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
