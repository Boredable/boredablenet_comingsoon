import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Shader Material for Two-Color Background
const TwoColorBackgroundMaterial = () => {
  const shaderRef = useRef();

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.elapsedTime; // Pass time to shader
    }
  });

  return (
    <shaderMaterial
      ref={shaderRef}
      attach="material"
      uniforms={{
        uTime: { value: 0 },
        uPrimaryColor: { value: new THREE.Color(0x00ffee) }, // Cyan
        uSecondaryColor: { value: new THREE.Color(0xec5c2a) }, // Red-orange
      }}
      vertexShader={`
        varying vec3 vPosition;

        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec3 uPrimaryColor;
        uniform vec3 uSecondaryColor;

        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(dot(i, vec3(1.0, 1.0, 1.0)), dot(i + vec3(1.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), f.x),
                mix(dot(i + vec3(0.0, 1.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(i + vec3(1.0, 1.0, 0.0), vec3(1.0, 1.0, 1.0)), f.x), f.y),
            mix(mix(dot(i + vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 1.0)), dot(i + vec3(1.0, 0.0, 1.0), vec3(1.0, 1.0, 1.0)), f.x),
                mix(dot(i + vec3(0.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)), dot(i + vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)), f.x), f.y),
            f.z
          );
        }

        void main() {
          vec3 pos = normalize(vPosition);
          float n = noise(pos + uTime * 0.1); // Dynamic noise animation

          // Blend the two colors based on the noise value
          vec3 blendedColor = mix(uPrimaryColor, uSecondaryColor, 0.5 + 0.5 * sin(n * 3.14159));
          
          gl_FragColor = vec4(blendedColor, 1.0);
        }
      `}
      side={THREE.BackSide}
    />
  );
};

// Animated Sphere Background Component
const AnimatedSphereBackground = () => {
  return (
    <mesh scale={[50, 50, 50]}>
      <sphereGeometry args={[1, 64, 64]} />
      <TwoColorBackgroundMaterial />
    </mesh>
  );
};

// Enhanced Metallic Shader Material
const EnhancedMetalShaderMaterial = () => {
  return (
    <shaderMaterial
      attach="material"
      uniforms={{
        uColor1: { value: new THREE.Color(0x00ffee) }, // Matches background primary
        uColor2: { value: new THREE.Color(0xec5c2a) }, // Matches background secondary
        uBaseColor: { value: new THREE.Color(0xcfcfcf) }, // Metallic base
        uHighlightColor: { value: new THREE.Color(0xffffff) }, // Specular highlight
        uLightDirection: { value: new THREE.Vector3(1.0, 1.0, 0.5) }, // Light direction
        uTime: { value: 0 }, // Animation time
        uRoughness: { value: 0.5 }, // Surface roughness
      }}
      vertexShader={`
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vWorldPos;

        void main() {
          vNormal = normalize(normalMatrix * normal); // Pass normalized normal
          vViewDir = normalize(cameraPosition - (modelViewMatrix * vec4(position, 1.0)).xyz); // View direction
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz; // World position
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec3 vWorldPos;

        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uBaseColor;
        uniform vec3 uHighlightColor;
        uniform vec3 uLightDirection;
        uniform float uTime;
        uniform float uRoughness;

        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(dot(i, vec3(1.0, 1.0, 1.0)), dot(i + vec3(1.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), f.x),
                mix(dot(i + vec3(0.0, 1.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(i + vec3(1.0, 1.0, 0.0), vec3(1.0, 1.0, 1.0)), f.x), f.y),
            mix(mix(dot(i + vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 1.0)), dot(i + vec3(1.0, 0.0, 1.0), vec3(1.0, 1.0, 1.0)), f.x),
                mix(dot(i + vec3(0.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)), dot(i + vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)), f.x), f.y),
            f.z
          );
        }

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewDir);
          vec3 lightDir = normalize(uLightDirection);

          float lighting = max(dot(normal, lightDir), 0.0);
          float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);

          vec3 worldPos = normalize(vWorldPos);
          float noiseValue = noise(worldPos + uTime * 0.5);
          vec3 dynamicReflection = mix(uColor1, uColor2, 0.5 + 0.5 * sin(noiseValue * 3.14159));

          vec3 base = mix(uBaseColor, dynamicReflection, uRoughness);
          vec3 highlight = uHighlightColor * lighting;

          vec3 finalColor = mix(base, highlight, 0.4);
          finalColor = mix(finalColor, uHighlightColor, fresnel * 0.5);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `}
    />
  );
};

// Icosahedron Component
const Icosahedron = () => {
  const icosahedronRef = useRef();

  useFrame(({ clock, mouse }) => {
    if (icosahedronRef.current) {
      const rotationSpeed = 2.5;
      icosahedronRef.current.rotation.x +=
        (mouse.y * rotationSpeed - icosahedronRef.current.rotation.x) * 0.05;
      icosahedronRef.current.rotation.y +=
        (mouse.x * rotationSpeed - icosahedronRef.current.rotation.y) * 0.05;

      icosahedronRef.current.material.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh ref={icosahedronRef}>
      <icosahedronGeometry args={[1, 0]} />
      <EnhancedMetalShaderMaterial />
    </mesh>
  );
};

// Main Scene
const FloatingIcosahedron = () => {
  return (
    <div className="h-screen w-screen fixed inset-0 z-0">
      <Canvas>
        {/* Animated Spherical Background */}
        <AnimatedSphereBackground />

        {/* Metallic Icosahedron */}
        <Icosahedron />

        {/* Orbit Controls */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default FloatingIcosahedron;
