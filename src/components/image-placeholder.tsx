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
  const heightStr = urlParts.pop();
  const widthStr = urlParts.pop();
  
  let width = widthStr ? parseInt(widthStr, 10) : 500;
  let height = heightStr ? parseInt(heightStr, 10) : 500;

  if (isNaN(width)) {
    width = 500;
  }
  if (isNaN(height)) {
    height = 500;
  }

  const imageProps = fill 
    ? { fill: true }
    : { width: width, height: height };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={placeholder.imageUrl}
        alt={placeholder.description}
        className={cn("object-cover", imageClassName)}
        data-ai-hint={placeholder.imageHint}
        {...imageProps}
      />
    </div>
  );
}
