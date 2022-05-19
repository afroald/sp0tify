import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useFollowedArtists } from '../api/useFollowedArtists';
import { ArtistList } from './artist-list';
import { ArtistReleases } from './artist-releases';

export const ArtistBrowser = () => {
  const { artistId } = useParams();
  const [artists, isPending] = useFollowedArtists();

  return (
    <Flex height="100%" alignItems="stretch">
      <Box
        width={400}
        height="100vh"
        overflow="scroll"
        padding={23}
        borderRight="1px solid #404040"
      >
        {isPending ? (
          <Center>
            <Spinner size="md" />
          </Center>
        ) : (
          <ArtistList artists={artists ?? []} selectedArtistId={artistId} />
        )}
      </Box>
      <Box padding={34}>
        {artistId ? <ArtistReleases artistId={artistId} /> : null}
      </Box>
    </Flex>
  );
};
