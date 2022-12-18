import React from "react";
import Hero from "../../components/Hero/Hero";
import { homeData } from "./Data";

function About() {
  return (
    <>
      <Hero {...homeData} />
    </>
  );
}

export default About;
