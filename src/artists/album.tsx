import { Button } from '@chakra-ui/react';
import { useAlbumTracks } from '../api/album';
import { selectImage } from '../select-image';
import classes from './album.module.css';
import { usePlaybackContext } from '../playback/playback-context';

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
  const { play } = usePlaybackContext();
  const releaseDate = new Date(album.release_date);
  const [tracks, isPending, error] = useAlbumTracks({ albumId: album.id });

  const tracksRange = [];
  for (let i = 1; i <= album.total_tracks; i++) {
    tracksRange.push(i);
  }

  return (
    <section>
      <header className={classes['header']}>
        <div>
          <img
            src={selectImage(album.images, { width: 272 })?.url}
            width="136"
            height="136"
            alt=""
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

      <table className={classes['tracks']}>
        <thead>
          <tr>
            <td>#</td>
            <td></td>
            <td>Titel</td>
            <td>{timeIcon}</td>
          </tr>
        </thead>
        <tbody>
          {isPending
            ? tracksRange.map((i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))
            : tracks?.map((track) => (
                <tr key={track.id}>
                  <td>{track.track_number}</td>
                  <td>
                    <Button
                      size="xs"
                      colorScheme="green"
                      onClick={() => {
                        const index = tracks.indexOf(track);
                        const tracksToPlay = tracks.slice(index);
                        play(tracksToPlay.map((track) => track.uri));
                      }}
                    >
                      play
                    </Button>
                  </td>
                  <td>{track.name}</td>
                  <td>{track.duration_ms}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </section>
  );
};
