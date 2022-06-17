import { useTrack } from '../api/track';
import { selectImage } from '../select-image';
import { PlayPauseButton } from './buttons/play-pause-button';
import { SkipBackButton } from './buttons/skip-back-button';
import { SkipForwardButton } from './buttons/skip-forward-button';
import classes from './now-playing-bar.module.css';
import { PlaybackBar } from './playback-bar/playback-bar';
import { usePlaybackContext } from './playback-context';
import { VolumeControl } from './volume-control';

export const NowPlayingBar = () => {
  const { state, volume, togglePlay, setVolume, seek } = usePlaybackContext();
  const [currentTrack] = useTrack({
    id: state?.track_window.current_track.id ?? null,
  });

  return (
    <div className={classes['now-playing-bar']}>
      <div className={classes['left-column']}>
        <div style={{ flexGrow: 1 }} className={classes['now-playing']}>
          {currentTrack ? (
            <>
              <div>
                <img
                  className={classes['now-playing-cover-art']}
                  width="56"
                  height="56"
                  alt=""
                  src={
                    selectImage(currentTrack.album.images, { width: 56 * 2 })
                      ?.url
                  }
                  loading="lazy"
                />
              </div>
              <div className={classes['now-playing-info']}>
                <div className={classes['now-playing-track']}>
                  {currentTrack.name}
                </div>
                <div className={classes['now-playing-artists']}>
                  {currentTrack.artists.map((artist) => artist.name).join(', ')}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className={classes['controls']}>
        <div className={classes['control-buttons']}>
          <SkipBackButton />
          <PlayPauseButton
            paused={state?.paused ?? true}
            disabled={state === null}
            onClick={togglePlay}
          />
          <SkipForwardButton />
        </div>
        <PlaybackBar
          position={state?.position}
          duration={currentTrack?.duration_ms}
          onSeek={(position) => {
            seek(position);
          }}
        />
      </div>
      <div className={classes['right-column']}>
        <VolumeControl
          isDisabled={volume === null}
          volume={volume ?? 0}
          onChange={(volume) => setVolume(volume)}
        />
      </div>
    </div>
  );
};
