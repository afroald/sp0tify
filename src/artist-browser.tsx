import { Box, Flex, Spinner } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useFollowedArtists } from './api/useFollowedArtists';
import { ArtistReleases } from './artist-releases';

export const ArtistBrowser = () => {
  const { artistId } = useParams();
  const [artists, isLoading] = useFollowedArtists();

  return (
    <Flex height="100%" alignItems="stretch">
      <Box
        width={300}
        height="100vh"
        overflow="scroll"
        padding={23}
        borderRight="1px solid #404040"
      >
        {isLoading ? (
          <Spinner size="md" />
        ) : (
          <ul>
            {(artists ?? [])
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((artist) => (
                <li key={artist.id}>
                  <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                </li>
              ))}
          </ul>
        )}
      </Box>
      <Box padding={34}>
        {artistId ? <ArtistReleases artistId={artistId} /> : null}
      </Box>
    </Flex>
  );
};
