import { ButtonHTMLAttributes, FC } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
