import { FC, CSSProperties } from 'react';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
};

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
