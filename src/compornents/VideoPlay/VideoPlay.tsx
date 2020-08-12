import React from "react";
import Youtube from "react-youtube";
import Style from "./VideoPlay.module.scss";

interface VideoPlayProps {
  id: string;
}

const VideoPlay = ({ id }: VideoPlayProps) => {
  return (
    <div className={Style.wrap}>
      <Youtube className={Style.video} videoId={id} />
    </div>
  );
};

export default VideoPlay;
