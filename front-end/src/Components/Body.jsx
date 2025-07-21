import React from "react";
import { Outlet } from "react-router";

function Body() {
  return (
    <div className="w-full  bg-gray-100 ">
      <Outlet />
    </div>
  );
}

export default Body;
