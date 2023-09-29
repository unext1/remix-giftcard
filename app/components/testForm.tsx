import React, { forwardRef } from 'react';
import { cc } from '~/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(({ label, className, ...props }, ref) => {
  return (
    <label>
      {label}
      <input {...props} className={cc('input py-4', className)} ref={ref} />
    </label>
  );
});

InputComponent.displayName = 'InputComponent';

export default InputComponent;

type BigButton = {
  big?: boolean;
  small?: never;
};
type SmallButton = {
  big?: never;
  small?: boolean;
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps & (SmallButton | BigButton)>(
  ({ className, big, small, ...props }, ref) => {
    return (
      <button
        {...props}
        className={cc('btn', className, {
          'btn-lg': big,
          'btn-sm': small
        })}
        ref={ref}
      >
        test
      </button>
    );
  }
);

ButtonComponent.displayName = 'InputComponent';
