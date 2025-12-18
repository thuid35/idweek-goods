"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Doll } from "./DollParts";

/**
 * 獨立的 Three.js Canvas 模組
 * 負責渲染 3D 場景和娃娃模型
 */
export function DollCanvas({ headIndex, bodyIndex, legsIndex }) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      {/* 環境光 */}
      <ambientLight intensity={0.5} />
      
      {/* 方向光 */}
      <directionalLight position={[5, 10, 5]} intensity={1} />
      
      {/* 聚光燈 */}
      <spotLight position={[-5, 5, 2]} intensity={0.5} angle={0.5} />
      
      {/* 娃娃模型 */}
      <Doll 
        headIndex={headIndex} 
        bodyIndex={bodyIndex} 
        legsIndex={legsIndex}
      />
      
      {/* 軌道控制器 */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI / 2.5} 
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
};