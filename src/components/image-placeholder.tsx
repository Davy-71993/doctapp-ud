import Image from "next/image";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  id: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  image?: {
    url: string;
    description?: string;
  };
};

export function ImagePlaceholder({
  id,
  className,
  imageClassName,
  image,
  fill = false,
}: ImagePlaceholderProps) {
  if (!image) {
    return <div className={cn("bg-muted", className)}></div>;
  }

  let width = 500;
  let height = 500;

  if (isNaN(width)) {
    width = 500;
  }
  if (isNaN(height)) {
    height = 500;
  }

  const imageProps = fill ? { fill: true } : { width: width, height: height };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        id={id}
        src={image.url}
        alt={image.description ?? ""}
        className={cn("object-cover", imageClassName)}
        {...imageProps}
      />
    </div>
  );
}
