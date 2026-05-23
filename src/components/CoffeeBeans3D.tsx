import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Bean({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position} rotation={rotation} scale={0.35}>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial color="#3d5b4f" roughness={0.5} metalness={0.25} />
      </mesh>
    </Float>
  );
}

function BeansScene() {
  const beans: { pos: [number, number, number]; rot: [number, number, number] }[] = [
    { pos: [-1.2, 0.5, 0], rot: [0.5, 0.3, 0.8] },
    { pos: [1, -0.3, 0.2], rot: [0.2, 1, 0.4] },
    { pos: [0.3, 1, -0.5], rot: [1, 0.5, 0.2] },
    { pos: [-0.5, -0.8, 0.3], rot: [0.8, 0.2, 1.2] },
    { pos: [1.5, 0.8, -0.2], rot: [0.3, 0.8, 0.5] },
  ];
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#d97a32" />
      <pointLight position={[-5, -5, 2]} intensity={0.5} color="#8fb59c" />
      {beans.map((b, i) => (
        <Bean key={i} position={b.pos} rotation={b.rot} />
      ))}
    </>
  );
}

export function CoffeeBeans3D() {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <BeansScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
