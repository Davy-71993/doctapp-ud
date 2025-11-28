import Image from "next/image";
import {
  PlaceHolderImages,
  type ImagePlaceholder,
} from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  id: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
};

export function ImagePlaceholder({
  id,
  className,
  imageClassName,
  fill = false,
}: ImagePlaceholderProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === id);

  if (!placeholder) {
    return <div className={cn("bg-muted", className)}></div>;
  }

  const urlParts = placeholder.imageUrl.split('/');
  const widthStr = urlParts.slice(-2)[0];
  const heightStr = urlParts.slice(-1)[0];
  
  let width = parseInt(widthStr, 10);
  let height = parseInt(heightStr, 10);

  if (isNaN(width) || isNaN(height)) {
    width = 500;
    height = 500;
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={placeholder.imageUrl}
        alt={placeholder.description}
        height={1000}
        width={1000}
        className={cn("object-cover", imageClassName)}
        {...(fill ? { fill: true } : { width: width, height: height })}
      />
    </div>
  );
}
