"use client";

import React, { useRef, useEffect, Suspense } from "react";
import gsap from "gsap";
import { PARTS } from "./constants";
import { usePreloadedModel } from "./ModelPreloader";

/**
 * STL 模型載入組件
 * 使用預載入的模型快取
 */
function STLModel({ path, position = [0, 0, -4.5], scale = 1, onLoad }) {
  const geometry = usePreloadedModel(path);
  const meshRef = useRef();

  // 當幾何體載入完成時調用回調
  useEffect(() => {
    if (geometry && onLoad) {
      onLoad();
    }
  }, [geometry, onLoad]);

  return (
    <mesh ref={meshRef} position={position} scale={scale} rotation={[0, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color="#f6f6f6ff" />
    </mesh>
  );
}

/**
 * 頭部組件
 */
export function Head({ index, onLoad }) {
  const groupRef = useRef();
  
  useEffect(() => {
    if (groupRef.current) {
      // 重置動畫起始狀態
      gsap.set(groupRef.current.scale, { x: 0, y: 0, z: 0 });
      gsap.set(groupRef.current.rotation, { y: Math.PI });
      
      // 執行動畫
      gsap.to(groupRef.current.scale, 
        { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
      gsap.to(groupRef.current.rotation, 
        { y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [index]);

  const modelPath = PARTS.head[index].path;

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <Suspense fallback={null}>
        <STLModel path={modelPath} scale={0.1} onLoad={onLoad} />
      </Suspense>
    </group>
  );
}

/**
 * 身體組件
 */
export function Body({ index, onLoad }) {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      gsap.set(groupRef.current.scale, { x: 0.5, y: 0.5, z: 0.5 });
      gsap.to(groupRef.current.scale, 
        { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [index]);

  const modelPath = PARTS.body[index].path;

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <Suspense fallback={null}>
        <STLModel path={modelPath} scale={0.1} onLoad={onLoad} />
      </Suspense>
    </group>
  );
}

/**
 * 腿部組件
 */
export function Legs({ index, onLoad }) {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      gsap.set(groupRef.current.position, { y: -2 });
      gsap.to(groupRef.current.position, 
        { y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [index]);

  const modelPath = PARTS.legs[index].path;

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <Suspense fallback={null}>
        <STLModel path={modelPath} scale={0.1} onLoad={onLoad} />
      </Suspense>
    </group>
  );
}

/**
 * 完整娃娃組件
 */
export function Doll({ headIndex, bodyIndex, legsIndex, scale = 1, animateOnComplete = false, onModelLoad }) {
  const groupRef = useRef();
  const [loadedParts, setLoadedParts] = React.useState({ head: false, body: false, legs: false });
  const hasNotified = useRef(false);

  // 使用 useCallback 穩定回調函數
  const handleHeadLoad = React.useCallback(() => {
    setLoadedParts(prev => ({ ...prev, head: true }));
  }, []);

  const handleBodyLoad = React.useCallback(() => {
    setLoadedParts(prev => ({ ...prev, body: true }));
  }, []);

  const handleLegsLoad = React.useCallback(() => {
    setLoadedParts(prev => ({ ...prev, legs: true }));
  }, []);

  useEffect(() => {
    if (animateOnComplete && groupRef.current) {
      // 完成動畫序列
      const tl = gsap.timeline();
      
      // 1. 快速旋轉展示（360度，0.8秒）
      tl.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 0.8,
        ease: "power2.inOut"
      })
      // 2. 快速旋轉並縮小（0.5秒）
      .to(groupRef.current.rotation, {
        y: Math.PI * 4,
        duration: 0.5,
        ease: "power2.in"
      }, "-=0.2")
      .to(groupRef.current.scale, {
        x: 0.3,
        y: 0.3,
        z: 0.3,
        duration: 0.5,
        ease: "power2.in"
      }, "-=0.5")
      // 3. 縮到最小消失（0.3秒）
      .to(groupRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [animateOnComplete]);

  // 當所有部件都載入完成時，通知父組件（只通知一次）
  useEffect(() => {
    if (loadedParts.head && loadedParts.body && loadedParts.legs && !hasNotified.current) {
      hasNotified.current = true;
      if (onModelLoad) {
        onModelLoad();
      }
    }
  }, [loadedParts, onModelLoad]);

  // 重置載入狀態當索引改變時
  useEffect(() => {
    setLoadedParts({ head: false, body: false, legs: false });
    hasNotified.current = false; // 重置通知狀態
  }, [headIndex, bodyIndex, legsIndex]);

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <Head index={headIndex} onLoad={handleHeadLoad} />
      <Body index={bodyIndex} onLoad={handleBodyLoad} />
      <Legs index={legsIndex} onLoad={handleLegsLoad} />
    </group>
  );
}