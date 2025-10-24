/**
 * Hero.jsx
 *
 * Description:
 * Displays the top "hero" section of the site, including a heading,
 * promotional video, and pricing information.
 *
 * Behavior:
 * - Automatically plays a muted background video (`/videos/hero.mp4`)
 * - Doubles video playback speed for visual effect
 *
 * Accessibility:
 * - Uses `playsInline`, `autoPlay`, and `muted` attributes to ensure smooth UX across devices
 *
 * Example usage:
 * <Hero />
 */

import React, { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef();

  // Double the video playback speed when component mounts
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  }, []);

  return (
    <section id="hero">
      <div>
        <h1>MAcBook Pro</h1>
        <img src="/title.png" alt="MacBook Tittle" />
      </div>

      {/* Background video plays muted + fast */}
      <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />

      {/* CTA Button */}
      <button>Buy</button>

      {/* Price info */}
      <p> From $1599 or $133/mo for 12 months</p>
    </section>
  );
};

export default Hero;
