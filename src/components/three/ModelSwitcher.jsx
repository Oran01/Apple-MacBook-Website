/**
 * ModelSwitcher.jsx
 *
 * Description:
 * Displays and transitions between two MacBook models (14" and 16")
 * using 3D models rendered with @react-three/drei and GSAP animations.
 *
 * Props:
 * - scale (number): Determines which model to show and at what size.
 * - isMobile (boolean): Whether to scale models for mobile layout.
 *
 * Behavior:
 * - Shows MacBook 14" or 16" based on `scale` value.
 * - Smoothly animates position and opacity transitions using GSAP.
 * - Uses PresentationControls from drei for 3D interactivity.
 */

import { PresentationControls } from "@react-three/drei";
import React, { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

/**
 * Fades all meshes in a given group to the target opacity.
 * @param {THREE.Group} group - The group containing meshes to fade.
 * @param {number} opacity - The target opacity (0 to 1).
 */
const fadeMeshes = (group, opacity) => {
  if (!group) return;

  group.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

/**
 * Animates the X-position of a group using GSAP.
 * @param {THREE.Group} group - The group to move.
 * @param {number} x - The target x position.
 */
const moveGroup = (group, x) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

const ModelSwitcher = ({ scale, isMobile }) => {
  const smallMacbookRef = useRef();
  const largeMacbookRef = useRef();

  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;

  // Determines which MacBook model to display
  const showLargeMacbook =
    scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  // Run animation when `scale` changes
  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);

      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);
    } else {
      moveGroup(smallMacbookRef.current, 0);
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

      fadeMeshes(smallMacbookRef.current, 1);
      fadeMeshes(largeMacbookRef.current, 0);
    }
  }, [scale]);

  return (
    <>
      {/* Large MacBook (16") */}
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      {/* Small MacBook (14") */}
      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
