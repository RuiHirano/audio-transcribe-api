import React, { useMemo } from "react";
import ReactAudioPlayer from 'react-audio-player';

export interface Props {
  file: File | undefined,
  onListen: (sec: number) => void
}

const AudioPlayer: React.FC<Props> = ({ file, onListen }) => {

  const AudioPlayer = useMemo(() =>
    <ReactAudioPlayer
      style={{ width: '100%' }}
      src={file ? URL.createObjectURL(file) : ""}
      listenInterval={1000}
      onListen={onListen}
      controls
    />, [file])

  return (
    <div>
      {AudioPlayer}
    </div>
  );
};

export default AudioPlayer;
