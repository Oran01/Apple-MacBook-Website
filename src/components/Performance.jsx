/**
 * Performance.jsx
 *
 * Description:
 * Displays a scroll-animated section highlighting the graphics performance
 * of the MacBook Pro. Includes multiple positioned images and a text block,
 * both animated using GSAP + ScrollTrigger.
 *
 * Behavior:
 * - Text fades in on scroll (always)
 * - Positioned images animate into place as user scrolls (only on desktop)
 *
 * Data:
 * - performanceImages: Array of image metadata (src, id, alt)
 * - performanceImgPositions: Layout positions for each image (used in GSAP)
 *
 * Dependencies:
 * - GSAP + @gsap/react
 * - react-responsive (for isMobile)
 *
 * Example usage:
 * <Performance />
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  performanceImages,
  performanceImgPositions,
} from "../constants/index.js";
import { useMediaQuery } from "react-responsive";

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      // Animate the paragraph text as it scrolls into view
      gsap.fromTo(
        ".content p",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Skip image animation on mobile for performance/responsiveness
      if (isMobile) return;

      // Create timeline for animating image positions
      const tl = gsap.timeline({
        defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
        scrollTrigger: {
          trigger: sectionEl,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each image into its defined position
      performanceImgPositions.forEach((item) => {
        if (item.id === "p5") return; // Skip special image if needed

        const selector = `.${item.id}`;
        const vars = {};

        // Only include CSS properties if defined
        if (typeof item.left === "number") vars.left = `${item.left}%`;
        if (typeof item.right === "number") vars.right = `${item.right}%`;
        if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

        if (item.transform) vars.transform = item.transform;

        tl.to(selector, vars, 0); // Add all at timeline start
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      {/* Image container for floating performance visuals */}
      <div className="wrapper">
        {performanceImages.map((item, index) => (
          <img
            key={index}
            src={item.src}
            className={item.id}
            alt={item.alt || `Performance Image #${index + 1}`}
          />
        ))}
      </div>

      {/* Paragraph with performance description */}
      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};
export default Performance;
