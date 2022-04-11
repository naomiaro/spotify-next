import { useQuery } from "react-query";
import spotifyApi from "./api/spotify";

export const getPlaylists = (accessToken: string, username: string) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi.getUserPlaylists(username);
};

export default function usePlaylists(accessToken = "", username = "") {
  return useQuery("playlists", () => getPlaylists(accessToken, username));
}
