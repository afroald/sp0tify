import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAuthorizationContext } from './authorization/authorization-context';

export const Index = () => {
  const { getAccessToken } = useAuthorizationContext();

  useEffect(() => {
    getAccessToken()
      .then((token) => {
        const url = new URL('https://api.spotify.com/v1/me/following');
        url.searchParams.append('type', 'artist');
        return fetch(String(url), {
          headers: new Headers({
            Authorization: String(token),
          }),
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <Flex minHeight="100vh" backgroundColor="blue.100">
      <Box backgroundColor="black" color="#b2b2b2" width={300} padding={23}>
        <h1>sp0tify</h1>
      </Box>
      <Box backgroundColor="#181818" color="white" flexGrow={1} padding={34}>
        Main column
      </Box>
    </Flex>
  );
};
