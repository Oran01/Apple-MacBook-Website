/**
 * Showcase.jsx
 *
 * Description:
 * Displays a full-screen scroll-pinned showcase section with background video,
 * a masked Apple logo animation, and animated product content reveal.
 * Utilizes GSAP with ScrollTrigger for scroll-based animations.
 *
 * Behavior:
 * - On desktop: Scroll pinning and reveal animations for content and logo
 * - On tablet/mobile: Disables scroll animation for performance
 *
 * Media:
 * - Background video (game footage)
 * - Foreground logo mask (Apple)
 *
 * Dependencies:
 * - GSAP + @gsap/react
 * - react-responsive for screen size detection
 *
 * Example usage:
 * <Showcase />
 */

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    if (!isTablet) {
      // Create scroll-pinned animation for desktop only
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      timeline
        .to(".mask img", { transform: "scale(1.1)" }) // Logo grows slightly
        .to(".content", { opacity: 1, y: 0, ease: "power1.in" }); // Content fades in
    }
  }, [isTablet]);

  return (
    <section id="showcase">
      {/* Media background with video and logo mask */}
      <div className="media">
        <video src="/videos/game.mp4" loop muted autoPlay playsInline />
        <div className="mask">
          <img src="/mask-logo.svg" />
        </div>
      </div>

      {/* Animated product content section */}
      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Rocket Chip</h2>

            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 powers
              </p>
              <p>
                It drives Apple Intelligence on iPad Pro, so you can write,
                create, and accomplish more with ease. All in a design that’s
                unbelievably thin, light, and powerful.
              </p>
              <p>
                A brand-new display engine delivers breathtaking precision,
                color accuracy, and brightness. And a next-gen GPU with
                hardware-accelerated ray tracing brings console-level graphics
                to your fingertips.
              </p>
              <p className="text-primary">
                Learn more about Apple Intelligence
              </p>
            </div>
          </div>

          {/* Right-side performance stats */}
          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
