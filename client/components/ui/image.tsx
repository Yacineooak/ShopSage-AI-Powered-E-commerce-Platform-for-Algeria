import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  onError?: () => void;
}

export function Image({ 
  src, 
  alt, 
  fallbackSrc, 
  className, 
  onError,
  ...props 
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    } else {
      // Use a data URL for a simple gray placeholder
      const placeholderSrc = `data:image/svg+xml;base64,${btoa(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
            Image not available
          </text>
        </svg>
      `)}`;
      setImgSrc(placeholderSrc);
    }
    
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className={cn(
          'absolute inset-0 bg-muted animate-pulse flex items-center justify-center',
          className
        )}>
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        {...props}
        src={imgSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

// Product image component with specific fallback
export function ProductImage({ 
  src, 
  alt, 
  className,
  ...props 
}: Omit<ImageProps, 'fallbackSrc'>) {
  const fallbackSrc = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <rect x="150" y="150" width="100" height="100" fill="#e2e8f0" rx="8"/>
      <text x="50%" y="75%" text-anchor="middle" dy=".3em" fill="#64748b" font-family="Arial, sans-serif" font-size="12">
        Product Image
      </text>
    </svg>
  `)}`;

  return (
    <Image
      src={src}
      alt={alt}
      fallbackSrc={fallbackSrc}
      className={className}
      {...props}
    />
  );
}

// Avatar image component with initials fallback
export function AvatarImage({ 
  src, 
  alt, 
  initials = '?',
  className,
  ...props 
}: Omit<ImageProps, 'fallbackSrc'> & { initials?: string }) {
  const fallbackSrc = `data:image/svg+xml;base64,${btoa(`
    <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="75" r="75" fill="#6366f1"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
        ${initials}
      </text>
    </svg>
  `)}`;

  return (
    <Image
      src={src}
      alt={alt}
      fallbackSrc={fallbackSrc}
      className={cn('rounded-full', className)}
      {...props}
    />
  );
}
