import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import { ContentContextWrapper } from '@objectiv/tracker-react';
import { useParams } from 'react-router-dom';
import { useFollowedArtists } from '../api/artist';
import { ArtistAlbums } from './artist-albums';
import { ArtistList } from './artist-list';

export const ArtistBrowser = () => {
  const { artistId } = useParams();
  const [artists, isPending] = useFollowedArtists();

  return (
    <ContentContextWrapper id="artist-browser">
      <Flex height="100%" alignItems="stretch">
        <Box
          width={400}
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
        <Box flexGrow={1} overflow="scroll">
          {artistId ? <ArtistAlbums artistId={artistId} /> : null}
        </Box>
      </Flex>
    </ContentContextWrapper>
  );
};
