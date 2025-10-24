/**
 * store/index.js
 *
 * Description:
 * Zustand store for managing global UI state related to the MacBook viewer.
 * Stores selected color, model scale, and video texture path used in different components.
 *
 * Used In:
 * - ProductViewer.jsx (color + scale selection)
 * - ModelSwitcher.jsx (model rendering based on scale)
 * - Features.jsx (texture changes synced to scroll + video)
 *
 * State:
 * - color (string): Hex color for MacBook material
 * - scale (number): Determines which MacBook size to show (14" or 16")
 * - texture (string): Path to the video texture used in the 3D model
 *
 * Actions:
 * - setColor(color): Update the selected color
 * - setScale(scale): Update the selected model scale
 * - setTexture(texture): Update the texture path for the model
 * - reset(): Restore default state (dark color, 16", feature 1 video)
 */

import { create } from "zustand";

const useMacbookStore = create((set) => ({
  // Selected MacBook color (default: dark)
  color: "#2e2c2e",
  setColor: (color) => set({ color }),

  // Selected MacBook size scale (default: 16")
  scale: 0.08,
  setScale: (scale) => set({ scale }),

  // Video texture for the model (default: feature-1)
  texture: "/videos/feature-1.mp4",
  setTexture: (texture) => set({ texture }),

  // Reset all state to defaults
  reset: () =>
    set({ color: "#2e2c2e", scale: 0.08, texture: "/videos/feature-1.mp4" }),
}));

export default useMacbookStore;
