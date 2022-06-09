import { Link } from '@chakra-ui/react';
import {
  LinkContextWrapper,
  NavigationContextWrapper,
  trackPressEvent,
} from '@objectiv/tracker-react';
import classnames from 'classnames';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import classes from './side-bar-nav.module.css';

export const SideBarNav = () => {
  const location = useLocation();

  return (
    <NavigationContextWrapper id="sidebar-nav">
      <nav className={classes['nav']}>
        <LinkContextWrapper id="artists" href="/artists">
          {(trackingContext) => (
            <Link
              as={RouterLink}
              to="/artists"
              className={classnames({
                [classes['nav-link']]: true,
                [classes['nav-link-active']]: location.pathname === '/artists',
              })}
              onClick={() => trackPressEvent(trackingContext)}
            >
              Artists
            </Link>
          )}
        </LinkContextWrapper>
      </nav>
    </NavigationContextWrapper>
  );
};
