import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Slider } from "@material-ui/core";
import "./Music.css";
import ShuffleTwoToneIcon from "@material-ui/icons/ShuffleTwoTone";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RepeatIcon from "@material-ui/icons/Repeat";
// import PauseIcon from '@material-ui/icons/Pause';

function Music() {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="music">
      <div className="music__top">
        <img src="https://pbs.twimg.com/media/EjTZG5XWoAIF-iw.jpg" alt="" />
        <div className="music__name">
          <p className="music__title">Resless II</p>
          <p className="music__artist">Simi</p>
        </div>
        <MenuIcon className="music__icon" />
      </div>
      <div className="music__slider">
        <Slider
          value={value}
          onChange={handleChange}
          aria-labelledby="continuous-slider"
        />
        <div className="music__slider--timeline">
          <p>01:20</p>
          <p>2:59</p>
        </div>
      </div>
      <div className="music__control">
        <ShuffleTwoToneIcon className="music__control--icon" />
        <SkipPreviousIcon className="music__control--icon" />
        <div className="music__control--play">
          <PlayArrowIcon />
          {/* <PauseIcon /> */}
        </div>
        <SkipNextIcon className="music__control--icon" />
        <RepeatIcon className="music__control--icon" />
      </div>
    </div>
  );
}

export default Music;
