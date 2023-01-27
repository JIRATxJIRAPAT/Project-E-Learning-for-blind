import { useState, useEffect } from "react"
//import {WebPlaybackSDK} from "react-spotify-web-playback-sdk"
import SpotifyPlayer from "react-spotify-web-playback"
//import SpotifyPlayer from "react-spotify-player"

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}
