import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

import { cc } from '~/lib/utils';

const getInitials = (name: string) => {
  const parts = name.split(' ');
  return (parts.length === 1 ? parts[0].slice(0, 2) : parts[0].slice(0, 1) + parts[1].slice(0, 1)).toLocaleUpperCase();
};

const Initials = ({ name, delayMs }: { name: string; delayMs?: number }) => (
  <AvatarFallback delayMs={delayMs} className="flex h-full w-full items-center justify-center rounded bg-neutral">
    <span className="text-sm font-medium uppercase text-neutral-content">{getInitials(name)}</span>
  </AvatarFallback>
);

type AvatarProps = {
  name: string;
  imageSrc?: string;
  isOnline?: boolean;
  className?: string;
};
export const Avatar = ({ isOnline, name, imageSrc, className }: AvatarProps) => {
  return (
    <AvatarItem className={className}>
      {isOnline && (
        <div className="absolute bottom-0 right-0 h-2 w-2">
          <span className="block h-2.5 w-2.5 rounded-full bg-success" />
        </div>
      )}
      {imageSrc ? (
        <>
          <AvatarImage src={imageSrc} alt={name} className="rounded shadow" />
          <Initials name={name} />
        </>
      ) : (
        <Initials name={name} delayMs={0} />
      )}
    </AvatarItem>
  );
};

const AvatarItem = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root ref={ref} className={cc('relative flex h-10 w-10 shrink-0 rounded-md', className)} {...props} />
));
AvatarItem.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cc('aspect-square h-full w-full', className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cc('flex h-full w-full items-center justify-center rounded-md', className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
