import React, { ReactNode } from "react";
import Style from "./VideoGrid.module.scss";

interface VideoGridProps {
  children: ReactNode;
}

const VideoGrid = ({ children }: VideoGridProps) => {
  return <div className={Style.container}>{children}</div>;
};

export default VideoGrid;
