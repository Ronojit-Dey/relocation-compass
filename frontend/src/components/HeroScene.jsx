import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

function RotatingGlobe() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.2, 32, 32]}>
      <meshStandardMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.35}
      />
    </Sphere>
  );
}

export default function HeroScene() {
  return (
    <div style={{ height: "240px", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 4.5] }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        <RotatingGlobe />
      </Canvas>
    </div>
  );
}