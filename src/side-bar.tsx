import { Link } from '@chakra-ui/react';
import classnames from 'classnames';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import classes from './side-bar.module.css';

export const SideBar = () => {
  const location = useLocation();

  return (
    <>
      <div className={classes['logo']}>
        <Link as={RouterLink} to="/">
          sp0tify
        </Link>
      </div>
      <div className={classes['separator']}>
        <hr />
      </div>
      <nav className={classes['nav']}>
        <Link
          as={RouterLink}
          to="/artists"
          className={classnames({
            [classes['nav-link']]: true,
            [classes['nav-link-active']]: location.pathname === '/artists',
          })}
        >
          Artists
        </Link>
      </nav>
    </>
  );
};
