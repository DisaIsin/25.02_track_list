import React, { useState, useRef } from "react";
import "./styles.css";

type Track = {
  title: string;
  src: string;
  subtitles: string;
};

const tracks: Track[] = [
  {
    title: "Track 1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    subtitles: "Track 1",
  },
  {
    title: "Track 2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    subtitles: "Track 2",
  },
  {
    title: "Track 3",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    subtitles: "Track 3",
  },
  {
    title: "Track 4",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    subtitles: "Track 4",
  },
];

const MediaPlayer: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpeed = parseFloat(e.target.value);
    setPlaybackRate(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const handleTrackChange = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="player-container">
      <h2>Custom Media Player</h2>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={() =>
          setCurrentTime(audioRef.current ? audioRef.current.currentTime : 0)
        }
      ></audio>

      {/* Управление */}
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <select value={playbackRate} onChange={handleSpeedChange}>
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>

      {/* Ползунок перемотки с секундами */}
      <div className="seek-container">
        <input
          type="range"
          min="0"
          max={audioRef.current ? audioRef.current.duration : 0}
          value={currentTime}
          onChange={handleSeekChange}
          className="seek-slider"
        />
        <span className="seek-time">
          {Math.floor(currentTime)} /{" "}
          {audioRef.current ? Math.floor(audioRef.current.duration) : 0} sec
        </span>
      </div>

      {/* Ползунок громкости вертикальный */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />

      {/* Текущий трек */}
      <h3 className="now-playing">Now Playing: {currentTrack.title}</h3>
      <p>{currentTrack.subtitles}</p>

      {/* Плейлист */}
      <ul className="playlist">
        {tracks.map((track, index) => (
          <li
            key={index}
            onClick={() => handleTrackChange(track)}
            className={currentTrack.title === track.title ? "active" : ""}
          >
            {track.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaPlayer;
