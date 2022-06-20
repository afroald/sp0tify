import classnames from 'classnames';
import prettyMilliseconds from 'pretty-ms';
import { useCallback, useMemo, useState } from 'react';
import { ImageCollection } from '../api/image';
import { usePlaybackContext } from '../playback/playback-context';
import { selectImage } from '../select-image';
import classes from './track-list.module.css';

const timeIcon = (
  <svg role="img" height="16" width="16" viewBox="0 0 16 16">
    <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
    <path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"></path>
  </svg>
);

export enum TrackListColumnType {
  TrackNumber,
  Title,
  AlbumCover,
  Album,
  Duration,
}

interface TrackListProps {
  showHeader: boolean;
  columns: TrackListColumnType[];
  tracks: {
    artists: {
      // external_urls: Record<string, string>;
      // href: string;
      // id: string;
      name: string;
      // type: 'artist';
      // uri: string;
    }[];
    images?: ImageCollection;
    id: string;
    track_number?: number;
    duration_ms: number;
    name: string;
    uri: string;
    type: 'track' | 'episode' | 'ad';
  }[];
  total_tracks: number;
}

export const TrackList = ({
  showHeader,
  columns,
  tracks,
  total_tracks,
}: TrackListProps) => {
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
    <section>
      {showHeader ? (
        <header className={classes['header']}>
          {columns.includes(TrackListColumnType.TrackNumber) ? (
            <div className={classes['track-number-column']}>#</div>
          ) : null}

          {columns.includes(TrackListColumnType.Title) ? (
            <div
              className={classnames([
                classes['title-column-header'],
                classes['title-column'],
              ])}
            >
              Titel
            </div>
          ) : null}

          {columns.includes(TrackListColumnType.Album) ? (
            <div
              className={classnames([
                classes['album-column-header'],
                classes['album-column'],
              ])}
            >
              Album
            </div>
          ) : null}

          {columns.includes(TrackListColumnType.Duration) ? (
            <div className={classes['duration-column']}>{timeIcon}</div>
          ) : null}
        </header>
      ) : null}
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
                  {columns.includes(TrackListColumnType.TrackNumber) ? (
                    <div className={classes['track-number-column']}>
                      {track.track_number}
                    </div>
                  ) : null}

                  {columns.includes(TrackListColumnType.Title) ? (
                    <div className={classes['title-column']}>
                      <div className={classes['album-cover-and-track-info']}>
                        {columns.includes(TrackListColumnType.AlbumCover) &&
                        track.images ? (
                          <img
                            className={classes['album-cover']}
                            src={selectImage(track.images, { width: 40 })?.url}
                            width="40"
                            height="40"
                            alt=""
                          />
                        ) : null}
                        <div className={classes['track-name-and-artists']}>
                          <div className={classes['track-name']}>
                            {track.name}
                          </div>
                          <div className={classes['artists']}>
                            {track.artists
                              .map((artist) => artist.name)
                              .join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {columns.includes(TrackListColumnType.Album) ? (
                    <div className={classes['album-column']}>{track.name}</div>
                  ) : null}

                  {columns.includes(TrackListColumnType.Duration) ? (
                    <div className={classes['duration-column']}>
                      {prettyMilliseconds(track.duration_ms, {
                        colonNotation: true,
                        secondsDecimalDigits: 0,
                      })}
                    </div>
                  ) : null}
                </div>
              </li>
            ))
          : tracksRange.map((index) => (
              <li key={index}>{index} placeholder</li>
            ))}
      </ol>
    </section>
  );
};
