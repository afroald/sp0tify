interface ArtistReleasesProps {
  artistId: string;
}

export const ArtistReleases = ({ artistId }: ArtistReleasesProps) => (
  <div>{artistId}</div>
);
