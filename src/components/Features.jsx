/**
 * Features.jsx
 *
 * Description:
 * This component renders the animated "Features" section of the website.
 * It includes a 3D MacBook model that rotates on scroll, and updates its texture
 * to match different feature highlights. Each highlight is synced to scroll position.
 *
 * Components:
 * - ModelScroll: Handles 3D model rendering and scroll-triggered texture updates
 * - Features: Wraps the entire feature section, renders canvas and feature boxes
 *
 * Dependencies:
 * - React Three Fiber + drei
 * - GSAP for scroll-based animations
 * - Zustand (via useMacbookStore) to update model texture
 */

import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import StudioLights from "./three/StudioLights";
import { features, featureSequence } from "../constants";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook.jsx";
import useMacbookStore from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * ModelScroll
 *
 * Renders the 3D MacBook model inside a scroll-linked animation timeline.
 * As the user scrolls:
 * - The model rotates 360°
 * - Its texture updates to match each feature (via `setTexture`)
 * - Associated DOM elements animate into view (e.g., `.box1`, `.box2`, etc.)
 */
const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024ps)" });
  const { setTexture } = useMacbookStore();

  // Preload feature videos
  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement("video");

      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      v.load();
    });
  }, []);

  useGSAP(() => {
    // Timeline for rotating the 3D model
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top",
        end: "bottom end",
        scrub: 2,
        pin: true,
      },
    });

    // Timeline for changing model textures and animating feature text
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });

    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2, // rotate full circle
        ease: "power1.inOut",
      });
    }

    // Sync feature highlights with scroll
    timeline
      .call(() => setTexture("/videos/feature-1.mp4"))
      .to(".box1", { opacity: 1, y: 0, delay: 1 })

      .call(() => setTexture("/videos/feature-2.mp4"))
      .to(".box2", { opacity: 1, y: 0 })

      .call(() => setTexture("/videos/feature-3.mp4"))
      .to(".box3", { opacity: 1, y: 0 })

      .call(() => setTexture("/videos/feature-4.mp4"))
      .to(".box4", { opacity: 1, y: 0 })

      .call(() => setTexture("/videos/feature-5.mp4"))
      .to(".box5", { opacity: 1, y: 0 });
  }, []);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }
      >
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

/**
 * Features
 *
 * The main visual section of the app.
 * - Renders a <Canvas> with 3D lighting and model
 * - Animates scroll-based MacBook rotation and feature syncing
 * - Displays overlaid DOM-based feature boxes (text + icons)
 */
const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light</h2>

      {/* 3D canvas with animated model */}
      <Canvas id="f-canvas" camera={{}}>
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />
      </Canvas>

      {/* Overlaid feature highlights (HTML DOM) */}
      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={clsx("box", `box${index + 1}`, feature.styles)}
          >
            <img src={feature.icon} alt={feature.highlight} />
            <p>
              <span className="text-white">{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
