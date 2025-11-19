import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

type ImagePlaceholderProps = {
  id: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
};

export function ImagePlaceholder({ id, className, imageClassName, fill = false }: ImagePlaceholderProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === id);

  if (!placeholder) {
    return <div className={cn("bg-muted", className)}></div>;
  }

  const [width, height] = placeholder.imageUrl.split('/').slice(-2);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={placeholder.imageUrl}
        alt={placeholder.description}
        data-ai-hint={placeholder.imageHint}
        className={cn("object-cover", imageClassName)}
        {...(fill ? { fill: true } : { width: parseInt(width), height: parseInt(height) })}
      />
    </div>
  );
}
