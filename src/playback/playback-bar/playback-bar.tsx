import { ProgressBar } from './progress-bar';
import classes from './playback-bar.module.css';
import prettyMilliseconds from 'pretty-ms';

interface PlaybackBarProps {
  position?: number;
  duration?: number;
}

export const PlaybackBar = ({
  position = 0,
  duration = 0,
}: PlaybackBarProps) => (
  <div className={classes['playback-bar']}>
    <div className={classes['time-elapsed']}>
      {prettyMilliseconds(position, {
        colonNotation: true,
        secondsDecimalDigits: 0,
      })}
    </div>
    <ProgressBar progress={position / duration || 0} />
    <div className={classes['duration']}>
      {prettyMilliseconds(duration, {
        colonNotation: true,
        secondsDecimalDigits: 0,
      })}
    </div>
  </div>
);
