import { Center, Spinner } from '@chakra-ui/react';
import { useArtist, useArtistsAlbums } from '../api/artist';
import { Album } from './album';

interface ArtistAlbumsProps {
  artistId: string;
}

export const ArtistAlbums = ({ artistId }: ArtistAlbumsProps) => {
  const [artist, artistIsPending, artistError] = useArtist({ artistId });
  const [albums, albumsIsPending, AlbumsError] = useArtistsAlbums({ artistId });

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
    <div>
      <h1>{artist?.name}</h1>
      {sortedAlbums?.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  );
};
