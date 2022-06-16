import { useCallback, useMemo, useState } from 'react';
import { Slider } from '../slider';
import classes from './volume-control.module.css';

const volumeIcon0 = (
  <svg height="16" width="16" viewBox="0 0 16 16">
    <path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path>
    <path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
  </svg>
);

const volumeIcon1 = (
  <svg height="16" width="16" viewBox="0 0 16 16">
    <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path>
  </svg>
);

const volumeIcon2 = (
  <svg height="16" width="16" viewBox="0 0 16 16">
    <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path>
  </svg>
);

const volumeIcon3 = (
  <svg height="16" width="16" viewBox="0 0 16 16">
    <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path>
    <path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path>
  </svg>
);

function selectVolumeIcon(volume: number) {
  if (volume < 0 || volume > 1) {
    throw new RangeError(`Volume must be between 0 and 1, received: ${volume}`);
  }

  if (volume === 0) {
    return volumeIcon0;
  } else if (volume < 1 / 3) {
    return volumeIcon1;
  } else if (volume < 2 / 3) {
    return volumeIcon2;
  } else {
    return volumeIcon3;
  }
}

interface VolumeControlProps {
  volume: number;
  onChange?: (volume: number) => void;
  isDisabled?: boolean;
}

export const VolumeControl = ({
  volume,
  onChange = () => {},
  isDisabled = false,
}: VolumeControlProps) => {
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(0.5);
  const volumeIcon = useMemo(() => selectVolumeIcon(volume), [volume]);

  const toggleMute = useCallback(() => {
    if (volume === 0) {
      onChange(volumeBeforeMute);
    } else {
      setVolumeBeforeMute(volume);
      onChange(0);
    }
  }, [volume, volumeBeforeMute, onChange]);

  return (
    <div className={classes['volume-control']}>
      <button className={classes['mute-button']} onClick={toggleMute}>
        {volumeIcon}
      </button>
      <Slider
        min={0}
        max={100}
        value={volume * 100}
        focusThumbOnChange={false}
        onChange={(value) => onChange(value / 100)}
        isDisabled={isDisabled}
      />
    </div>
  );
};
