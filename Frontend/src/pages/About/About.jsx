import React from "react";
import Navbar from "../Navbar/Navbar";
import AboutBody from "./components/AboutBody";

export default function About() {
  return (
    <>
      <Navbar page="about" />
      <AboutBody />
    </>
  );
}
