import { Link } from '@chakra-ui/react';
import {
  ContentContextWrapper,
  NavigationContextWrapper,
  trackPressEvent,
} from '@objectiv/tracker-react';
import classnames from 'classnames';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import classes from './side-bar.module.css';

export const SideBar = () => {
  const location = useLocation();

  return (
    <ContentContextWrapper id="sidebar">
      {(trackingContext) => (
        <>
          <div className={classes['logo']}>
            <Link
              as={RouterLink}
              to="/"
              onClick={() => trackPressEvent(trackingContext)}
            >
              sp0tify
            </Link>
          </div>
          <div className={classes['separator']}>
            <hr />
          </div>
          <div className={classes['nav']}>
            <NavigationContextWrapper id="nav">
              {(trackingContext) => (
                <Link
                  as={RouterLink}
                  to="/artists"
                  className={classnames({
                    [classes['nav-link']]: true,
                    [classes['nav-link-active']]:
                      location.pathname === '/artists',
                  })}
                  onClick={() => trackPressEvent(trackingContext)}
                >
                  Artists
                </Link>
              )}
            </NavigationContextWrapper>
          </div>
        </>
      )}
    </ContentContextWrapper>
  );
};
