import { Box, List, ListItem } from '@chakra-ui/react';
import { ContentContextWrapper } from '@objectiv/tracker-react';
import { TrackList, TrackListColumnType } from '../components/track-list';
import { usePlaybackContext } from '../playback/playback-context';

const TRACK_LIST_COLUMNS = [
  TrackListColumnType.TrackNumber,
  TrackListColumnType.AlbumCover,
  TrackListColumnType.Title,
  TrackListColumnType.Album,
  TrackListColumnType.Duration,
];

export const Queue = () => {
  const { state } = usePlaybackContext();
  console.log(state);

  const nowPlayingTracks = state ? [state.track_window.current_track] : [];

  return (
    <ContentContextWrapper id="queue">
      <Box padding={34}>
        <h1>Wachtrij</h1>
        <h2>Wordt nu afgespeeld</h2>
        <TrackList
          showHeader={false}
          columns={TRACK_LIST_COLUMNS}
          tracks={nowPlayingTracks}
          total_tracks={nowPlayingTracks.length}
        />

        <h2>Volgende</h2>
        <List>
          <ListItem>
            <pre>
              {JSON.stringify(state?.track_window.next_tracks, null, 2)}
            </pre>
          </ListItem>
        </List>
      </Box>
    </ContentContextWrapper>
  );
};
