/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import { TextureLoader } from "three";
import { setTargetImage } from "./actions";
import { animate } from "motion";

const aspectRatio = 16 / 16;
const thumbHeight = 16;
const thumbWidth = thumbHeight * aspectRatio;
const storageRoot = 'https://www.gstatic.com/aistudio/starter-apps/photosphere/'

export default function PhotoNode({
  id,
  x = 0,
  y = 0,
  z = 0,
  highlight,
  dim,
  xRayMode,
  description,
}) {
  const texture = useLoader(TextureLoader, `${storageRoot}${id}`);
  const opacity = highlight ? 1 : dim ? 0.1 : 1;
  const groupRef = useRef();
  const materialRef = useRef();

  // Animate position changes
  useEffect(() => {
    if (groupRef.current) {
      animate(
        groupRef.current.position,
        { x: x * 600, y: y * 600, z: z * 600 },
        { duration: 1, ease: "circInOut" }
      );
    }
  }, [x, y, z]);

  // Animate opacity changes
  useEffect(() => {
    if (materialRef.current) {
      animate(
        materialRef.current,
        { opacity },
        { duration: 0.5 }
      );
    }
  }, [opacity]);

  return !texture ? null : (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        setTargetImage(id);
      }}
      position={[x, y, z].map((n) => n * 500)}
    >
      <Billboard>
        <mesh scale={[thumbWidth, thumbHeight, 1]}>
          <planeGeometry />
          <meshStandardMaterial
            ref={materialRef}
            map={texture}
            opacity={opacity}
            transparent
            color={xRayMode ? "#999" : "#fff"}
          />
        </mesh>
      </Billboard>

      <Billboard>
        <Text
          fontSize={1}
          color="white"
          anchorX="start"
          anchorY="middle"
          position={[-(thumbWidth / 2) + 2, 0, 1]}
          maxWidth={thumbWidth - 4}
          fillOpacity={xRayMode ? 1 : 0}
        >
          {description.split(".")[0] + "."}
        </Text>
      </Billboard>
    </group>
  );
}
