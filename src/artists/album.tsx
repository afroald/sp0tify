import { useAlbumTracks } from '../api/album';
import { TrackList } from '../components/track-list';
import { selectImage } from '../select-image';
import classes from './album.module.css';

const timeIcon = (
  <svg role="img" height="16" width="16" viewBox="0 0 16 16">
    <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
    <path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"></path>
  </svg>
);

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
    <section>
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
        <div>
          <h2>{album.name}</h2>
          <p>
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
      <TrackList tracks={tracks ?? []} total_tracks={album.total_tracks} />
    </section>
  );
};
