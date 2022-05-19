import { Link, List, ListItem } from '@chakra-ui/react';
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
  <List>
    {artists
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((artist) => {
        const image = selectImage(artist.images, { width: 80 });
        return (
          <ListItem key={artist.id}>
            <Link
              as={RouterLink}
              to={`/artists/${artist.id}`}
              className={classnames({
                [classes['artist-link']]: true,
                [classes['artist-link-selected']]:
                  artist.id === selectedArtistId,
              })}
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
          </ListItem>
        );
      })}
  </List>
);
