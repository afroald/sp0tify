import { Heading } from '@chakra-ui/react';
import { useAlbumTracks } from '../api/album';
import { TrackList, TrackListColumnType } from '../components/track-list';
import { selectImage } from '../select-image';
import classes from './album.module.css';

const TRACK_LIST_COLUMNS = [
  TrackListColumnType.TrackNumber,
  TrackListColumnType.Title,
  TrackListColumnType.Duration,
];

interface AlbumProps {
  album: {
    id: string;
    name: string;
    album_type: 'album' | 'single' | 'compilation';
    release_date: string;
    total_tracks: number;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
  };
}

export const Album = ({ album }: AlbumProps) => {
  const releaseDate = new Date(album.release_date);
  const [tracks, isPending, error] = useAlbumTracks({ albumId: album.id });

  return (
    <section className={classes['album']}>
      <header className={classes['header']}>
        <div>
          <img
            src={selectImage(album.images, { width: 272 })?.url}
            width="136"
            height="136"
            alt=""
            loading="lazy"
          />
        </div>
        <div className={classes['header-column-2']}>
          <Heading as="h2" size="lg">
            {album.name}
          </Heading>
          <p className={classes['header-album-information']}>
            {album.album_type} •{' '}
            <time
              dateTime={releaseDate.toISOString()}
              title={releaseDate.toISOString()}
            >
              {releaseDate.getFullYear()}
            </time>{' '}
            • {album.total_tracks} nummers
          </p>
        </div>
      </header>
      <div className={classes['tracks']}>
        <TrackList
          showHeader={true}
          columns={TRACK_LIST_COLUMNS}
          tracks={tracks ?? []}
          total_tracks={album.total_tracks}
        />
      </div>
    </section>
  );
};
