import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Slider } from './slider';

export const Index = () => {
  const [value, setValue] = useState(0);
  return (
    <Box width={400} marginTop={20} marginLeft={20}>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={(value) => setValue(value)}
        isDisabled={true}
      />
    </Box>
  );
};
