import { useSlider, UseSliderProps } from '@chakra-ui/react';
import classes from './slider.module.css';

export const Slider = (props: UseSliderProps) => {
  const { getRootProps, getTrackProps, getInnerTrackProps, getThumbProps } =
    useSlider(props);

  return (
    <div className={classes['slider']} {...getRootProps()}>
      <div className={classes['track']} {...getTrackProps()}>
        <div className={classes['track-progress']} {...getInnerTrackProps()} />
      </div>
      {!props.isDisabled ? (
        <div className={classes['thumb']} {...getThumbProps()} />
      ) : null}
    </div>
  );
};
