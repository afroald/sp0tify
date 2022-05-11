import { Box, Flex } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';

export const Index = () => (
  <Flex minHeight="100vh" backgroundColor="blue.100">
    <Box backgroundColor="black" color="#b2b2b2" width={300} padding={23}>
      <h1>sp0tify</h1>
      <Link to="/artists">Artists</Link>
    </Box>
    <Box backgroundColor="#181818" color="white" flexGrow={1}>
      <Outlet />
    </Box>
  </Flex>
);
