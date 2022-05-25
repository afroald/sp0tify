import { ReactElement } from 'react';
import classes from './main-layout.module.css';

interface MainLayoutProps {
  children: ReactElement;
  sideBar?: ReactElement;
  bottomBar?: ReactElement;
}

export const MainLayout = ({
  children,
  sideBar,
  bottomBar,
}: MainLayoutProps) => (
  <div className={classes['main-layout']}>
    <div className={classes['main-panel']}>
      {sideBar ? <div className={classes['side-bar']}>{sideBar}</div> : null}
      <div className={classes['content']}>{children}</div>
    </div>
    {bottomBar ? (
      <div className={classes['bottom-bar']}>{bottomBar}</div>
    ) : null}
  </div>
);
