import { Link } from '@chakra-ui/react';
import {
  ContentContextWrapper,
  LinkContextWrapper,
  trackPressEvent,
} from '@objectiv/tracker-react';
import { Link as RouterLink } from 'react-router-dom';
import { SideBarNav } from './side-bar-nav';
import classes from './side-bar.module.css';

export const SideBar = () => (
  <ContentContextWrapper id="sidebar">
    <div className={classes['logo']}>
      <LinkContextWrapper id="home" href="/">
        {(trackingContext) => (
          <Link
            as={RouterLink}
            to="/"
            onClick={() => trackPressEvent(trackingContext)}
          >
            sp0tify
          </Link>
        )}
      </LinkContextWrapper>
    </div>
    <div className={classes['separator']}>
      <hr />
    </div>
    <div className={classes['nav']}>
      <SideBarNav />
    </div>
  </ContentContextWrapper>
);
