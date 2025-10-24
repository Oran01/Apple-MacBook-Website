/**
 * App.jsx
 *
 * Description:
 * The root component of the application. It composes the full page by rendering
 * all major UI sections in order — including the navigation bar, hero banner,
 * 3D product viewer, promotional content, and footer.
 *
 * Behavior:
 * - Registers GSAP's ScrollTrigger plugin globally for scroll-based animations.
 * - Each section component handles its own internal logic, state, and animations.
 *
 * Sections:
 * - <NavBar />: Logo, links, search/cart icons
 * - <Hero />: Hero banner with promo video
 * - <ProductViewer />: 3D MacBook viewer with color/size toggles
 * - <Showcase />: Scroll-pinned section with media + Apple Intelligence info
 * - <Performance />: GPU highlights with scroll-triggered visuals
 * - <Features />: Interactive feature sync with model + scroll
 * - <Highlights />: Two-column spec highlights with animations
 * - <Footer />: Support message + dynamic footer links
 *
 * Example usage:
 * ReactDOM.render(<App />, document.getElementById("root"))
 */

import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import Showcase from "./components/Showcase";
import Performance from "./components/Performance";
import Features from "./components/Features";
import Highlights from "./components/Highlights";
import Footer from "./components/Footer";

// Register GSAP ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    // Refresh GSAP ScrollTrigger when all content (e.g. images, canvas) is ready
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    // Try refreshing after load + a slight delay
    window.addEventListener("load", handleRefresh);
    const timeout = setTimeout(handleRefresh, 1500);

    return () => {
      window.removeEventListener("load", handleRefresh);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <main>
      <NavBar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  );
};

export default App;
