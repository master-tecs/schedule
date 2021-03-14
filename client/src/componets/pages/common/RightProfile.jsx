import React from "react";
import { useContext } from "react";
import { Globalcontext } from "../../../context/GlobalState";
import DarkmodeToggle from "./DarkmodeToggle";

function RightProfile() {
  const { user } = useContext(Globalcontext);
  return (
    <div className="right__profile">
      <div className="right__profile--left">
        <p className="right__profile--name">{user.name}</p>
        {/* <p className="right__profile--seting">My settings</p> */}
      </div>
      <div className="right__profile--right">
        <DarkmodeToggle />
        {/* <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
          className="right__profile--img"
        /> */}
      </div>
    </div>
  );
}

export default RightProfile;
