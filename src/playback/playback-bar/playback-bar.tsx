import prettyMilliseconds from 'pretty-ms';
import { useCallback, useEffect, useState } from 'react';
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
}: PlaybackBarProps) => {
  const [localPosition, setLocalPosition] = useState(position);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    if (!seeking) {
      setLocalPosition(position);
    }
  }, [seeking, position]);

  const onChangeStart = useCallback(() => {
    setSeeking(true);
  }, []);

  const onChange = useCallback((value: number) => {
    setLocalPosition(value);
  }, []);

  const onChangeEnd = useCallback(
    (value: number) => {
      setSeeking(false);
      onSeek(value);
    },
    [onSeek],
  );

  return (
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
        value={localPosition}
        step={1000}
        onChangeStart={onChangeStart}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
      />
      <div className={classes['duration']}>
        {prettyMilliseconds(duration, {
          colonNotation: true,
          secondsDecimalDigits: 0,
        })}
      </div>
    </div>
  );
};
