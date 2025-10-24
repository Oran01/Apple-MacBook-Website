/**
 * Highlights.jsx
 *
 * Description:
 * Displays a two-column "masonry" layout highlighting the key benefits of the new MacBook Pro.
 * Includes animated fade-in and slide-up effect on scroll using GSAP and scrollTrigger.
 *
 * Behavior:
 * - Uses GSAP `scrollTrigger` to animate both columns into view
 * - Adjusts animation start trigger based on screen size (mobile vs desktop)
 *
 * Layout:
 * - Left column: Performance & display
 * - Right column: AI features & battery life
 *
 * Dependencies:
 * - react-responsive (media queries)
 * - GSAP + @gsap/react
 */

import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Highlights = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    // Animate both columns into view with fade and slide
    gsap.to([".left-column", ".right-column"], {
      scrollTrigger: {
        trigger: "#highlights",
        start: isMobile ? "bottom bottom" : "top center", // Mobile threshold
      },
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 1,
      ease: "power1.inOut",
    });
  });

  return (
    <section id="highlights">
      <h2>There’s never been a better time to upgrade.</h2>
      <h3>Here’s what you get with the new MacBook Pro.</h3>

      {/* Two-column layout for feature highlights */}
      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="Laptop" />
            <p>Fly through demanding tasks up to 9.8x faster.</p>
          </div>
          <div>
            <img src="/sun.png" alt="Sun" />
            <p>
              A stunning <br />
              Liquid Retina XDR <br />
              display.
            </p>
          </div>
        </div>

        {/* Right column: AI + battery */}
        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="AI" />
            <p>
              Built for <br />
              <span>Apple Intelligence.</span>
            </p>
          </div>
          <div>
            <img src="/battery.png" alt="Battery" />
            <p>
              Up to
              <span className="green-gradient"> 14 more hours </span>
              battery life.
              <span className="text-dark-100"> (Up to 24 hours total.)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Highlights;
