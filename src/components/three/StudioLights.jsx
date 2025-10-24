/**
 * StudioLights.jsx
 *
 * Description:
 * This component sets up realistic studio-style lighting using React Three Fiber.
 * It includes environmental lighting via `@react-three/drei`'s <Environment> and several <spotLight> sources
 * to enhance reflections and shadows for 3D models.
 *
 * Props: None
 *
 * Usage:
 * <Canvas>
 *   <StudioLights />
 *   <Your3DModel />
 * </Canvas>
 *
 * Dependencies:
 * - @react-three/drei: Environment, Lightformer
 */

import { Environment, Lightformer } from "@react-three/drei";

const StudioLights = () => {
  return (
    <group name="lights">
      {/* Environmental lighting using HDR-like lightformers */}
      <Environment resolution={256}>
        <group>
          {/* Rectangular light source from the left */}
          <Lightformer
            form="rect"
            intensity={10}
            position={[-10, 5, -5]}
            scale={10}
            rotation-y={Math.PI / 2}
          />
          {/* Rectangular light source from the right */}
          <Lightformer
            form="rect"
            intensity={10}
            position={[10, 0, 1]}
            scale={10}
            rotation-y={Math.PI / 2}
          />
        </group>
      </Environment>

      {/* Additional spotlight from above-left */}
      <spotLight
        position={[-2, 10, 5]}
        angle={0.15}
        decay={0}
        intensity={Math.PI * 0.2}
      />

      {/* Upward-facing spotlight from below */}
      <spotLight
        position={[0, -25, 10]}
        angle={0.15}
        decay={0}
        intensity={Math.PI * 0.2}
      />

      {/* Top-down spotlight for highlighting the object */}
      <spotLight
        position={[0, 15, 5]}
        angle={0.15}
        decay={0.1}
        intensity={Math.PI * 1}
      />
    </group>
  );
};

export default StudioLights;
