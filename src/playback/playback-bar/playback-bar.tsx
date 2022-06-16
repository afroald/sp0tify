import prettyMilliseconds from 'pretty-ms';
import { Slider } from '../../slider';
import classes from './playback-bar.module.css';

interface PlaybackBarProps {
  position?: number;
  duration?: number;
  onSeek?: (position: number) => void;
}

export const PlaybackBar = ({
  position = 0,
  duration = 1,
  onSeek = () => {},
}: PlaybackBarProps) => (
  <div className={classes['playback-bar']}>
    <div className={classes['time-elapsed']}>
      {prettyMilliseconds(position, {
        colonNotation: true,
        secondsDecimalDigits: 0,
      })}
    </div>
    <Slider
      min={0}
      max={duration}
      value={position}
      step={1000}
      onChangeEnd={onSeek}
    />
    <div className={classes['duration']}>
      {prettyMilliseconds(duration, {
        colonNotation: true,
        secondsDecimalDigits: 0,
      })}
    </div>
  </div>
);
