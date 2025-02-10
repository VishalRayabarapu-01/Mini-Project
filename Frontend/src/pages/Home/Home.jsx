import React from "react";
import Navbar from "../Navbar/Navbar";
import HomeBody from "./components/HomeBody";

export default function Home() {
  return (
    <>
      <Navbar page="home" />
      <HomeBody />
    </>
  );
}
