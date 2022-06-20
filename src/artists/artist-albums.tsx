import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import { useArtist, useArtistAlbums } from '../api/artist';
import { Album } from './album';

interface ArtistAlbumsProps {
  artistId: string;
}

export const ArtistAlbums = ({ artistId }: ArtistAlbumsProps) => {
  const [artist, artistIsPending, artistError] = useArtist({ artistId });
  const [albums, albumsIsPending, AlbumsError] = useArtistAlbums({ artistId });

  const sortedAlbums =
    albums?.sort(
      (a, b) =>
        new Date(a.release_date).getUTCMilliseconds() -
        new Date(b.release_date).getUTCMilliseconds(),
    ) ?? [];

  if (artistIsPending || albumsIsPending) {
    return (
      <div>
        <Center>
          <Spinner size="md" />
        </Center>
      </div>
    );
  }

  return (
    <>
      <Box padding="32px">
        <Heading as="h1" size="md">
          {artist?.name}
        </Heading>
      </Box>
      {sortedAlbums?.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </>
  );
};
