import classes from './progress-bar.module.css';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div
    className={classes['progress-bar']}
    style={{ '--progress': `${progress * 100}%` } as React.CSSProperties}
  >
    <div className={classes['progress-bar-background']}>
      <div className={classes['progress']}></div>
    </div>
    <div className={classes['cursor']}></div>
  </div>
);
