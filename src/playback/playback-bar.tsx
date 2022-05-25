import { PlayPauseButton } from './play-pause-button';
import classes from './playback-bar.module.css';
import { usePlaybackContext } from './playback-context';

export const PlaybackBack = () => {
  const { state, togglePlay } = usePlaybackContext();

  return (
    <div className={classes['playback-bar']}>
      <div className={classes['center']}>
        <div>
          <PlayPauseButton
            paused={state?.paused ?? true}
            disabled={state === null}
            onClick={togglePlay}
          />
        </div>
      </div>
    </div>
  );
};
