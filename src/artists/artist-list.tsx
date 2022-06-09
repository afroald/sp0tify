import { Link, List, ListItem } from '@chakra-ui/react';
import {
  ContentContextWrapper,
  LinkContextWrapper,
  trackPressEvent,
} from '@objectiv/tracker-react';
import classnames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { selectImage } from '../select-image';
import classes from './artist-list.module.css';

interface ArtistListProps {
  artists: {
    id: string;
    name: string;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
  }[];
  selectedArtistId?: string | null;
}

export const ArtistList = ({ artists, selectedArtistId }: ArtistListProps) => (
  <ContentContextWrapper id="artist-list">
    <List>
      {artists
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((artist) => {
          const image = selectImage(artist.images, { width: 80 });
          return (
            <ListItem key={artist.id}>
              <LinkContextWrapper
                id={`artist-${artist.id}`}
                href={`/artists/${artist.id}`}
              >
                {(trackingContext) => (
                  <Link
                    as={RouterLink}
                    to={`/artists/${artist.id}`}
                    className={classnames({
                      [classes['artist-link']]: true,
                      [classes['artist-link-selected']]:
                        artist.id === selectedArtistId,
                    })}
                    onClick={() => trackPressEvent(trackingContext)}
                  >
                    <img
                      className={classes['artist-image']}
                      src={image?.url}
                      width="40"
                      height="40"
                      alt=""
                      loading="lazy"
                    />
                    {artist.name}
                  </Link>
                )}
              </LinkContextWrapper>
            </ListItem>
          );
        })}
    </List>
  </ContentContextWrapper>
);
