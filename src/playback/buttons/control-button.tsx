import { ReactNode } from 'react';
import classes from './control-button.module.css';

export type ControlButtonProps = {
  children?: ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ControlButton = ({
  children,
  ...otherProps
}: ControlButtonProps) => (
  <button className={classes['control-button']} {...otherProps}>
    {children}
  </button>
);
