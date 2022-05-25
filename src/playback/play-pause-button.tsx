import classes from './play-pause-button.module.css';

const playIcon = (
  <svg role="img" height="16" width="16" viewBox="0 0 16 16">
    <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
  </svg>
);

const pauseIcon = (
  <svg role="img" height="16" width="16" viewBox="0 0 16 16">
    <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
  </svg>
);

type PlayPauseButtonProps = {
  paused?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const PlayPauseButton = ({
  paused = false,
  ...other
}: PlayPauseButtonProps) => (
  <button className={classes['play-pause-button']} {...other}>
    {paused ? playIcon : pauseIcon}
  </button>
);
