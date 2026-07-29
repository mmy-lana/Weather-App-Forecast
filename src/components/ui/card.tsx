import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glassIntensity?: 'light' | 'medium' | 'heavy';
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      glassIntensity = 'medium',
      hoverEffect = false,
      children,
      ...props
    },
    ref
  ) => {
    const intensityStyles = {
      light: 'bg-white/10 backdrop-blur-sm border-white/15',
      medium: 'bg-white/15 backdrop-blur-md border-white/20 shadow-xl shadow-black/10',
      heavy: 'bg-white/20 backdrop-blur-lg border-white/30 shadow-2xl shadow-black/15',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl border text-white transition-all duration-300 relative overflow-hidden',
          intensityStyles[glassIntensity],
          hoverEffect && 'hover:-translate-y-1 hover:bg-white/20 hover:border-white/30 hover:shadow-2xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-5 md:p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg md:text-xl font-semibold leading-none tracking-tight text-white/95',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs md:text-sm text-white/70', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-5 md:p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-5 md:p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';