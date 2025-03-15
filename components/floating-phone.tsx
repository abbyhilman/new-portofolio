"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function FloatingPhone({ position = [0, 0, 0], scale = 0.5 }) {
  const phoneRef = useRef()

  useFrame((state) => {
    if (phoneRef.current) {
      // Add a gentle floating animation
      phoneRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <group position={position} scale={scale} ref={phoneRef}>
      {/* Phone body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Phone screen */}
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[0.9, 1.8]} />
        <meshStandardMaterial
          color="#0066ff"
          emissive="#003399"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Camera */}
      <mesh position={[0, 0.8, 0.051]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.01, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Home button */}
      <mesh position={[0, -0.8, 0.051]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.01, 16]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  )
}

