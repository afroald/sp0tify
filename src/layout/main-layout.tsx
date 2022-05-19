import { ReactElement } from 'react';
import classes from './main-layout.module.css';

interface MainLayoutProps {
  children: ReactElement;
  sideBar: ReactElement;
}

export const MainLayout = ({ children, sideBar }: MainLayoutProps) => (
  <div className={classes['main-layout']}>
    {sideBar ? <div className={classes['side-bar']}>{sideBar}</div> : null}
    <div className={classes['content']}>{children}</div>
  </div>
);
