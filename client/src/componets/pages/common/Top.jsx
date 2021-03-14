import React from "react";
import Popup from "./Popup";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function Top() {
  return (
    <div className="main__top">
      <div className="main__top--left">
        <div className="main__top--left--top">
          <p>Today's schedule</p>
        </div>
        <div className="main__top--left--bottom">
          <div className="main__top--left--bottom__left">
            <p>Thursday 11</p>
          </div>
          <div className="main__top--left--bottom__right">
            <div className="main__top--leftIcon">
              <ArrowBackIcon />
            </div>
            <div className="main__top--leftIcon">
              <ArrowForwardIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="main__top--right">
        <div className="main__top--rightAdd">
          <Popup />
        </div>
      </div>
    </div>
  );
}

export default Top;
