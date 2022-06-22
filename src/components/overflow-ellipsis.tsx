import classes from './overflow-ellipsis.module.css';
import { ReactNode } from 'react';

interface OverflowEllipsisProps {
  children: ReactNode;
}

export const OverflowEllipsis = ({ children }: OverflowEllipsisProps) => (
  <span className={classes['overflow-ellipsis']}>{children}</span>
);
