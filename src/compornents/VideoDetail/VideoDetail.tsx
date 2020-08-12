import React, { useContext } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Store } from "../../store";
import VideoPlay from "../VideoPlay/VideoPlay";
import Style from "./VideoDetail.module.scss";
import Linkify from "react-linkify";

const VideoDetail = () => {
  const { globalState } = useContext(Store);

  return globalState.selected ? (
    <div className={Style.wrap}>
      <VideoPlay id={globalState.selected.id} />
      <p>{globalState.selected.snippet.title}</p>
      <hr />
      <Linkify>
        <pre>{globalState.selected.snippet.description}</pre>
      </Linkify>
    </div>
  ) : (
    <span>no data!!!</span>
  );
};

export default VideoDetail;
