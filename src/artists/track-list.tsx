import { useCallback, useMemo, useState } from 'react';
import classes from './track-list.module.css';
import classnames from 'classnames';
import { usePlaybackContext } from '../playback/playback-context';

interface TrackListProps {
  tracks: {
    artists: {
      // external_urls: Record<string, string>;
      // href: string;
      // id: string;
      name: string;
      type: 'artist';
      // uri: string;
    }[];
    id: string;
    track_number: number;
    name: string;
    uri: string;
    type: 'track';
  }[];
  total_tracks: number;
}

export const TrackList = ({ tracks, total_tracks }: TrackListProps) => {
  const playback = usePlaybackContext();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const tracksRange = useMemo(() => {
    const tracksRange = [];
    for (let i = 1; i <= total_tracks; i++) {
      tracksRange.push(i);
    }
    return tracksRange;
  }, [total_tracks]);

  const handleClick = useCallback(
    (trackId: string) => {
      if (trackId === selectedTrack) {
        setSelectedTrack(null);
      } else {
        setSelectedTrack(trackId);
      }
    },
    [selectedTrack],
  );

  const handleDoubleClick = useCallback(
    (trackId: string) => {
      const track = tracks.find((track) => track.id === trackId);

      if (!track) {
        return;
      }

      playback.play([track.uri]);
    },
    [playback, tracks],
  );

  return (
    <ol className={classes['track-list']}>
      {tracks.length > 0
        ? tracks.map((track) => (
            <li key={track.id} className={classes['track-list-item']}>
              <div
                className={classnames({
                  [classes['row']]: true,
                  [classes['row-selected']]: track.id === selectedTrack,
                })}
                onClick={() => handleClick(track.id)}
                onDoubleClick={() => handleDoubleClick(track.id)}
              >
                <div className={classes['column-1']}>{track.track_number}</div>
                <div className={classes['column-2']}>
                  <div className={classes['track-name-and-artists']}>
                    <div className={classes['track-name']}>{track.name}</div>
                    <div className={classes['artists']}>
                      {track.artists.map((artist) => artist.name).join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        : tracksRange.map((index) => <li key={index}>{index} placeholder</li>)}
    </ol>
  );
};
