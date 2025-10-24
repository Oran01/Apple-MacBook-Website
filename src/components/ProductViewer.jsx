/**
 * ProductViewer.jsx
 *
 * Description:
 * Displays an interactive 3D viewer of the MacBook Pro using React Three Fiber.
 * Users can choose between 14" and 16" sizes and toggle between two colors.
 * Renders different MacBook models using <ModelSwitcher />.
 *
 * Behavior:
 * - Uses Zustand global store (useMacbookStore) to manage `color` and `scale`
 * - Adjusts model scale for mobile devices via `react-responsive`
 * - Renders 3D scene using <Canvas> with custom lights and controls
 *
 * Components:
 * - StudioLights: Provides realistic lighting setup
 * - ModelSwitcher: Switches between 14" and 16" MacBook models
 *
 * Example usage:
 * <ProductViewer />
 */

import React from "react";
import useMacbookStore from "../store";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import { useMediaQuery } from "react-responsive";
import ModelSwitcher from "./three/ModelSwitcher";

const ProductViewer = () => {
  // Zustand store values and setters
  const { color, scale, setColor, setScale } = useMacbookStore();

  // Detect mobile device
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <section id="product-viewer">
      <h2>Take a closer look.</h2>

      {/* Color & Size Controls */}
      <div className="controls">
        <p className="info">
          MacbookPro | Available in 14" & 16" in Space Gray & Dark colors
        </p>

        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div
              onClick={() => setColor("#adb5bd")}
              className={clsx(
                "bg-neutral-300",
                color === "#adb5bd" && "active"
              )}
            />
            <div
              onClick={() => setColor("#2e2c2e")}
              className={clsx(
                "bg-neutral-900",
                color === "#2e2c2e" && "active"
              )}
            />
          </div>

          {/* Size Selector */}
          <div className="size-control">
            <div
              onClick={() => setScale(0.06)}
              className={clsx(
                scale === 0.06
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
              )}
            >
              <p>14"</p>
            </div>
            <div
              onClick={() => setScale(0.08)}
              className={clsx(
                scale === 0.08
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
              )}
            >
              <p>16"</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Viewer Canvas */}
      <Canvas
        id="canvas"
        camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
      >
        <StudioLights />

        <ModelSwitcher
          scale={isMobile ? scale - 0.03 : scale}
          isMobile={isMobile}
        />
      </Canvas>
    </section>
  );
};

export default ProductViewer;
