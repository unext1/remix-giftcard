import { Form as RemixForm, Link as RemixLink, useLocation, type FormProps as RFormProps } from '@remix-run/react';
import { forwardRef, useId, type ReactNode } from 'react';
// import { AuthenticityTokenInput } from 'remix-utils';

import { cc } from '~/lib/utils';

export type CustomFormProps = RFormProps & {
  /**
   * Allows the passing of a fetcher.Form
   * @default RForm
   */
  as?: typeof RemixForm;
  /*
   * Used on routes with multiple actions to identify the submitted form.
   * @default undefined
   */
  actionId?: string;
  /*
   * Tells the action where to send a successful response
   * @default undefined
   */
  redirectTo?: string;
};

export const CustomForm = ({ children, as, actionId, redirectTo, method = 'post', ...props }: CustomFormProps) => {
  const Form = as || RemixForm;
  const { pathname } = useLocation();

  return (
    <Form {...props} method={method === 'get' ? 'get' : 'post'}>
      <input type="hidden" name="_referrer" value={pathname} />
      <input type="hidden" name="_method" value={method} />
      {actionId ? <input type="hidden" name="action" value={actionId} /> : null}
      {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}
      {children}
    </Form>
  );
};

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    type="text"
    {...props}
    ref={ref}
    className={cc({
      'input input-md h-auto rounded-md py-1 px-2.5 input-bordered': true,
      'read-only:hover:cursor-not-allowed disabled:hover:cursor-not-allowed': true,
      [`${className}`]: !!className
    })}
  />
));
Input.displayName = 'Input';

interface FormInputLabelProps {
  labelTop?: string;
  labelTopAlt?: string;
  labelBot?: string;
  labelBotAlt?: string;
  containerClass?: string;
  errorMessage?: string;
}
type FormInputProps = FormInputLabelProps &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ labelTop, labelTopAlt, labelBot, labelBotAlt, className, containerClass, errorMessage, ...props }, ref) => {
    const id = useId();
    return (
      <div
        className={cc({
          'form-control w-full': true,
          [`${containerClass}`]: !!containerClass
        })}
      >
        {labelTop || labelTopAlt ? (
          <label htmlFor={id} className="label">
            <span className="label-text">{labelTop}</span>
            <span className="label-text-alt">{labelTopAlt}</span>
          </label>
        ) : null}

        <Input
          {...props}
          id={id}
          ref={ref}
          className={cc({
            [`${className}`]: !!className,
            'input-error': !!errorMessage
          })}
        />
        {errorMessage || labelBot || labelBotAlt ? (
          <label className="label">
            <span
              className={cc({
                'label-text-alt': true,
                'text-error': !!errorMessage
              })}
            >
              {errorMessage || labelBot}
            </span>
            <span className="label-text-alt">{labelBotAlt}</span>
          </label>
        ) : null}
      </div>
    );
  }
);
FormInput.displayName = 'FormInput';

type ButtonProps = { children: ReactNode; small?: boolean } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, small = true, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cc({
        'btn-sm shadow': small,
        btn: true,
        [`${className}`]: !!className
      })}
    >
      {children}
    </button>
  )
);
Button.displayName = 'Button';

export const ButtonLink = ({
  children,
  className,
  href
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <RemixLink
      to={href}
      className={cc({
        'btn btn-link btn-sm rounded-md': true,
        [`${className}`]: !!className
      })}
    >
      {children}
    </RemixLink>
  );
};

export const Link = ({ children, className, href }: { children: ReactNode; className?: string; href: string }) => {
  return (
    <RemixLink
      to={href}
      className={cc({
        'link px-2 py-1 focus-visible:rounded-md': true,
        [`${className}`]: !!className
      })}
    >
      {children}
    </RemixLink>
  );
};
