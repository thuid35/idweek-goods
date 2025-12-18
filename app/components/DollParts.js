"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { PARTS } from "./constants";

export function Head({ index }) {
  const meshRef = useRef();
  
  useEffect(() => {
    if (meshRef.current) {
        gsap.fromTo(meshRef.current.scale, 
            { x: 0, y: 0, z: 0 }, 
            { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
         gsap.fromTo(meshRef.current.rotation, 
            { y: Math.PI }, 
            { y: 0, duration: 0.5, ease: "power2.out" }
        );
    }
  }, [index]);

  const color = PARTS.head[index].color;

  return (
    <group position={[0, 1.5, 0]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function Body({ index }) {
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
         gsap.fromTo(meshRef.current.scale, 
            { x: 0.5, y: 0.5, z: 0.5 }, 
            { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(1.5)" }
        );
    }
  }, [index]);

  const color = PARTS.body[index].color;

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 2, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function Legs({ index }) {
  const meshRef = useRef();

   useEffect(() => {
    if (meshRef.current) {
         gsap.fromTo(meshRef.current.position, 
            { y: -2 }, 
            { y: 0.3, duration: 0.4, ease: "power2.out" }
        );
    }
  }, [index]);

  const color = PARTS.legs[index].color;

  return (
    <group position={[0, -1.5, 0]}>
      <mesh ref={meshRef}>
         <group>
            <mesh position={[-0.3, -0.5, 0]}>
                <boxGeometry args={[0.3, 1.5, 0.3]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0.3, -0.5, 0]}>
                <boxGeometry args={[0.3, 1.5, 0.3]} />
                <meshStandardMaterial color={color} />
            </mesh>
         </group>
      </mesh>
    </group>
  );
}

export function Doll({ headIndex, bodyIndex, legsIndex }) {
  return (
    <group>
      <Head index={headIndex} />
      <Body index={bodyIndex} />
      <Legs index={legsIndex} />
    </group>
  );
}
