"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { PointMaterial } from "@react-three/drei"

export default function ParticleField({ count = 1000 }) {
  const points = useRef()

  // Generate random positions for particles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Create a sphere of particles
      const radius = Math.random() * 4 + 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Add some color variation
      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6 + Math.random() * 0.2)

      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    return {
      positions,
      colors,
    }
  }, [count])

  // Animate particles
  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.05
      points.current.rotation.y += delta * 0.075
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

