import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SpotifyDeviceId, SpotifyPlayer } from 'spotify-web-playback-ts';
import { SpotifyPlayerState } from 'spotify-web-playback-ts/lib/types';
import { AccessToken } from '../authorization/access-token';
import { useAuthorizationContext } from '../authorization/authorization-context';

async function requestPlay(
  token: AccessToken,
  deviceId: SpotifyDeviceId,
  uris: string[],
) {
  return fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId.device_id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ uris }),
      headers: new Headers({
        Authorization: String(token),
      }),
    },
  );
}

interface PlaybackContextInterface {
  deviceId: SpotifyDeviceId | null;
  state: SpotifyPlayerState | null;
  play: (uris: string[]) => void;
  togglePlay: () => void;
}

const PlaybackContext = createContext<PlaybackContextInterface | null>(null);

export const usePlaybackContext = () => {
  const context = useContext(PlaybackContext);

  if (!context) {
    throw new Error(
      'Cannot use playback context without provider in render tree',
    );
  }

  return context;
};

interface PlaybackProviderProps {
  children?: ReactNode;
}

export const PlaybackProvider = ({ children }: PlaybackProviderProps) => {
  const { getAccessToken } = useAuthorizationContext();
  const connectingRef = useRef(false);
  const playerRef = useRef<SpotifyPlayer | null>(null);
  const [deviceId, setDeviceId] = useState<SpotifyDeviceId | null>(null);
  const [playerState, setPlayerState] = useState<SpotifyPlayerState | null>(
    null,
  );

  useEffect(() => {
    if (connectingRef.current) {
      return;
    }

    connectingRef.current = true;

    SpotifyPlayer.init(window.document, 'sp0tify', 1.0, (cb) =>
      getAccessToken().then((token) => {
        cb(token.token);
      }),
    )
      .then((player) => {
        return player
          .connect()
          .then((success) => {
            if (!success) {
              console.log('Failed to connect to Spotify');
            }

            playerRef.current = player;

            player.onReady((deviceId) => {
              setDeviceId(deviceId);
            });

            player.onPlayerStateChanged(setPlayerState);
          })
          .catch((error) => {
            console.log('Failed to connect to Spotify');
            console.error(error);
          });
      })
      .finally(() => {
        connectingRef.current = false;
      });
  }, [playerRef, getAccessToken]);

  useEffect(() => {
    return () => {
      playerRef.current?.disconnect();
    };
  }, [playerRef]);

  const play = useCallback(
    (uris: string[]) => {
      if (!deviceId) {
        console.warn('Cannot play uris because no device id is known');
        return;
      }

      getAccessToken().then((token) => {
        requestPlay(token, deviceId, uris);
      });
    },
    [getAccessToken, deviceId],
  );

  const togglePlay = useCallback(() => {
    if (!playerRef.current) {
      return;
    }

    return playerRef.current.togglePlay();
  }, []);

  const value = useMemo(
    () => ({
      deviceId,
      state: playerState,
      play,
      togglePlay,
    }),
    [deviceId, playerState, play, togglePlay],
  );

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
};
