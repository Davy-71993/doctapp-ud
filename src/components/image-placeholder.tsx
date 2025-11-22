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

  let width: number;
  let height: number;

  try {
    const url = new URL(placeholder.imageUrl);
    if (url.hostname === 'images.unsplash.com') {
      width = parseInt(url.searchParams.get('w') || '0', 10);
      height = parseInt(url.searchParams.get('h') || url.searchParams.get('fit') === 'max' ? width.toString() : '0', 10);
       if (url.searchParams.get('h') === null && url.searchParams.get('fit') === 'max') {
        // Unsplash with only 'w' and 'fit=max' will produce a square image, but height is not in the URL.
        // We can try to derive it, but it's better to just use fill or have explicit height.
        // For now, let's assume a square if height is missing.
        height = width;
      } else {
        height = parseInt(url.searchParams.get('h') || '0', 10);
      }
    } else if (url.hostname === 'picsum.photos') {
      const parts = url.pathname.split('/');
      width = parseInt(parts[parts.length - 2], 10);
      height = parseInt(parts[parts.length - 1], 10);
    } else {
      // Fallback for other URLs, assuming no specific dimension format
      width = 1080;
      height = 1080;
    }
  } catch (e) {
    // If URL parsing fails, use fallback values
    width = 1080;
    height = 1080;
  }
  
  if (isNaN(width) || isNaN(height) || width === 0 || height === 0) {
      // If parsing fails for any reason, use fill as a safe fallback
      return (
        <div className={cn("relative overflow-hidden", className)}>
          <Image
            src={placeholder.imageUrl}
            alt={placeholder.description}
            data-ai-hint={placeholder.imageHint}
            className={cn("object-cover", imageClassName)}
            fill
          />
        </div>
      );
  }


  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={placeholder.imageUrl}
        alt={placeholder.description}
        data-ai-hint={placeholder.imageHint}
        className={cn("object-cover", imageClassName)}
        {...(fill ? { fill: true } : { width, height })}
      />
    </div>
  );
}