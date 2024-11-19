import React from "react";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";
import TestComp from "./TestComp";

const Home = () => {
  return <div className="font-NewAmsterdam tracking-widest cursor-default">
    {/* <TestComp/> */}
    <Outlet/>
  </div>;
};

export default Home;
